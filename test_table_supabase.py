import httpx
import os
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

print(f"Testing table request to {url}/rest/v1/feedback...")
try:
    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}"
    }
    with httpx.Client(timeout=10.0) as client:
        # Try to select from feedback table
        res = client.get(f"{url}/rest/v1/feedback?select=id&limit=1", headers=headers)
        print(f"Status: {res.status_code}")
        print(f"Response: {res.text[:100]}")
except Exception as e:
    print(f"Table request failed: {e}")
