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
    from selenium.webdriver.chrome.service import Service
except ImportError:
    webdriver = None
    By = None
    Options = None
    WebDriverWait = None
    Service = None

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
    """Scrapes bank health data and saves it to Supabase."""
    if webdriver is None:
        logging.error("Selenium dependencies not found. Ensure selenium is installed.")
        return False

    print(">>> [DEBUG] fetch_bank_health() triggered!")
    timestamp = datetime.now().isoformat()
    logging.info("Starting scrape...")

    options = Options()
    options.add_argument("--headless=new")
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--log-level=3")
    options.add_argument("--disable-logging")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    options.add_argument("--disable-blink-features=AutomationControlled")
    options.add_experimental_option("excludeSwitches", ["enable-automation", "enable-logging"])
    options.add_experimental_option("useAutomationExtension", False)

    chrome_bin = os.environ.get("CHROME_BIN")
    if chrome_bin:
        print(f">>> [DEBUG] Setting binary_location to {chrome_bin}")
        options.binary_location = chrome_bin

    try:
        chrome_driver = os.environ.get("CHROMEDRIVER_PATH")
        print(f">>> [DEBUG] CHROMEDRIVER_PATH is {chrome_driver}")
        
        print(">>> [DEBUG] Calling webdriver.Chrome()...")
        if chrome_driver:
            service = Service(executable_path=chrome_driver)
            driver = webdriver.Chrome(service=service, options=options)
        else:
            try:
                from webdriver_manager.chrome import ChromeDriverManager
                service = Service(ChromeDriverManager().install())
                driver = webdriver.Chrome(service=service, options=options)
            except:
                driver = webdriver.Chrome(options=options)
            
        print(">>> [DEBUG] webdriver.Chrome() succeeded! Calling driver.get(URL)...")
        driver.set_page_load_timeout(30) # Prevent indefinite hanging
        driver.get(URL)
        
        print(">>> [DEBUG] Page loaded! Waiting for table...")
        wait = WebDriverWait(driver, 30)
        wait.until(lambda d: d.find_element(By.CSS_SELECTOR, "table"))

        # Scroll to load more rows
        last_height = driver.execute_script("return document.body.scrollHeight")
        for _ in range(5):
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

        # Save to Supabase
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
            
            supabase.table("bank_health").insert(records).execute()
            print(f">>> [DEBUG] Saved {len(data)} banks to Supabase successfully!")
            logging.info(f"Saved {len(data)} banks to Supabase")
        else:
            print(">>> [DEBUG] ERROR: Supabase client not initialized, skipping save.")
            logging.error("Supabase client not initialized, skipping save.")

        # Save to CSV
        try:
            file_exists = os.path.isfile(CSV_FILE)
            with open(CSV_FILE, mode='a', newline='', encoding='utf-8') as f:
                writer = csv.writer(f)
                if not file_exists:
                    writer.writerow(['timestamp', 'bank_name', 'internet_banking', 'rtgs', 'neft', 'imps', 'upi', 'mobile_banking'])
                for bank in data:
                    writer.writerow([
                        timestamp,
                        bank["bank_name"],
                        bank.get("Internet Banking", "?"),
                        bank.get("RTGS", "?"),
                        bank.get("NEFT", "?"),
                        bank.get("IMPS", "?"),
                        bank.get("UPI", "?"),
                        bank.get("Mobile Banking", "?")
                    ])
            print(f">>> [DEBUG] Saved {len(data)} banks to CSV successfully!")
            logging.info(f"Saved {len(data)} banks to CSV")
        except Exception as csv_err:
            print(f">>> [DEBUG] Error saving to CSV: {csv_err}")
            logging.error(f"Error saving to CSV: {csv_err}")

        return True
    except Exception as e:
        import traceback
        err_msg = f">>> [DEBUG] CRITICAL SCRAPER ERROR: {e}\n{traceback.format_exc()}"
        print(err_msg)
        logging.error(err_msg)
        
        if 'driver' in locals():
            try:
                screenshot_path = DATA_PATH / "error_screenshot.png"
                driver.save_screenshot(str(screenshot_path))
                print(f">>> [DEBUG] Screenshot saved to {screenshot_path}")
            except Exception as ss_err:
                print(f">>> [DEBUG] Failed to save screenshot: {ss_err}")
                
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
        
        ts = pd.to_datetime(latest["timestamp"], utc=True)
        current_time = datetime.now(timezone.utc)
        stale = (current_time - ts).total_seconds() / 60 > STALE_THRESHOLD_MINUTES
        
        return status, stale
    except Exception as e:
        logging.error(f"Lookup Error: {e}")
        return None, False

def get_problematic_banks():
    """Returns a list of all banks with UPI issues."""
    try:
        if not supabase: return []

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
        df['timestamp'] = pd.to_datetime(df['timestamp'], utc=True)
        latest_df = df.drop_duplicates(subset=["bank_name"], keep="first")

        current_time = datetime.now(timezone.utc)
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
        cutoff = (datetime.now(timezone.utc) - timedelta(hours=DATA_RETENTION_HOURS)).isoformat()
        supabase.table("bank_health").delete().lt("timestamp", cutoff).execute()
        logging.info("Cleanup successful: removed old data from Supabase.")
    except Exception as e:
        logging.error(f"Cleanup Error: {e}")

if __name__ == "__main__":
    DATA_PATH.mkdir(exist_ok=True)
    print("Starting manual scrape...")
    if fetch_bank_health():
        print("Scrape successful!")
    else:
        print("Scrape failed. Check logs.")

