import time
import csv
import os
import logging
from datetime import datetime, timedelta
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from pathlib import Path

# ─────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────
URL = "https://www.iba-banksewa.in/sewa/service-availability"

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_PATH = BASE_DIR / "data"
CSV_FILE = DATA_PATH / "bank_health_log2.csv"
LOG_FILE = DATA_PATH / "bank_monitor.log"

STALE_THRESHOLD_MINUTES = 20
DATA_RETENTION_HOURS = 24

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

        # Save CSV
        file_exists = CSV_FILE.exists()
        with open(CSV_FILE, "a", newline="", encoding="utf-8") as f:
            writer = csv.writer(f)
            if not file_exists:
                writer.writerow([
                    "timestamp", "bank_name",
                    "internet_banking", "rtgs", "neft",
                    "imps", "upi", "mobile_banking"
                ])
            for bank in data:
                writer.writerow([
                    timestamp,
                    bank["bank_name"],
                    bank.get("Internet Banking"),
                    bank.get("RTGS"),
                    bank.get("NEFT"),
                    bank.get("IMPS"),
                    bank.get("UPI"),
                    bank.get("Mobile Banking"),
                ])

        logging.info(f"Saved {len(data)} banks to CSV")
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
        if not CSV_FILE.exists():
            return None, False

        df = pd.read_csv(CSV_FILE)
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
        
        # Filter for the specific bank (case-insensitive)
        bank_df = df[df['bank_name'].str.contains(bank_name, case=False, na=False)]
        
        if bank_df.empty:
            return None, False

        # Get latest record
        latest = bank_df.sort_values("timestamp", ascending=False).iloc[0]
        status = str(latest.get("upi", "UP")).upper()
        
        current_time = datetime.now()
        stale = (current_time - latest["timestamp"]).total_seconds() / 60 > STALE_THRESHOLD_MINUTES
        
        return status, stale
    except Exception as e:
        logging.error(f"Lookup Error: {e}")
        return None, False

def get_problematic_banks():
    """Returns a list of all banks with UPI issues."""
    try:
        if not CSV_FILE.exists():
            return []

        df = pd.read_csv(CSV_FILE)
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
        df = df.sort_values("timestamp", ascending=False)
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
    """Removes data older than 24 hours from the CSV."""
    try:
        if not CSV_FILE.exists():
            return

        df = pd.read_csv(CSV_FILE)
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')

        cutoff = datetime.now() - timedelta(hours=DATA_RETENTION_HOURS)
        df = df[df['timestamp'] >= cutoff]

        df.to_csv(CSV_FILE, index=False)
        logging.info("Cleanup successful: removed old data.")
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