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

# ----------- PATHS -----------
BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "models"
DATA_PATH = BASE_DIR / "data"

FRONTEND_DIR = BASE_DIR/"Frontend"

app = FastAPI(title="NetPaySense API")

# ----------- CORS -----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------- GEO DATA -----------
gdf = gpd.read_file(DATA_PATH / "IndiaStatesBoundaryShapes/India_State_Boundary.shp")
gdf = gdf.to_crs(epsg=4326)
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

# ----------- LOAD MODELS -----------
ookla_model = OoklaNN(input_size=5)
ookla_model.load_state_dict(
    torch.load(MODEL_PATH / 'ookla_nn.pth', map_location=torch.device('cpu'))
)
ookla_model.eval()

ookla_scaler = joblib.load(MODEL_PATH / 'ookla_scaler.pkl')
signal_model = joblib.load(MODEL_PATH / 'signal_xgb.pkl')

# ----------- DATA -----------
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

# ----------- REQUEST -----------
class PredictionRequest(BaseModel):
    lat: float
    lon: float
    rsrp: float = None
    rsrq: float = None
    snr: float = None
    cqi: float = None
    dbm: float = None

# ----------- UI LOGIC -----------
def get_ui_data(quality_score):
    if quality_score == 2:
        return {"tier": "good", "bars": 5, "dbm": -65, "label": "Excellent Signal", "upi": "High – 92%", "badge": "Low Risk", "rec": "Safe to proceed", "type": "5G"}
    elif quality_score == 1:
        return {"tier": "mid", "bars": 3, "dbm": -88, "label": "Moderate Signal", "upi": "Medium – 64%", "badge": "Medium Risk", "rec": "Wait or retry", "type": "4G"}
    else:
        return {"tier": "poor", "bars": 1, "dbm": -110, "label": "Poor Signal", "upi": "Low – 24%", "badge": "High Risk", "rec": "Avoid transaction", "type": "4G"}

# ----------- API -----------
@app.post("/predict")
async def predict(req: PredictionRequest):

    if not isInKarnataka(req.lat, req.lon):
        return JSONResponse(status_code=403, content={"status": "out_of_range"})

    try:
        # 🔥 NEW LOGIC: GET MULTIPLE NEARBY POINTS
        distances, indices = tree.query([req.lat, req.lon], k=10)

        best_score = -999
        best_point = None
        best_data = None

        # 🔥 SELECT BEST NETWORK POINT
        for i in indices:
            row = look_up_df.iloc[i]

            score = row['download_mbps'] - row['latency_ms']

            if score > best_score:
                best_score = score
                best_point = (float(row['lat']), float(row['lon']))
                best_data = row

        authentic_lat = best_point[0]
        authentic_lon = best_point[1]
        nearest = best_data

        # -------- MODEL --------
        features = np.array([[ 
            nearest['download_mbps'],
            nearest['upload_mbps'],
            nearest['latency_ms'],
            authentic_lat,
            authentic_lon
        ]])

        scaled = ookla_scaler.transform(features)

        with torch.no_grad():
            output = ookla_model(torch.tensor(scaled, dtype=torch.float32))
            quality = torch.argmax(output, dim=1).item()

        ui_data = get_ui_data(quality)

        return {
            "lat": authentic_lat,
            "lon": authentic_lon,
            "better_location": {
                "lat": authentic_lat,
                "lon": authentic_lon
            },
            "tier": ui_data["tier"],
            "label": ui_data["label"],
            "upi": ui_data["upi"],
            "badge": ui_data["badge"],
            "recommendation": ui_data["rec"],
            "best_network": "Jio",
            "metrics": {
                "download": f"{nearest['download_mbps']:.2f} Mbps",
                "latency": f"{nearest['latency_ms']:.1f} ms"
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ----------- SERVE FRONTEND -----------
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="static")