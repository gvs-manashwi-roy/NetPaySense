import httpx
import asyncio

async def test_feedback():
    payload = {
        "lat": 12.9716,
        "lon": 77.5946,
        "outcome": "success",
        "latency": 45.2,
        "download": 150.5,
        "upload": 25.1,
        "operator": "Jio"
    }
    async with httpx.AsyncClient() as client:
        res = await client.post("http://localhost:8001/feedback", json=payload)
        print(f"Status Code: {res.status_code}")
        print(f"Response: {res.text}")

if __name__ == "__main__":
    asyncio.run(test_feedback())
