import os
import sys
import asyncio
from pathlib import Path

sys.path.append(str(Path(os.getcwd())))
from src.main import predict, PredictionRequest

async def run_custom_test():
    # YOUR DATA
    metrics = {
        "upload": 30.30,
        "latency": 123.3,
        "download": 15.94,
        "operator": "Jio",
        "is_verified": True
    }
    
    # Hirekolale Coords
    req = PredictionRequest(lat=13.4350, lon=75.6216, live_metrics=metrics)
    result = await predict(req)
    
    print(f"\n--- RESULTS FOR HIGH LATENCY TEST ---")
    print(f"Tier: {result['tier']}")
    print(f"UPI Score: {result['upi']}")
    print(f"Recommendation: {result['recommendation']}")

if __name__ == "__main__":
    asyncio.run(run_custom_test())
