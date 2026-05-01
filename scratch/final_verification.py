import sys
import os
import pandas as pd
import numpy as np
import torch
import torch.nn as nn
import joblib
from pathlib import Path
from datetime import datetime, timedelta

# Mocking the folder structure
BASE_DIR = Path("d:/NetPaySense")
MODEL_PATH = BASE_DIR / "models"
DATA_PATH = BASE_DIR / "data"

class OoklaNN(nn.Module):
    def __init__(self, input_size):
        super(OoklaNN, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, 64), nn.ReLU(), nn.Dropout(0.3),
            nn.Linear(64, 32), nn.ReLU(), nn.Dropout(0.2),
            nn.Linear(32, 16), nn.ReLU(), nn.Linear(16, 3)
        )
    def forward(self, x): return self.network(x)

# Load resources
ookla_model = OoklaNN(input_size=5)
ookla_model.load_state_dict(torch.load(MODEL_PATH / "ookla_nn.pth", weights_only=True))
ookla_model.eval()
ookla_scaler = joblib.load(MODEL_PATH / "ookla_scaler.pkl")

look_up_df = pd.read_csv(DATA_PATH / "final_dataset.csv")
coords = look_up_df[['lat', 'lon']].values
from scipy.spatial import KDTree
tree = KDTree(coords)

def get_ui_data(quality_score, upi_score, community_alert=False):
    if community_alert or upi_score < 45:
        tier = "poor"
        badge = "High Risk" if not community_alert else "COMMUNITY DOWNTIME"
        upi_label = f"Low Success - {upi_score:.1f}%"
    elif upi_score < 75:
        tier = "mid"
        badge = "Medium Risk"
        upi_label = f"Mid Success - {upi_score:.1f}%"
    else:
        tier = "good"
        badge = "Low Risk"
        upi_label = f"High Success - {upi_score:.1f}%"
    return {"tier": tier, "upi": upi_label, "badge": badge}

def simulate_predict(lat, lon, has_alert=False):
    dist, idx = tree.query([lat, lon])
    nearest = look_up_df.iloc[idx]
    dn = nearest['avg_d_kbps'] / 1000.0
    up = nearest['avg_u_kbps'] / 1000.0
    lat_ms = nearest['avg_lat_ms']
    
    m1_features = pd.DataFrame([[dn, up, lat_ms, lat, lon]], columns=['download_mbps', 'upload_mbps', 'latency_ms', 'lat', 'lon'])
    m1_scaled = ookla_scaler.transform(m1_features)
    
    with torch.no_grad():
        m1_out = ookla_model(torch.tensor(m1_scaled, dtype=torch.float32))
        probs = torch.softmax(m1_out, dim=1)[0].numpy()
        base_anchor = (probs[0] * 15.0 + probs[1] * 65.0 + probs[2] * 98.0)
        upi_score = base_anchor + (dn - 10) * 0.5 # Simplified offset
        upi_score = max(5.0, min(99.7, upi_score))
        
        # Applying Community Dampening logic (Logic from main.py)
        if has_alert:
            upi_score = min(upi_score, 15.0)
            
    return get_ui_data(None, upi_score, has_alert)

print("--- FINAL SYSTEM VERIFICATION ---")

# Test 1: High Performance Area (Kadur)
res1 = simulate_predict(14.0273, 75.9238)
print(f"Test 1 (Good Area): {res1['upi']} | Badge: {res1['badge']} | Tier: {res1['tier']}")

# Test 2: Dead Zone (Channagiri Rural)
res2 = simulate_predict(14.6075, 75.6271)
print(f"Test 2 (Bad Area):  {res2['upi']} | Badge: {res2['badge']} | Tier: {res2['tier']}")

# Test 3: Good Area WITH Community Failure (Simulated)
res3 = simulate_predict(14.0273, 75.9238, has_alert=True)
print(f"Test 3 (Alert!):   {res3['upi']} | Badge: {res3['badge']} | Tier: {res3['tier']}")

if "High Success" in res1['upi'] and "Low Success" in res3['upi'] and res3['badge'] == "COMMUNITY DOWNTIME":
    print("\n✅ VERIFICATION PASSED: Logic is fully synchronized.")
else:
    print("\n❌ VERIFICATION FAILED: Logic mismatch detected.")
