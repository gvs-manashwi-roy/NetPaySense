import pandas as pd
import numpy as np
from scipy.spatial import KDTree
from pathlib import Path

BASE_DIR = Path("d:/NetPaySense")
DATA_PATH = BASE_DIR / "data"

def classify_network(download, upload, latency):
    if latency <= 60 and download >= 12 and upload >= 3: return 2 # Good
    elif latency <= 110 and download >= 3 and upload >= 0.8: return 1 # Mid
    else: return 0 # Poor

df = pd.read_csv(DATA_PATH / 'final_dataset.csv')
coords = df[['lat', 'lon']].values
tree = KDTree(coords)

test_lat, test_lon = 13.4350, 75.6216
dist, idx = tree.query([test_lat, test_lon])
nearest = df.iloc[idx]

dn = nearest['avg_d_kbps'] / 1000
up = nearest['avg_u_kbps'] / 1000
lat = nearest['avg_lat_ms']

prediction = classify_network(dn, up, lat)
label = ["POOR", "MODERATE", "GOOD"][prediction]

print(f"--- Analysis for {test_lat}, {test_lon} ---")
print(f"Nearest Point: {nearest['lat']}, {nearest['lon']}")
print(f"Download: {dn:.2f} Mbps")
print(f"Upload: {up:.2f} Mbps")
print(f"Latency: {lat} ms")
print(f"RESULT: {label} ({prediction})")
