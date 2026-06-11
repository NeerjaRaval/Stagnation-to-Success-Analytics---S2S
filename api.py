from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import numpy as np
import os
import pickle
import json
from local_csv_ai import LocalCSVAI

app = FastAPI(title="Stagnation-to-Success Analytics (S2S) Server")

# Configure CORS so our React frontend can connect seamlessly
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables to store loaded dataset and models
df_processed = None
copilot_engine = None
model_assets = {}

# Settings thresholds
settings_config = {
    "promotion_gap_threshold": 0.5,
    "role_stagnation_threshold": 0.5,
    "warning_satisfaction_limit": 2
}

def load_assets():
    global df_processed, copilot_engine, model_assets
    # Load processed CSV
    csv_path = "Palo Alto Networks_processed.csv"
    if os.path.exists(csv_path):
        df_processed = pd.read_csv(csv_path)
    else:
        # Generate on the fly if needed
        raise RuntimeError("Processed dataset not found. Please run train.py first.")
        
    copilot_engine = LocalCSVAI(csv_path)
    
    # Load serializations
    models_dir = "models"
    assets_to_load = ["kmeans", "rf_model", "scaler_cluster", "scaler_classify", "encoders", "cluster_profiles", "feature_importances"]
    for asset in assets_to_load:
        file_path = os.path.join(models_dir, f"{asset}.json" if asset in ["cluster_profiles", "feature_importances"] else f"{asset}.pkl")
        if os.path.exists(file_path):
            if file_path.endswith(".json"):
                with open(file_path, "r") as f:
                    model_assets[asset] = json.load(f)
            else:
                with open(file_path, "rb") as f:
                    model_assets[asset] = pickle.load(f)

# Load assets on start
load_assets()

# API Schemas
class ScenarioInput(BaseModel):
    Age: int
    BusinessTravel: str
    DailyRate: float
    Department: str
    DistanceFromHome: int
    Education: int
    EducationField: str
    EnvironmentSatisfaction: int
    Gender: str
    HourlyRate: float
    JobInvolvement: int
    JobLevel: int
    JobRole: str
    JobSatisfaction: int
    MaritalStatus: str
    MonthlyIncome: float
    MonthlyRate: float
    NumCompaniesWorked: int
    OverTime: str
    PercentSalaryHike: float
    PerformanceRating: int
    RelationshipSatisfaction: int
    StockOptionLevel: int
    TotalWorkingYears: int
    TrainingTimesLastYear: int
    WorkLifeBalance: int
    YearsAtCompany: int
    YearsInCurrentRole: int
    YearsSinceLastPromotion: int
    YearsWithCurrManager: int

class CopilotQuery(BaseModel):
    prompt: str

class SettingsUpdate(BaseModel):
    promotion_gap_threshold: float
    role_stagnation_threshold: float
    warning_satisfaction_limit: int

@app.get("/api/metrics")
def get_metrics():
    """Returns top level KPIs for S2S Dashboard."""
    global df_processed
    if df_processed is None:
        load_assets()
        
    total_count = len(df_processed)
    
    # Stagnation Threshold check based on settings
    high_gap_count = int(np.sum(df_processed['PromotionGapRatio'] > settings_config["promotion_gap_threshold"]))
    high_stagnant_count = int(np.sum(df_processed['RoleStagnationIndex'] > settings_config["role_stagnation_threshold"]))
    
    # Combined Retention Opportunity Count: Stagnant but overall satisfied/involved (not checked out yet)
    retention_opps = int(np.sum(
        (df_processed['PromotionGapRatio'] > settings_config["promotion_gap_threshold"]) & 
        (df_processed['JobSatisfaction'] >= settings_config["warning_satisfaction_limit"])
    ))
    
    # Average Promotion Gap Ratio
    avg_promotion_gap = float(df_processed['PromotionGapRatio'].mean())
    avg_role_stagnation = float(df_processed['RoleStagnationIndex'].mean())
    
    # Cluster distributions
    cluster_counts = df_processed['Cluster'].value_counts().to_dict()
    cluster_dist = []
    
    profiles = model_assets.get("cluster_profiles", [])
    for profile in profiles:
        c_id = profile['cluster']
        cluster_dist.append({
            "cluster": c_id,
            "persona": profile['persona'],
            "count": int(cluster_counts.get(c_id, 0)),
            "avg_tenure": profile['avg_tenure'],
            "avg_gap": profile['avg_promotion_gap_ratio']
        })
        
    return {
        "total_employees": total_count,
        "high_promotion_gap_count": high_gap_count,
        "high_role_stagnation_count": high_stagnant_count,
        "retention_opportunity_count": retention_opps,
        "avg_promotion_gap_ratio": avg_promotion_gap,
        "avg_role_stagnation_index": avg_role_stagnation,
        "cluster_distribution": cluster_dist,
        "active_settings": settings_config
    }

