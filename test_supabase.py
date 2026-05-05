from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

print(f"Connecting to {url}...")
try:
    supabase: Client = create_client(url, key)
    res = supabase.table("feedback").select("id").limit(1).execute()
    print("Connection successful!")
    print(f"Data: {res.data}")
except Exception as e:
    print(f"Connection failed: {e}")
