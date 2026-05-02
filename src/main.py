from dotenv import load_dotenv
load_dotenv()  # Must be first — loads SUPABASE_URL and SUPABASE_KEY from .env

from fastapi import FastAPI, HTTPException, Request
try:
    from . import tower
except ImportError:
    import tower
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
import asyncio
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

OPENCELL_API_KEY = os.getenv("OPENCELL_API_KEY")

app = FastAPI(title="🛰️ NetPaySense: AI-Powered UPI Reliability Checker (v4.3 Pro)")

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
    clean_old_data() # Run cleanup on startup
    
    # Start the background tasks
    scheduler = BackgroundScheduler(daemon=True)
    scheduler.add_job(fetch_bank_health, 'interval', minutes=5)
    scheduler.add_job(clean_old_data, 'interval', hours=12) # 🔥 Cleanup every 12 hours
    scheduler.start()
    
    # Run the first scrape immediately in a separate thread so it doesn't block API startup
    threading.Thread(target=fetch_bank_health, daemon=True).start()

# Load Karnataka Boundary
gdf = gpd.read_file(DATA_PATH / "IndiaStatesBoundaryShapes/India_State_Boundary.shp")
gdf = gdf.to_crs(epsg=4326) # converts to lat/lon
karnataka = gdf[gdf["STATE"] == "KARNATAKA"]

