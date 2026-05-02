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
    # OpenCellID expects: lat_min, lon_min, lat_max, lon_max
    return f"{lat - delta_lat},{lon - delta_lon},{lat + delta_lat},{lon + delta_lon}"

def fetch_towers(lat, lon, radius_km, api_key):
    params = {
        "key": api_key,
        "BBOX": create_bounding_box(lat, lon, radius_km),
        "format": "json",
        "limit": 100
    }
    try:
        url = "https://opencellid.org/cell/getInArea"
        response = requests.get(url, params=params)
        
        # Check for API-specific errors in JSON even if status is 200
        data = response.json()
        if "error" in data:
            # print(f"OpenCellID API Error: {data['error']}")
            return []
            
        return data.get("cells", [])
    except Exception as e:
        # print(f"Tower fetch exception: {e}")
        return []

def find_nearest_tower(lat, lon, api_key):
    # OpenCellID 'getInArea' is limited to ~4 sq km (approx 1km radius)
    # We search in small increments to stay within limits
    SEARCH_RADII = [0.2, 0.5, 0.8, 1.0]
    towers = []
    used_radius = None

    for radius in SEARCH_RADII:
        towers = fetch_towers(lat, lon, radius, api_key)
        if towers:
            used_radius = radius
            break

    if not towers:
        return {}

    for tower in towers:
        tower["distance_m"] = round(
            haversine_distance(lat, lon, tower["lat"], tower["lon"]), 2
        )
        # Ensure MCC/MNC are integers for the lookup
        mcc = int(tower.get("mcc", 0))
        mnc = int(tower.get("mnc", 0))
        tower["operator"] = MNC_LOOKUP.get((mcc, mnc), "Unknown")

    nearest = min(towers, key=lambda t: t["distance_m"])
    nearest["search_radius_km"] = used_radius
    return nearest