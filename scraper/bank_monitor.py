import time
import csv
import os
import logging
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

# CONFIG
URL = "https://www.iba-banksewa.in/sewa/service-availability"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Point to the shared data folder in NetPaySense
CSV_FILE = os.path.join(BASE_DIR, "..", "data", "bank_health_log2.csv")
LOG_FILE = os.path.join(BASE_DIR, "bank_monitor.log")

# LOGGING
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)


def fetch_bank_health():
    print("Running scraper at:", datetime.now())

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # Chrome options
    options = Options()
    options.add_argument("--headless=new")   # modern headless
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--log-level=3")    # Fatal errors only
    options.add_argument("--disable-logging")
    options.add_experimental_option('excludeSwitches', ['enable-logging'])

    try:
        # ✅ Selenium auto driver (NO webdriver-manager)
        driver = webdriver.Chrome(options=options)

        driver.get(URL)

        wait = WebDriverWait(driver, 30)

        # Wait until table loads
        wait.until(lambda d: d.find_element(By.CSS_SELECTOR, "table"))

        # Scroll to load all rows
        for _ in range(8):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(1.5)

        rows = driver.find_elements(By.CSS_SELECTOR, "table tbody tr")

        print(f"Rows found: {len(rows)}")

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

        # Save to CSV
        file_exists = os.path.isfile(CSV_FILE)

        print("Writing to:", CSV_FILE)

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

        print(f"Saved {len(data)} banks")
        logging.info(f"Saved {len(data)} banks")

        # Cleanup data older than 20 mins
        clean_old_data()

    except Exception as e:
        print("SCRAPER ERROR:", e)
        logging.error(f"Error: {e}")

    finally:
        try:
            driver.quit()
        except:
            pass
        print("Browser closed")

def clean_old_data():
    """Removes data older than 20 minutes from the CSV."""
    import pandas as pd
    from datetime import timedelta
    try:
        if not os.path.exists(CSV_FILE):
            return

        df = pd.read_csv(CSV_FILE)
        if df.empty:
            return

        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
        cutoff = datetime.now() - timedelta(minutes=20)
        
        original_count = len(df)
        df = df[df['timestamp'] >= cutoff]
        
        if len(df) < original_count:
            df.to_csv(CSV_FILE, index=False)
            print(f"Cleaned up {original_count - len(df)} stale rows (older than 20 mins)")
            logging.info(f"Cleanup removed {original_count - len(df)} old rows")

    except Exception as e:
        print("CLEANUP ERROR:", e)
        logging.error(f"Cleanup Error: {e}")

# RUN MANUALLY (for testing)
if __name__ == "__main__":
    fetch_bank_health()