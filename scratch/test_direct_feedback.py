import httpx
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

record = {
    "lat": 12.9716,
    "lon": 77.5946,
    "outcome": "success",
    "latency": 45.2,
    "download": 150.5,
    "upload": 25.1,
    "operator": "Jio Test",
    "timestamp": datetime.now().isoformat(),
}

headers = {
    "apikey": key,
    "Authorization": f"Bearer {key}",
    "Content-Type": "application/json",
    "Prefer": "return=minimal"
}

print(f"Submitting feedback to {url}/rest/v1/feedback...")
try:
    with httpx.Client(timeout=10.0) as client:
        res = client.post(f"{url}/rest/v1/feedback", headers=headers, json=record)
        print(f"Status Code: {res.status_code}")
        print(f"Response: {res.text}")
except Exception as e:
    print(f"Error: {e}")
