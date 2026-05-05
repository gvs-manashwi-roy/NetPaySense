import pandas as pd
from dotenv import load_dotenv
import os
import math
import httpx

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key or url.startswith("https://your"):
    print("Fill in SUPABASE_URL and SUPABASE_KEY in your .env file first!")
    exit(1)

csv_path = "data/bank_health_log2.csv"
if not os.path.exists(csv_path):
    print(f"File not found: {csv_path}")
    exit(1)

df = pd.read_csv(csv_path)
df = df.dropna(subset=["timestamp", "bank_name"])

def clean_val(val):
    if pd.isna(val) or (isinstance(val, float) and math.isnan(val)):
        return None
    return str(val)

records = []
for _, row in df.iterrows():
    records.append({
        "timestamp":        str(row["timestamp"]),
        "bank_name":        str(row["bank_name"]),
        "internet_banking": clean_val(row.get("internet_banking")),
        "rtgs":             clean_val(row.get("rtgs")),
        "neft":             clean_val(row.get("neft")),
        "imps":             clean_val(row.get("imps")),
        "upi":              clean_val(row.get("upi")),
        "mobile_banking":   clean_val(row.get("mobile_banking")),
    })

print(f"Uploading {len(records)} bank records to Supabase...")

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

batch_size = 500
with httpx.Client(timeout=30.0) as client:
    for i in range(0, len(records), batch_size):
        batch = records[i:i+batch_size]
        try:
            res = client.post(f"{url}/rest/v1/bank_health", headers=headers, json=batch)
            res.raise_for_status()
            print(f"   Inserted rows {i+1}-{min(i+batch_size, len(records))}")
        except Exception as e:
            print(f"   Error on batch {i+1}: {e}")

print("Migration complete!")
