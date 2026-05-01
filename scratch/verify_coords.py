import pandas as pd
import numpy as np
from scipy.spatial import KDTree
from pathlib import Path

BASE_DIR = Path("d:/NetPaySense")
DATA_PATH = BASE_DIR / "data"

look_up_df = pd.read_csv(DATA_PATH / 'final_dataset.csv')
coords = look_up_df[['lat', 'lon']].values
tree = KDTree(coords)

test_lat, test_lon = 13.413665691176217, 75.76995849609375
dist, idx = tree.query([test_lat, test_lon])
nearest = look_up_df.iloc[idx]

print(f"Test Coords: {test_lat}, {test_lon}")
print(f"Nearest Coords: {nearest['lat']}, {nearest['lon']}")

# Distance calculation as per main.py
d_lat = float(nearest['lat']) - test_lat
d_lon = (float(nearest['lon']) - test_lon) * np.cos(np.radians(test_lat))
dist_km = (d_lat**2 + d_lon**2)**0.5 * 111.32

print(f"Distance: {dist_km:.4f} km")
