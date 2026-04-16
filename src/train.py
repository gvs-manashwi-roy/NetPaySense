from preprocess import preprocess_data
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report, classification_report
from xgboost import XGBClassifier
import joblib
import pandas as pd
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset, WeightedRandomSampler
from imblearn.over_sampling import SMOTE

class SimpleNN(nn.Module):
    def __init__(self, input_size, num_classes):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(input_size, 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, num_classes)
        self.relu = nn.ReLU()
        self.dropout = nn.Dropout(0.2)

    def forward(self, x):
        x = self.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.relu(self.fc2(x))
        x = self.dropout(x)
        x = self.fc3(x)
        return x

def train_models():
    X_train, X_test, y_quality_train, y_quality_test, y_risk_train, y_risk_test = preprocess_data()

    # Get feature names after preprocessing
    feature_names = X_train.columns.tolist()

    # Models for Network Quality
    rf_quality = RandomForestClassifier(random_state=42)
    rf_quality.fit(X_train, y_quality_train)
    y_pred_rf_quality = rf_quality.predict(X_test)
    acc_rf_quality = accuracy_score(y_quality_test, y_pred_rf_quality)
    print(f"Random Forest Network Quality Accuracy: {acc_rf_quality:.4f}")
    print("Confusion Matrix:")
    print(confusion_matrix(y_quality_test, y_pred_rf_quality))

    xgb_quality = XGBClassifier(random_state=42)
    xgb_quality.fit(X_train, y_quality_train)
    y_pred_xgb_quality = xgb_quality.predict(X_test)
    acc_xgb_quality = accuracy_score(y_quality_test, y_pred_xgb_quality)
    print(f"XGBoost Network Quality Accuracy: {acc_xgb_quality:.4f}")
    print("Confusion Matrix:")
    print(confusion_matrix(y_quality_test, y_pred_xgb_quality))

    # Models for Payment Risk
    rf_risk = RandomForestClassifier(random_state=42)
    rf_risk.fit(X_train, y_risk_train)
    y_pred_rf_risk = rf_risk.predict(X_test)
    acc_rf_risk = accuracy_score(y_risk_test, y_pred_rf_risk)
    print(f"Random Forest Payment Risk Accuracy: {acc_rf_risk:.4f}")
    print("Confusion Matrix:")
    print(confusion_matrix(y_risk_test, y_pred_rf_risk))
    print("Classification Report:")
    print(classification_report(y_risk_test, y_pred_rf_risk, target_names=['Low', 'Medium', 'High']))

    xgb_risk = XGBClassifier(random_state=42)
    xgb_risk.fit(X_train, y_risk_train)
    y_pred_xgb_risk = xgb_risk.predict(X_test)
    acc_xgb_risk = accuracy_score(y_risk_test, y_pred_xgb_risk)
    print(f"XGBoost Payment Risk Accuracy: {acc_xgb_risk:.4f}")
    print("Confusion Matrix:")
    print(confusion_matrix(y_risk_test, y_pred_xgb_risk))
    print("Classification Report:")
    print(classification_report(y_risk_test, y_pred_xgb_risk, target_names=['Low', 'Medium', 'High']))

    # Feature Importances
    print("\nFeature Importances for Network Quality:")
    print("Random Forest:")
    rf_quality_importances = pd.DataFrame({'Feature': feature_names, 'Importance': rf_quality.feature_importances_})
    rf_quality_importances = rf_quality_importances.sort_values('Importance', ascending=False)
    print(rf_quality_importances)

    print("XGBoost:")
    xgb_quality_importances = pd.DataFrame({'Feature': feature_names, 'Importance': xgb_quality.feature_importances_})
    xgb_quality_importances = xgb_quality_importances.sort_values('Importance', ascending=False)
    print(xgb_quality_importances)

    print("\nFeature Importances for Payment Risk:")
    print("Random Forest:")
    rf_risk_importances = pd.DataFrame({'Feature': feature_names, 'Importance': rf_risk.feature_importances_})
    rf_risk_importances = rf_risk_importances.sort_values('Importance', ascending=False)
    print(rf_risk_importances)

    print("XGBoost:")
    xgb_risk_importances = pd.DataFrame({'Feature': feature_names, 'Importance': xgb_risk.feature_importances_})
    xgb_risk_importances = xgb_risk_importances.sort_values('Importance', ascending=False)
    print(xgb_risk_importances)

    # Neural Network for Network Quality
    print("\nTraining Neural Network for Network Quality...")
    X_train_tensor = torch.tensor(X_train.values, dtype=torch.float32)
    y_quality_train_tensor = torch.tensor(y_quality_train, dtype=torch.long)
    X_test_tensor = torch.tensor(X_test.values, dtype=torch.float32)
    y_quality_test_tensor = torch.tensor(y_quality_test, dtype=torch.long)

    train_dataset = TensorDataset(X_train_tensor, y_quality_train_tensor)
    train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)

    nn_quality = SimpleNN(X_train.shape[1], 3)
    criterion = nn.CrossEntropyLoss()
    optimizer = optim.Adam(nn_quality.parameters(), lr=0.001)

    for epoch in range(100):
        nn_quality.train()
        for inputs, labels in train_loader:
            optimizer.zero_grad()
            outputs = nn_quality(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

    nn_quality.eval()
    with torch.no_grad():
        outputs = nn_quality(X_test_tensor)
        _, y_pred_nn_quality = torch.max(outputs, 1)
        acc_nn_quality = accuracy_score(y_quality_test, y_pred_nn_quality.numpy())
        print(f"Neural Network Network Quality Accuracy: {acc_nn_quality:.4f}")
        print("Confusion Matrix:")
        print(confusion_matrix(y_quality_test, y_pred_nn_quality.numpy()))

    # Neural Network for Payment Risk with improvements
    print("\nTraining Improved Neural Network for Payment Risk...")
    smote = SMOTE(random_state=42)
    X_train_smote, y_risk_train_smote = smote.fit_resample(X_train.values, y_risk_train)

    X_train_tensor = torch.tensor(X_train_smote, dtype=torch.float32)
    y_risk_train_tensor = torch.tensor(y_risk_train_smote, dtype=torch.long)
    X_test_tensor = torch.tensor(X_test.values, dtype=torch.float32)
    y_risk_test_tensor = torch.tensor(y_risk_test, dtype=torch.long)

    # Class weights for imbalanced loss
    class_counts = torch.bincount(y_risk_train_tensor)
    class_weights = 1.0 / class_counts.float()
    class_weights = class_weights / class_weights.sum() * len(class_weights)
    criterion = nn.CrossEntropyLoss(weight=class_weights)

    train_dataset_risk = TensorDataset(X_train_tensor, y_risk_train_tensor)
    train_loader_risk = DataLoader(train_dataset_risk, batch_size=32, shuffle=True)

    nn_risk = SimpleNN(X_train.shape[1], 3)
    optimizer_risk = optim.Adam(nn_risk.parameters(), lr=0.001)

    for epoch in range(150):  # Increased epochs
        nn_risk.train()
        for inputs, labels in train_loader_risk:
            optimizer_risk.zero_grad()
            outputs = nn_risk(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer_risk.step()

    nn_risk.eval()
    with torch.no_grad():
        outputs = nn_risk(X_test_tensor)
        _, y_pred_nn_risk = torch.max(outputs, 1)
        acc_nn_risk = accuracy_score(y_risk_test, y_pred_nn_risk.numpy())
        print(f"Improved Neural Network Payment Risk Accuracy: {acc_nn_risk:.4f}")
        print("Confusion Matrix:")
        print(confusion_matrix(y_risk_test, y_pred_nn_risk.numpy()))
        print("Classification Report:")
        print(classification_report(y_risk_test, y_pred_nn_risk.numpy(), target_names=['Low', 'Medium', 'High']))

    # Save models
    joblib.dump(rf_quality, 'rf_quality_model.pkl')
    joblib.dump(xgb_quality, 'xgb_quality_model.pkl')
    joblib.dump(rf_risk, 'rf_risk_model.pkl')
    joblib.dump(xgb_risk, 'xgb_risk_model.pkl')
    torch.save(nn_quality.state_dict(), 'nn_quality_model.pth')
    torch.save(nn_risk.state_dict(), 'nn_risk_model.pth')

    print("Models trained and saved.")

if __name__ == "__main__":
    train_models()