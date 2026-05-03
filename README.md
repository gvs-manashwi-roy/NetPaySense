---
title: NetPaySense API
emoji: 🛰️
colorFrom: blue
colorTo: indigo
sdk: docker
pinned: false
app_port: 7860
---

# 🛰️ NetPaySense: AI-Powered UPI Reliability Checker (v5.2 Edge Edition)

**NetPaySense** is a real-time diagnostic platform designed to predict the success probability of UPI payments with localized intelligence. It combines **Dual-Model Machine Learning (Neural Networks + KDTree)**, **Live Bank Pulse Monitoring**, and a **Cloudflare Global Edge Speed Test** to provide a premium, accessible payment safety dashboard.

---

## 🚀 Key Features (v5.2)

- **⚡ Global Edge Speed Test (New in v5.2)**: Completely bypasses slow cloud server bottlenecks by utilizing Cloudflare's massive Anycast edge network (`speed.cloudflare.com`). Delivers Fast.com-level accuracy (100+ Mbps) and pure local network latency (~30ms) directly from the mobile browser.
- **🌍 Multilingual Intelligence**: Full native support for **Kannada, Hindi, Tamil, and Telugu**, including localized analytics and dynamic UI recommendations.
- **🎯 Precision Risk Meter**: A state-of-the-art canvas-based gauge providing real-time risk visualization (Low/Medium/High) based on real-world network physics.
- **🗺️ Smart Network Map**: AI-suggested "Better Network Zones" visualized on a live map, recommending the absolute best signal spot within 50 meters.
- **🏦 Real-time Bank Pulse**: Live 15-minute background health monitoring of major Indian banks (SBI, HDFC, ICICI, etc.) synced seamlessly via Supabase.
- **🚨 Community Failure Alerts**: Crowd-sourced regional failure detection that warns users if nearby payments are failing in real-time.
- **🗼 Dynamic Tower Intelligence**: Real-time nearest cell tower detection via OpenCellID API, mapping MNC/MCC codes to major Indian operators (Airtel, Jio, BSNL, Vi) for hyper-local network switching recommendations.
- **✨ Premium Glassmorphism UI**: A high-end, native-app-like mobile-first design system with optimized Dark/Light modes.

---

## 🛠️ Technology Stack

- **Backend**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+) with Uvicorn
- **Database**: [Supabase](https://supabase.com/) (Real-time PostgreSQL)
- **AI/ML Engine**: [scikit-learn](https://scikit-learn.org/) (Neural Feature Scaling) + [KDTree](https://scipy.org/) (Spatial Optimization)
- **GIS Logic**: [GeoPandas](https://geopandas.org/), [Shapely](https://shapely.readthedocs.io/)
- **Frontend**: Vanilla ES6+ JavaScript, Modern CSS3 (Glassmorphism), [Leaflet.js](https://leafletjs.com/) for mapping.
- **Diagnostics**: Cloudflare Edge Network (`1.1.1.1` trace & `speed.cloudflare.com` payloads)

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/gvs-manashwi-roy/NetPaySense.git
cd NetPaySense
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory with your required credentials:
```bash
# Required for database connections
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

# Required for dynamic mobile operator tower tracking
OPENCELL_API_KEY=your_API_KEY
```

### 3. Run the Backend
```bash
# Set up a virtual environment
python -m venv .venv
source .venv/bin/activate  # Or .venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Start the server (runs on port 7860 to match Hugging Face standard)
$env:PYTHONPATH="src"; python -m uvicorn src.main:app --host 0.0.0.0 --port 7860 --reload
```

---

## 🔌 API Intelligence

- `POST /predict`: Neural-Spatial prediction. Calculates overall UPI success probability based on Edge Ping and Download/Upload bandwidth. Returns `better_location` for the Smart Map.
- `POST /bank-predict`: Hybrid scoring that downgrades network reliability if real-time bank server health is struggling.
- `GET /bank-status`: Returns a live JSON feed of bank health statuses scraped and persisted in Supabase.
- `GET /test-download` & `POST /test-upload`: Legacy backend speed endpoints (now superseded by client-side Cloudflare tests, kept for system health diagnostics).
- `POST /feedback`: Records local payment outcomes for Community Alerts and future Reinforcement Learning.

---

## 🧠 Risk Assessment Logic

The **UPI Success Chance** is determined by a deterministic physics and probability model:
1. **Edge Latency Thresholds**: 
   - < 50ms: Excellent (Green)
   - 100ms - 150ms: Risky (Amber/Yellow)
   - \> 200ms: Critical Failure Risk (Red)
2. **Bandwidth Requirements**: Minimum 1.0 Mbps upload required for consistent, timeout-free payment handshakes.
3. **Smart Spatial Optimization**: KDTree identifies the best performance neighbor among the 10 nearest spatial data points to suggest physical movement for better signal.
4. **Bank Server Override**: High network quality is automatically and drastically downgraded if the selected bank's UPI server is reporting `DOWN` or `FLUCTUATING` from the background scraper.
5. **Operator Awareness**: Uses live MNC/MCC data from OpenCellID to identify the nearest operator tower, providing dynamic switching recommendations (e.g., "Switch to Airtel") instead of generic suggestions.

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).

---

## 🤝 Contributors
*Developed with ❤️ by the NetPaySense Team. Architecture optimizations (v4 - v5.2) designed in collaboration with Google DeepMind (Advanced Agentic Coding).*
