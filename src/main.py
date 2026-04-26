from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torch.nn as nn
import joblib
import os
import json
import threading
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
import geopandas as gpd
from shapely.geometry import Point
from scipy.spatial import KDTree
from pathlib import Path
from apscheduler.schedulers.background import BackgroundScheduler

# Import bank monitoring logic from sibling module
from .bank_monitor import fetch_bank_health, get_bank_upi_status, get_problematic_banks, clean_old_data, CSV_FILE

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models"
DATA_PATH = BASE_DIR / "data"
FRONTEND_DIR = BASE_DIR / "Frontend"


app = FastAPI(title="NetPaySense API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    """Start the background scraper when the API starts."""
    clean_old_data() # 🔥 Run cleanup on startup
    
    # Start the background tasks
    scheduler = BackgroundScheduler(daemon=True)
    scheduler.add_job(fetch_bank_health, 'interval', minutes=5)
    scheduler.add_job(clean_old_data, 'interval', hours=12) # 🔥 Cleanup every 12 hours
    scheduler.start()
    
    # Run the first scrape immediately in a separate thread so it doesn't block API startup
    threading.Thread(target=fetch_bank_health, daemon=True).start()
    
    print("Background Scraper Started (Interval: 5 min)")

gdf = gpd.read_file(DATA_PATH / "IndiaStatesBoundaryShapes/India_State_Boundary.shp")
gdf = gdf.to_crs(epsg=4326) # converts to lat/lon
karnataka = gdf[gdf["STATE"] == "KARNATAKA"]

def isInKarnataka(lat: float, lon: float) -> bool:
    point = Point(lon, lat)
    return karnataka.geometry.contains(point).any()

# ----------- OPERATOR PERFORMANCE -----------
def get_operator_performance(lat, lon):
    # Simulated operator data - in real app would use SignalStrength API or crowdsourced data
    return {
        "Jio": {"signal": -70, "latency": 80},
        "Airtel": {"signal": -85, "latency": 120},
        "Vi": {"signal": -95, "latency": 200}
    }

def suggest_best_operator(operators):
    best = None
    best_score = -999
    for op, values in operators.items():
        score = values["signal"] - values["latency"]
        if score > best_score:
            best_score = score
            best = op
    return best

# ----------- ML MODELS -----------
class OoklaNN(nn.Module):
    def __init__(self, input_size):
        super(OoklaNN, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, 64),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(32, 16),
            nn.ReLU(),
            nn.Linear(16, 3)
        )
    def forward(self, x):
        return self.network(x)

# Load Models
ookla_model = OoklaNN(input_size=5)
ookla_model.load_state_dict(torch.load(MODEL_PATH / 'ookla_nn.pth'))
ookla_model.eval()
ookla_scaler = joblib.load(MODEL_PATH / 'ookla_scaler.pkl')

# Load Model 2 (Local Signal)
signal_model = joblib.load(MODEL_PATH / 'signal_xgb.pkl')

# Load Look-up Data for Model 1 (Nearest Neighbor search)
look_up_df = pd.read_csv(DATA_PATH / 'final_dataset.csv')
look_up_df['download_mbps'] = look_up_df['avg_d_kbps'] / 1000
look_up_df['upload_mbps'] = look_up_df['avg_u_kbps'] / 1000
look_up_df['latency_ms'] = look_up_df['avg_lat_ms']

look_up_df = look_up_df[
    (look_up_df['download_mbps'] > 0) &
    (look_up_df['latency_ms'] > 0)
]

coords = look_up_df[['lat', 'lon']].values
tree = KDTree(coords)

# ----------- SCHEMA -----------
class PredictionRequest(BaseModel):
    lat: float
    lon: float
    rsrp: float = None
    rsrq: float = None
    snr: float = None
    cqi: float = None
    dbm: float = None
    bank_name: str = None # User-selected bank

class BankPredictionRequest(BaseModel):
    bank: str
    lat: float
    lon: float
    network_score: float = 90.0

class FeedbackRequest(BaseModel):
    lat: float
    lon: float
    outcome: str # success, failed, pending
    metrics: dict

# ----------- UI LOGIC -----------
def get_ui_data(quality_score, upi_score, community_alert=False):
    # Class mapping: 0:Poor, 1:Mid, 2:Good
    
    # Community alert significantly increases risk
    if community_alert:
        return {
            "tier": "poor", "bars": 1, "dbm": -105, "label": "Regional Failures",
            "upi": f"Critical - {min(upi_score, 15):.1f}%", "badge": "COMMUNITY DOWNTIME", 
            "rec": "🚨 Multiple payment failures reported here. Use Cash.", "type": "4G"
        }

    if quality_score == 2: # Good
        return {
            "tier": "good", "bars": 5, "dbm": -65, "label": "High Performance",
            "upi": f"Excellent - {upi_score:.1f}%", "badge": "Low Risk", "rec": "Safe to proceed with any UPI amount.", "type": "5G"
        }
    elif quality_score == 1: # Moderate
        return {
            "tier": "mid", "bars": 3, "dbm": -88, "label": "Stable Connection",
            "upi": f"Fair - {upi_score:.1f}%", "badge": "Medium Risk", "rec": "Proceed with caution. WiFi preferred.", "type": "4G"
        }
    else: # Poor
        return {
            "tier": "poor", "bars": 1, "dbm": -110, "label": "Unstable Signal",
            "upi": f"Risky - {upi_score:.1f}%", "badge": "High Risk", "rec": "Carry Cash - High chance of timeout.", "type": "4G"
        }

# ----------- MAIN PREDICTION -----------
@app.post("/predict")
async def predict(req: PredictionRequest):
    if not isInKarnataka(req.lat, req.lon):
        return JSONResponse(status_code=403, content={
            "status": "out_of_range",
            "message": "We are currently available just for Karnataka.",
            "recommendation": "Enter a valid Karnataka location."
        })

    try:
        # 1. Spatial Lookup
        dist, idx = tree.query([req.lat, req.lon])
        nearest = look_up_df.iloc[idx]
        authentic_lat = float(nearest['lat'])
        authentic_lon = float(nearest['lon'])

        # 2. Network Quality Models
        m1_features = pd.DataFrame([[
            nearest['download_mbps'], nearest['upload_mbps'], nearest['latency_ms'],
            authentic_lat, authentic_lon
        ]], columns=['download_mbps', 'upload_mbps', 'latency_ms', 'lat', 'lon'])
        m1_scaled = ookla_scaler.transform(m1_features)

        with torch.no_grad():
            m1_out = ookla_model(torch.tensor(m1_scaled, dtype=torch.float32))
            m1_quality = torch.argmax(m1_out, dim=1).item()
            
            # 🔥 Aggressive Dynamic Engine
            probs = torch.softmax(m1_out, dim=1)[0].detach().numpy()
            
            # Base logic: Use probability to find the "Anchor" score
            # (98% for Good, 65% for Mid, 15% for Poor)
            base_anchor = (probs[0] * 15.0 + probs[1] * 65.0 + probs[2] * 98.0)
            
            # 🏎️ Speed & Latency Impact (Stronger)
            dn = nearest['download_mbps']
            lat = nearest['latency_ms']
            
            # Calculate a "Performance Offset"
            if m1_quality == 2: # Good (12Mbps base)
                offset = (dn - 12) * 0.4 - (lat - 30) * 0.15
            elif m1_quality == 1: # Mid (3Mbps base)
                offset = (dn - 5) * 2.0 - (lat - 80) * 0.25
            else: # Poor
                offset = (dn - 1) * 5.0 - (lat - 150) * 0.1
                
            # 🌊 Micro-fluctuation (to mimic real-time network jitter)
            jitter = (np.random.random() - 0.5) * 0.5 
            
            upi_score = base_anchor + offset + jitter
            
            # Final Safety Clamp
            upi_score = max(5.0, min(99.7, upi_score))

        if req.rsrp is not None and req.rsrq is not None:
            m2_features = np.array([[req.rsrp, req.rsrq, req.snr or 0, req.cqi or 10, req.dbm or -90]])
            m2_quality = signal_model.predict(m2_features)[0]
            final_quality = min(m1_quality, m2_quality)
            
            # If Model 2 (Signal) is worse than Model 1 (Speeds), dampen the score
            if m2_quality < m1_quality:
                upi_score *= 0.8 if m2_quality == 1 else 0.4
        else:
            final_quality = m1_quality
            m2_quality = None

        # 2. Community Check
        has_alert = check_nearby_failures(req.lat, req.lon)
        
        ui_data = get_ui_data(final_quality, upi_score, has_alert)
        operators = get_operator_performance(req.lat, req.lon)
        best_operator = suggest_best_operator(operators)

        # 3. Bank Status Override (Official Scraper Data)
        bank_warning = None
        if req.bank_name:
            status, stale = get_bank_upi_status(req.bank_name)
            if status == "DOWN":
                ui_data["tier"] = "poor"
                ui_data["badge"] = "CRITICAL RISK"
                ui_data["upi"] = "Near 0% - Server Down"
                ui_data["rec"] = f"STOP: {req.bank_name} servers are currently DOWN. Use Cash."
                bank_warning = f"{req.bank_name} servers are offline."
            elif status == "FLUCTUATING":
                ui_data["badge"] = "High Risk (Bank Issues)"
                ui_data["upi"] = "Low - 15-30%"
                ui_data["rec"] = f"Warning: {req.bank_name} servers are unstable. Cash recommended."
                bank_warning = f"{req.bank_name} servers are fluctuating."

        return {
            "lat": authentic_lat, "lon": authentic_lon, "tier": ui_data["tier"],
            "bars": ui_data["bars"], "dbm": ui_data["dbm"], "label": ui_data["label"],
            "upi": ui_data["upi"], "badge": ui_data["badge"], "type": ui_data["type"],
            "recommendation": ui_data["rec"], "confidence": f"{(final_quality + 1) * 30}%", 
            "best_network": best_operator, "bank_warning": bank_warning,
            "metrics": { "download": f"{nearest['download_mbps']:.2f} Mbps", "latency": f"{nearest['latency_ms']:.1f} ms" },
            "community_alert": has_alert
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------- BANK MONITORING API -----------
@app.get("/bank-status")
async def bank_status():
    """Returns ALL banks with their latest UPI status from the CSV log."""
    try:
        if not CSV_FILE.exists():
            return {"banks": [], "problematic_banks": [], "last_updated": None}

        df = pd.read_csv(CSV_FILE)
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
        df = df.sort_values("timestamp", ascending=False)
        latest_df = df.drop_duplicates(subset=["bank_name"], keep="first")

        current_time = datetime.now()
        banks = []
        for _, row in latest_df.iterrows():
            upi_raw = str(row.get("upi", "UP")).strip().upper()
            status = "DOWN" if "DOWN" in upi_raw else ("FLUCTUATING" if any(x in upi_raw for x in ["WARN", "FLUCT"]) else "UP")
            icon = "❌" if status == "DOWN" else ("⚠️" if status == "FLUCTUATING" else "✅")
            
            ts = row["timestamp"]
            stale = (current_time - ts).total_seconds() / 60 > 20 if pd.notna(ts) else True
            banks.append({"bank": row["bank_name"], "status": status, "icon": icon, "timestamp": str(ts), "stale": stale})

        # Sort: Issues first
        order = {"DOWN": 0, "FLUCTUATING": 1, "UP": 2}
        banks.sort(key=lambda x: order.get(x["status"], 3))
        
        return {
            "banks": banks,
            "problematic_banks": [b for b in banks if b["status"] != "UP"],
            "last_updated": str(latest_df["timestamp"].max()) if not latest_df.empty else None
        }
    except Exception as e:
        return {"error": str(e)}

@app.post("/bank-predict")
async def bank_predict(req: BankPredictionRequest):
    """Calculates final success rate based on both Network and Bank Server health."""
    status, stale = get_bank_upi_status(req.bank)
    final_score = req.network_score
    status_text = "Online"
    
    if status == "DOWN":
        final_score = 5.0
        status_text = "Down"
    elif status == "FLUCTUATING":
        final_score = req.network_score * 0.4
        status_text = "Fluctuating"

    return {
        "name": req.bank, "status": status_text, "success_rate": "High" if final_score > 80 else ("Moderate" if final_score > 50 else "Low"),
        "final_score": round(final_score, 1)
    }

# ----------- COMMUNITY FEEDBACK & RL -----------
FEEDBACK_FILE = "feedback_data.csv"

def get_all_feedback():
    if not os.path.exists(FEEDBACK_FILE): return pd.DataFrame()
    try:
        df = pd.read_csv(FEEDBACK_FILE)
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
        return df.dropna(subset=['timestamp'])
    except: return pd.DataFrame()

def check_nearby_failures(lat, lon, radius_km=2.0):
    try:
        df = get_all_feedback()
        if df.empty: return False
        
        # 30-minute window
        threshold = datetime.now() - timedelta(minutes=30)
        recent_failed = df[(df['outcome'] == 'failed')]
        
        # Filter by time separately to debug
        recent_failed['timestamp'] = pd.to_datetime(recent_failed['timestamp'])
        recent_failed = recent_failed[recent_failed['timestamp'] >= threshold]
        
        print(f"🔍 DEBUG: Checking alerts near {lat}, {lon}")
        print(f"🔍 DEBUG: Recent failures in last 30 mins: {len(recent_failed)}")
        
        for i, row in recent_failed.iterrows():
            # Robust Euclidean distance approximation
            d_lat = float(row['lat']) - lat
            d_lon = (float(row['lon']) - lon) * np.cos(np.radians(lat))
            dist = (d_lat**2 + d_lon**2)**0.5 * 111.32
            
            print(f"   -> Found failure at {row['lat']}, {row['lon']} (Dist: {dist:.3f} km)")
            
            if dist <= radius_km: 
                print("🚨 ALERT TRIGGERED!")
                return True
        return False
    except Exception as e:
        print(f"Community Alert Error: {e}")
        return False

@app.post("/feedback")
async def submit_feedback(req: FeedbackRequest):
    record = req.dict()
    record["timestamp"] = datetime.now().isoformat()
    file_exists = os.path.exists(FEEDBACK_FILE)
    pd.DataFrame([record]).to_csv(FEEDBACK_FILE, mode='a', index=False, header=not file_exists)
    return {"status": "recorded"}

# ----------- FRONTEND -----------
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="static")

# ----------- RUN -----------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)