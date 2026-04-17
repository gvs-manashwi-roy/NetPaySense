<<<<<<< HEAD
# 🚀 NetPaySense: AI-Powered Network Quality & Payment Risk Predictor

![Signal Strength](https://img.shields.io/badge/Signal-Excellent-brightgreen)
![Risk Level](https://img.shields.io/badge/Risk-Low-blue)
![Python](https://img.shields.io/badge/Python-3.8+-yellow)
![FastAPI](https://img.shields.io/badge/FastAPI-Modern-success)

**NetPaySense** is a state-of-the-art solution designed to bridge the gap between telecom network performance and digital payment reliability. By leveraging real-time signal metrics and historical Ookla performance data, NetPaySense predicts whether a UPI payment is likely to succeed at a specific location.

---

## ✨ Features

- **Live Signal Analysis**: Real-time evaluation of RSRP, RSRQ, and SNR metrics.
- **Geospatial Intelligence**: Uses Nearest-Neighbor search on thousands of Ookla data tiles to find the most accurate local network coverage.
- **Dual-Model Hybrid**:
    - **Model 1 (Ookla NN)**: A Deep Neural Network predicting regional quality from massive datasets.
    - **Model 2 (Signal XGB)**: An XGBoost classifier for precise, device-level signal assessment.
- **Premium Frontend**: A sleek, reactive dashboard with live maps, signal bars, and dynamic risk badges.

---

## 🛠️ Tech Stack

- **Backend**: FastAPI, Uvicorn, Python
- **Machine Learning**: PyTorch (Neural Networks), XGBoost, Scikit-learn
- **Frontend**: Vanilla JavaScript, HTML5, CSS3 (Glassmorphism UI)
- **Data Engineering**: Pandas, KDTree for geospatial lookups

---

## 🚀 How to Execute

### 1. Prerequisites
Ensure you have Python 3.8 or higher installed on your system.

### 2. Installation
Clone the repository and install the required dependencies:
```bash
# Clone the repository
git clone https://github.com/gvs-manashwi-roy/NetPaySense.git
cd NetPaySense

# Install dependencies
pip install -r requirements.txt
```

### 3. Data Setup
> [!IMPORTANT]
> The large data files (`final_dataset.csv`, `.parquet` files) are excluded from the repository. Ensure `final_dataset.csv` is present in the root directory for the app to function.

### 4. Running the Application
Start the NetPaySense engine:
```bash
python main.py
```
The server will start at `http://localhost:8000`.

### 5. Using the UI
Open your browser and navigate to `http://localhost:8000`. You will see the interactive dashboard where you can input location coordinates and signal metrics to get instant predictions.

---

## 📁 Project Structure

- `main.py`: Main entry point (FastAPI server + Logic).
- `models/`: Pre-trained PyTorch and XGBoost models.
- `Frontend/NetPaySense-main/`: Web dashboard source code.
- `requirements.txt`: Project dependencies.
- `preprocessing/`: Scripts for data cleaning and model training (optional to run).

---

## 🤝 Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements.

---

*Developed for the Future of Secure and Reliable Digital Payments.*
=======
# NetPaySense
AI-powered payment reliability prediction system using network intelligence
>>>>>>> frontend-update
