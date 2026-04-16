from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI(title="NetPaySense API")

# Load model
model = joblib.load("xgb_model.pkl")


# Request schema (MATCH YOUR TRAINING DATA)
class PredictionRequest(BaseModel):
    upload_mbps: float
    latency_ms: float
    tests: float
    devices: float
    lat: float
    lon: float


# Helper functions
def map_quality(pred):
    return ["Poor", "Moderate", "Good"][pred]


def payment_risk(pred):
    if pred == 2:
        return "Low Risk"
    elif pred == 1:
        return "Medium Risk"
    else:
        return "High Risk"


@app.post("/predict")
def predict(request: PredictionRequest):

    # Feature engineering (same as training)
    density = request.tests / (request.devices + 1)
    interaction_1 = request.upload_mbps * density
    interaction_2 = request.tests / (request.latency_ms + 1)
    latency_inv = 1 / (request.latency_ms + 1)

    features = np.array([[
        request.upload_mbps,
        request.latency_ms,
        latency_inv,
        request.tests,
        request.devices,
        density,
        interaction_1,
        interaction_2,
        request.lat,
        request.lon
    ]])

    pred = model.predict(features)[0]

    return {
        "network_quality": map_quality(pred),
        "payment_risk": payment_risk(pred)
    }


@app.get("/")
def home():
    return {"message": "NetPaySense API is running"}