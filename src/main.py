from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import threading
from typing import Optional, Dict
from pathlib import Path

# 🔥 lightweight shapefile reader (no geopandas)
import shapefile  

# Bank modules
try:
    from .bank_monitor import fetch_bank_health, get_bank_upi_status, clean_old_data
except:
    from bank_monitor import fetch_bank_health, get_bank_upi_status, clean_old_data

# -------- PATHS --------
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data" / "IndiaStatesBoundaryShapes"
FRONTEND_DIR = BASE_DIR / "Frontend"

app = FastAPI(title="NetPaySense API")

# -------- CORS --------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------- STARTUP --------
@app.on_event("startup")
async def startup_event():
    print("🚀 APP STARTED")

    try:
        clean_old_data()
        threading.Thread(target=fetch_bank_health, daemon=True).start()
    except Exception as e:
        print("Startup warning:", e)

# -------- LOAD SHAPEFILE --------
print("Loading shapefile...")
sf = shapefile.Reader(str(DATA_PATH / "India_State_Boundary.shp"))

# find Karnataka shape index
karnataka_shape = None
for i, rec in enumerate(sf.records()):
    if rec[0].upper() == "KARNATAKA":
        karnataka_shape = sf.shape(i)
        break

# -------- POINT-IN-POLYGON CHECK --------
def point_in_polygon(x, y, polygon):
    inside = False
    points = polygon.points
    n = len(points)
    p1x, p1y = points[0]

    for i in range(n + 1):
        p2x, p2y = points[i % n]
        if y > min(p1y, p2y):
            if y <= max(p1y, p2y):
                if x <= max(p1x, p2x):
                    if p1y != p2y:
                        xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y + 1e-9) + p1x
                    if p1x == p2x or x <= xinters:
                        inside = not inside
        p1x, p1y = p2x, p2y

    return inside

def isInKarnataka(lat, lon):
    if karnataka_shape is None:
        return True  # fallback
    return point_in_polygon(lon, lat, karnataka_shape)

# -------- SCHEMA --------
class PredictionRequest(BaseModel):
    lat: float
    lon: float
    bank_name: Optional[str] = None
    live_metrics: Optional[Dict] = None

# -------- UI LOGIC --------
def get_ui_data(score):
    if score < 45:
        return {"tier": "poor", "badge": "High Risk", "rec": "Carry cash backup"}
    elif score < 75:
        return {"tier": "mid", "badge": "Medium Risk", "rec": "Proceed with caution"}
    else:
        return {"tier": "good", "badge": "Low Risk", "rec": "Safe to proceed"}

# -------- PREDICT --------
@app.post("/predict")
async def predict(req: PredictionRequest):

    if not isInKarnataka(req.lat, req.lon):
        return JSONResponse(status_code=403, content={
            "status": "out_of_range",
            "message": "Outside Karnataka"
        })

    try:
        # ⚠️ shapefile has no network data → keep logic separate
        dn = 12
        up = 3
        lat = 50

        if req.live_metrics:
            dn = req.live_metrics.get("download", dn)
            up = req.live_metrics.get("upload", up)
            lat = req.live_metrics.get("latency", lat)

        BASE = 95
        lat_penalty = min(lat / 2, 70)
        up_penalty = 0 if up > 2 else (20 if up > 1 else 40)
        dn_penalty = 0 if dn > 2 else 10

        score = BASE - lat_penalty - up_penalty - dn_penalty
        score = max(5, min(99, score))

        ui = get_ui_data(score)

        return {
            "lat": req.lat,
            "lon": req.lon,
            "tier": ui["tier"],
            "upi": f"{score:.1f}%",
            "badge": ui["badge"],
            "recommendation": ui["rec"],
            "confidence": "80%",
            "server_version": "real-shapefile-mode"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -------- HEALTH --------
@app.get("/health")
def health():
    return {"status": "running"}

# -------- FRONTEND --------
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="static")
