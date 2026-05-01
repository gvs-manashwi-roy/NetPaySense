import os
import sys
import asyncio
from pathlib import Path

# Add the project root to sys.path
sys.path.append(str(Path(os.getcwd())))

from src.main import predict, PredictionRequest

async def simulate_live_fetch():
    try:
        # SIMULATING A "FETCH MY LOCATION" WITH LIVE DATA
        # Let's say you are in Mysore (12.3051, 76.6544) 
        # But your phone is currently having a BAD moment (Slow speeds)
        
        lat, lon = 12.3051, 76.6544
        live_metrics = {
            "download": 1.2,  # Super slow live speed
            "upload": 0.4,
            "latency": 250.0,
            "operator": "Jio 4G"
        }
        
        req = PredictionRequest(
            lat=lat, 
            lon=lon, 
            live_metrics=live_metrics
        )
        
        result = await predict(req)
        
        print("\n--- LIVE FETCH SIMULATION ---")
        print(f"Location: Mysore (Normally 99%)")
        print(f"Simulated Live Speed: {live_metrics['download']} Mbps")
        print(f"-----------------------------")
        print(f"Tier: {result['tier']}")
        print(f"UPI Score: {result['upi']}")
        print(f"Recommendation: {result['recommendation']}")
        print(f"Is Verified: {result['metrics']['is_verified']}")
        
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(simulate_live_fetch())
