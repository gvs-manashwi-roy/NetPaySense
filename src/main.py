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
from datetime import datetime, timedelta
import pandas as pd
import numpy as np
import geopandas as gpd
from shapely.geometry import Point
from scipy.spatial import KDTree
from pathlib import Path

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

gdf = gpd.read_file(DATA_PATH / "IndiaStatesBoundaryShapes/India_State_Boundary.shp")

gdf = gdf.to_crs(epsg=4326) #  converts the format to latitude and longitude

karnataka = gdf[gdf["STATE"] == "KARNATAKA"]

def isInKarnataka(lat: float, lon: float) -> bool:
    point = Point(lon, lat)
    return karnataka.geometry.contains(point).any()

# ----------- NEW: OPERATOR PERFORMANCE -----------
def get_operator_performance(lat, lon):
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

# ----------- MODEL -----------
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

# Load Model 2
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

class BankPredictionRequest(BaseModel):
    bank: str
    lat: float
    lon: float
    network_score: float = 90.0 # Fallback if not provided

class FeedbackRequest(BaseModel):
    lat: float
    lon: float
    outcome: str # success, failed, pending
    metrics: dict

# ----------- UI LOGIC -----------
def get_ui_data(quality_score):
    if quality_score == 2:
        return {
            "tier": "good",
            "bars": 5,
            "dbm": -65,
            "label": "Excellent Signal",
            "upi": "High – 92%",
            "badge": "Low Risk",
            "rec": "Safe to proceed with UPI",
            "type": "5G"
        }
    elif quality_score == 1:
        return {
            "tier": "mid",
            "bars": 3,
            "dbm": -88,
            "label": "Moderate Signal",
            "upi": "Medium – 64%",
            "badge": "Medium Risk",
            "rec": "Wait or use Cash backup",
            "type": "4G"
        }
    else:
        return {
            "tier": "poor",
            "bars": 1,
            "dbm": -110,
            "label": "Poor Signal",
            "upi": "Low – 24%",
            "badge": "High Risk",
            "rec": "Carry Cash - Likely to fail",
            "type": "4G"
        }

