import pandas as pd
import numpy as np

def load_real_data(filepath='df_anonymized.csv'):
    # Load the anonymized dataset
    df = pd.read_csv(filepath)

    # Select relevant columns and rename
    columns_map = {
        'RSRP LTE': 'RSRP',
        'RSRQ LTE': 'RSRQ',
        'SNR LTE': 'SNR',
        'CQI LTE': 'CQI',
        'Network Type': 'Network_Type',
        'Latitude': 'Latitude',
        'Longitude': 'Longitude',
        'Downstream Bandwidth': 'Downstream',
        'Upstream Bandwidth': 'Upstream'
    }

    df = df[list(columns_map.keys())].rename(columns=columns_map)

    # Clean data: drop rows with NaN in key features
    df = df.dropna(subset=['RSRP', 'RSRQ', 'SNR', 'CQI'])

    # Map Network Type: 5G NSA to 5G
    df['Network_Type'] = df['Network_Type'].replace({'5G NSA': '5G'})

    # Create labels
    # Network Quality
    conditions = [
        (df['RSRP'] > -80) & (df['RSRQ'] > -10) & (df['SNR'] > 20) & (df['CQI'] > 10),
        (df['RSRP'] > -100) & (df['RSRQ'] > -15) & (df['SNR'] > 10) & (df['CQI'] > 5)
    ]
    choices = ['Good', 'Moderate']
    df['Network_Quality'] = np.select(conditions, choices, default='Poor')

    # Payment Risk: correlated with network quality
    quality_map = {'Good': 0, 'Moderate': 1, 'Poor': 2}
    df['quality_score'] = df['Network_Quality'].map(quality_map)
    # Add some noise
    risk_score = df['quality_score'] + np.random.normal(0, 0.5, len(df))
    risk_score = np.clip(risk_score, 0, 2)
    conditions_risk = [
        risk_score < 0.7,
        risk_score < 1.3
    ]
    choices_risk = ['Low', 'Medium']
    df['Payment_Risk'] = np.select(conditions_risk, choices_risk, default='High')

    df.drop('quality_score', axis=1, inplace=True)

    return df

if __name__ == "__main__":
    df = load_real_data()
    df.to_csv('telecom_data.csv', index=False)
    print(f"Real data loaded and saved to telecom_data.csv with {len(df)} samples")