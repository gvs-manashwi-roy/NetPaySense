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
import math
from datetime import datetime, timedelta, timezone
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
    """Start background tasks when the app starts."""
    print("STARTING BACKGROUND SCHEDULER (Cleanup Task Only)...")
    try:
        scheduler = BackgroundScheduler()
        # DECOUPLED: fetch_bank_health is now run via GitHub Actions to bypass Cloudflare
        # scheduler.add_job(fetch_bank_health, 'interval', minutes=15)
        scheduler.add_job(clean_old_data, 'interval', hours=24)
        scheduler.start()
        print("BACKGROUND SCHEDULER STARTED.")
    except Exception as e:
        print(f"FAILED TO START SCHEDULER: {e}")
    
    # DECOUPLED: First scrape is handled by GitHub Actions
    # threading.Thread(target=fetch_bank_health, daemon=True).start()

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
    is_live: bool = False # Flag for live GPS sessions

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
    is_live: bool = False

# ----------- SPEEDTEST SERVICE (TRIANGULATION) -----------
class SpeedtestService:
    def __init__(self):
        self.cache = {} # (lat, lon) -> transit_latency
        self.lock = threading.Lock()

    def get_transit_latency(self, lat: float, lon: float) -> float:
        """Calculates latency from Cloud Server to User's Region."""
        # Cache key: round to nearest degree to group regional latencies (~111km)
        key = (round(lat), round(lon))
        with self.lock:
            if key in self.cache:
                return self.cache[key]

        try:
            # High-Precision TCP Handshake to AWS Mumbai (ap-south-1)
            import socket
            import time
            
            # AWS Mumbai (ap-south-1) Public IP range sample
            target_ip = "15.206.0.1" 
            
            # Warm-up (ensures DNS/Routing is ready)
            try:
                s = socket.create_connection((target_ip, 80), timeout=1.0)
                s.close()
            except: pass

            # Real Measurement
            start = time.perf_counter()
            try:
                s = socket.create_connection((target_ip, 80), timeout=1.0)
                s.close()
                transit_latency = (time.perf_counter() - start) * 1000
            except:
                transit_latency = 0

            print(f"TRIANGULATION: Cloud -> India Transit (TCP): {transit_latency:.1f}ms")

            with self.lock:
                self.cache[key] = transit_latency
            return transit_latency
        except Exception as e:
            print(f"Transit measurement failed: {e}")
            return 0

            with self.lock:
                self.cache[key] = transit_latency
            return transit_latency
        except Exception as e:
            print(f"Speedtest triangulation failed: {e}")
            return 0

speed_service = SpeedtestService()

