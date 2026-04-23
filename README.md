# 🛰️ NetPaySense: AI-Powered UPI Reliability Checker

**NetPaySense** is a real-time diagnostic tool designed to predict the success probability of UPI payments. It combines **Machine Learning (XGBoost/Neural Networks)** with **Live Bank Server Status** to help users decide if it's safe to proceed with a payment at their current location.

---

## 🚀 Key Features
- **AI Network Prediction**: Uses trained models to analyze signal strength, latency, and download speeds to predict network quality.
- **Smart Bank Selection**: Choose your payment bank once, and get tailored success rates for that specific bank's server.
- **Real-Time GPS Integration**: Instantly fetch your live coordinates and area name to run local diagnostics.
- **Dynamic Risk Meter**: A visual gauge that shows "High," "Moderate," or "Low" risk based on combined network and bank data.
- **Privacy First**: Designed for local diagnostics with clear data transparency.

---

## 🛠️ Technology Stack
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
- **AI/ML**: [XGBoost](https://xgboost.readthedocs.io/), [PyTorch](https://pytorch.org/), [Scikit-learn](https://scikit-learn.org/)
- **Frontend**: Vanilla JavaScript, CSS3 (Modern Glassmorphism Design), HTML5
- **Mapping**: [Leaflet.js](https://leafletjs.com/) & OpenStreetMap

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/gvs-manashwi-roy/NetPaySense.git
cd NetPaySense
```

### 2. Set Up Virtual Environment (Recommended)
```bash
python -m venv .venv
# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate
```

### 3. Install Dependencies
```bash
pip install fastapi uvicorn xgboost scikit-learn torch pydantic
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
- `POST /predict`: Sends network parameters to the AI model for quality prediction.
- `POST /bank-predict`: Combines network scores with bank server status (UP/FLUCTUATING/DOWN) for a final success rate.
- `GET /banks`: Fetches the current list of supported banks and their simulated live status.
- `GET /docs`: Interactive Swagger UI for testing all endpoints.

---

## 🧠 Model Logic (Combined Score)
The final **UPI Success Chance** is calculated using a multiplier based on the bank's health:
- **UP**: 100% of the Network Score.
- **FLUCTUATING**: 60% of the Network Score (40% penalty).
- **DOWN**: Forced to **1.5%** success rate (High Risk).

---

## 🤝 Contributors
*Developed with ❤️ by the NetPaySense Team.*
