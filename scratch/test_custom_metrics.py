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
    def forward(self, x): return self.network(x)

MODEL_PATH = Path("d:/NetPaySense/models")
ookla_model = OoklaNN(input_size=5)
ookla_model.load_state_dict(torch.load(MODEL_PATH / "ookla_nn.pth", weights_only=True))
ookla_model.eval()
ookla_scaler = joblib.load(MODEL_PATH / "ookla_scaler.pkl")

def get_score(dn, up, lat):
    # Center of KA for coords
    m1_features = pd.DataFrame([[dn, up, lat, 13.0, 77.0]], 
                                columns=['download_mbps', 'upload_mbps', 'latency_ms', 'lat', 'lon'])
    m1_scaled = ookla_scaler.transform(m1_features)
    
    with torch.no_grad():
        m1_out = ookla_model(torch.tensor(m1_scaled, dtype=torch.float32))
        m1_quality = torch.argmax(m1_out, dim=1).item()
        probs = torch.softmax(m1_out, dim=1)[0].detach().numpy()
        
        base_anchor = (probs[0] * 15.0 + probs[1] * 65.0 + probs[2] * 98.0)
        
        if m1_quality == 2:
            offset = (dn - 12) * 0.4 - (lat - 30) * 0.1
        elif m1_quality == 1:
            offset = (dn - 5) * 1.5 - (lat - 80) * 0.15
        else:
            speed_bonus = max(0, (dn - 10) * 2.0)
            offset = (dn - 1) * 3.0 - (lat - 120) * 0.2 + speed_bonus
            
        upi_score = base_anchor + offset
        return max(5.0, min(99.7, upi_score)), ["POOR", "MID", "GOOD"][m1_quality]

score, label = get_score(74.09, 8.57, 57.8)
print(f"Results for 74 Mbps / 57.8 ms:")
print(f"  AI Tier: {label}")
print(f"  Success Rate: {score:.2f}%")
