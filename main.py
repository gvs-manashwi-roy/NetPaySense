from fastapi import FastAPI, HTTPException
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

app = FastAPI(title="NetPaySense API")

# Enable CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

gdf = gpd.read_file(
    "./data/India_State_Boundary.shp",
)

print(gdf.columns)
karnataka = gdf[gdf["STATE"] == "Karnataka"]

def isNotInKarnataka(lat: float, lon: float) -> bool:
    point = Point(lon, lat)
    return karnataka.geometry.contains(point).any()

# --- MODELS ---
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

# Load Model 1
ookla_model = OoklaNN(input_size=5)
ookla_model.load_state_dict(torch.load('ookla_nn.pth'))
ookla_model.eval()
ookla_scaler = joblib.load('ookla_scaler.pkl')

# Load Model 2
signal_model = joblib.load('signal_xgb.pkl')

# Load Look-up Data for Model 1 (Nearest Neighbor search)
look_up_df = pd.read_csv("final_dataset.csv")
look_up_df['download_mbps'] = look_up_df['avg_d_kbps'] / 1000
look_up_df['upload_mbps'] = look_up_df['avg_u_kbps'] / 1000
look_up_df['latency_ms'] = look_up_df['avg_lat_ms']
# Drop rows with invalid values for search
look_up_df = look_up_df[(look_up_df['download_mbps'] > 0) & (look_up_df['latency_ms'] > 0)]
# Use Lat/Lon for KDTree
coords = look_up_df[['lat', 'lon']].values
tree = KDTree(coords)

# --- SCHEMAS ---
class PredictionRequest(BaseModel):
    lat: float
    lon: float
    rsrp: float = None
    rsrq: float = None
    snr: float = None
    cqi: float = None
    dbm: float = None

# --- LOGIC ---
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

@app.post("/predict")
async def predict(req: PredictionRequest):
    if not isNotInKarnataka(req.lat, req.lon):
        return {
            "status": "out_of_range",
            "message": "We are currently available just for Karnataka and will soon be expanding.",
            "recommendation": "Please enter a valid location within Karnataka."
        }
    try:
        # 1. Use KDTree to find nearest location metrics for Model 1
        dist, idx = tree.query([req.lat, req.lon])
        nearest = look_up_df.iloc[idx]

        # Authentic location from nearest tile
        authentic_lat = float(nearest['lat'])
        authentic_lon = float(nearest['lon'])

        # Prepare Model 1 features
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

        # 2. Use Model 2 if signal metrics provided
        if req.rsrp is not None and req.rsrq is not None:
            m2_features = np.array([[req.rsrp, req.rsrq, req.snr or 0, req.cqi or 10, req.dbm or -90]])
            m2_quality = signal_model.predict(m2_features)[0]
            final_quality = min(m1_quality, m2_quality)
        else:
            final_quality = m1_quality
            m2_quality = None

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
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Serve Frontend
app.mount("/", StaticFiles(directory="Frontend/NetPaySense-main", html=True), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
