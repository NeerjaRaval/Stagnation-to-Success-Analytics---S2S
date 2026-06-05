import os
import sys
import pandas as pd
import json

# Ensure parent directory is in path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from src.preprocessing import load_data, preprocess_data
from src.feature_engineering import engineer_features
from src.model_training import train_models
from src.explainability import get_cluster_profiles, get_feature_importances

def main():
    dataset_path = "Palo Alto Networks.csv"
    save_dir = "models"
    
    print("=== Starting S2S Career Stagnation ML Pipeline ===")
    
    # 1. Load Data
    print("\n[1/5] Loading employee dataset...")
    df = load_data(dataset_path)
    print(f"Dataset successfully loaded. Shape: {df.shape}")
    
    # 2. Feature Engineering
    print("\n[2/5] Engineering derived career metrics...")
    df_engineered = engineer_features(df)
    print("Metrics calculated: PromotionGapRatio, RoleStagnationIndex, TrainingIntensityScore, ManagerStagnationIndex")
    
    # 3. Preprocess and Encode
    print("\n[3/5] Preprocessing and encoding categorical attributes...")
    df_preprocessed, encoders = preprocess_data(df_engineered, save_dir)
    print("Label encoding complete. Encoders saved to models/encoders.pkl")
    
    # 4. Train Models
    print("\n[4/5] Training Clustering and Classification models...")
    df_modeled, kmeans, rf_model = train_models(df_preprocessed, save_dir)
    
    # Write the clustered predictions to CSV for the API to access
    df_engineered['Cluster'] = df_modeled['Cluster']
    # Add attrition prediction probability for UI stagnation-driven attrition risk indicator
    # (using classification model prediction probability for attrition)
    import pickle
    with open(os.path.join(save_dir, "scaler_classify.pkl"), "rb") as f:
        scaler_classify = pickle.load(f)
    with open(os.path.join(save_dir, "feature_names.pkl"), "rb") as f:
        feature_names = pickle.load(f)
        
    df_preprocessed_no_attr = df_preprocessed.drop(columns=['Attrition'], errors='ignore')
    X_classify_scaled = scaler_classify.transform(df_preprocessed_no_attr)
    attrition_probs = rf_model.predict_proba(X_classify_scaled)[:, 1]
    df_engineered['StagnationAttritionRisk'] = attrition_probs
    
    # Save the processed dataset containing all predictions
    output_dataset = "Palo Alto Networks_processed.csv"
    df_engineered.to_csv(output_dataset, index=False)
    print(f"Processed dataset saved to: {output_dataset}")
    
    # 5. Extract Explainability Profiles
    print("\n[5/5] Compiling explainability profiles and personas...")
    profiles = get_cluster_profiles(df_engineered)
    importances = get_feature_importances(rf_model, feature_names)
    
    # Save profiles metadata
    with open(os.path.join(save_dir, "cluster_profiles.json"), "w") as f:
        json.dump(profiles, f, indent=4)
    with open(os.path.join(save_dir, "feature_importances.json"), "w") as f:
        json.dump(importances, f, indent=4)
        
    print("\nCluster Personas:")
    for profile in profiles:
        print(f" - Cluster {profile['cluster']}: {profile['persona']} ({profile['description']})")
        print(f"   Avg Tenure: {profile['avg_tenure']:.1f} yrs | Avg Promotion Gap Ratio: {profile['avg_promotion_gap_ratio']:.2f}")
        
    print("\n=== S2S Career Stagnation ML Pipeline Complete! ===")

if __name__ == "__main__":
    main()