def isInKarnataka(lat: float, lon: float) -> bool:
    point = Point(lon, lat)
    return karnataka.geometry.contains(point).any()

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
ookla_model.load_state_dict(torch.load(MODEL_PATH / 'ookla_nn.pth', weights_only=True))
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
        dist, idx = tree.query([req.lat, req.lon])
        nearest = look_up_df.iloc[idx]
        
        better_lat, better_lon = float(nearest['lat']), float(nearest['lon'])

        try:
            distances, indices = tree.query([req.lat, req.lon], k=10)
            best_score = float('-inf')
            for i in indices:
                row = look_up_df.iloc[i]
                score = row['download_mbps'] - row['latency_ms']
                if score > best_score:
                    best_score = score
                    better_lat, better_lon = float(row['lat']), float(row['lon'])
        except: pass

        dn, up, lat = nearest['download_mbps'], nearest['upload_mbps'], nearest['latency_ms']
        
        if dn > 15.0 and up > 2.0: 
            dists_k, indices_k = tree.query([req.lat, req.lon], k=5)
            neighbors = look_up_df.iloc[indices_k]
            dn, up, lat = neighbors['download_mbps'].mean(), neighbors['upload_mbps'].mean(), neighbors['latency_ms'].mean()
        
        authentic_lat, authentic_lon = float(nearest['lat']), float(nearest['lon'])

        is_verified = False
        live_operator = None
        if req.live_metrics:
            dn, up, lat = req.live_metrics.get('download', dn), req.live_metrics.get('upload', up), req.live_metrics.get('latency', lat)
            live_operator, is_verified = req.live_metrics.get('operator'), True

        # --- Physics-Based UPI Success Rate ---
        BASE_RATE = 95.0
        lat_penalty = 0 if lat < 50 else (15 if lat < 100 else (35 if lat < 150 else (55 if lat < 200 else 75)))
        up_penalty = 0 if up >= 2.0 else (8 if up >= 1.0 else (25 if up >= 0.5 else 60))
        dn_penalty = 0 if dn >= 2.0 else (5 if dn >= 0.5 else 12)

        jitter = (np.random.random() - 0.5) * 4.0
        upi_score = max(5.0, min(99.8, BASE_RATE - lat_penalty - up_penalty - dn_penalty + jitter))

        m1_quality = 2 if upi_score >= 75 else (1 if upi_score >= 40 else 0)

        if req.rsrp is not None and req.rsrq is not None:
            m2_features = np.array([[req.rsrp, req.rsrq, req.snr or 0, req.cqi or 10, req.dbm or -90]])
            m2_quality = signal_model.predict(m2_features)[0]
            final_quality = min(m1_quality, m2_quality)
            if m2_quality < m1_quality: upi_score *= 0.8 if m2_quality == 1 else 0.4
        else:
            final_quality = m1_quality

        # --- Parallelized Backend Checks ---
        async def mock_bank_status(): return None, None
        alert_task = asyncio.to_thread(check_nearby_failures, req.lat, req.lon)
        tower_task = asyncio.to_thread(tower.find_nearest_tower, req.lat, req.lon, OPENCELL_API_KEY) if OPENCELL_API_KEY else asyncio.sleep(0)
        bank_task = asyncio.to_thread(get_bank_upi_status, req.bank_name) if req.bank_name else mock_bank_status()

        results = await asyncio.gather(alert_task, tower_task, bank_task)
        has_alert, nearest_tower_data, (status, stale) = results[0], (results[1] if OPENCELL_API_KEY else {}), results[2]

        ui_data = get_ui_data(final_quality, upi_score, has_alert)
        best_operator = nearest_tower_data.get("operator", "Unknown") if nearest_tower_data else "Unknown"

        # 🔥 Fallback: If no tower found, default to most likely operators for Karnataka
        if not best_operator or best_operator == "Unknown":
            best_operator = "Jio / Airtel"

        bank_warning = None
        if req.bank_name and status:
            if status == "DOWN":
                ui_data.update({"tier": "poor", "badge": "CRITICAL RISK", "upi": "Near 0% - Server Down", "rec": f"STOP: {req.bank_name} servers are DOWN.", "bank_warning": f"{req.bank_name} offline."})
            elif status == "FLUCTUATING":
                ui_data.update({"tier": "mid", "badge": "Medium Risk", "upi": "Mid Success - 45-60%", "rec": "Bank servers unstable.", "bank_warning": f"{req.bank_name} fluctuating."})

        return {
            "lat": authentic_lat, "lon": authentic_lon, "tier": ui_data["tier"],
            "better_location": {"lat": better_lat, "lon": better_lon},
            "bars": ui_data["bars"], "dbm": ui_data["dbm"], "label": ui_data["label"],
            "upi": ui_data["upi"], "badge": ui_data["badge"], "type": ui_data["type"],
            "recommendation": ui_data["rec"], "confidence": f"{(final_quality + 1) * 30}%", 
            "best_network": best_operator if best_operator != "Unknown" else (live_operator or "Airtel / Jio"),
            "bank_warning": bank_warning, "server_version": "v4.3",
            "metrics": { "download": f"{dn:.2f} Mbps", "upload": f"{up:.2f} Mbps", "latency": f"{lat:.1f} ms", "is_verified": is_verified, "operator": live_operator or best_operator, "tower_count": nearest_tower_data.get("total_towers_found", 0) if nearest_tower_data else 0 },
            "community_alert": has_alert
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------- SUPABASE CLIENT -----------
_supabase_url = os.getenv("SUPABASE_URL", "")
_supabase_key = os.getenv("SUPABASE_KEY", "")
try:
    supabase: Client = create_client(_supabase_url, _supabase_key) if _supabase_url and _supabase_key and not _supabase_url.startswith("https://your") else None
except: supabase = None

# ----------- BANK API -----------
@app.get("/bank-status")
async def bank_status():
    try:
        if not supabase: return {"banks": [], "problematic_banks": [], "last_updated": None}
        cutoff = (datetime.now() - timedelta(hours=2)).isoformat()
        response = supabase.table("bank_health").select("bank_name, upi, timestamp").gte("timestamp", cutoff).order("timestamp", desc=True).execute()
        if not response.data: return {"banks": [], "problematic_banks": [], "last_updated": None}
        df = pd.DataFrame(response.data)
        df['timestamp'] = pd.to_datetime(df['timestamp']).dt.tz_localize(None)
        latest_df = df.drop_duplicates(subset=["bank_name"], keep="first")
        banks = []
        for _, row in latest_df.iterrows():
            upi_raw = str(row.get("upi", "UP")).strip().upper()
            status = "DOWN" if "DOWN" in upi_raw else ("FLUCTUATING" if any(x in upi_raw for x in ["WARN", "FLUCT"]) else "UP")
            banks.append({"bank": row["bank_name"], "status": status, "icon": "❌" if status == "DOWN" else ("⚠️" if status == "FLUCTUATING" else "✅"), "timestamp": str(row["timestamp"]), "stale": (datetime.now() - row["timestamp"]).total_seconds() / 60 > 20})
        banks.sort(key=lambda x: {"DOWN": 0, "FLUCTUATING": 1, "UP": 2}.get(x["status"], 3))
        return {"banks": banks, "problematic_banks": [b for b in banks if b["status"] != "UP"], "last_updated": str(latest_df["timestamp"].max())}
    except Exception as e: return {"error": str(e)}

@app.post("/bank-predict")
async def bank_predict(req: BankPredictionRequest):
    status, stale = get_bank_upi_status(req.bank)
    final_score = req.network_score * (0.4 if status == "FLUCTUATING" else (0.05 if status == "DOWN" else 1.0))
    nearest_tower_data = tower.find_nearest_tower(req.lat, req.lon, OPENCELL_API_KEY) if OPENCELL_API_KEY else {}
    best_op = nearest_tower_data.get("operator", "Unknown") if nearest_tower_data else "Unknown"
    return {"name": req.bank, "status": status or "Online", "success_rate": "High" if final_score > 80 else ("Moderate" if final_score > 50 else "Low"), "final_score": round(final_score, 1), "is_stale": stale, "best_network": best_op, "operator": best_op}

@app.get("/pulse-test")
async def pulse_test():
    def run_speedtest():
        st = speedtest.Speedtest(); st.get_best_server()
        return {"download": round(st.download()/1e6, 2), "upload": round(st.upload()/1e6, 2), "latency": round(st.results.ping, 1), "operator": st.results.client.get('isp', 'Unknown')}
    try: return await asyncio.to_thread(run_speedtest)
    except: return {"error": "Speedtest failed."}

# ----------- FEEDBACK -----------
def get_all_feedback() -> pd.DataFrame:
    if not supabase: return pd.DataFrame()
    try:
        threshold = (datetime.now() - timedelta(hours=24)).isoformat()
        response = supabase.table("feedback").select("lat, lon, outcome, metrics, timestamp").gte("timestamp", threshold).execute()
        if not response.data: return pd.DataFrame()
        df = pd.DataFrame(response.data)
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce', utc=True).dt.tz_localize(None)
        return df.dropna(subset=['timestamp'])
    except: return pd.DataFrame()

def check_nearby_failures(lat, lon, radius_km=2.0):
    try:
        df = get_all_feedback()
        if df.empty: return False
        recent_failed = df[(df['outcome'] == 'failed') & (df['timestamp'] >= datetime.now() - timedelta(minutes=30))]
        if recent_failed.empty: return False
        indices = KDTree(recent_failed[['lat', 'lon']].values).query_ball_point([lat, lon], 0.018)
        return len(indices) >= 5
    except: return False

@app.post("/feedback")
async def submit_feedback(req: FeedbackRequest):
    if not supabase: return {"status": "error", "message": "Supabase not connected"}
    try:
        supabase.table("feedback").insert({"lat": req.lat, "lon": req.lon, "outcome": req.outcome, "metrics": req.metrics, "timestamp": datetime.now().isoformat()}).execute()
        return {"status": "success"}
    except Exception as e: return {"status": "error", "message": str(e)}

app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="static")
