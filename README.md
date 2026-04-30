# 🛰️ NetPaySense: AI-Powered UPI Reliability Checker

**NetPaySense** is a real-time diagnostic tool designed to predict the success probability of UPI payments. It combines **Dual-Model Machine Learning (XGBoost + Neural Networks)** with **Live Bank Server Health Monitoring** and **Community-Driven Regional Alerts** to help users decide if it's safe to proceed with a payment at their current location.

---

## 🚀 Key Features
- **Smart Network Map**: AI-suggested "Better Network Zones" visualized on a live map to help users move to the optimal signal spot.
- **Physics-Based UPI Success Model**: Precision scoring using first-principles physics (explicit latency, upload, and download penalties).
- **Supabase Persistence**: Distributed database integration for robust storage of bank health logs and community feedback.
- **Live Bank Server Scraper**: Real-time health monitoring of major Indian banks, auto-refreshing every minute.
- **Community Alert System**: Crowdsourced reporting that warns users of regional payment failures within a 2km radius.
- **Premium Glassmorphism UI**: A state-of-the-art mobile-first dashboard with dynamic risk gauges and bank health grids.

---

## 🛠️ Technology Stack
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL + Real-time)
- **AI/ML**: [XGBoost](https://xgboost.readthedocs.io/), [PyTorch](https://pytorch.org/)
- **Data & GIS**: [GeoPandas](https://geopandas.org/), [Shapely](https://shapely.readthedocs.io/), [KDTree](https://scipy.org/)
- **Frontend**: Vanilla JavaScript (ES6+), CSS3 (Modern Glassmorphism), HTML5
- **Mapping**: [Leaflet.js](https://leafletjs.com/) (CDN via cdnjs)

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/gvs-manashwi-roy/NetPaySense.git
cd NetPaySense
```

### 2. Set Up Environment
Create a `.env` file in the root directory:
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENCELL_API_KEY=your_API_KEY
```

### 3. Set Up Virtual Environment
```bash
python -m venv .venv
# On Windows:
.venv\Scripts\activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

---

## 🏃 How to Run

1. **Start the FastAPI Server**:
   ```bash
   $env:PYTHONPATH="src"; python -m uvicorn src.main:app --host 127.0.0.1 --port 8000 --reload
   ```
2. **Open the App**:
   Navigate to **[http://127.0.0.1:8000](http://127.0.0.1:8000)** in your browser.

---

## 🔌 API Endpoints
- `POST /predict`: Spatial-ML prediction using physics-based scoring. Returns `better_location` for the Smart Map.
- `POST /bank-predict`: Hybrid scoring that weights network quality against real-time bank server health.
- `GET /bank-status`: Returns a live JSON feed of bank health statuses persisted in Supabase.
- `GET /pulse-test`: Real-time network probe (speedtest) to verify live conditions.
- `POST /feedback`: Records local payment outcomes for the Community Alert system.

---

## 🧠 Model Logic & Risk Assessment
The **UPI Success Chance** is a deterministic model based on network physics:
1. **Latency Penalty**: Sub-50ms is ideal; >200ms triggers a near-certain timeout warning.
2. **Bandwidth Checks**: Requires minimum 2Mbps upload for stable UPI handshakes.
3. **Smart Optimization**: If the current spot is poor, the KDTree identifies the best performance neighbor within the 10 nearest data points.
4. **Bank Override**: Detects server-side downtime (e.g., SBI or HDFC outages) to prevent user frustration.

---

## 🤝 Contributors
*Developed with ❤️ by the NetPaySense Team.*
