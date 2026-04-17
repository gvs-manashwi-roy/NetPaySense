import time
import csv
import os
import logging
from datetime import datetime

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait

# ─────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────
URL = "https://www.iba-banksewa.in/sewa/service-availability"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_FILE = os.path.join(BASE_DIR, "bank_health_log1.csv")
LOG_FILE = os.path.join(BASE_DIR, "bank_monitor1.log")

# ─────────────────────────────────────────────
# LOGGING
# ─────────────────────────────────────────────
logging.basicConfig(
    filename=LOG_FILE,
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# ─────────────────────────────────────────────
# MAIN FUNCTION
# ─────────────────────────────────────────────
def fetch_bank_health():
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logging.info("Starting scrape...")

    options = Options()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")

    # 🔥 suppress chrome errors
    options.add_argument("--log-level=3")
    options.add_argument("--disable-logging")
    options.add_experimental_option("excludeSwitches", ["enable-logging"])

    driver = webdriver.Chrome(options=options)

    try:
        driver.get(URL)

        wait = WebDriverWait(driver, 30)

        # Wait for table
        wait.until(lambda d: d.find_element(By.CSS_SELECTOR, "table"))

        # Scroll to load more rows
        last_height = driver.execute_script("return document.body.scrollHeight")

        for _ in range(10):
            driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
            time.sleep(2)

            new_height = driver.execute_script("return document.body.scrollHeight")
            if new_height == last_height:
                break
            last_height = new_height

        time.sleep(3)

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
        file_exists = os.path.isfile(CSV_FILE)

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

    except Exception as e:
        logging.error(f"Error: {e}")

    finally:
        driver.quit()
        logging.info("Browser closed")


# ─────────────────────────────────────────────
# ENTRY POINT
# ─────────────────────────────────────────────
if __name__ == "__main__":
    fetch_bank_health()