@app.get("/api/employees")
def get_employees(
    page: int = 1,
    limit: int = 15,
    department: str = "",
    job_role: str = "",
    cluster: int = -1,
    risk_level: str = "all"
):
    """Fetches list of employees matching specified filters."""
    global df_processed
    if df_processed is None:
        load_assets()
        
    filtered_df = df_processed.copy()
    
    # Filters
    if department:
        filtered_df = filtered_df[filtered_df['Department'].str.lower() == department.lower()]
    if job_role:
        filtered_df = filtered_df[filtered_df['JobRole'].str.lower() == job_role.lower()]
    if cluster != -1:
        filtered_df = filtered_df[filtered_df['Cluster'] == cluster]
        
    # Risk Level filter using custom PromotionGapRatio limits
    if risk_level == "high":
        filtered_df = filtered_df[filtered_df['PromotionGapRatio'] > settings_config["promotion_gap_threshold"]]
    elif risk_level == "medium":
        filtered_df = filtered_df[
            (filtered_df['PromotionGapRatio'] <= settings_config["promotion_gap_threshold"]) & 
            (filtered_df['PromotionGapRatio'] > 0.25)
        ]
    elif risk_level == "low":
        filtered_df = filtered_df[filtered_df['PromotionGapRatio'] <= 0.25]
        
    total_records = len(filtered_df)
    
    # Pagination
    start = (page - 1) * limit
    end = start + limit
    paginated_df = filtered_df.iloc[start:end]
    
    # Convert index to row id for UI table matching
    records = []
    for idx, row in paginated_df.iterrows():
        rec = row.to_dict()
        rec['id'] = int(idx)
        records.append(rec)
        
    return {
        "records": records,
        "total": total_records,
        "page": page,
        "limit": limit
    }

