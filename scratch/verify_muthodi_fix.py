import sys
import os
import pandas as pd
import numpy as np
import torch
import torch.nn as nn
import joblib
from pathlib import Path

class OoklaNN(nn.Module):
    def __init__(self, input_size):
        super(OoklaNN, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, 64), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(64, 32), nn.ReLU(), nn.Dropout(0.2),
            nn.Linear(32, 16), nn.ReLU(), nn.Linear(16, 3)
        )
    def forward(self, x): return self.network(x)

MODEL_PATH = Path("d:/NetPaySense/models")
DATA_PATH = Path("d:/NetPaySense/data")

ookla_model = OoklaNN(input_size=5)
ookla_model.load_state_dict(torch.load(MODEL_PATH / "ookla_nn.pth", weights_only=True))
ookla_model.eval()
ookla_scaler = joblib.load(MODEL_PATH / "ookla_scaler.pkl")

def get_final_score(lat, lon, dn, up, lat_ms):
    m1_features = pd.DataFrame([[dn, up, lat_ms, lat, lon]], columns=['download_mbps', 'upload_mbps', 'latency_ms', 'lat', 'lon'])
    m1_scaled = ookla_scaler.transform(m1_features)
    
    with torch.no_grad():
        m1_out = ookla_model(torch.tensor(m1_scaled, dtype=torch.float32))
        probs = torch.softmax(m1_out, dim=1)[0].numpy()
        base_anchor = (probs[0] * 15.0 + probs[1] * 65.0 + probs[2] * 98.0)
        
        m1_quality = np.argmax(probs)
        if m1_quality == 2:
            offset = (dn - 12) * 0.4 - (lat_ms - 30) * 0.1
        elif m1_quality == 1:
            offset = (dn - 5) * 1.5 - (lat_ms - 80) * 0.15
        else:
            speed_bonus = 0
            if up > 1.5:
                speed_bonus = max(0, (dn - 10) * 2.0)
            offset = (dn - 1) * 3.0 - (lat_ms - 120) * 0.2 + speed_bonus
            
        upload_penalty = 0
        if up < 0.5:
            upload_penalty = 75
        elif up < 1.5:
            upload_penalty = 40
            
        score = base_anchor + offset - upload_penalty
        return max(5.0, min(99.7, score))

# Muthodi Data
dn = 29.66
up = 0.17
lat_ms = 39.0
lat, lon = 13.4350, 75.6216

score = get_final_score(lat, lon, dn, up, lat_ms)
print(f"Muthodi Final Score: {score:.1f}%")
