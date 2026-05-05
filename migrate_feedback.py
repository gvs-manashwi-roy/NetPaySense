import ast
import pandas as pd
from dotenv import load_dotenv
import os
import httpx

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key or url.startswith("https://your"):
    print("❌ Fill in SUPABASE_URL and SUPABASE_KEY in your .env file first!")
    exit(1)

df = pd.read_csv("feedback_data.csv")
df = df.dropna(subset=["lat", "lon", "outcome", "timestamp"])

def clean_numeric(val):
    if val is None: return None
    if isinstance(val, (int, float)): return float(val)
    # Strip "Mbps", "ms", etc. and convert to float
    try:
        cleaned = str(val).split(' ')[0]
        return float(cleaned)
    except:
        return None

records = []
for _, row in df.iterrows():
    raw_metrics = row.get("metrics", "{}")
    try:
        metrics = ast.literal_eval(str(raw_metrics)) if raw_metrics and raw_metrics != "{}" else {}
    except Exception:
        metrics = {}

    records.append({
        "lat":       float(row["lat"]),
        "lon":       float(row["lon"]),
        "outcome":   str(row["outcome"]),
        "latency":   clean_numeric(metrics.get("latency")),
        "download":  clean_numeric(metrics.get("download")),
        "upload":    clean_numeric(metrics.get("upload")),
        "operator":  metrics.get("operator"),
        "timestamp": str(row["timestamp"]),
    })

print(f"Uploading {len(records)} feedback rows to Supabase...")

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

batch_size = 50
with httpx.Client(timeout=30.0) as client:
    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        try:
            res = client.post(f"{url}/rest/v1/feedback", headers=headers, json=batch)
            res.raise_for_status()
            print(f"   Inserted rows {i+1}-{min(i+batch_size, len(records))}")
        except Exception as e:
            print(f"   Error on batch {i+1}: {e}")
            if hasattr(e, 'response'):
                print(f"   Details: {e.response.text}")

print("Migration complete!")
