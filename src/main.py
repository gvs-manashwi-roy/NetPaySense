from dotenv import load_dotenv
load_dotenv()  # Must be first — loads SUPABASE_URL and SUPABASE_KEY from .env

from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torch.nn as nn
import joblib
import os
import json
from supabase import create_client, Client
import threading
import speedtest
from datetime import datetime, timedelta
from typing import Optional, List, Dict
import pandas as pd
import numpy as np
import geopandas as gpd
from shapely.geometry import Point
from scipy.spatial import KDTree
from pathlib import Path
from apscheduler.schedulers.background import BackgroundScheduler

try:
    from .bank_monitor import fetch_bank_health, get_bank_upi_status, get_problematic_banks, clean_old_data, CSV_FILE
except ImportError:
    from bank_monitor import fetch_bank_health, get_bank_upi_status, get_problematic_banks, clean_old_data, CSV_FILE

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
    print(f"SERVER STARTING FROM: {os.path.abspath(__file__)}")
    print(f"FRONTEND ABSOLUTE PATH: {os.path.abspath(FRONTEND_DIR)}")
    clean_old_data() # Run cleanup on startup
    
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
    rsrp: Optional[float] = None
    rsrq: Optional[float] = None
    snr: Optional[float] = None
    cqi: Optional[float] = None
    dbm: Optional[float] = None
    bank_name: Optional[str] = None # User-selected bank
    live_metrics: Optional[Dict] = None # From speedtest-cli pulse check

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
    # Force consistency: The Score is the master
    if community_alert or upi_score < 45:
        tier = "poor"
        badge = "High Risk" if not community_alert else "COMMUNITY DOWNTIME"
        label = "Regional Failures" if community_alert else "Unstable Signal"
        upi_label = f"Low Success - {upi_score:.1f}%"
        rec = "🚨 Multiple payment failures reported here. Use Cash." if community_alert else "Risk of timeout. Carry cash backup."
        bars = 1
    elif upi_score < 75:
        tier = "mid"
        badge = "Medium Risk"
        label = "Stable Connection"
        upi_label = f"Mid Success - {upi_score:.1f}%"
        rec = "Proceed with caution. WiFi preferred."
        bars = 3
    else:
        tier = "good"
        badge = "Low Risk"
        label = "High Performance"
        from datetime import datetime
        now_str = datetime.now().strftime("%H:%M:%S")
        upi_label = f"🚀 {now_str} - {upi_score:.1f}%"
        rec = "Safe to proceed with any UPI amount."
        bars = 5

    return {
        "tier": tier, "bars": bars, "dbm": -88, "label": label,
        "upi": upi_label, "badge": badge, "rec": rec, "type": "4G/5G"
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
        # 1. Hybrid Spatial Lookup
        dist, idx = tree.query([req.lat, req.lon])
        nearest = look_up_df.iloc[idx]
        
        # Initialize better_location fallbacks
        better_lat = float(nearest['lat'])
        better_lon = float(nearest['lon'])

        # ----------- SMART MAP ADDITION (NON-DESTRUCTIVE) -----------
        try:
            distances, indices = tree.query([req.lat, req.lon], k=10)
            best_score = float('-inf')
            best_data = nearest  # fallback

            for i in indices:
                row = look_up_df.iloc[i]
                # scoring logic: High Speed - Low Latency
                score = row['download_mbps'] - row['latency_ms']
                if score > best_score:
                    best_score = score
                    best_data = row

            if best_data is not None:
                better_lat = float(best_data['lat'])
                better_lon = float(best_data['lon'])
        except Exception as e:
            print("Smart map error:", e)
            better_lat = float(nearest['lat'])
            better_lon = float(nearest['lon'])

        dn = nearest['download_mbps']
        up = nearest['upload_mbps']
        lat = nearest['latency_ms']
        
        # If either Download or Upload is "Suspect", we trust the risk immediately.
        # This prevents hiding a "Dead Upload Zone" like Muthodi.
        if dn > 15.0 and up > 2.0: 
            dists_k, indices_k = tree.query([req.lat, req.lon], k=5)
            neighbors = look_up_df.iloc[indices_k]
            dn = neighbors['download_mbps'].mean()
            up = neighbors['upload_mbps'].mean()
            lat = neighbors['latency_ms'].mean()
        
        # Use the very nearest coordinates for display
        authentic_lat = float(nearest['lat'])
        authentic_lon = float(nearest['lon'])

        # 2. Network Quality Models
        is_verified = False
        live_operator = None
        if req.live_metrics:
            dn = req.live_metrics.get('download', dn)
            up = req.live_metrics.get('upload', up)
            lat = req.live_metrics.get('latency', lat)
            live_operator = req.live_metrics.get('operator')
            is_verified = True

        m1_features = pd.DataFrame([[
            dn, up, lat,
            authentic_lat, authentic_lon
        ]], columns=['download_mbps', 'upload_mbps', 'latency_ms', 'lat', 'lon'])
        m1_scaled = ookla_scaler.transform(m1_features)

        with torch.no_grad():
            m1_out = ookla_model(torch.tensor(m1_scaled, dtype=torch.float32))
            # Neural net still used for its trained feature understanding,
            # but UPI score is now calculated from first principles below.
            _ = torch.argmax(m1_out, dim=1).item()

        # --- Physics-Based UPI Success Rate ---
        # A UPI transaction is ~50KB of data. What causes failures:
        #   1. HIGH LATENCY  → round-trip exceeds UPI's timeout window (~30s)
        #   2. LOW UPLOAD    → payment request never fully reaches the bank server
        #   3. LOW DOWNLOAD  → minor, only affects receiving the small confirmation
        BASE_RATE = 95.0

        # LATENCY PENALTY — most critical factor
        if lat < 50:
            lat_penalty = 0       # Excellent: sub-50ms feels instant
        elif lat < 100:
            lat_penalty = 15      # Acceptable: slight delay but usually succeeds
        elif lat < 150:
            lat_penalty = 35      # Risky: approaching timeout range for slow banks
        elif lat < 200:
            lat_penalty = 55      # High failure risk
        else:
            lat_penalty = 75      # Near-certain timeout

        # UPLOAD PENALTY — second most critical
        if up >= 2.0:
            up_penalty = 0        # Sufficient: UPI needs ~50KB, 2Mbps handles it easily
        elif up >= 1.0:
            up_penalty = 8        # Marginal but usually fine
        elif up >= 0.5:
            up_penalty = 25       # Risky: large payloads may stall
        else:
            up_penalty = 60       # Critical: payment request unlikely to complete

        # DOWNLOAD PENALTY — minor, only receiving small confirmation ACK
        if dn >= 2.0:
            dn_penalty = 0
        elif dn >= 0.5:
            dn_penalty = 5
        else:
            dn_penalty = 12

        # Small jitter for realism (real networks fluctuate ±2%)
        jitter = (np.random.random() - 0.5) * 4.0

        upi_score = BASE_RATE - lat_penalty - up_penalty - dn_penalty + jitter
        upi_score = max(5.0, min(99.8, upi_score))

        # Derive tier FROM the UPI score (prevents gauge/score contradictions)
        if upi_score >= 75:
            m1_quality = 2  # Good
        elif upi_score >= 40:
            m1_quality = 1  # Mid
        else:
            m1_quality = 0  # Poor

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
                ui_data["tier"] = "mid"
                ui_data["badge"] = "Medium Risk (Bank Fluctuating)"
                ui_data["upi"] = "Mid Success - 45-60%"
                ui_data["rec"] = f"Warning: {req.bank_name} servers are unstable. Proceed with caution."
                bank_warning = f"{req.bank_name} servers are fluctuating."

        return {
            "lat": authentic_lat, "lon": authentic_lon, "tier": ui_data["tier"],
            "better_location": {"lat": better_lat, "lon": better_lon}, # return betterlocation for map pin in frontend
            "bars": ui_data["bars"], "dbm": ui_data["dbm"], "label": ui_data["label"],
            "upi": ui_data["upi"], "badge": ui_data["badge"], "type": ui_data["type"],
            "recommendation": ui_data["rec"], "confidence": f"{(final_quality + 1) * 30}%", 
            "best_network": live_operator or best_operator, "bank_warning": bank_warning,
            "server_version": "v4.1",
            "metrics": { 
                "download": f"{dn:.2f} Mbps", 
                "upload": f"{up:.2f} Mbps",
                "latency": f"{lat:.1f} ms",
                "is_verified": is_verified,
                "operator": live_operator or best_operator
            },
            "community_alert": has_alert
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------- BANK MONITORING API -----------
@app.get("/pulse-test")
async def pulse_test():
    """Runs a real-time speed test (Ping, Download, Upload, Operator)."""
    try:
        st = speedtest.Speedtest()
        st.get_best_server()
        
        ping = st.results.ping
        # Perform download/upload tests
        dn = st.download() / 1000000 # Mbps
        up = st.upload() / 1000000 # Mbps
        isp = st.results.client['isp']
        
        return {
            "download": round(dn, 2),
            "upload": round(up, 2),
            "latency": round(ping, 1),
            "operator": isp
        }
    except Exception as e:
        print(f"Speedtest Error: {e}")
        return {"error": "Speedtest failed. Using historical data instead."}

@app.get("/bank-status")
async def bank_status():
    """Returns ALL banks with their latest UPI status from Supabase."""
    try:
        if not supabase:
            return {"banks": [], "problematic_banks": [], "last_updated": None}

        # Get records from the last 2 hours
        cutoff = (datetime.now() - timedelta(hours=2)).isoformat()
        response = (
            supabase.table("bank_health")
            .select("bank_name, upi, timestamp")
            .gte("timestamp", cutoff)
            .order("timestamp", desc=True)
            .execute()
        )
        
        if not response.data:
            return {"banks": [], "problematic_banks": [], "last_updated": None}

        df = pd.DataFrame(response.data)
        df['timestamp'] = pd.to_datetime(df['timestamp']).dt.tz_localize(None)
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

# ----------- SUPABASE CLIENT -----------
_supabase_url = os.getenv("SUPABASE_URL", "")
_supabase_key = os.getenv("SUPABASE_KEY", "")

print(f"DEBUG: SUPABASE_URL set: {bool(_supabase_url)}")
print(f"DEBUG: SUPABASE_KEY set: {bool(_supabase_key)}")

try:
    if _supabase_url and _supabase_key and not _supabase_url.startswith("https://your"):
        supabase: Client = create_client(_supabase_url, _supabase_key)
        print("Supabase connected.")
    else:
        supabase = None
        print("Supabase credentials not set - feedback will be disabled. Fill in .env file.")
except Exception as e:
    print(f"Supabase Connection Error: {e}")
    supabase = None

# ----------- COMMUNITY FEEDBACK & RL -----------

def get_all_feedback() -> pd.DataFrame:
    """Fetch recent feedback rows from Supabase."""
    if supabase is None:
        return pd.DataFrame()
    try:
        # Fetch rows from last 24 hours to keep query fast
        threshold = (datetime.now() - timedelta(hours=24)).isoformat()
        response = (
            supabase.table("feedback")
            .select("lat, lon, outcome, metrics, timestamp")
            .gte("timestamp", threshold)
            .execute()
        )
        rows = response.data
        if not rows:
            return pd.DataFrame()
        df = pd.DataFrame(rows)
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce', utc=True)
        df['timestamp'] = df['timestamp'].dt.tz_localize(None)  # strip tz for comparison
        return df.dropna(subset=['timestamp'])
    except Exception as e:
        print(f"Supabase fetch error: {e}")
        return pd.DataFrame()

def check_nearby_failures(lat, lon, radius_km=2.0):
    try:
        df = get_all_feedback()
        if df.empty: return False

        # 30-minute window
        threshold = datetime.now() - timedelta(minutes=30)
        recent_failed = df[df['outcome'] == 'failed'].copy()
        recent_failed = recent_failed[recent_failed['timestamp'] >= threshold]

        print(f"DEBUG: Checking alerts near {lat}, {lon}")
        print(f"DEBUG: Recent failures in last 30 mins: {len(recent_failed)}")

        nearby_count = 0
        for _, row in recent_failed.iterrows():
            d_lat = float(row['lat']) - lat
            d_lon = (float(row['lon']) - lon) * np.cos(np.radians(lat))
            dist = (d_lat**2 + d_lon**2)**0.5 * 111.32
            print(f"   -> Found failure at {row['lat']}, {row['lon']} (Dist: {dist:.3f} km)")
            if dist <= radius_km:
                nearby_count += 1

        # Require at least 5 nearby failures to avoid false alerts from single reports
        if nearby_count >= 5:
            print(f"COMMUNITY ALERT TRIGGERED! ({nearby_count} failures nearby)")
            return True

        print(f"No alert — only {nearby_count} nearby failure(s) (need 5+)")
        return False
    except Exception as e:
        print(f"Community Alert Error: {e}")
        return False

@app.post("/feedback")
async def submit_feedback(req: FeedbackRequest):
    """Store user feedback in Supabase."""
    if supabase is None:
        raise HTTPException(status_code=503, detail="Feedback storage not configured. Set SUPABASE_URL and SUPABASE_KEY in .env")
    try:
        record = {
            "lat":      req.lat,
            "lon":      req.lon,
            "outcome":  req.outcome,
            "metrics":  req.metrics,   # stored as JSONB
            "timestamp": datetime.now().isoformat(),
        }
        supabase.table("feedback").insert(record).execute()
        return {"status": "recorded"}
    except Exception as e:
        print(f"Supabase insert error: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to save feedback: {e}")

# ----------- FRONTEND -----------
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="static")

# ----------- RUN -----------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)