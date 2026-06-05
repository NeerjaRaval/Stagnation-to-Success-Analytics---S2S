import pandas as pd
import numpy as np
import re
import urllib.request
import json

class LocalCSVAI:
    def __init__(self, csv_path="Palo Alto Networks_processed.csv"):
        self.csv_path = csv_path
        self.load_data()
        
    def load_data(self):
        try:
            self.df = pd.read_csv(self.csv_path)
        except Exception:
            # Fallback to base CSV if processed doesn't exist yet
            try:
                self.df = pd.read_csv("Palo Alto Networks.csv")
            except Exception:
                self.df = None

    def query(self, user_prompt: str) -> dict:
        """
        Parses the user prompt and returns matching analytics or falls back
        to Ollama if available.
        """
        if self.df is None:
            self.load_data()
            if self.df is None:
                return {"text": "Error: Dataset is currently unavailable.", "data": None}
                
        prompt = user_prompt.lower().strip()
        
        # 1. Profile Query (e.g., "show employee 41" or "who is employee 15")
        profile_match = re.search(r'(?:employee|profile|user|id)\s+(\d+)', prompt)
        if profile_match:
            idx = int(profile_match.group(1))
            # Since index is in row matching or index column, let's look up index or age (since Age is first column)
            # Standard IBM dataset doesn't have an explicit ID column, let's assume Row Index + 1 or a specific record index
            # Let's search by row number or create dummy IDs
            if idx < len(self.df):
                row = self.df.iloc[idx]
                md = f"### 📊 Profile for Employee #{idx}\n\n"
                md += f"* **Age / Gender:** {row['Age']} years / {row.get('Gender', 'N/A')}\n"
                md += f"* **Department:** {row.get('Department', 'N/A')} - **Role:** {row.get('JobRole', 'N/A')} (Level {row.get('JobLevel', 'N/A')})\n"
                md += f"* **Promotion Gap Ratio:** {row.get('PromotionGapRatio', 0.0):.2%}\n"
                md += f"* **Years Since Last Promotion:** {row.get('YearsSinceLastPromotion', 0.0)} years\n"
                md += f"* **Years In Current Role:** {row.get('YearsInCurrentRole', 0.0)} years\n"
                md += f"* **Stagnation Attrition Risk:** {row.get('StagnationAttritionRisk', 0.0):.1%}\n"
                md += f"* **Work-Life Balance:** {row.get('WorkLifeBalance', 'N/A')}/4\n"
                
                # Check status
                stg_score = float(row.get('PromotionGapRatio', 0.0))
                if stg_score > 0.5:
                    status = "🔴 **Critical Career Stagnation Warning** - Promotion due since long."
                elif stg_score > 0.25:
                    status = "🟡 **Moderate Career Stagnation Monitor** - Nearing promotion threshold."
                else:
                    status = "🟢 **Healthy Career Path Velocity**"
                md += f"\n**Status**: {status}\n"
                
                return {"text": md, "data": row.to_dict()}
                
        # 2. Department comparison (e.g., "compare departments" or "department stagnation")
        if "department" in prompt or "compare dept" in prompt:
            if 'Department' in self.df.columns:
                dept_summary = self.df.groupby('Department').agg(
                    Avg_Promotion_Gap_Ratio=('PromotionGapRatio', 'mean'),
                    Avg_Role_Stagnation=('RoleStagnationIndex', 'mean'),
                    Attrition_Rate=('Attrition', 'mean'),
                    Total_Employees=('Age', 'count')
                ).reset_index()
                
                md = "### 🏢 Department-Level Career Progression & Stagnation Summary\n\n"
                md += "| Department | Avg Promotion Gap Ratio | Avg Role Stagnation | Attrition Rate | Count |\n"
                md += "| :--- | :--- | :--- | :--- | :--- |\n"
                
                chart_data = []
                for _, r in dept_summary.iterrows():
                    md += f"| **{r['Department']}** | {r['Avg_Promotion_Gap_Ratio']:.1%} | {r['Avg_Role_Stagnation']:.1%} | {r['Attrition_Rate']:.1%} | {r['Total_Employees']} |\n"
                    chart_data.append({
                        "name": r['Department'],
                        "gap": round(float(r['Avg_Promotion_Gap_Ratio']) * 100, 1),
                        "stagnation": round(float(r['Avg_Role_Stagnation']) * 100, 1),
                        "attrition": round(float(r['Attrition_Rate']) * 100, 1)
                    })
                    
                return {"text": md, "data": chart_data}
                
        # 3. High Risk listing (e.g., "list high risk" or "who is stuck")
        if "high risk" in prompt or "stuck" in prompt or "stagnant" in prompt:
            high_risk = self.df[self.df['PromotionGapRatio'] > 0.5].sort_values(by='PromotionGapRatio', ascending=False).head(10)
            
            md = "### ⚠️ Top 10 Employees flag for High Promotion Gaps / Stagnation\n\n"
            md += "| Row ID | Age | Department | Job Role | Promotion Gap Ratio | Years Stuck | Attrition Risk |\n"
            md += "| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n"
            
            chart_data = []
            for idx, r in high_risk.iterrows():
                md += f"| #{idx} | {r['Age']} | {r['Department']} | {r['JobRole']} | {r['PromotionGapRatio']:.1%} | {r['YearsSinceLastPromotion']} yrs | {r.get('StagnationAttritionRisk', 0.0):.1%} |\n"
                chart_data.append({
                    "id": f"Employee {idx}",
                    "gap": round(float(r['PromotionGapRatio']) * 100, 1),
                    "stuck": int(r['YearsSinceLastPromotion']),
                    "risk": round(float(r.get('StagnationAttritionRisk', 0.0)) * 100, 1)
                })
                
            return {"text": md, "data": chart_data}
            
        # 4. Fallback: Ollama Local Model query
        try:
            # We can run query on Local Ollama Llama3 model on 11434
            ollama_url = "http://localhost:11434/api/generate"
            stats = {
                "total_employees": int(self.df.shape[0]),
                "avg_age": float(self.df['Age'].mean()),
                "avg_promotion_gap": float(self.df.get('PromotionGapRatio', 0.0).mean()),
                "avg_role_stagnation": float(self.df.get('RoleStagnationIndex', 0.0).mean()),
                "attrition_rate": float(self.df['Attrition'].mean())
            }
            
            prompt_enriched = f"""
            You are Antigravity Career Progression Analyst for Palo Alto Networks.
            Use these statistics from our employee dataset to answer the user's question.
            
            Dataset statistics:
            - Total Employees: {stats['total_employees']}
            - Average Age: {stats['avg_age']:.1f}
            - Average Promotion Gap Ratio: {stats['avg_promotion_gap']:.2%}
            - Average Role Stagnation Index: {stats['avg_role_stagnation']:.2%}
            - Overall Attrition Rate: {stats['attrition_rate']:.2%}
            
            User Question: "{user_prompt}"
            
            Answer concisely and professionally. Focus on workforce career path solutions.
            """
            
            req_data = json.dumps({
                "model": "llama3",
                "prompt": prompt_enriched,
                "stream": False
            }).encode('utf-8')
            
            req = urllib.request.Request(
                ollama_url, 
                data=req_data, 
                headers={'Content-Type': 'application/json'}
            )
            
            with urllib.request.urlopen(req, timeout=5) as response:
                resp_data = json.loads(response.read().decode('utf-8'))
                return {"text": resp_data.get("response", ""), "data": stats}
                
        except Exception:
            # If Ollama is offline, return smart local diagnostic fallback
            return {
                "text": "### ℹ️ Copilot Response\n\nI interpreted your request. Here are standard workforce diagnostics:\n\n"
                        f"* Total Workforce Analyzed: **{self.df.shape[0]} employees**\n"
                        f"* Average Promotion Stagnation Gap: **{self.df.get('PromotionGapRatio', 0.0).mean():.1%}**\n"
                        f"* Job Progression Stuck Ratio: **{self.df.get('RoleStagnationIndex', 0.0).mean():.1%}**\n\n"
                        "*Tip: Try asking: 'Compare departments' or 'List high risk' to see parsed details.*",
                "data": None
            }
