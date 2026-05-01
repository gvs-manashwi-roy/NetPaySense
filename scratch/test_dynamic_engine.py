import sys
import os
import pandas as pd
import numpy as np
import torch
import torch.nn as nn
import joblib
from pathlib import Path

# Class definition must match the one used during training
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

# Mocking the environment
DATA_PATH = Path("d:/NetPaySense/data")
MODEL_PATH = Path("d:/NetPaySense/models")

# Load models
ookla_model = OoklaNN(input_size=5)
ookla_model.load_state_dict(torch.load(MODEL_PATH / "ookla_nn.pth", weights_only=True))
ookla_model.eval()
ookla_scaler = joblib.load(MODEL_PATH / "ookla_scaler.pkl")

def calculate_score(dn, up, lat, l_lat, l_lon):
    m1_features = pd.DataFrame([[dn, up, lat, l_lat, l_lon]], 
                                columns=['download_mbps', 'upload_mbps', 'latency_ms', 'lat', 'lon'])
    m1_scaled = ookla_scaler.transform(m1_features)
    
    with torch.no_grad():
        m1_out = ookla_model(torch.tensor(m1_scaled, dtype=torch.float32))
        m1_quality = torch.argmax(m1_out, dim=1).item()
        probs = torch.softmax(m1_out, dim=1)[0].detach().numpy()
        
        base_anchor = (probs[0] * 15.0 + probs[1] * 65.0 + probs[2] * 98.0)
        
        if m1_quality == 2:
            offset = (dn - 12) * 0.4 - (lat - 30) * 0.15
        elif m1_quality == 1:
            offset = (dn - 5) * 2.0 - (lat - 80) * 0.25
        else:
            offset = (dn - 1) * 5.0 - (lat - 150) * 0.1
            
        jitter = (np.random.random() - 0.5) * 0.5 
        upi_score = base_anchor + offset + jitter
        return max(5.0, min(99.7, upi_score)), m1_quality

# Test points
test_cases = [
    {"name": "Ultra-High Speed (85 Mbps)", "dn": 85.0, "up": 15.0, "lat": 15.0, "l_lat": 12.9, "l_lon": 77.5},
    {"name": "Good Base (12 Mbps)", "dn": 12.0, "up": 4.0, "lat": 40.0, "l_lat": 12.9, "l_lon": 77.5},
    {"name": "Weak Good (10 Mbps but good lat)", "dn": 10.0, "up": 3.0, "lat": 30.0, "l_lat": 12.9, "l_lon": 77.5},
    {"name": "Strong Moderate", "dn": 8.0, "up": 2.0, "lat": 70.0, "l_lat": 12.9, "l_lon": 77.5},
    {"name": "Weak Moderate", "dn": 3.5, "up": 1.0, "lat": 100.0, "l_lat": 12.9, "l_lon": 77.5},
    {"name": "Poor (0.5 Mbps)", "dn": 0.5, "up": 0.1, "lat": 250.0, "l_lat": 12.9, "l_lon": 77.5}
]

print("--- DYNAMIC SCORING ENGINE TEST ---")
for tc in test_cases:
    score, q = calculate_score(tc['dn'], tc['up'], tc['lat'], tc['l_lat'], tc['l_lon'])
    label = ["POOR", "MID", "GOOD"][q]
    print(f"Location: {tc['name']}")
    print(f"  Specs: {tc['dn']} Mbps | {tc['lat']} ms")
    print(f"  Final API Score: {score:.2f}% ({label})")
    print("-" * 40)
