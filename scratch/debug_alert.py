
import pandas as pd
from datetime import datetime, timedelta
import os
from pathlib import Path

FEEDBACK_FILE = "feedback_data.csv"

def get_all_feedback():
    if not os.path.exists(FEEDBACK_FILE): return pd.DataFrame()
    try:
        df = pd.read_csv(FEEDBACK_FILE)
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
        return df.dropna(subset=['timestamp'])
    except Exception as e: 
        print(f"Error reading feedback: {e}")
        return pd.DataFrame()

def check_nearby_failures(lat, lon, radius_km=0.5):
    try:
        df = get_all_feedback()
        if df.empty: 
            print("DF is empty")
            return False
        
        # DEBUG
        now = datetime.now()
        threshold = now - timedelta(minutes=15)
        print(f"Current Time: {now}")
        print(f"Threshold: {threshold}")
        
        recent_failed = df[(df['outcome'] == 'failed') & (df['timestamp'] >= threshold)]
        print(f"Found {len(recent_failed)} recent failures overall")
        
        for idx, row in recent_failed.iterrows():
            dist = ((float(row['lat']) - lat)**2 + (float(row['lon']) - lon)**2)**0.5 * 111
            print(f"Checking row {idx}: dist={dist:.4f} km")
            if dist <= radius_km: return True
        return False
    except Exception as e:
        print(f"Error in check: {e}")
        return False

# Test with Koramangala coords from CSV
test_lat = 12.93764527025943
test_lon = 77.62664794921875
print(f"Result for {test_lat}, {test_lon}: {check_nearby_failures(test_lat, test_lon)}")
