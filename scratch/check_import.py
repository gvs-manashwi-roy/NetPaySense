print("Importing src.main...")
try:
    from src import main
    print("Import successful!")
except Exception as e:
    print(f"Import failed: {e}")
