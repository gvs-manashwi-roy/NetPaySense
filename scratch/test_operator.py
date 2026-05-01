import os
from dotenv import load_dotenv
try:
    from src import tower
except ImportError:
    import sys
    sys.path.append('src')
    import tower

load_dotenv()

def test_operator_lookup(lat, lon):
    api_key = os.getenv("OPENCELL_API_KEY")
    if not api_key:
        print("Error: OPENCELL_API_KEY not found in .env")
        return

    print(f"--- TESTING OPERATOR DETECTION ---")
    print(f"Coordinates: {lat}, {lon}")
    print(f"Querying OpenCellID...")

    try:
        result = tower.find_nearest_tower(lat, lon, api_key)
        
        if result:
            print("\nSUCCESS: Nearest Tower Found")
            print(f"Operator: {result.get('operator', 'Unknown')}")
            print(f"Distance: {result.get('distance_m', 'N/A')} meters")
            print(f"Cell ID: {result.get('cellId', 'N/A')}")
            print(f"Technology: {result.get('radio', 'N/A')}")
            print(f"Search Radius: {result.get('search_radius_km', 'N/A')} km")
        else:
            print("\nFAILED: No towers found in the vicinity.")
            
    except Exception as e:
        print(f"\nERROR during lookup: {e}")

if __name__ == "__main__":
    print("--- BENCHMARK CHECK (Bangalore) ---")
    test_operator_lookup(12.9716, 77.5946)
    
    print("\n" + "="*30 + "\n")

    print("--- REGIONAL CHECK (Shimoga City) ---")
    test_operator_lookup(13.9299, 75.5681)
    
    print("\n" + "="*30 + "\n")
    
    print("--- TARGET CHECK (Chikkamagaluru Area) ---")
    test_operator_lookup(13.3273, 75.7555)
