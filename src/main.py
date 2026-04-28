from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import torch.nn as nn
import joblib
import pandas as pd
import numpy as np
import geopandas as gpd
from shapely.geometry import Point
from scipy.spatial import KDTree
from pathlib import Path
import tower
import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models"
DATA_PATH = BASE_DIR / "data"
FRONTEND_DIR = BASE_DIR / "Frontend"

OPENCELL_API_KEY = os.getenv("OPENCELL_API_KEY")

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
        # KDTree nearest lookup logic updated for smart map enhancement
        dist, idx = tree.query([req.lat, req.lon])
        nearest = look_up_df.iloc[idx]

        authentic_lat = float(nearest['lat'])
        authentic_lon = float(nearest['lon'])

        # ----------- SMART MAP ENHANCEMENT (ADDED) -----------

        try:
            distances, indices = tree.query([req.lat, req.lon], k=10)

            best_score = -999
            best_data = nearest  # default fallback

            for i in indices:
                row = look_up_df.iloc[i]
                score = row['download_mbps'] - row['latency_ms']

                if score > best_score:
                    best_score = score
                    best_data = row

        # override ONLY if better found
            if best_data is not None:
                nearest = best_data
                authentic_lat = float(nearest['lat'])
                authentic_lon = float(nearest['lon'])

        except Exception as e:
            print("Smart map fallback:", e)

        # Model 1
        m1_features = np.array([[
            nearest['download_mbps'],
            nearest['upload_mbps'],
            nearest['latency_ms'],
            authentic_lat,
            authentic_lon
        ]])
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

        nearest_tower_at_lat_lon = tower.find_nearest_tower(req.lat, req.lon, OPENCELL_API_KEY)
        
        best_operator = nearest_tower_at_lat_lon.get("operator", "No towers available at the location.")

        ui_data = get_ui_data(final_quality)

        return {
            "lat": authentic_lat,
            "lon": authentic_lon,
            "better_location": {
                  "lat": authentic_lat,
                  "lon": authentic_lon
                },  #✅ NEW betterlocation returned as per the smart map enhancement
            "tier": ui_data["tier"],
            "bars": ui_data["bars"],
            "dbm": ui_data["dbm"],
            "label": ui_data["label"],
            "upi": ui_data["upi"],
            "badge": ui_data["badge"],
            "type": ui_data["type"],
            "recommendation": ui_data["rec"],
            "confidence": f"{(final_quality + 1) * 30}%", 
            "best_network": best_operator,   # ✅ NEW
            "network_quality": {
                "ookla": ["Poor", "Moderate", "Good"][m1_quality],
                "signal": ["Poor", "Moderate", "Good"][m2_quality] if m2_quality is not None else "N/A"
            },
            "metrics": {
                "download": f"{nearest['download_mbps']:.2f} Mbps",
                "latency": f"{nearest['latency_ms']:.1f} ms"
            }
            
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

# ----------- FRONTEND -----------
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="static")

# ----------- RUN -----------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)