# ----------- MAIN API -----------
@app.post("/predict")
async def predict(req: PredictionRequest):

    if not isInKarnataka(req.lat, req.lon):
        return JSONResponse(status_code=403, content={
            "status": "out_of_range",
            "message": "We are currently available just for Karnataka.",
            "recommendation": "Enter a valid Karnataka location."
        })

    try:
        # KDTree nearest lookup
        dist, idx = tree.query([req.lat, req.lon])
        nearest = look_up_df.iloc[idx]

        authentic_lat = float(nearest['lat'])
        authentic_lon = float(nearest['lon'])

        # Model 1
        m1_features = pd.DataFrame([[
            nearest['download_mbps'],
            nearest['upload_mbps'],
            nearest['latency_ms'],
            authentic_lat,
            authentic_lon
        ]], columns=['download_mbps', 'upload_mbps', 'latency_ms', 'lat', 'lon'])
        m1_scaled = ookla_scaler.transform(m1_features)

        with torch.no_grad():
            m1_out = ookla_model(torch.tensor(m1_scaled, dtype=torch.float32))
            m1_quality = torch.argmax(m1_out, dim=1).item()

        # Model 2
        if req.rsrp is not None and req.rsrq is not None:
            m2_features = np.array([[req.rsrp, req.rsrq, req.snr or 0, req.cqi or 10, req.dbm or -90]])
            m2_quality = signal_model.predict(m2_features)[0]
            final_quality = min(m1_quality, m2_quality)
        else:
            final_quality = m1_quality
            m2_quality = None

        # ----------- NEW FEATURE -----------
        operators = get_operator_performance(req.lat, req.lon)
        best_operator = suggest_best_operator(operators)

        ui_data = get_ui_data(final_quality)

        return {
            "lat": authentic_lat,
            "lon": authentic_lon,
            "tier": ui_data["tier"],
            "bars": ui_data["bars"],
            "dbm": ui_data["dbm"],
            "label": ui_data["label"],
            "upi": ui_data["upi"],
            "badge": ui_data["badge"],
            "type": ui_data["type"],
            "recommendation": ui_data["rec"],
            "confidence": f"{(final_quality + 1) * 30}%", 
            "best_network": best_operator,
            "network_quality": {
                "ookla": ["Poor", "Moderate", "Good"][m1_quality],
                "signal": ["Poor", "Moderate", "Good"][m2_quality] if m2_quality is not None else "N/A"
            },
            "metrics": {
                "download": f"{nearest['download_mbps']:.2f} Mbps",
                "latency": f"{nearest['latency_ms']:.1f} ms"
            },
            "community_alert": check_nearby_failures(authentic_lat, authentic_lon)
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------- BANK STATUS -----------
@app.get("/banks")
async def get_banks():
    return {
        "SBI": {"name": "SBI", "status": "Online", "up": 99.8, "latency": 45},
        "HDFC": {"name": "HDFC", "status": "Online", "up": 99.9, "latency": 32},
        "ICICI": {"name": "ICICI", "status": "Slow", "up": 97.5, "latency": 450},
        "AXIS": {"name": "Axis", "status": "Online", "up": 99.2, "latency": 68},
        "PNB": {"name": "PNB", "status": "Offline", "up": 0.0, "latency": 0},
        "Other": {"name": "Other", "status": "Online", "up": 99.0, "latency": 50}
    }

# ----------- BANK PREDICTION (COMBINED LOGIC) -----------
@app.post("/bank-predict")
async def bank_predict(req: BankPredictionRequest):
    # Simulated Bank State (In the future, you'll fetch this live)
    # We'll use a simple mock mapping for testing different states
    bank_states = {
        "SBI": "UP",
        "HDFC": "FLUCTUATING",
        "ICICI": "DOWN",
        "AXIS": "UP",
        "PNB": "DOWN"
    }
    
    state = bank_states.get(req.bank, "UP")
    final_score = 0.0
    status_text = "Online"
    success_label = "High"

    if state == "UP":
        # Depends entirely on network
        final_score = req.network_score
        status_text = "Online"
    elif state == "FLUCTUATING":
        # Reduce network score by 40%
        final_score = req.network_score * 0.6
        status_text = "Fluctuating"
    else: # DOWN
        # Forced to high risk
        final_score = 1.5 # 1-2%
        status_text = "Down"

    # Determine label for UI
    if final_score > 80: success_label = "High"
    elif final_score > 50: success_label = "Moderate"
    else: success_label = "Low"

    return {
        "name": req.bank,
        "status": status_text,
        "up": 99.9 if state == "UP" else (60.0 if state == "FLUCTUATING" else 0.0),
        "latency": 45 if state == "UP" else (350 if state == "FLUCTUATING" else 0),
        "success_rate": success_label,
        "final_score": round(final_score, 1)
    }

# ----------- COMMUNITY FEEDBACK & RL -----------
FEEDBACK_FILE = "feedback_data.csv"

def get_all_feedback():
    if not os.path.exists(FEEDBACK_FILE): return []
    try:
        df = pd.read_csv(FEEDBACK_FILE)
        # Convert timestamp strings back to datetime objects for easy math
        df['timestamp'] = pd.to_datetime(df['timestamp'])
        return df
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return pd.DataFrame()

def save_feedback_record(record):
    file_exists = os.path.exists(FEEDBACK_FILE)
    
    # Flatten metrics or store as JSON string for CSV compatibility
    if isinstance(record.get("metrics"), dict):
        record["metrics"] = json.dumps(record["metrics"])
        
    df = pd.DataFrame([record])
    df.to_csv(FEEDBACK_FILE, mode='a', index=False, header=not file_exists)

def check_nearby_failures(lat, lon, radius_km=0.5): # Increased to 500m for testing
    try:
        df = get_all_feedback()
        if df.empty: return False
        
        now = datetime.now()
        failed_df = df[df['outcome'] == 'failed'].copy()
        if failed_df.empty: return False
        
        failed_df['timestamp'] = pd.to_datetime(failed_df['timestamp'], errors='coerce')
        failed_df = failed_df.dropna(subset=['timestamp'])
        
        time_threshold = now - timedelta(minutes=15)
        recent_failed = failed_df[failed_df['timestamp'] >= time_threshold]
        
        print(f"DEBUG: Analyzing {len(recent_failed)} recent failures near ({lat:.4f}, {lon:.4f})")
        
        for _, row in recent_failed.iterrows():
            r_lat, r_lon = float(row['lat']), float(row['lon'])
            dist = ((r_lat - lat)**2 + (r_lon - lon)**2)**0.5 * 111
            
            # Log every check so we can see the gap
            print(f"   > Found failure at ({r_lat:.4f}, {r_lon:.4f}) - Distance: {dist*1000:.1f} meters")
            
            if dist <= radius_km:
                print(f"DEBUG: MATCH FOUND within {radius_km*1000}m!")
                return True
                
        return False
    except Exception as e:
        print(f"COMMUNITY ALERT ERROR: {e}")
        return False

@app.post("/feedback")
async def submit_feedback(req: FeedbackRequest):
    record = req.dict()
    record["timestamp"] = datetime.now().isoformat()
    save_feedback_record(record)
    return {"status": "recorded"}

# ----------- FRONTEND -----------
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="static")

# ----------- RUN -----------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)