
import pandas as pd
import joblib
from preprocess import preprocess_data
from sklearn.metrics import accuracy_score, classification_report

X_train, X_test, y_quality_train, y_quality_test, y_risk_train, y_risk_test = preprocess_data()

# Load models
rf_quality = joblib.load('rf_quality_model.pkl')
xgb_quality = joblib.load('xgb_quality_model.pkl')
rf_risk = joblib.load('rf_risk_model.pkl')
xgb_risk = joblib.load('xgb_risk_model.pkl')

print("--- Network Quality ---")
print(f"RF Accuracy: {accuracy_score(y_quality_test, rf_quality.predict(X_test)):.4f}")
print(f"XGB Accuracy: {accuracy_score(y_quality_test, xgb_quality.predict(X_test)):.4f}")

print("\n--- Payment Risk ---")
print(f"RF Accuracy: {accuracy_score(y_risk_test, rf_risk.predict(X_test)):.4f}")
print(f"XGB Accuracy: {accuracy_score(y_risk_test, xgb_risk.predict(X_test)):.4f}")

print("\n--- RF Risk Report ---")
print(classification_report(y_risk_test, rf_risk.predict(X_test)))

print("\n--- XGB Risk Report ---")
print(classification_report(y_risk_test, xgb_risk.predict(X_test)))
