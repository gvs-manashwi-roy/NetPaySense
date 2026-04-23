import requests
from dotenv import load_dotenv
import os
from tower import find_nearest_tower
load_dotenv()

API_KEY = os.getenv("OPENCELL_API_KEY")


if []:
    print("")
else:
    print("yes")

params = {
    "key": API_KEY,
    "mcc": 404,        # Mobile Country Code (404 = India)
    "mnc": 20,         # Mobile Network Code (20 = Airtel)
    "lac": 1234,       # Location Area Code
    "format": "json"
}

response = find_nearest_tower(12.9767936, 77.590082, API_KEY)
print(response)
