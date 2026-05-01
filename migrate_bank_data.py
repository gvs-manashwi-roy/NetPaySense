"""
One-time migration script: uploads existing data/bank_health_log2.csv → Supabase bank_health table.
Run once from the project root: python migrate_bank_data.py
"""
import pandas as pd
from dotenv import load_dotenv
import os
import math
from supabase import create_client

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

if not url or not key or url.startswith("https://your"):
    print("Fill in SUPABASE_URL and SUPABASE_KEY in your .env file first!")
    exit(1)

client = create_client(url, key)

csv_path = "data/bank_health_log2.csv"
if not os.path.exists(csv_path):
    print(f"File not found: {csv_path}")
    exit(1)

df = pd.read_csv(csv_path)

# Drop rows where essential data is completely missing
df = df.dropna(subset=["timestamp", "bank_name"])

# Helper to handle NaN values (Supabase expects None instead of float('nan'))
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

# Insert in batches of 500 to avoid payload limits
batch_size = 500
for i in range(0, len(records), batch_size):
    batch = records[i:i+batch_size]
    try:
        client.table("bank_health").insert(batch).execute()
        print(f"   Inserted rows {i+1}-{min(i+batch_size, len(records))}")
    except Exception as e:
        print(f"   Error on batch {i+1}: {e}")

print("Migration complete!")
