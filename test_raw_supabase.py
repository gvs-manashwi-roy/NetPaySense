import httpx
import os
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

print(f"Testing raw HTTP request to {url}...")
try:
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}"
    }
    with httpx.Client(timeout=10.0) as client:
        res = client.get(f"{url}/rest/v1/feedback?select=id,timestamp&limit=5", headers=headers)
        print(f"Status: {res.status_code}")
        print(f"Response: {res.text}")
except Exception as e:
    print(f"Raw request failed: {e}")