# ----------- UI LOGIC -----------
def get_ui_data(quality_score, upi_score, community_alert=False, is_triangulated=False):
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
        from datetime import datetime, timedelta, timezone
        now_str = datetime.now().strftime("%H:%M:%S")
        
        # Add a star if we successfully used triangulation for a better score
        prefix = "✨ " if is_triangulated else "🚀 "
        upi_label = f"{prefix}{now_str} - {upi_score:.1f}%"
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
        is_triangulated = False
        jitter_val = 0
        loss_val = 0
        
        if req.live_metrics:
            # --- LATENCY SELECTION (FIX FOR REMOTE SERVERS) ---
            # Prioritize TRUE local edge latency if sent by the client
            local_lat = req.live_metrics.get('local_latency', 0)
            raw_lat = req.live_metrics.get('latency', lat)
            
            if local_lat > 0:
                lat = local_lat
                is_triangulated = True
                print(f"EDGE PING: Local {lat}ms | Backend {raw_lat}ms")
            else:
                # Step 1: Calculate "Cloud Transit Time" (HF -> User's Region)
                transit_time = await asyncio.to_thread(speed_service.get_transit_latency, req.lat, req.lon)
                
                # Step 2: Correct the user's latency
                if transit_time > 0 and raw_lat > transit_time:
                    lat = max(5.0, raw_lat - transit_time)
                    is_triangulated = True
                else:
                    lat = raw_lat

            dn = req.live_metrics.get('download', dn)
            up = req.live_metrics.get('upload', up)
            jitter_val = req.live_metrics.get('jitter', 0)
            loss_val = req.live_metrics.get('packet_loss', 0)
            live_operator = req.live_metrics.get('operator')
            is_verified = True

        m1_features = pd.DataFrame([[
            dn, up, lat,
            authentic_lat, authentic_lon
        ]], columns=['download_mbps', 'upload_mbps', 'latency_ms', 'lat', 'lon'])
        m1_scaled = ookla_scaler.transform(m1_features)

        with torch.no_grad():
            m1_out = ookla_model(torch.tensor(m1_scaled, dtype=torch.float32))
            model_tier = torch.argmax(m1_out, dim=1).item() # 0 (Poor), 1 (Mid), 2 (Good)

        # --- PHYSICS-BASED UPI SUCCESS RATE (SMOOTH CURVES) ---
        # A UPI transaction is ~50KB. Failure causes:
        #   1. HIGH LATENCY  → RTT exceeds NPCI's 8s window
        #   2. LOW UPLOAD    → Payment request stalls at bank
        #   3. JITTER        → RTO variance causes retransmission bursts
        #   4. PACKET LOSS   → Fatal for short TCP flows (cost ∝ RTT)
        BASE_RATE = 96.0

        # 0. EFFECTIVE LATENCY (Spike Awareness)
        # Real failures come from worst-case latency spikes, not averages.
        # We use a weighted blend: 70% average + 30% p95 to capture intermittent stalls.
        p95_lat = float(req.live_metrics.get("p95_latency", lat)) if req.live_metrics else lat
        effective_lat = 0.7 * lat + 0.3 * p95_lat

        # 1. LATENCY PENALTY (Exponential Curve on effective_lat)
        # Curve saturates at ~40 penalty points, reflecting short-flow timeout risk.
        lat_penalty = 0 if effective_lat <= 60 else 40 * (1 - np.exp(-(effective_lat - 60) / 120))

        # 2. UPLOAD/DOWNLOAD PENALTIES (Logarithmic Floor)
        # UPI cares about minimum viable throughput, not ceiling speeds.
        up_penalty = max(0, 15 * (1 - np.log10(max(0.1, up))))
        dn_penalty = max(0, 8 * (1 - np.log10(max(0.1, dn))))

        # 3. STABILITY PENALTY (Jitter scaled by Packet Loss)
        # Jitter without packet loss mostly causes harmless delay.
        # Jitter WITH packet loss causes fatal TCP RTO timeouts.
        if loss_val < 0.1:
            jitter_effect = 0.4   # reduced but not ignored
        elif loss_val < 1.0:
            jitter_effect = 0.7
        else:
            jitter_effect = 1.0   # full effect

        jitter_penalty = jitter_effect * (35 * (1 - np.exp(-jitter_val / 40)))

        # 4. PACKET LOSS PENALTY (Reduced Coefficient + Capped Multiplier)
        # Multiplier is capped at 1.75x to prevent extreme penalties in moderate conditions.
        # (e.g., 2% loss @ 150ms was previously > 100pt penalty — now corrected)
        loss_base = 55 * (1 - np.exp(-loss_val * 1.2))
        loss_penalty = loss_base * min(1.75, (1 + (effective_lat / 200)))

        # 5. JITTER-PROPORTIONAL NOISE (Realism with Boundary Guard)
        # Noise is clamped to ±3 so it can never flip a tier category on its own.
        noise = np.clip(np.random.normal(0, max(0.5, jitter_val * 0.05)), -3, 3)

        upi_score = BASE_RATE - lat_penalty - up_penalty - dn_penalty - jitter_penalty - loss_penalty + noise
        # --- ML MODEL BLENDING ---
        # The ML model (trained on historical data) acts as a reality check on the physics.
        phys_tier = 2 if upi_score >= 75 else 1 if upi_score >= 40 else 0
        tier_diff = model_tier - phys_tier

        if tier_diff < 0:
            # Model is MORE PESSIMISTIC (e.g., Physics=Good, Model=Poor)
            # High penalty (-15 pts per tier drop) because the model recognizes a historical dead-zone.
            upi_score += (tier_diff * 15)
        elif tier_diff > 0:
            # Model is MORE OPTIMISTIC (e.g., Physics=Poor, Model=Good)
            # Small boost (+5 pts per tier jump) giving benefit of the doubt to trained history.
            upi_score += (tier_diff * 5)

        upi_score = max(5.0, min(99.8, upi_score))

        # Derive final UI tier FROM the blended score (prevents gauge/text contradictions)
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

        # --- Parallelized Backend Checks ---
        async def mock_bank_status(): return None, None
        
        # 1. Community Check
        alert_task = asyncio.to_thread(check_nearby_failures, req.lat, req.lon)
        # 2. Tower Detection
        tower_task = asyncio.to_thread(tower.find_nearest_tower, req.lat, req.lon, OPENCELL_API_KEY) if OPENCELL_API_KEY else asyncio.sleep(0)
        # 3. Bank Status
        bank_task = asyncio.to_thread(get_bank_upi_status, req.bank_name) if req.bank_name else mock_bank_status()

        # Gather all tasks
        results = await asyncio.gather(alert_task, tower_task, bank_task)
        has_alert = results[0]
        nearest_tower_data = results[1] if OPENCELL_API_KEY else {}
        status, stale = results[2]

        ui_data = get_ui_data(final_quality, upi_score, has_alert, is_triangulated)
        best_operator = nearest_tower_data.get("operator", "Unknown") if nearest_tower_data else "Unknown"

        # 3. Bank Status Override
        bank_warning = None
        if req.bank_name and status:
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

        response_data = {
            "lat": authentic_lat, "lon": authentic_lon, "tier": ui_data["tier"],
            "better_location": {"lat": better_lat, "lon": better_lon},
            "bars": ui_data["bars"], "dbm": ui_data["dbm"], "label": ui_data["label"],
            "upi": ui_data["upi"], "badge": ui_data["badge"], "type": ui_data["type"],
            "recommendation": ui_data["rec"], "confidence": f"{(final_quality + 1) * 30}%", 
            "best_network": best_operator if best_operator != "Unknown" else (live_operator or "Airtel / Jio"),
            "bank_warning": bank_warning,
            "server_version": "v5.2.1",
            "metrics": { 
                "download": f"{dn:.2f} Mbps", 
                "upload": f"{up:.2f} Mbps",
                "latency": f"{lat:.1f} ms",
                "jitter": f"{jitter_val:.1f} ms",
                "packet_loss": f"{loss_val:.1f}%",
                "is_verified": is_verified,
                "operator": live_operator or best_operator,  # 🟢 Badge shows current SIM (fallback to tower)
                "tower_count": nearest_tower_data.get("total_towers_found", 0),
                "is_triangulated": is_triangulated
            },
            "community_alert": has_alert
        }
        # Removed verbose metrics print to keep logs clean
        return response_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------- BANK MONITORING API -----------
