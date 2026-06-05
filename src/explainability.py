import numpy as np
import pandas as pd

def get_feature_importances(rf_model, feature_names):
    """Returns a sorted list of features based on their importances in the Random Forest model."""
    importances = rf_model.feature_importances_
    indices = np.argsort(importances)[::-1]
    
    importance_list = []
    for i in indices:
        importance_list.append({
            "feature": feature_names[i],
            "importance": float(importances[i])
        })
    return importance_list

def get_cluster_profiles(df_engineered):
    """
    Computes averages of key career stagnation indicators for each cluster
    to dynamically profile and label the personas.
    """
    profile_features = [
        'Cluster', 'YearsAtCompany', 'YearsSinceLastPromotion', 'YearsInCurrentRole',
        'PromotionGapRatio', 'RoleStagnationIndex', 'TrainingTimesLastYear', 
        'JobSatisfaction', 'PerformanceRating', 'MonthlyIncome', 'Attrition'
    ]
    
    # Calculate group averages
    profiles = df_engineered[profile_features].groupby('Cluster').mean().reset_index()
    
    profile_list = []
    for _, row in profiles.iterrows():
        cluster_id = int(row['Cluster'])
        
        # Heuristic determination of persona type based on metrics
        tenure = row['YearsAtCompany']
        promotion_gap = row['PromotionGapRatio']
        stagnation = row['RoleStagnationIndex']
        attrition_rate = row['Attrition']
        
        if tenure < 3.0:
            persona = "Early-Career Explorer"
            description = "Newer hires actively exploring roles, low overall tenure."
        elif promotion_gap > 0.4 and stagnation > 0.4:
            persona = "High-Risk Stagnation Profile"
            description = "Stalled promotion gaps and role progression; showing high relative disengagement/attrition indicators."
        elif promotion_gap < 0.2 and tenure >= 3.0:
            persona = "Fast-Track Performer"
            description = "Consistently promoted, stable high income growth, fast career velocity."
        else:
            persona = "Stable Long-Term Contributor"
            description = "Experienced employees with stable tenure, solid contributions, and normal progression."
            
        profile_list.append({
            "cluster": cluster_id,
            "persona": persona,
            "description": description,
            "avg_tenure": float(row['YearsAtCompany']),
            "avg_promotion_gap_ratio": float(row['PromotionGapRatio']),
            "avg_role_stagnation_index": float(row['RoleStagnationIndex']),
            "avg_satisfaction": float(row['JobSatisfaction']),
            "avg_monthly_income": float(row['MonthlyIncome']),
            "attrition_rate": float(row['Attrition'])
        })
        
    return profile_list
