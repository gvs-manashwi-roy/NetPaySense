
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
def classify_network(download, upload, latency):

    # GOOD
    if latency <= 60 and download >= 12 and upload >= 3:
        return 2

    # MODERATE
    elif latency <= 110 and download >= 3 and upload >= 0.8:
        return 1

    # POOR
    else:
        return 0

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
    # Path adjustment for data/ folder
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", "final_dataset.csv")
    df = pd.read_csv(data_path)

    # Cleaning rules
    df = df[df['avg_d_kbps'] > 0]
    df = df[df['avg_lat_ms'] > 0]

    # Feature conversion
    df['download_mbps'] = df['avg_d_kbps'] / 1000
    df['upload_mbps'] = df['avg_u_kbps'] / 1000
    df['latency_ms'] = df['avg_lat_ms']

    # Label generation
    df['target'] = df.apply(lambda row: classify_network(row['download_mbps'], row['upload_mbps'], row['latency_ms']), axis=1)

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
    val_ds = TensorDataset(torch.tensor(X_test_scaled, dtype=torch.float32), torch.tensor(y_test.values, dtype=torch.long))
    
    train_loader = DataLoader(train_ds, batch_size=64, shuffle=True)
    val_loader = DataLoader(val_ds, batch_size=64, shuffle=False)

    model = OoklaNN(input_size=len(features))
    criterion = nn.CrossEntropyLoss(weight=class_weights_tensor)
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    # For visualization
    train_losses = []
    val_losses = []
    val_accuracies = []

    from sklearn.metrics import classification_report, accuracy_score

    print("Training loop starting...")
    for epoch in range(25):
        model.train()
        epoch_train_loss = 0
        for batch_x, batch_y in train_loader:
            optimizer.zero_grad()
            outputs = model(batch_x)
            loss = criterion(outputs, batch_y)
            loss.backward()
            optimizer.step()
            epoch_train_loss += loss.item()
        
        # Validation
        model.eval()
        epoch_val_loss = 0
        all_preds = []
        all_labels = []
        with torch.no_grad():
            for batch_x, batch_y in val_loader:
                outputs = model(batch_x)
                loss = criterion(outputs, batch_y)
                epoch_val_loss += loss.item()
                
                _, predicted = torch.max(outputs.data, 1)
                all_preds.extend(predicted.numpy())
                all_labels.extend(batch_y.numpy())
        
        train_losses.append(epoch_train_loss / len(train_loader))
        val_losses.append(epoch_val_loss / len(val_loader))
        epoch_acc = accuracy_score(all_labels, all_preds)
        val_accuracies.append(epoch_acc)
        
        print(f"Epoch {epoch+1}/25 - Loss: {val_losses[-1]:.4f} | Accuracy: {epoch_acc*100:.2f}%")

    # Final Detailed Report
    print("\n" + "="*30)
    print("FINAL CLASSIFICATION REPORT")
    print("="*30)
    print(classification_report(all_labels, all_preds, target_names=['Poor', 'Moderate', 'Good']))

    # Plotting
    import matplotlib.pyplot as plt
    fig, ax1 = plt.subplots(figsize=(10, 6))

    ax1.set_xlabel('Epochs')
    ax1.set_ylabel('Loss', color='#ef4444')
    ax1.plot(train_losses, label='Train Loss', color='#ef4444', alpha=0.4, linestyle='--')
    ax1.plot(val_losses, label='Val Loss', color='#ef4444', linewidth=2)
    ax1.tick_params(axis='y', labelcolor='#ef4444')

    ax2 = ax1.twinx()
    ax2.set_ylabel('Accuracy (%)', color='#2563eb')
    ax2.plot([a*100 for a in val_accuracies], label='Val Accuracy', color='#2563eb', linewidth=2)
    ax2.tick_params(axis='y', labelcolor='#2563eb')

    plt.title('NetPaySense: Training Performance', fontsize=14, fontweight='bold')
    fig.legend(loc='upper right', bbox_to_anchor=(1,1), bbox_transform=ax1.transAxes)
    plt.grid(alpha=0.3)
    
    model_dir = os.path.join(os.path.dirname(__file__), "..", "models")
    os.makedirs(model_dir, exist_ok=True)
    plt.savefig(os.path.join(model_dir, 'training_metrics.png'))
    print(f"\nMetrics graph saved to models/training_metrics.png")

    # Save
    torch.save(model.state_dict(), os.path.join(model_dir, 'ookla_nn.pth'))
    joblib.dump(scaler, os.path.join(model_dir, 'ookla_scaler.pkl'))
    print("Model 1 saved.")

def train_signal_model():
    print("\nTraining Model 2 (Signal Strength)...")
    # Path adjustment for data/ folder
    data_path = os.path.join(os.path.dirname(__file__), "..", "data", "df_anonymized.csv")
    df = pd.read_csv(data_path)

    # Mapping based on typical signal values in that dataset
    df['download_mbps'] = df['Downstream Bandwidth'] / 1000
    
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
    model_dir = os.path.join(os.path.dirname(__file__), "..", "models")
    joblib.dump(model, os.path.join(model_dir, 'signal_xgb.pkl'))
    print("Model 2 saved.")

if __name__ == "__main__":
    train_ookla_model()
    train_signal_model()
