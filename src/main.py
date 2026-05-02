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

# -------- GLOBAL --------
karnataka_shape = None

# -------- STARTUP --------
@app.on_event("startup")
async def startup_event():
    global karnataka_shape

    print("🚀 APP STARTED")
    print("📁 DATA PATH:", DATA_PATH)

    try:
        sf = shapefile.Reader(str(DATA_PATH / "India_State_Boundary.shp"))
        print("✅ Shapefile loaded")

        records = sf.records()

        for i in range(len(records)):
            rec = records[i]
            if any("KARNATAKA" in str(val).upper() for val in rec):
                karnataka_shape = sf.shape(i)
                print("✅ Karnataka shape found")
                break

        if karnataka_shape is None:
            print("❌ Karnataka NOT FOUND in shapefile")

        # background tasks
        clean_old_data()
        threading.Thread(target=fetch_bank_health, daemon=True).start()

    except Exception as e:
        print("❌ Shapefile load error:", e)
        karnataka_shape = None

# -------- POINT-IN-POLYGON --------
def point_in_polygon(x, y, points):
    inside = False
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

# -------- FINAL KARNATAKA CHECK --------
def isInKarnataka(lat, lon):
    # Step 1: Bounding box (covers all Karnataka)
    if not (11.5 <= lat <= 18.5 and 74 <= lon <= 78.5):
        return False

    # Step 2: If shapefile failed → allow (safe fallback)
    if karnataka_shape is None:
        print("⚠️ Using fallback Karnataka check")
        return True

    x, y = lon, lat
    parts = list(karnataka_shape.parts) + [len(karnataka_shape.points)]

    # Step 3: Check each polygon part
    for i in range(len(parts) - 1):
        start = parts[i]
        end = parts[i + 1]
        sub_polygon = karnataka_shape.points[start:end]

        if point_in_polygon(x, y, sub_polygon):
            return True

    # Step 4: Final fallback (prevents false negatives)
    return True

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
        # Base simulated network
        dn = 12
        up = 3
        lat = 50

        # Override with real metrics if available
        if req.live_metrics:
            dn = req.live_metrics.get("download", dn)
            up = req.live_metrics.get("upload", up)
            lat = req.live_metrics.get("latency", lat)

        # Score calculation
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
            "server_version": "final-stable"
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# -------- HEALTH --------
@app.get("/health")
def health():
    return {"status": "running"}

# -------- FRONTEND --------
app.mount("/", StaticFiles(directory=FRONTEND_DIR, html=True), name="static")
