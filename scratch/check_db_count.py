from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

try:
    supabase: Client = create_client(url, key)
    res = supabase.table("feedback").select("count", count="exact").execute()
    print(f"Total rows in feedback table: {res.count}")
    
    # Also check if we can see any data at all
    res_data = supabase.table("feedback").select("*").limit(5).execute()
    print(f"Sample data: {res_data.data}")
except Exception as e:
    print(f"Error: {e}")
