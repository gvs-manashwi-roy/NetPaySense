from fastapi import FastAPI
import uvicorn
import os

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8001))
    print(f"Starting server on port {port}...")
    uvicorn.run(app, host="127.0.0.1", port=port)
