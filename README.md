# 🛰️ NetPaySense: AI-Powered UPI Reliability Checker

**NetPaySense** is a real-time diagnostic tool designed to predict the success probability of UPI payments. It combines **Dual-Model Machine Learning (XGBoost + Neural Networks)** with **Live Bank Server Health Monitoring** and **Community-Driven Regional Alerts** to help users decide if it's safe to proceed with a payment at their current location.

---

## 🚀 Key Features
- **Dual AI Network Prediction**: Hybrid analysis using Ookla-trained Neural Networks and local XGBoost signal models.
- **Live Bank Server Scraper**: Real-time health monitoring of major Indian banks, auto-refreshing every minute.
- **Community Alert System**: Crowdsourced reporting that warns users of regional payment failures within a 1km radius.
- **Premium Glassmorphism UI**: A state-of-the-art mobile-first dashboard with dynamic risk gauges and bank health grids.
- **Smart GPS Integration**: Instantly fetch live coordinates and reverse-geocode area names for precise local diagnostics.

---

## 🛠️ Technology Stack
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **AI/ML**: [XGBoost](https://xgboost.readthedocs.io/), [PyTorch](https://pytorch.org/), [Scikit-learn](https://scikit-learn.org/)
- **Data & GIS**: [GeoPandas](https://geopandas.org/), [Shapely](https://shapely.readthedocs.io/), [KDTree](https://scipy.org/)
- **Frontend**: Vanilla JavaScript (ES6+), CSS3 (Modern Glassmorphism), HTML5
- **Mapping**: [Leaflet.js](https://leafletjs.com/) & OpenStreetMap
- **Automation**: [APScheduler](https://apscheduler.readthedocs.io/) for background bank status scraping.

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/gvs-manashwi-roy/NetPaySense.git
cd NetPaySense
```

### 2. Set Up Virtual Environment
```bash
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install fastapi uvicorn xgboost scikit-learn torch pydantic pandas numpy geopandas shapely apscheduler requests
```

---

## 🏃 How to Run

1. **Start the FastAPI Server**:
   ```bash
   python -m uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
   ```
2. **Open the App**:
   Navigate to **[http://localhost:8000](http://localhost:8000)** in your browser.

---

## 🔌 API Endpoints
- `POST /predict`: Spatial-ML prediction combining KDTree lookup with NN/XGBoost quality models. Includes `community_alert` checks.
- `POST /bank-predict`: Hybrid scoring that weights network quality against real-time bank server health.
- `GET /bank-status`: Returns a live JSON feed of all bank health statuses from the automated scraper.
- `POST /feedback`: Endpoint for the Community Alert system to record local payment outcomes.
- `GET /docs`: Full interactive API documentation (Swagger UI).

---

## 🧠 Model Logic & Risk Assessment
The final **UPI Success Chance** is a hybrid score calculated by:
1. **Network Quality**: Neural Network analysis of local Ookla tiles.
2. **Community Feedback**: Regional failure reports reported within the last 30 minutes.
3. **Bank Health**: If a bank server is detected as **DOWN** or **FLUCTUATING**, it overrides the network score to force a "High Risk" warning.

---

## 🤝 Contributors
*Developed with ❤️ by the NetPaySense Team.*
