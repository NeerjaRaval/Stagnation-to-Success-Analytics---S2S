import pandas as pd
import numpy as np
import os
import pickle
from sklearn.preprocessing import StandardScaler, LabelEncoder

def load_data(file_path):
    """Loads the Palo Alto Networks CSV dataset."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Dataset not found at {file_path}")
    df = pd.read_csv(file_path)
    # Clean whitespace from column headers
    df.columns = [col.strip() for col in df.columns]
    return df

def preprocess_data(df, save_dir="models"):
    """Handles category encoding and saves preprocessing objects."""
    os.makedirs(save_dir, exist_ok=True)
    
    df_clean = df.copy()
    
    # Categorical columns to encode
    categorical_cols = ['BusinessTravel', 'Department', 'EducationField', 'Gender', 'MaritalStatus', 'JobRole', 'OverTime']
    
    encoders = {}
    for col in categorical_cols:
        if col in df_clean.columns:
            le = LabelEncoder()
            # Handle potential NaNs or blanks by filling them first
            df_clean[col] = df_clean[col].astype(str).str.strip()
            df_clean[col] = le.fit_transform(df_clean[col])
            encoders[col] = le
            
    # Save label encoders for backend API inference consistency
    with open(os.path.join(save_dir, "encoders.pkl"), "wb") as f:
        pickle.dump(encoders, f)
        
    return df_clean, encoders
