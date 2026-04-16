from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib
import numpy as np
import torch
import torch.nn as nn

app = FastAPI(title="Telecom Network Quality and Payment Risk Predictor")

# Load models and encoders
rf_quality = joblib.load('rf_quality_model.pkl')
xgb_quality = joblib.load('xgb_quality_model.pkl')
rf_risk = joblib.load('rf_risk_model.pkl')
xgb_risk = joblib.load('xgb_risk_model.pkl')

network_encoder = joblib.load('network_type_encoder.pkl')
quality_encoder = joblib.load('quality_label_encoder.pkl')
risk_encoder = joblib.load('risk_label_encoder.pkl')

# Neural Network class
class SimpleNN(nn.Module):
    def __init__(self, input_size, num_classes):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_size, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, num_classes)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x

# Load NN models
nn_quality = SimpleNN(10, 3)  # 10 features after encoding
nn_quality.load_state_dict(torch.load('nn_quality_model.pth'))
nn_quality.eval()

nn_risk = SimpleNN(10, 3)
nn_risk.load_state_dict(torch.load('nn_risk_model.pth'))
nn_risk.eval()

class PredictionRequest(BaseModel):
    RSRP: float
    RSRQ: float
    SNR: float
    CQI: float
    Network_Type: str  # '4G', '5G', '3G'
    Latitude: float
    Longitude: float
    Downstream: float
    Upstream: float

@app.post("/predict")
def predict(request: PredictionRequest):
    # Prepare input
    data = {
        'RSRP': [request.RSRP],
        'RSRQ': [request.RSRQ],
        'SNR': [request.SNR],
        'CQI': [request.CQI],
        'Network_Type': [request.Network_Type],
        'Latitude': [request.Latitude],
        'Longitude': [request.Longitude],
        'Downstream': [request.Downstream],
        'Upstream': [request.Upstream]
    }
    df = pd.DataFrame(data)

    # Encode Network_Type
    network_encoded = network_encoder.transform(df[['Network_Type']])
    network_df = pd.DataFrame(network_encoded, columns=network_encoder.get_feature_names_out(['Network_Type']))
    df = df.drop('Network_Type', axis=1)
    df = pd.concat([df, network_df], axis=1)

    # Predict
    pred_rf_quality = rf_quality.predict(df)[0]
    pred_xgb_quality = xgb_quality.predict(df)[0]
    pred_rf_risk = rf_risk.predict(df)[0]
    pred_xgb_risk = xgb_risk.predict(df)[0]

    # NN predictions
    df_tensor = torch.tensor(df.values, dtype=torch.float32)
    with torch.no_grad():
        outputs_quality = nn_quality(df_tensor)
        _, pred_nn_quality = torch.max(outputs_quality, 1)
        pred_nn_quality = pred_nn_quality.item()

        outputs_risk = nn_risk(df_tensor)
        _, pred_nn_risk = torch.max(outputs_risk, 1)
        pred_nn_risk = pred_nn_risk.item()

    # Decode
    network_quality_rf = quality_encoder.inverse_transform([pred_rf_quality])[0]
    network_quality_xgb = quality_encoder.inverse_transform([pred_xgb_quality])[0]
    network_quality_nn = quality_encoder.inverse_transform([pred_nn_quality])[0]
    payment_risk_rf = risk_encoder.inverse_transform([pred_rf_risk])[0]
    payment_risk_xgb = risk_encoder.inverse_transform([pred_xgb_risk])[0]
    payment_risk_nn = risk_encoder.inverse_transform([pred_nn_risk])[0]

    return {
        "network_quality": {
            "random_forest": network_quality_rf,
            "xgboost": network_quality_xgb,
            "neural_network": network_quality_nn
        },
        "payment_risk": {
            "random_forest": payment_risk_rf,
            "xgboost": payment_risk_xgb,
            "neural_network": payment_risk_nn
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)