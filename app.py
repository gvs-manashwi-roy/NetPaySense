from flask import Flask, jsonify, request, render_template
import pandas as pd
import os
from datetime import datetime, timedelta

app = Flask(__name__)

CSV_FILE = "bank_health_log2.csv"

STALE_THRESHOLD_MINUTES = 10
DATA_RETENTION_HOURS = 24


def clean_old_data():
    try:
        if not os.path.exists(CSV_FILE):
            return

        df = pd.read_csv(CSV_FILE)
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')

        cutoff = datetime.now() - timedelta(hours=DATA_RETENTION_HOURS)
        df = df[df['timestamp'] >= cutoff]

        df.to_csv(CSV_FILE, index=False)

    except Exception as e:
        print("Cleanup error:", e)


def get_latest_upi_status(bank_name):
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

        stale = (current_time - latest_time).total_seconds() / 60 > STALE_THRESHOLD_MINUTES

        return {
            "status": latest["upi"],
            "stale": stale,
            "timestamp": str(latest_time)
        }

    except Exception as e:
        return {"error": str(e)}


@app.route("/get-upi-status")
def get_upi_status():
    bank = request.args.get("bank")

    if not bank:
        return jsonify({"error": "Bank not provided"}), 400

    result = get_latest_upi_status(bank)

    if result is None:
        return jsonify({"error": "No data found"}), 404

    return jsonify(result)


@app.route("/")
def index():
    return render_template("index.html")


if __name__ == "__main__":
    clean_old_data()
    app.run(debug=True)