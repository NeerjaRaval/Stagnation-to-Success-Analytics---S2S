import pandas as pd
import numpy as np

def engineer_features(df):
    """
    Creates custom progression, stagnation, and stability metrics:
    - Promotion Gap Ratio = YearsSinceLastPromotion / YearsAtCompany
    - Role Stagnation Index = YearsInCurrentRole / YearsAtCompany
    - Training Intensity Score = TrainingTimesLastYear / (YearsAtCompany + 1)
    - Manager Stagnation Index = YearsWithCurrManager / YearsAtCompany
    """
    df_engineered = df.copy()
    
    # Safe division helpers (avoiding division by zero)
    # Using df['YearsAtCompany'].replace(0, 1) or similar to ensure safe calculations
    years_at_company_safe = df_engineered['YearsAtCompany'].copy().replace(0, 1)
    
    # Calculate Promotion Gap Ratio (portion of company tenure without promotion)
    df_engineered['PromotionGapRatio'] = df_engineered['YearsSinceLastPromotion'] / years_at_company_safe
    
    # Calculate Role Stagnation Index (portion of company tenure spent in the exact same role)
    df_engineered['RoleStagnationIndex'] = df_engineered['YearsInCurrentRole'] / years_at_company_safe
    
    # Calculate Training Intensity Score (number of training programs attended relative to tenure)
    # Adding 1 to denominator to represent career start point
    df_engineered['TrainingIntensityScore'] = df_engineered['TrainingTimesLastYear'] / (df_engineered['YearsAtCompany'] + 1)
    
    # Calculate Manager Stagnation Index
    df_engineered['ManagerStagnationIndex'] = df_engineered['YearsWithCurrManager'] / years_at_company_safe
    
    # Cap ratio metrics between 0.0 and 1.0 to handle anomalies
    ratio_cols = ['PromotionGapRatio', 'RoleStagnationIndex', 'ManagerStagnationIndex']
    for col in ratio_cols:
        df_engineered[col] = df_engineered[col].clip(0.0, 1.0)
        
    return df_engineered
