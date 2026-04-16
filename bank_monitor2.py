from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import csv
import os
import smtplib
from datetime import datetime
from email.mime.text import MIMEText

# ─────────────────────────────────────────────
# CONFIG
# ─────────────────────────────────────────────
URL      = "https://www.iba-banksewa.in/sewa/service-availability"
LOG_FILE = "bank_health_log.csv"

EMAIL_ENABLED = False
EMAIL_FROM    = "you@gmail.com"
EMAIL_TO      = "you@gmail.com"
EMAIL_PASS    = "your_app_password"

# ─────────────────────────────────────────────
# EMAIL ALERT
# ─────────────────────────────────────────────
def send_email_alert(down_banks):
    if not EMAIL_ENABLED:
        return
    try:
        body = "The following banks have services DOWN:\n\n"
        for entry in down_banks:
            body += f"  - {entry}\n"
        body += f"\nChecked at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"

        msg = MIMEText(body)
        msg["Subject"] = "ALERT: Bank Services DOWN - IBA Sewa"
        msg["From"]    = EMAIL_FROM
        msg["To"]      = EMAIL_TO

        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(EMAIL_FROM, EMAIL_PASS)
            server.send_message(msg)

        print(f"Alert email sent to {EMAIL_TO}")

    except Exception as e:
        print(f"Email failed: {e}")

# ─────────────────────────────────────────────
# SAVE TO CSV
# ─────────────────────────────────────────────
def save_to_csv(banks_data, timestamp):
    file_exists = os.path.isfile(LOG_FILE)

    with open(LOG_FILE, "a", newline="", encoding="utf-8") as f:
        writer = csv.writer(f)

        if not file_exists:
            writer.writerow([
                "timestamp", "bank_name",
                "internet_banking", "rtgs", "neft",
                "imps", "upi", "mobile_banking"
            ])

        for bank in banks_data:
            writer.writerow([
                timestamp,
                bank["bank_name"],
                bank.get("Internet Banking", "?"),
                bank.get("RTGS", "?"),
                bank.get("NEFT", "?"),
                bank.get("IMPS", "?"),
                bank.get("UPI", "?"),
                bank.get("Mobile Banking", "?"),
            ])

    print(f"Logged {len(banks_data)} banks to {LOG_FILE}")

# ─────────────────────────────────────────────
# MAIN SCRAPER
# ─────────────────────────────────────────────
def fetch_bank_health():
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"\n[{timestamp}] Starting browser scrape...")

    options = Options()
    options.add_argument("--headless")   # remove this if debugging
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124.0.0.0 Safari/537.36"
    )

    driver = webdriver.Chrome(options=options)

    try:
        print(f"Loading {URL} ...")
        driver.get(URL)

        wait = WebDriverWait(driver, 30)

        # ✅ WAIT FOR ACTUAL DATA (not just table)
        wait.until(lambda d: len(d.find_elements(By.CSS_SELECTOR, "table tbody tr")) > 0)

        rows = driver.find_elements(By.CSS_SELECTOR, "table tbody tr")
        print(f"Found {len(rows)} banks")

        banks_data  = []
        down_alerts = []
        services    = ["Internet Banking", "RTGS", "NEFT", "IMPS", "UPI", "Mobile Banking"]

        print(f"\n{'─'*70}")
        print(f"{'Bank':<30} {'IB':<6} {'RTGS':<6} {'NEFT':<6} {'IMPS':<6} {'UPI':<6} {'MB':<6}")
        print(f"{'─'*70}")

        for row in rows:
            cells = row.find_elements(By.TAG_NAME, "td")
            if not cells:
                continue

            bank_name = cells[0].text.strip()
            if not bank_name:
                continue

            bank = {"bank_name": bank_name}
            row_display = f"{bank_name:<30}"

            for i, service in enumerate(services):
                if i + 1 < len(cells):
                    cell = cells[i + 1]
                    html = cell.get_attribute("innerHTML").lower()

                    if any(x in html for x in ["unavailable", "fa-times", "close", "error"]):
                        status = "DOWN"
                        down_alerts.append(f"{bank_name} - {service}")
                    elif any(x in html for x in ["fluctuation", "warning", "scheduled"]):
                        status = "FLUCTUATING"
                    else:
                        status = "UP"

                    bank[service] = status
                    icon = "RED" if status == "DOWN" else "YLW" if status == "FLUCTUATING" else "OK"
                    row_display += f" {icon:<5}"
                else:
                    bank[service] = "?"
                    row_display += f" {'?':<5}"

            print(row_display)
            banks_data.append(bank)

        print(f"{'─'*70}")

        # Last updated time
        try:
            last_updated = driver.find_element(By.XPATH, "//*[contains(text(), 'Last Updated')]")
            print(f"\n{last_updated.text}")
        except:
            pass

        if down_alerts:
            print(f"\nALERT: {len(down_alerts)} service(s) are DOWN!")
            for alert in down_alerts:
                print(f"   DOWN: {alert}")
            send_email_alert(down_alerts)
        else:
            print("\nAll bank services are operational!")

        save_to_csv(banks_data, timestamp)
        return banks_data

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return None

    finally:
        driver.quit()
        print("Browser closed.")


if __name__ == "__main__":
    fetch_bank_health()
    input("\nPress Enter to exit...")