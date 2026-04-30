import os
import sys
import asyncio
from pathlib import Path

# Add the project root to sys.path
sys.path.append(str(Path(os.getcwd())))

from src.main import predict, PredictionRequest

async def run_test():
    try:
        # TEST COORDINATES (HIREKOLALE LAKE, CHIKMAGALUR)
        lat, lon = 13.4137, 75.7700
        req = PredictionRequest(lat=lat, lon=lon)
        result = await predict(req)
        
        # Remove emojis for terminal printing
        clean_upi = result['upi'].replace("🚀 ", "")
        print("\n--- PREDICTION RESULTS ---")
        print(f"Coordinates: {lat}, {lon}")
        print(f"Tier: {result['tier']}")
        print(f"UPI Score: {clean_upi}")
        print(f"Metrics: {result['metrics']}")
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(run_test())
