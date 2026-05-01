import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, LabelEncoder
import joblib

def preprocess_data(filepath='telecom_data.csv'):
    df = pd.read_csv(filepath)

    # Features
    features = ['RSRP', 'RSRQ', 'SNR', 'CQI', 'Network_Type', 'Latitude', 'Longitude', 'Downstream', 'Upstream']
    X = df[features]

    # Encode Network_Type
    encoder = OneHotEncoder(sparse_output=False, drop='first')
    network_encoded = encoder.fit_transform(X[['Network_Type']])
    network_df = pd.DataFrame(network_encoded, columns=encoder.get_feature_names_out(['Network_Type']))
    X = X.drop('Network_Type', axis=1).reset_index(drop=True)
    X = pd.concat([X, network_df], axis=1)

    # Labels
    le_quality = LabelEncoder()
    y_quality = le_quality.fit_transform(df['Network_Quality'])

    le_risk = LabelEncoder()
    y_risk = le_risk.fit_transform(df['Payment_Risk'])

    # Split
    X_train, X_test, y_quality_train, y_quality_test, y_risk_train, y_risk_test = train_test_split(
        X, y_quality, y_risk, test_size=0.2, random_state=42
    )

    # Save encoders
    joblib.dump(encoder, 'network_type_encoder.pkl')
    joblib.dump(le_quality, 'quality_label_encoder.pkl')
    joblib.dump(le_risk, 'risk_label_encoder.pkl')

    return X_train, X_test, y_quality_train, y_quality_test, y_risk_train, y_risk_test

if __name__ == "__main__":
    preprocess_data()
    print("Data preprocessed.")