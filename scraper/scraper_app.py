import os
from flask import Flask, jsonify, render_template, request
import pandas as pd
from datetime import datetime
from apscheduler.schedulers.background import BackgroundScheduler
import atexit

from bank_monitor import fetch_bank_health

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# Point to the shared data folder in NetPaySense
CSV_FILE = os.path.join(BASE_DIR, "..", "data", "bank_health_log2.csv")

STALE_THRESHOLD_MINUTES = 10


# ─────────────────────────────────────────────
# GET BANK STATUS
# ─────────────────────────────────────────────
def get_latest_bank_status(bank_name):
    try:
        if not os.path.exists(CSV_FILE):
            return None

        df = pd.read_csv(CSV_FILE)
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')

        bank_df = df[df['bank_name'] == bank_name]

        if bank_df.empty:
            return None

        latest = bank_df.sort_values("timestamp", ascending=False).iloc[0]

        latest_time = latest["timestamp"]
        current_time = datetime.now()

        stale = False
        if pd.notna(latest_time):
            minutes = (current_time - latest_time).total_seconds() / 60
            stale = minutes > STALE_THRESHOLD_MINUTES

        return {
            "bank": bank_name,
            "status": latest["upi"],
            "timestamp": str(latest_time),
            "stale": stale
        }

    except Exception as e:
        print("API ERROR:", e)
        return None


# ─────────────────────────────────────────────
# API
# ─────────────────────────────────────────────
@app.route("/get-bank-status")
def get_bank_status():
    bank = request.args.get("bank")

    if not bank:
        return jsonify({"error": "Bank not provided"}), 400

    result = get_latest_bank_status(bank)

    if result is None:
        return jsonify({"error": "No data found"}), 404

    return jsonify(result)


# ─────────────────────────────────────────────
# UI
# ─────────────────────────────────────────────
@app.route("/")
def index():
    return render_template("index.html")


# ─────────────────────────────────────────────
# START SCHEDULER
# ─────────────────────────────────────────────
scheduler = BackgroundScheduler(daemon=True)

def start_scheduler():
    print("Starting scheduler...")

    scheduler.add_job(
        fetch_bank_health,
        trigger='interval',
        minutes=1,
        id='bank_job',
        replace_existing=True
    )

    scheduler.start()

    print("Scheduler started (runs every 1 minute)")

    # Run once immediately
    print("Running first scrape...")
    fetch_bank_health()


# ─────────────────────────────────────────────
# MAIN
# ─────────────────────────────────────────────
if __name__ == "__main__":

    # 🔥 CRITICAL FIX (Flask reloader issue)
    if os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        start_scheduler()

    app.run(debug=True, port=5000) # Use different port for scraper UI if needed


# Shutdown cleanly
atexit.register(lambda: scheduler.shutdown())