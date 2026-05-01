"""
One-time migration script: uploads existing feedback_data.csv → Supabase feedback table.
Run once from the project root: python migrate_feedback.py
"""
import ast
import pandas as pd
from dotenv import load_dotenv
import os
from supabase import create_client

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key or url.startswith("https://your"):
    print("❌ Fill in SUPABASE_URL and SUPABASE_KEY in your .env file first!")
    exit(1)

client = create_client(url, key)

df = pd.read_csv("feedback_data.csv")
df = df.dropna(subset=["lat", "lon", "outcome", "timestamp"])

records = []
for _, row in df.iterrows():
    # Parse metrics string (Python dict literal) → actual dict
    raw_metrics = row.get("metrics", "{}")
    try:
        metrics = ast.literal_eval(str(raw_metrics)) if raw_metrics and raw_metrics != "{}" else {}
    except Exception:
        metrics = {}

    records.append({
        "lat":       float(row["lat"]),
        "lon":       float(row["lon"]),
        "outcome":   str(row["outcome"]),
        "metrics":   metrics,
        "timestamp": str(row["timestamp"]),
    })

print(f"Uploading {len(records)} rows to Supabase...")
# Insert in batches of 50 to avoid payload limits
batch_size = 50
for i in range(0, len(records), batch_size):
    batch = records[i:i+batch_size]
    client.table("feedback").insert(batch).execute()
    print(f"   Inserted rows {i+1}-{min(i+batch_size, len(records))}")

print("Migration complete!")
