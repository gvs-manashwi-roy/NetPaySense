from datetime import datetime, timedelta
import pandas as pd

# Simulating what's in the DB (UTC)
db_time_str = "2026-05-03T10:50:00+00:00"
df = pd.DataFrame([{"timestamp": db_time_str}])

# What get_all_feedback does:
df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce', utc=True)
df['timestamp'] = df['timestamp'].dt.tz_localize(None)
db_val = df['timestamp'].iloc[0]

# What check_nearby_failures does:
# Current time is 16:20 IST
now = datetime(2026, 5, 3, 16, 20, 0) 
threshold = now - timedelta(minutes=30)

print(f"DB Timestamp (stripped): {db_val}")
print(f"Threshold (local):      {threshold}")
print(f"Is DB >= Threshold?      {db_val >= threshold}")
