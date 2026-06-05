import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import os
import pickle
import json

# Set Page Config
st.set_page_config(
    page_title="Stagnation-to-Success (S2S) Analytics",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Premium CSS Styling
st.markdown("""
    <style>
    .main {
        background-color: #f8f9fa;
    }
    h1, h2, h3 {
        color: #1F497D !important;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    .kpi-card {
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        border-left: 5px solid #1F497D;
        margin-bottom: 15px;
    }
    .kpi-title {
        font-size: 0.9rem;
        color: #6c757d;
        text-transform: uppercase;
        font-weight: 600;
    }
    .kpi-val {
        font-size: 1.8rem;
        font-weight: 700;
        color: #1F497D;
    }
    .stProgress > div > div > div > div {
        background-color: #1F497D;
    }
    </style>
    """, unsafe_allow_html=True)

# ─── Load Data & Models ──────────────────────────────────────────────────────

@st.cache_data
def load_processed_data():
    csv_path = "Palo Alto Networks_processed.csv"
    if os.path.exists(csv_path):
        return pd.read_csv(csv_path)
    else:
        st.error("Processed dataset not found. Please run the training pipeline first.")
        return None

@st.cache_data
def load_cluster_profiles():
    json_path = os.path.join("models", "cluster_profiles.json")
    if os.path.exists(json_path):
        with open(json_path, "r") as f:
            return json.load(f)
    return []

@st.cache_resource
def load_ml_models():
    models = {}
    models_dir = "models"
    assets = ["kmeans", "rf_model", "scaler_cluster", "scaler_classify", "encoders", "feature_names"]
    for asset in assets:
        file_path = os.path.join(models_dir, f"{asset}.pkl")
        if os.path.exists(file_path):
            with open(file_path, "rb") as f:
                models[asset] = pickle.load(f)
    return models

df = load_processed_data()
profiles = load_cluster_profiles()
models = load_ml_models()

if df is not None:
    # ─── Sidebar Filters ─────────────────────────────────────────────────────────
    st.sidebar.image("https://img.icons8.com/color/96/combo-chart.png", width=60)
    st.sidebar.title("S2S Analytics")
    st.sidebar.markdown("*Palo Alto Networks Retention Suite*")
    st.sidebar.divider()

    # Navigation
    menu = st.sidebar.radio(
        "Navigation Dashboard",
        [
            "📊 Executive KPI Overview",
            "🔍 Promotion Gap Monitor",
            "💡 Retention Opportunity Panel",
            "👔 Managerial Insights",
            "🔮 Real-time Risk Sandbox"
        ]
    )

    st.sidebar.divider()
    st.sidebar.subheader("🎛️ Threshold Controls")
    
    # Configuration Sliders (Global state for calculations)
    promo_threshold = st.sidebar.slider(
        "Promotion Gap Threshold",
        min_value=0.1, max_value=1.0, value=0.5, step=0.05,
        help="Proportion of career tenure spent without promotion (YearsSinceLastPromotion / YearsAtCompany)"
    )
    
    stagnation_threshold = st.sidebar.slider(
        "Role Stagnation Threshold",
        min_value=0.1, max_value=1.0, value=0.5, step=0.05,
        help="Proportion of career tenure spent in current role (YearsInCurrentRole / YearsAtCompany)"
    )

    satisfaction_limit = st.sidebar.slider(
        "Warning Satisfaction Limit",
        min_value=1, max_value=4, value=2, step=1,
        help="Employees with job satisfaction at or above this are considered 'still engaged' (retention opportunities)"
    )

    st.sidebar.divider()
    
    # Department & Role Filters
    departments = ["All"] + list(df['Department'].unique())
    selected_dept = st.sidebar.selectbox("Filter Department", departments)

    roles = ["All"] + list(df['JobRole'].unique())
    selected_role = st.sidebar.selectbox("Filter Job Role", roles)

    # Apply Filters to the active DataFrame
    filtered_df = df.copy()
    if selected_dept != "All":
        filtered_df = filtered_df[filtered_df['Department'] == selected_dept]
    if selected_role != "All":
        filtered_df = filtered_df[filtered_df['JobRole'] == selected_role]

    # Map Cluster profiles to lookup dictionary
    profile_dict = {p['cluster']: p for p in profiles}

    # ─── Page 1: Executive KPI Overview ─────────────────────────────────────────
    if menu == "📊 Executive KPI Overview":
        st.title("📊 Executive KPI Overview")
        st.markdown("### Organizational Performance & Career Clustering Segmentation")
        
        # Calculate KPIs
        total_emp = len(filtered_df)
        high_gap = int(np.sum(filtered_df['PromotionGapRatio'] > promo_threshold))
        high_stagnant = int(np.sum(filtered_df['RoleStagnationIndex'] > stagnation_threshold))
        
        # Combined Retention Opportunity Count: Stagnant but overall satisfied/involved (not checked out yet)
        retention_opps = int(np.sum(
            (filtered_df['PromotionGapRatio'] > promo_threshold) & 
            (filtered_df['JobSatisfaction'] >= satisfaction_limit)
        ))
        
        avg_promotion_gap = filtered_df['PromotionGapRatio'].mean()
        avg_role_stagnation = filtered_df['RoleStagnationIndex'].mean()

        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.markdown(f"""
                <div class="kpi-card">
                    <div class="kpi-title">Total Active Employees</div>
                    <div class="kpi-val">{total_emp}</div>
                    <div style="font-size:0.8rem; color:#6c757d;">Filtered count</div>
                </div>
            """, unsafe_allow_html=True)
            
        with col2:
            st.markdown(f"""
                <div class="kpi-card">
                    <div class="kpi-title">High Promotion Gap</div>
                    <div class="kpi-val">{high_gap} <span style="font-size: 1rem; color:red; font-weight:normal;">({(high_gap/total_emp*100):.1f}%)</span></div>
                    <div style="font-size:0.8rem; color:#6c757d;">Gap Ratio > {promo_threshold}</div>
                </div>
            """, unsafe_allow_html=True)
            
        with col3:
            st.markdown(f"""
                <div class="kpi-card">
                    <div class="kpi-title">Retention Opportunities</div>
                    <div class="kpi-val">{retention_opps} <span style="font-size: 1rem; color:green; font-weight:normal;">({(retention_opps/total_emp*100):.1f}%)</span></div>
                    <div style="font-size:0.8rem; color:#6c757d;">Stagnant but engaged</div>
                </div>
            """, unsafe_allow_html=True)
            
        with col4:
            st.markdown(f"""
                <div class="kpi-card">
                    <div class="kpi-title">Avg Promotion Gap Ratio</div>
                    <div class="kpi-val">{avg_promotion_gap:.2f}</div>
                    <div style="font-size:0.8rem; color:#6c757d;">Company average: {df['PromotionGapRatio'].mean():.2f}</div>
                </div>
            """, unsafe_allow_html=True)

        st.divider()

        # Graphs Grid
        c1, c2 = st.columns([1, 1])

        with c1:
            st.subheader("👥 Career Cluster Distribution")
            cluster_counts = filtered_df['Cluster'].value_counts().reset_index()
            cluster_counts.columns = ['ClusterID', 'Count']
            
            # Map persona name
            cluster_counts['Persona'] = cluster_counts['ClusterID'].map(lambda x: profile_dict.get(x, {}).get('persona', f'Cluster {x}'))
            
            fig = px.pie(
                cluster_counts, 
                values='Count', 
                names='Persona',
                color_discrete_sequence=px.colors.qualitative.Prism,
                hole=0.4
            )
            fig.update_layout(margin=dict(t=0, b=0, l=0, r=0), legend=dict(orientation="h", yanchor="bottom", y=-0.2))
            st.plotly_chart(fig, use_container_width=True)

        with c2:
            st.subheader("📈 Attrition Risk vs. Promotion Gap Ratio")
            fig = px.scatter(
                filtered_df,
                x='YearsAtCompany',
                y='PromotionGapRatio',
                color='Cluster',
                size='Age',
                hover_data=['JobRole', 'YearsSinceLastPromotion', 'StagnationAttritionRisk'],
                color_continuous_scale=px.colors.sequential.Viridis
            )
            fig.update_layout(margin=dict(t=20, b=20, l=20, r=20))
            st.plotly_chart(fig, use_container_width=True)

        st.subheader("👤 Cluster Personas & Summary Statistics")
        persona_table = []
        for p in profiles:
            c_id = p['cluster']
            count = len(filtered_df[filtered_df['Cluster'] == c_id])
            pct = (count / total_emp * 100) if total_emp > 0 else 0
            persona_table.append({
                "Cluster ID": c_id,
                "Persona": p['persona'],
                "Description": p['description'],
                "Representation": f"{count} ({pct:.1f}%)",
                "Avg Tenure (Yrs)": f"{p['avg_tenure']:.1f}",
                "Avg Promotion Gap": f"{p['avg_promotion_gap_ratio']:.2f}",
                "Attrition Rate": f"{p['attrition_rate']*100:.1f}%"
            })
        st.table(pd.DataFrame(persona_table))

    # ─── Page 2: Promotion Gap Monitor ──────────────────────────────────────────
    elif menu == "🔍 Promotion Gap Monitor":
        st.title("🔍 Promotion Gap Monitor")
        st.markdown("### Identifying High Promotion Gaps & Role Stagnation across the Company")
        
        # High Gap subset
        high_gap_df = filtered_df[filtered_df['PromotionGapRatio'] > promo_threshold].sort_values(by='PromotionGapRatio', ascending=False)
        
        st.subheader(f"⚠️ Stagnation Risk Breakdown (Threshold: {promo_threshold})")
        
        col1, col2 = st.columns(2)
        with col1:
            # Department wise High Gap Count
            dept_gaps = high_gap_df['Department'].value_counts().reset_index()
            dept_gaps.columns = ['Department', 'High Gap Employees']
            fig = px.bar(dept_gaps, x='Department', y='High Gap Employees', title="Promotion Stagnation by Department", color_discrete_sequence=['#1F497D'])
            st.plotly_chart(fig, use_container_width=True)
            
        with col2:
            # Job Role wise High Gap Count
            role_gaps = high_gap_df['JobRole'].value_counts().reset_index().head(10)
            role_gaps.columns = ['JobRole', 'High Gap Employees']
            fig = px.bar(role_gaps, y='JobRole', x='High Gap Employees', title="Top 10 Roles Experiencing Stagnation", orientation='h', color_discrete_sequence=['#4472C4'])
            st.plotly_chart(fig, use_container_width=True)

        st.subheader("📋 Flagged Employees Needing Review")
        st.markdown(f"The following employees exceed the **{promo_threshold}** Promotion Gap Ratio threshold:")
        
        display_columns = [
            'Department', 'JobRole', 'YearsAtCompany', 'YearsInCurrentRole', 
            'YearsSinceLastPromotion', 'PromotionGapRatio', 'RoleStagnationIndex', 
            'JobSatisfaction', 'StagnationAttritionRisk'
        ]
        
        if len(high_gap_df) > 0:
            grid_df = high_gap_df[display_columns].copy()
            grid_df['StagnationAttritionRisk'] = grid_df['StagnationAttritionRisk'].map(lambda x: f"{x*100:.1f}%")
            grid_df['PromotionGapRatio'] = grid_df['PromotionGapRatio'].round(2)
            grid_df['RoleStagnationIndex'] = grid_df['RoleStagnationIndex'].round(2)
            st.dataframe(grid_df, use_container_width=True)
        else:
            st.success("No employees flagged under the current threshold settings.")

    # ─── Page 3: Retention Opportunity Panel ────────────────────────────────────
    elif menu == "💡 Retention Opportunity Panel":
        st.title("💡 Retention Opportunity Panel")
        st.markdown("### Proactive Interventions for Stagnant but Engaged Talent")
        st.info("💡 **Concept:** These employees show high stagnation metrics but maintain satisfactory Job Satisfaction scores. "
                "They have not yet mentally checked out. Targeted interventions here offer the highest ROI.")
        
        # Criteria: High Promotion Gap, but Job Satisfaction >= Limit, and Low/Medium Attrition Risk
        opp_df = filtered_df[
            (filtered_df['PromotionGapRatio'] > promo_threshold) &
            (filtered_df['JobSatisfaction'] >= satisfaction_limit)
        ].sort_values(by='PromotionGapRatio', ascending=False)
        
        st.subheader(f"🎯 Target Cohort list ({len(opp_df)} opportunities identified)")
        
        if len(opp_df) > 0:
            opportunity_list = []
            for idx, row in opp_df.iterrows():
                # Suggest action based on ratios
                if row['TrainingIntensityScore'] < 0.2:
                    action = "Skill Development / Allocate Training Program"
                elif row['RoleStagnationIndex'] > stagnation_threshold:
                    action = "Role Rotation / Internal Job Posting Placement"
                else:
                    action = "Schedule Promotion Review / Comp Adjustment"
                    
                opportunity_list.append({
                    "Employee ID": int(idx),
                    "Department": row['Department'],
                    "Job Role": row['JobRole'],
                    "Tenure (Yrs)": row['YearsAtCompany'],
                    "Last Promo (Yrs)": row['YearsSinceLastPromotion'],
                    "Promo Gap Ratio": round(row['PromotionGapRatio'], 2),
                    "Satisfaction": f"{row['JobSatisfaction']}/4",
                    "Attrition Risk Probability": f"{row['StagnationAttritionRisk']*100:.1f}%",
                    "Recommended Action": action
                })
                
            st.dataframe(pd.DataFrame(opportunity_list), use_container_width=True)
            
            # Export Actions
            st.download_button(
                "📥 Export Intervention Planner CSV",
                pd.DataFrame(opportunity_list).to_csv(index=False),
                "S2S_Retention_Interventions.csv",
                "text/csv"
            )
        else:
            st.success("No retention opportunities found under current filters.")

    # ─── Page 4: Managerial Insights ────────────────────────────────────────────
    elif menu == "👔 Managerial Insights":
        st.title("👔 Managerial Insights")
        st.markdown("### Leadership Stability & Career Growth Dynamics")
        
        # Scatter: Years With Current Manager vs. Promotion Gap Ratio
        c1, c2 = st.columns(2)
        with c1:
            st.subheader("Manager Tenure vs. Promotion Gap")
            fig = px.scatter(
                filtered_df,
                x='YearsWithCurrManager',
                y='PromotionGapRatio',
                trendline="ols",
                color_discrete_sequence=['#1F497D']
            )
            st.plotly_chart(fig, use_container_width=True)
            
        with c2:
            st.subheader("Manager Tenure vs. Role Stagnation Index")
            fig = px.scatter(
                filtered_df,
                x='YearsWithCurrManager',
                y='RoleStagnationIndex',
                trendline="ols",
                color_discrete_sequence=['#4472C4']
            )
            st.plotly_chart(fig, use_container_width=True)

        st.subheader("📡 Manager-Level Growth Correlation")
        st.markdown(
            "An analysis of manager continuity indicates whether long-term reporting alignments "
            "to a single manager correlate with career stagnation or stability. OLS trendline slopes "
            "provide teams with data-backed coaching insights."
        )

    # ─── Page 5: Real-time Risk Sandbox ──────────────────────────────────────────
    elif menu == "🔮 Real-time Risk Sandbox":
        st.title("🔮 Real-time Risk Sandbox")
        st.markdown("### Scenario Testing & Individual Risk Predictor")
        st.markdown("Enter telemetry parameters for an individual employee below to predict their Career Cluster and Stagnation-Driven Attrition Risk in real-time:")
        
        if not models:
            st.warning("Prediction assets are missing. Please build the pipeline first.")
        else:
            with st.form("sandbox_form"):
                c1, c2, c3 = st.columns(3)
                
                with c1:
                    age = st.number_input("Age", min_value=18, max_value=70, value=35)
                    gender = st.selectbox("Gender", list(models['encoders']['Gender'].classes_))
                    marital = st.selectbox("Marital Status", list(models['encoders']['MaritalStatus'].classes_))
                    dept = st.selectbox("Department", list(models['encoders']['Department'].classes_))
                    role = st.selectbox("Job Role", list(models['encoders']['JobRole'].classes_))
                    job_level = st.slider("Job Level", 1, 5, 2)
                    
                with c2:
                    tenure = st.number_input("Years at Company", min_value=0, max_value=40, value=5)
                    role_tenure = st.number_input("Years in Current Role", min_value=0, max_value=40, value=2)
                    promo_tenure = st.number_input("Years Since Last Promotion", min_value=0, max_value=40, value=4)
                    manager_tenure = st.number_input("Years with Current Manager", min_value=0, max_value=40, value=2)
                    training = st.number_input("Training Programs Attended Last Year", 0, 10, 2)
                    overtime = st.selectbox("Works Overtime", ["Yes", "No"])
                    
                with c3:
                    satisfaction = st.slider("Job Satisfaction", 1, 4, 3)
                    env_satisfaction = st.slider("Work Environment Satisfaction", 1, 4, 3)
                    relationship_sat = st.slider("Relationship Satisfaction", 1, 4, 3)
                    job_involvement = st.slider("Job Involvement", 1, 4, 3)
                    performance = st.slider("Performance Rating", 1, 4, 3)
                    income = st.number_input("Monthly Income (USD)", min_value=1000, max_value=30000, value=6000)
                
                submitted = st.form_submit_button("📊 Calculate Stagnation & Attrition Risk")
                
                if submitted:
                    # Construct single row dict matching model parameters
                    input_dict = {
                        "Age": age,
                        "BusinessTravel": "Travel_Rarely",  # default
                        "DailyRate": 800.0,
                        "Department": dept,
                        "DistanceFromHome": 5,
                        "Education": 3,
                        "EducationField": "Medical",
                        "EnvironmentSatisfaction": env_satisfaction,
                        "Gender": gender,
                        "HourlyRate": 60.0,
                        "JobInvolvement": job_involvement,
                        "JobLevel": job_level,
                        "JobRole": role,
                        "JobSatisfaction": satisfaction,
                        "MaritalStatus": marital,
                        "MonthlyIncome": float(income),
                        "MonthlyRate": 15000.0,
                        "NumCompaniesWorked": 1,
                        "OverTime": overtime,
                        "PercentSalaryHike": 12.0,
                        "PerformanceRating": performance,
                        "RelationshipSatisfaction": relationship_sat,
                        "StockOptionLevel": 0,
                        "TotalWorkingYears": tenure + 2,
                        "TrainingTimesLastYear": training,
                        "WorkLifeBalance": 3,
                        "YearsAtCompany": tenure,
                        "YearsInCurrentRole": role_tenure,
                        "YearsSinceLastPromotion": promo_tenure,
                        "YearsWithCurrManager": manager_tenure
                    }
                    
                    # 1. Feature Engineering
                    single_df = pd.DataFrame([input_dict])
                    years_at_company_safe = single_df['YearsAtCompany'].copy().replace(0, 1)
                    single_df['PromotionGapRatio'] = single_df['YearsSinceLastPromotion'] / years_at_company_safe
                    single_df['RoleStagnationIndex'] = single_df['YearsInCurrentRole'] / years_at_company_safe
                    single_df['TrainingIntensityScore'] = single_df['TrainingTimesLastYear'] / (single_df['YearsAtCompany'] + 1)
                    single_df['ManagerStagnationIndex'] = single_df['YearsWithCurrManager'] / years_at_company_safe
                    
                    for col in ['PromotionGapRatio', 'RoleStagnationIndex', 'ManagerStagnationIndex']:
                        single_df[col] = single_df[col].clip(0.0, 1.0)
                        
                    # Save metrics for display
                    gap_val = float(single_df.at[0, 'PromotionGapRatio'])
                    stagnant_val = float(single_df.at[0, 'RoleStagnationIndex'])
                    
                    # 2. Categorical Encoding
                    encoders = models['encoders']
                    for col, le in encoders.items():
                        if col in single_df.columns:
                            val = str(single_df.at[0, col]).strip()
                            if val in le.classes_:
                                single_df[col] = le.transform([val])[0]
                            else:
                                single_df[col] = le.transform([le.classes_[0]])[0]
                                
                    # 3. K-Means Clustering
                    cluster_features = [
                        'JobLevel', 'YearsAtCompany', 'YearsInCurrentRole', 
                        'YearsSinceLastPromotion', 'PromotionGapRatio', 'RoleStagnationIndex',
                        'PerformanceRating', 'JobSatisfaction'
                    ]
                    scaler_cluster = models['scaler_cluster']
                    kmeans_model = models['kmeans']
                    scaled_c_input = scaler_cluster.transform(single_df[cluster_features])
                    cluster_assignment = int(kmeans_model.predict(scaled_c_input)[0])
                    
                    # 4. Attrition Risk Classification
                    scaler_classify = models['scaler_classify']
                    rf_model = models['rf_model']
                    feature_names = models['feature_names']
                    
                    input_classify = single_df[feature_names]
                    scaled_class_input = scaler_classify.transform(input_classify)
                    risk_probability = float(rf_model.predict_proba(scaled_class_input)[0][1])
                    
                    # Display Results
                    st.divider()
                    st.subheader("🔍 Prediction Outputs")
                    
                    res_col1, res_col2, res_col3 = st.columns(3)
                    
                    with res_col1:
                        persona_info = profile_dict.get(cluster_assignment, {"persona": "Unknown Persona", "description": "N/A"})
                        st.metric("Assigned Career Cluster", f"Cluster {cluster_assignment}")
                        st.markdown(f"**Persona:** {persona_info['persona']}")
                        st.caption(persona_info['description'])
                        
                    with res_col2:
                        risk_pct = risk_probability * 100
                        if risk_pct > 50:
                            st.metric("Attrition Risk Probability", f"{risk_pct:.1f}%", delta="High Risk", delta_color="inverse")
                        elif risk_pct > 25:
                            st.metric("Attrition Risk Probability", f"{risk_pct:.1f}%", delta="Moderate Risk", delta_color="off")
                        else:
                            st.metric("Attrition Risk Probability", f"{risk_pct:.1f}%", delta="Low Risk", delta_color="normal")
                            
                    with res_col3:
                        st.metric("Promotion Gap Ratio", f"{gap_val:.2f}")
                        st.metric("Role Stagnation Index", f"{stagnant_val:.2f}")
                        
                    # Show suggested retention actions
                    st.subheader("💡 Recommended Intervention Strategy")
                    if risk_probability > 0.5:
                        st.error("🚨 **Urgent Action Required:** This employee is at high risk of stagnation-driven attrition.")
                    
                    if gap_val > promo_threshold:
                        st.warning("⚠️ **Promotion Gap Detected:** The promotion gap is above the threshold.")
                        st.markdown("* **Recommendation 1:** Schedule a formal career advancement review within 14 days.")
                        st.markdown("* **Recommendation 2:** Conduct a compensation bench review against department averages.")
                    if stagnant_val > stagnation_threshold:
                        st.warning("⚠️ **Role Stagnation Flagged:** Time spent in the current job role is excessive.")
                        st.markdown("* **Recommendation 3:** Explore immediate lateral job rotation opportunities.")
                        st.markdown("* **Recommendation 4:** Assign high-visibility cross-functional leadership projects.")
                    if training < 2:
                        st.info("ℹ️ **Upskilling Recommended:** Low training involvement observed.")
                        st.markdown("* **Recommendation 5:** Register for immediate learning path credentials or professional courses.")
                        
                    if gap_val <= promo_threshold and stagnant_val <= stagnation_threshold and risk_probability <= 0.25:
                        st.success("✅ **Healthy Trajectory:** Employee's career metrics and progression are currently in line with expectations.")
