import math
import requests
try:
    from .mnc_mcc import MNC_LOOKUP
except ImportError:
    from mnc_mcc import MNC_LOOKUP

def haversine_distance(lat1, lon1, lat2, lon2):
    R = 6371000
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi/2)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlambda/2)**2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

def create_bounding_box(lat, lon, radius_km):
    delta_lat = radius_km / 111
    delta_lon = radius_km / (111 * math.cos(math.radians(lat)))
    return f"{lat - delta_lat},{lon - delta_lon},{lat + delta_lat},{lon + delta_lon}"

def fetch_towers(lat, lon, radius_km, api_key):
    params = {
        "key": api_key,
        "BBOX": create_bounding_box(lat, lon, radius_km),
        "format": "json",
        "limit": 1000
    }
    try:
        response = requests.get("https://opencellid.org/cell/getInArea", params=params)
        response.raise_for_status()
        return response.json().get("cells", [])
    except requests.exceptions.RequestException as e:
        print(f"API error: {e}")
        return []

def find_nearest_tower(lat, lon, api_key):
    SEARCH_RADII = [0.5, 1, 2, 5, 10, 20, 50]
    towers = []
    used_radius = None

    for radius in SEARCH_RADII:
        # print(f"Searching within {radius}km...", end=" ")
        towers = fetch_towers(lat, lon, radius, api_key)
        if towers:
            print(f"Found {len(towers)} tower(s).")
            used_radius = radius
            break

    if not towers:
        return {}

    for tower in towers:
        tower["distance_m"] = round(
            haversine_distance(lat, lon, tower["lat"], tower["lon"]), 2
        )

        tower["operator"] = MNC_LOOKUP.get((tower["mcc"], tower["mnc"]), "Unknown")

    nearest = min(towers, key=lambda t: t["distance_m"])
    nearest["search_radius_km"] = used_radius
    return nearest