@app.get("/pulse-test")
async def pulse_test():
    """Runs a real-time speed test on the SERVER (Hugging Face)."""
    def run_speedtest():
        st = speedtest.Speedtest()
        st.get_best_server()
        ping = st.results.ping
        dn = st.download() / 1000000 # Mbps
        up = st.upload() / 1000000 # Mbps
        isp = st.results.client.get('isp', 'Unknown')
        return {
            "download": round(dn, 2),
            "upload": round(up, 2),
            "latency": round(ping, 1),
            "operator": isp
        }
    try: return await asyncio.to_thread(run_speedtest)
    except: return {"error": "Speedtest failed."}

# ----------- CLIENT SPEED TEST ENDPOINTS -----------

@app.api_route("/test-download", methods=["GET", "HEAD"])
async def test_download():
    """Endpoint for the client to measure download speed."""
    from fastapi.responses import Response
    # 4MB of random data (increased for better high-speed accuracy)
    data = os.urandom(4 * 1024 * 1024)
    return Response(content=data, media_type="application/octet-stream")

@app.post("/test-upload")
async def test_upload(request: Request):
    """Endpoint for the client to measure upload speed."""
    body = await request.body()
    return {"size_received": len(body), "status": "ok"}

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

    # Dynamic Operator Check (OpenCellID)
    nearest_tower_data = tower.find_nearest_tower(req.lat, req.lon, OPENCELL_API_KEY) if OPENCELL_API_KEY else {}
    best_op = nearest_tower_data.get("operator", "Unknown")

    return {
        "name": req.bank, 
        "status": status_text, 
        "success_rate": "High" if final_score > 80 else ("Moderate" if final_score > 50 else "Low"),
        "final_score": round(final_score, 1),
        "is_stale": stale,
        "best_network": best_op,
        "operator": best_op
    }

# ----------- SUPABASE CLIENT -----------
_supabase_url = os.getenv("SUPABASE_URL", "")
_supabase_key = os.getenv("SUPABASE_KEY", "")

try:
    if _supabase_url and _supabase_key and not _supabase_url.startswith("https://your"):
        supabase: Client = create_client(_supabase_url, _supabase_key)
    else:
        supabase = None
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
            .select("lat, lon, outcome, timestamp")
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
        metrics = req.metrics or {}
        
        def parse_float(val):
            if val is None: return None
            if not isinstance(val, str): return float(val)
            import re
            match = re.search(r"[\d.]+", val)
            return float(match.group()) if match else None

        record = {
            "lat":      req.lat,
            "lon":      req.lon,
            "outcome":  req.outcome,
            "latency":  parse_float(metrics.get("latency")),
            "download": parse_float(metrics.get("download")),
            "upload":   parse_float(metrics.get("upload")),
            "jitter":   parse_float(metrics.get("jitter")),
            "packet_loss": parse_float(metrics.get("packet_loss")),
            "operator": metrics.get("operator", "Unknown"),
            "is_triangulated": metrics.get("is_triangulated", False),
            "is_live":  req.is_live,
            "timestamp": datetime.now(timezone(timedelta(hours=5, minutes=30))).strftime('%Y-%m-%d %H:%M:%S'),
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