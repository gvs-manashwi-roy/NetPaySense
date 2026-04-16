
import pandas as pd
import numpy as np
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.utils.class_weight import compute_class_weight
from xgboost import XGBClassifier
import joblib
import os

# --- LOGIC ---
def classify_network(download, latency):
    if download >= 25 and latency <= 40:
        return 2   # Good
    elif download >= 5 and latency <= 100:
        return 1   # Moderate
    else:
        return 0   # Poor

# --- MODEL 1: OOKLA NN ARCHITECTURE ---
class OoklaNN(nn.Module):
    def __init__(self, input_size):
        super(OoklaNN, self).__init__()
        self.network = nn.Sequential(
            nn.Linear(input_size, 64),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(32, 16),
            nn.ReLU(),
            nn.Linear(16, 3) # 3 classes: Poor, Moderate, Good
        )

    def forward(self, x):
        return self.network(x)

def train_ookla_model():
    print("Training Model 1 (Ookla QoS)...")
    df = pd.read_csv("final_dataset.csv")

    # Cleaning rules
    df = df[df['avg_d_kbps'] > 0]
    df = df[df['avg_lat_ms'] > 0]

    # Feature conversion
    df['download_mbps'] = df['avg_d_kbps'] / 1000
    df['upload_mbps'] = df['avg_u_kbps'] / 1000
    df['latency_ms'] = df['avg_lat_ms']

    # Label generation
    df['target'] = df.apply(lambda row: classify_network(row['download_mbps'], row['latency_ms']), axis=1)

    features = ['download_mbps', 'upload_mbps', 'latency_ms', 'lat', 'lon']
    X = df[features]
    y = df['target']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    # Class weights
    class_weights = compute_class_weight('balanced', classes=np.unique(y_train), y=y_train)
    class_weights_tensor = torch.tensor(class_weights, dtype=torch.float32)

    # PyTorch Tensors
    train_ds = TensorDataset(torch.tensor(X_train_scaled, dtype=torch.float32), torch.tensor(y_train.values, dtype=torch.long))
    train_loader = DataLoader(train_ds, batch_size=64, shuffle=True)

    model = OoklaNN(input_size=len(features))
    criterion = nn.CrossEntropyLoss(weight=class_weights_tensor)
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    # Training loop (15 epochs)
    for epoch in range(15):
        model.train()
        for batch_x, batch_y in train_loader:
            optimizer.zero_grad()
            outputs = model(batch_x)
            loss = criterion(outputs, batch_y)
            loss.backward()
            optimizer.step()
        print(f"Epoch {epoch+1}/15 complete.")

    # Save
    torch.save(model.state_dict(), 'ookla_nn.pth')
    joblib.dump(scaler, 'ookla_scaler.pkl')
    print("Model 1 saved.")

def train_signal_model():
    print("\nTraining Model 2 (Signal Strength)...")
    # Tweak: Use df_anonymized.csv
    df = pd.read_csv(os.path.join("network_dataset", "df_anonymized.csv"))

    # Mapping based on typical signal values in that dataset
    # Note: df_anonymized has 'Downstream Bandwidth' in kbps
    df['download_mbps'] = df['Downstream Bandwidth'] / 1000
    
    # We'll use a simplified latency or assume it's moderate if not present
    # Actually, df_anonymized doesn't have Latency, so we use a signal-based label logic
    # RSRP > -80 and RSRQ > -10 => Good
    def classify_signal(rsrp, rsrq):
        if rsrp > -85 and rsrq > -12: return 2
        if rsrp > -105 and rsrq > -16: return 1
        return 0

    df['target'] = df.apply(lambda row: classify_signal(row['RSRP LTE'], row['RSRQ LTE']), axis=1)

    features = ['RSRP LTE', 'RSRQ LTE', 'SNR LTE', 'CQI LTE', 'dBm']
    df = df.dropna(subset=features)
    X = df[features]
    y = df['target']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

    model = XGBClassifier(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
    model.fit(X_train, y_train)

    # Save
    joblib.dump(model, 'signal_xgb.pkl')
    print("Model 2 saved.")

if __name__ == "__main__":
    train_ookla_model()
    train_signal_model()
