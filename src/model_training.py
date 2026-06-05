import os
import pickle
import numpy as np
import pandas as pd
from sklearn.cluster import KMeans
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

def train_models(df_engineered, save_dir="models"):
    """
    Applies K-Means clustering for trajectory profiling and trains a Random Forest
    Classifier for predicting stagnation-driven Attrition risk.
    """
    os.makedirs(save_dir, exist_ok=True)
    
    # 1. Clustering Profile Setup
    cluster_features = [
        'JobLevel', 'YearsAtCompany', 'YearsInCurrentRole', 
        'YearsSinceLastPromotion', 'PromotionGapRatio', 'RoleStagnationIndex',
        'PerformanceRating', 'JobSatisfaction'
    ]
    
    X_cluster = df_engineered[cluster_features].fillna(0)
    scaler_cluster = StandardScaler()
    X_cluster_scaled = scaler_cluster.fit_transform(X_cluster)
    
    # Fit K-Means
    kmeans = KMeans(n_clusters=4, random_state=42, n_init=10)
    df_engineered['Cluster'] = kmeans.fit_predict(X_cluster_scaled)
    
    # Map Cluster numbers to Career Profiles based on profiles
    # We will determine the profiles in profiling step, but let's save the fitted models
    with open(os.path.join(save_dir, "scaler_cluster.pkl"), "wb") as f:
        pickle.dump(scaler_cluster, f)
    with open(os.path.join(save_dir, "kmeans.pkl"), "wb") as f:
        pickle.dump(kmeans, f)
        
    # 2. Classification Model Setup (Stagnation & Attrition prediction)
    # Features for attrition/stagnation classification
    features_to_drop = ['Attrition']
    X_classify = df_engineered.drop(columns=features_to_drop, errors='ignore').fillna(0)
    y_classify = df_engineered['Attrition'].fillna(0)
    
    # Scale classify features
    scaler_classify = StandardScaler()
    X_classify_scaled = scaler_classify.fit_transform(X_classify)
    
    # Split
    X_train, X_test, y_train, y_test = train_test_split(
        X_classify_scaled, y_classify, test_size=0.2, random_state=42, stratify=y_classify
    )
    
    # Train Random Forest Classifier
    rf_model = RandomForestClassifier(n_estimators=100, random_state=42, max_depth=10)
    rf_model.fit(X_train, y_train)
    
    # Calculate accuracy
    train_acc = rf_model.score(X_train, y_train)
    test_acc = rf_model.score(X_test, y_test)
    print(f"Classification Model trained: Train Acc={train_acc:.3f}, Test Acc={test_acc:.3f}")
    
    # Save Classification Model and Scaler
    with open(os.path.join(save_dir, "scaler_classify.pkl"), "wb") as f:
        pickle.dump(scaler_classify, f)
    with open(os.path.join(save_dir, "rf_model.pkl"), "wb") as f:
        pickle.dump(rf_model, f)
        
    # Save column names to ensure consistency in predictions
    with open(os.path.join(save_dir, "feature_names.pkl"), "wb") as f:
        pickle.dump(list(X_classify.columns), f)
        
    return df_engineered, kmeans, rf_model
