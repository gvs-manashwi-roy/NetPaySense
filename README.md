# 🛰️ NetPaySense: AI-Powered UPI Reliability Checker (v4.2 Pro)

**NetPaySense** is a real-time diagnostic platform designed to predict the success probability of UPI payments with localized intelligence. It combines **Dual-Model Machine Learning (Neural Networks + KDTree)** with **Live Bank Pulse Monitoring** and **Multilingual v4.2 Localization** to provide a premium, accessible payment safety dashboard.

---

## 🚀 Key Features (v4.2 Pro)
- **🌍 Multilingual Intelligence**: Full native support for **Kannada, Hindi, Tamil, and Telugu**, including localized analytics and recommendations.
- **🎯 Precision Risk Meter**: A state-of-the-art canvas-based gauge providing real-time risk visualization (Low/Medium/High) based on network physics.
- **🗺️ Smart Network Map**: AI-suggested "Better Network Zones" visualized on a live map, recommending the absolute best signal spot within 50 meters.
- **🏦 Real-time Bank Pulse**: Live 60-second health monitoring of major Indian banks (SBI, HDFC, ICICI, etc.) synced via Supabase.
- **🚨 Community Failure Alerts**: Crowd-sourced regional failure detection that warns users if nearby payments are failing in real-time.
- **🗼 Tower Intelligence**: Real-time nearest cell tower detection via OpenCellID API, mapping MNC/MCC codes to major Indian operators (Airtel, Jio, BSNL, Vi) for hyper-local network recommendations.
- **✨ Premium Glassmorphism UI**: A high-end, mobile-first design system with optimized Dark/Light modes and custom-styled localized components.

---

## 🛠️ Technology Stack
- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Database**: [Supabase](https://supabase.com/) (Real-time PostgreSQL)
- **AI/ML Engine**: [PyTorch](https://pytorch.org/) (Neural Feature Mapping) + [KDTree](https://scipy.org/) (Spatial Optimization)
- **GIS Logic**: [GeoPandas](https://geopandas.org/), [Shapely](https://shapely.readthedocs.io/)
- **Frontend**: ES6+ JavaScript, Modern CSS3 (Glassmorphism), [Leaflet.js](https://leafletjs.com/)

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/gvs-manashwi-roy/NetPaySense.git
cd NetPaySense
```

### 2. Set Up Environment
Create a `.env` file in the root directory with your Supabase credentials:
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
OPENCELL_API_KEY=your_API_KEY
```

### 3. Run the Backend
```bash
# Set up virtual environment
python -m venv .venv
source .venv/bin/activate  # Or .venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Start the server
$env:PYTHONPATH="src"; python -m uvicorn src.main:app --host 127.0.0.1 --port 8000 --reload
```

---

## 🔌 API Intelligence
- `POST /predict`: Neural-Spatial prediction. Returns `better_location` for the Smart Map and localized signal tiers.
- `POST /bank-predict`: Hybrid scoring that weights network latency against real-time bank server health.
- `GET /bank-status`: Returns a live JSON feed of bank health statuses persisted in Supabase.
- `GET /pulse-test`: Real-time network probe (speedtest) to verify live latency and operator stats.
- `POST /feedback`: Records local payment outcomes for Reinforcement Learning and Community Alerts.

---

## 🧠 Risk Assessment Logic
The **UPI Success Chance** is determined by a deterministic physics model:
1. **Latency Thresholds**: 
   - < 50ms: Excellent (Green)
   - 100ms - 150ms: Risky (Amber/Yellow)
   - \> 200ms: Critical Failure Risk (Red)
2. **Bandwidth Requirements**: Minimum 1.0 Mbps upload required for consistent payment handshakes.
3. **Smart Optimization**: KDTree identifies the best performance neighbor among the 10 nearest spatial data points.
4. **Bank Override**: High network quality is automatically downgraded if the selected bank's UPI server is reporting `DOWN` or `FLUCTUATING`.
5. **Operator Awareness**: Uses live MNC/MCC data from OpenCellID to identify the nearest operator tower, providing dynamic recommendations (e.g., "Use Airtel") instead of generic suggestions.

---

## 🤝 Contributors
*Developed with ❤️ by the NetPaySense Team. v4.2 Localization by Google DeepMind (Advanced Agentic Coding).*
