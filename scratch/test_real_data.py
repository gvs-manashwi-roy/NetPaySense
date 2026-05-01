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

# Load resources
DATA_PATH = Path("d:/NetPaySense/data")
MODEL_PATH = Path("d:/NetPaySense/models")
ookla_model = OoklaNN(input_size=5)
ookla_model.load_state_dict(torch.load(MODEL_PATH / "ookla_nn.pth", weights_only=True))
ookla_model.eval()
ookla_scaler = joblib.load(MODEL_PATH / "ookla_scaler.pkl")

df = pd.read_csv(DATA_PATH / 'final_dataset.csv')
df['download_mbps'] = df['avg_d_kbps'] / 1000
df['upload_mbps'] = df['avg_u_kbps'] / 1000
df['latency_ms'] = df['avg_lat_ms']

def get_real_prediction(row):
    dn, up, lat, l_lat, l_lon = row['download_mbps'], row['upload_mbps'], row['latency_ms'], row['lat'], row['lon']
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
            
        upi_score = base_anchor + offset
        return max(5.0, min(99.7, upi_score)), ["POOR", "MID", "GOOD"][m1_quality]

# Sample 3 real points from your CSV
samples = df.sample(3)

print("--- REAL DATASET TEST ---")
for i, (idx, row) in enumerate(samples.iterrows()):
    score, label = get_real_prediction(row)
    print(f"Point {i+1}: Coords ({row['lat']:.4f}, {row['lon']:.4f})")
    print(f"  Real Specs: {row['download_mbps']:.2f} Mbps | {row['latency_ms']} ms")
    print(f"  AI Prediction: {label}")
    print(f"  Dynamic Score: {score:.2f}%")
    print("-" * 35)
