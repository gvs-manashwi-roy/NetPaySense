import time

def test_import(module):
    print(f"Importing {module}...")
    start = time.time()
    try:
        __import__(module)
        print(f"  Done in {time.time() - start:.2f}s")
    except Exception as e:
        print(f"  Failed: {e}")

test_import("dotenv")
test_import("fastapi")
test_import("pydantic")
test_import("torch")
test_import("joblib")
test_import("supabase")
test_import("speedtest")
test_import("pandas")
test_import("numpy")
test_import("geopandas")
test_import("shapely")
test_import("scipy")
test_import("apscheduler")