@app.post("/predict")
def predict_stagnation_risk(data: ScenarioInput):
    """
    Accepts arbitrary telemetry parameters, performs feature engineering,
    and returns predictions from Clustering and Attrition Classification models.
    """
    try:
        # Create single record df
        raw_dict = data.dict()
        single_df = pd.DataFrame([raw_dict])
        
        # 1. Feature Engineering
        years_at_company_safe = single_df['YearsAtCompany'].copy().replace(0, 1)
        single_df['PromotionGapRatio'] = single_df['YearsSinceLastPromotion'] / years_at_company_safe
        single_df['RoleStagnationIndex'] = single_df['YearsInCurrentRole'] / years_at_company_safe
        single_df['TrainingIntensityScore'] = single_df['TrainingTimesLastYear'] / (single_df['YearsAtCompany'] + 1)
        single_df['ManagerStagnationIndex'] = single_df['YearsWithCurrManager'] / years_at_company_safe
        
        # Clip ratios
        for col in ['PromotionGapRatio', 'RoleStagnationIndex', 'ManagerStagnationIndex']:
            single_df[col] = single_df[col].clip(0.0, 1.0)
            
        # 2. Preprocess / Categorical encoding using serialized label encoders
        encoders = model_assets.get("encoders", {})
        for col, le in encoders.items():
            if col in single_df.columns:
                val = str(single_df.at[0, col]).strip()
                try:
                    # In case of unknown labels, fit fallback
                    if val in le.classes_:
                        single_df[col] = le.transform([val])[0]
                    else:
                        single_df[col] = le.transform([le.classes_[0]])[0]
                except Exception:
                    single_df[col] = 0
                    
        # 3. K-Means Cluster Assignment
        cluster_features = [
            'JobLevel', 'YearsAtCompany', 'YearsInCurrentRole', 
            'YearsSinceLastPromotion', 'PromotionGapRatio', 'RoleStagnationIndex',
            'PerformanceRating', 'JobSatisfaction'
        ]
        scaler_cluster = model_assets.get("scaler_cluster")
        kmeans = model_assets.get("kmeans")
        
        scaled_c_input = scaler_cluster.transform(single_df[cluster_features])
        cluster_assignment = int(kmeans.predict(scaled_c_input)[0])
        
        # Get Persona matching cluster ID
        profiles = model_assets.get("cluster_profiles", [])
        persona = "Stable Contributor"
        for p in profiles:
            if p['cluster'] == cluster_assignment:
                persona = p['persona']
                
        # 4. Attrition Risk Classification
        scaler_classify = model_assets.get("scaler_classify")
        rf_model = model_assets.get("rf_model")
        
        # Ensure column order matches training columns
        with open("models/feature_names.pkl", "rb") as f:
            feature_names = pickle.load(f)
            
        input_classify = single_df[feature_names]
        scaled_class_input = scaler_classify.transform(input_classify)
        
        risk_probability = float(rf_model.predict_proba(scaled_class_input)[0][1])
        prediction = int(rf_model.predict(scaled_class_input)[0])
        
        return {
            "cluster": cluster_assignment,
            "persona": persona,
            "stagnation_attrition_risk_probability": risk_probability,
            "prediction": prediction,
            "ratios": {
                "promotion_gap_ratio": float(single_df.at[0, 'PromotionGapRatio']),
                "role_stagnation_index": float(single_df.at[0, 'RoleStagnationIndex'])
            }
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/api/copilot")
def query_copilot(query: CopilotQuery):
    """Forwards queries to the LocalCSVAI copilot engine."""
    global copilot_engine
    if copilot_engine is None:
        copilot_engine = LocalCSVAI()
    res = copilot_engine.query(query.prompt)
    return res

@app.get("/api/settings")
def get_settings():
    return settings_config

@app.post("/api/settings")
def update_settings(settings: SettingsUpdate):
    global settings_config
    settings_config["promotion_gap_threshold"] = settings.promotion_gap_threshold
    settings_config["role_stagnation_threshold"] = settings.role_stagnation_threshold
    settings_config["warning_satisfaction_limit"] = settings.warning_satisfaction_limit
    return {"status": "success", "settings": settings_config}

@app.get("/api/explainability")
def get_explainability():
    """Returns cluster personas and model feature importances."""
    return {
        "personas": model_assets.get("cluster_profiles", []),
        "feature_importances": model_assets.get("feature_importances", [])[:10]
    }

def cleanup_file(path: str):
    try:
        if os.path.exists(path):
            os.remove(path)
    except Exception:
        pass

@app.get("/api/reports/download")
def download_report(background_tasks: BackgroundTasks):
    global df_processed
    if df_processed is None:
        load_assets()
        
    temp_pdf_path = "executive_report.pdf"
    try:
        from report_generator import generate_pdf_report
        generate_pdf_report(df_processed, temp_pdf_path)
        background_tasks.add_task(cleanup_file, temp_pdf_path)
        return FileResponse(
            path=temp_pdf_path,
            filename="S2S_Executive_Report.pdf",
            media_type="application/pdf"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate report: {str(e)}")

@app.get("/api/dei")
def get_dei_metrics():
    global df_processed
    if df_processed is None:
        load_assets()
        
    # Gender metrics
    gender_groups = df_processed.groupby('Gender')
    gender_counts = gender_groups.size().to_dict()
    gender_gap = gender_groups['PromotionGapRatio'].mean().to_dict()
    gender_stagnation = gender_groups['RoleStagnationIndex'].mean().to_dict()
    gender_salary = gender_groups['MonthlyIncome'].mean().to_dict()
    
    # Calculate gender representation percentage
    total = len(df_processed)
    gender_dist = [
        {"name": g, "value": int(count), "percentage": round((count / total) * 100, 1)}
        for g, count in gender_counts.items()
    ]
    
    # Calculate gender pay gap: (Male_avg - Female_avg) / Male_avg * 100
    male_avg_sal = gender_salary.get('Male', 1.0)
    female_avg_sal = gender_salary.get('Female', 1.0)
    pay_gap = round(((male_avg_sal - female_avg_sal) / male_avg_sal) * 100, 2)
    
    # Age group metrics
    def age_bucket(age):
        if age < 25:
            return "Under 25"
        elif age <= 35:
            return "25-35"
        elif age <= 45:
            return "36-45"
        else:
            return "46+"
            
    df_temp = df_processed.copy()
    df_temp['AgeGroup'] = df_temp['Age'].apply(age_bucket)
    age_groups = df_temp.groupby('AgeGroup')
    
    age_data = []
    # Ensure ordered categories
    for group_name in ["Under 25", "25-35", "36-45", "46+"]:
        if group_name in age_groups.groups:
            group_df = age_groups.get_group(group_name)
            age_data.append({
                "group": group_name,
                "count": int(len(group_df)),
                "avg_gap": round(float(group_df['PromotionGapRatio'].mean()) * 100, 1),
                "avg_stagnation": round(float(group_df['RoleStagnationIndex'].mean()) * 100, 1)
            })
            
    # Education Field metrics
    edu_groups = df_processed.groupby('EducationField')
    edu_data = []
    for field, group_df in edu_groups:
        edu_data.append({
            "field": field,
            "count": int(len(group_df)),
            "avg_gap": round(float(group_df['PromotionGapRatio'].mean()) * 100, 1),
            "avg_stagnation": round(float(group_df['RoleStagnationIndex'].mean()) * 100, 1)
        })
        
    # DEI Equity Score: 100 - absolute difference in promotion gap ratio
    female_gap = gender_gap.get('Female', 0.0)
    male_gap = gender_gap.get('Male', 0.0)
    promo_gap_diff = abs(female_gap - male_gap)
    equity_score = round(100 - (promo_gap_diff * 100), 1)
    
    return {
        "gender_distribution": gender_dist,
        "gender_promotion_gaps": {k: round(v * 100, 1) for k, v in gender_gap.items()},
        "gender_role_stagnation": {k: round(v * 100, 1) for k, v in gender_stagnation.items()},
        "gender_salaries": {k: round(v, 2) for k, v in gender_salary.items()},
        "pay_gap_percentage": pay_gap,
        "age_distribution": age_data,
        "education_distribution": edu_data,
        "equity_score": equity_score
    }
