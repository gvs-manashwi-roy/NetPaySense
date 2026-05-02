import time
import csv
import os
import logging
from datetime import datetime, timedelta
import pandas as pd
try:
    from selenium import webdriver
    from selenium.webdriver.common.by import By
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.support.ui import WebDriverWait
except ImportError:
    webdriver = None
    By = None
    Options = None
    WebDriverWait = None
from pathlib import Path
from dotenv import load_dotenv
from supabase import create_client, Client

load_dotenv()
_supabase_url = os.getenv("SUPABASE_URL", "")
_supabase_key = os.getenv("SUPABASE_KEY", "")
try:
    supabase: Client = create_client(_supabase_url, _supabase_key) if _supabase_url and _supabase_key and not _supabase_url.startswith("https://your") else None
except Exception as e:
    print(f"Supabase Connection Error: {e}")
    supabase = None

# ─────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────
URL = "https://www.iba-banksewa.in/sewa/service-availability"

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data"
CSV_FILE = DATA_PATH / "bank_health_log2.csv"
LOG_FILE = DATA_PATH / "bank_monitor.log"

STALE_THRESHOLD_MINUTES = 20
DATA_RETENTION_HOURS = 12

# ─────────────────────────────────────────────
# LOGGING
# ─────────────────────────────────────────────
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# ─────────────────────────────────────────────
# SCRAPER LOGIC
# ─────────────────────────────────────────────
def fetch_bank_health():
    if webdriver is None:
        print("Selenium not available, skipping scraper")
    return False
    
    """Scrapes bank health data and saves it to CSV."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logging.info("Starting scrape...")

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--log-level=3")
    options.add_argument("--disable-logging")
    options.add_experimental_option("excludeSwitches", ["enable-logging"])

    try:
        driver = webdriver.Chrome(options=options)
        driver.get(URL)

        wait = WebDriverWait(driver, 30)
        wait.until(lambda d: d.find_element(By.CSS_SELECTOR, "table"))

        # Scroll to load more rows
        last_height = driver.execute_script("return document.body.scrollHeight")
        for _ in range(5): # Reduced from 10 for performance
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)
            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

        time.sleep(2)
        rows = driver.find_elements(By.CSS_SELECTOR, "table tbody tr")
        logging.info(f"Rows found: {len(rows)}")

        services = ["Internet Banking", "RTGS", "NEFT", "IMPS", "UPI", "Mobile Banking"]
        data = []

        for row in rows:
            cells = row.find_elements(By.TAG_NAME, "td")
            if not cells:
                continue

            bank_name = cells[0].text.strip()
            if not bank_name:
                continue

            bank = {"bank_name": bank_name}
            for i, service in enumerate(services):
                if i + 1 < len(cells):
                    html = cells[i + 1].get_attribute("innerHTML").lower()
                    if any(x in html for x in ["unavailable", "fa-times", "close", "error"]):
                        status = "DOWN"
                    elif any(x in html for x in ["fluctuation", "warning", "scheduled"]):
                        status = "FLUCTUATING"
                    else:
                        status = "UP"
                    bank[service] = status
                else:
                    bank[service] = "?"
            data.append(bank)

        # Save to Supabase instead of CSV
        if supabase:
            records = []
            for bank in data:
                records.append({
                    "timestamp": timestamp,
                    "bank_name": bank["bank_name"],
                    "internet_banking": bank.get("Internet Banking"),
                    "rtgs": bank.get("RTGS"),
                    "neft": bank.get("NEFT"),
                    "imps": bank.get("IMPS"),
                    "upi": bank.get("UPI"),
                    "mobile_banking": bank.get("Mobile Banking"),
                })
            
            # Insert in batches if needed, or all at once since it's small (~50-100 banks)
            supabase.table("bank_health").insert(records).execute()
            logging.info(f"Saved {len(data)} banks to Supabase")
        else:
            logging.error("Supabase client not initialized, skipping save.")
        return True
    except Exception as e:
        logging.error(f"Scraper Error: {e}")
        return False
    finally:
        if 'driver' in locals():
            driver.quit()

# ─────────────────────────────────────────────
# LOOKUP LOGIC
# ─────────────────────────────────────────────
def get_bank_upi_status(bank_name: str):
    """Retrieves the latest UPI status for a specific bank."""
    try:
        if not supabase: return None, False

        response = (
            supabase.table("bank_health")
            .select("upi, timestamp")
            .ilike("bank_name", f"%{bank_name}%")
            .order("timestamp", desc=True)
            .limit(1)
            .execute()
        )
        data = response.data
        if not data:
            return None, False
            
        latest = data[0]
        status = str(latest.get("upi", "UP")).upper()
        
        # Convert timestamp assuming ISO8601 string from Supabase
        ts = pd.to_datetime(latest["timestamp"]).tz_localize(None)
        current_time = datetime.now()
        stale = (current_time - ts).total_seconds() / 60 > STALE_THRESHOLD_MINUTES
        
        return status, stale
    except Exception as e:
        logging.error(f"Lookup Error: {e}")
        return None, False

def get_problematic_banks():
    """Returns a list of all banks with UPI issues."""
    try:
        if not supabase: return []

        # Get records from the last 2 hours (to find the latest for each bank)
        cutoff = (datetime.now() - timedelta(hours=2)).isoformat()
        response = (
            supabase.table("bank_health")
            .select("bank_name, upi, timestamp")
            .gte("timestamp", cutoff)
            .order("timestamp", desc=True)
            .execute()
        )
        
        if not response.data: return []
        
        df = pd.DataFrame(response.data)
        df['timestamp'] = pd.to_datetime(df['timestamp']).dt.tz_localize(None)
        latest_df = df.drop_duplicates(subset=["bank_name"], keep="first")

        current_time = datetime.now()
        result = []

        for _, row in latest_df.iterrows():
            status = str(row.get("upi", "")).upper()
            if status not in ["DOWN", "FLUCTUATING"]:
                continue

            minutes = (current_time - row["timestamp"]).total_seconds() / 60
            stale = minutes > STALE_THRESHOLD_MINUTES

            result.append({
                "bank": row["bank_name"],
                "status": status,
                "timestamp": str(row["timestamp"]),
                "stale": stale
            })
        return result
    except Exception as e:
        logging.error(f"Problematic Banks Error: {e}")
        return []

# ─────────────────────────────────────────────
# CLEANUP LOGIC
# ─────────────────────────────────────────────
def clean_old_data():
    """Removes data older than 24 hours from Supabase."""
    try:
        if not supabase: return
        cutoff = (datetime.now() - timedelta(hours=DATA_RETENTION_HOURS)).isoformat()
        
        # In Supabase, we can just delete where timestamp < cutoff
        supabase.table("bank_health").delete().lt("timestamp", cutoff).execute()
        logging.info("Cleanup successful: removed old data from Supabase.")
    except Exception as e:
        logging.error(f"Cleanup Error: {e}")

if __name__ == "__main__":
    # Ensure data directory exists
    DATA_PATH.mkdir(exist_ok=True)
    print("Starting manual scrape...")
    if fetch_bank_health():
        print("Scrape successful!")
    else:
        print("Scrape failed. Check logs.")
