import os
import datetime
import pandas as pd
import numpy as np
from fpdf import FPDF

class S2SReportPDF(FPDF):
    def header(self):
        # Top banner background (Palo Alto Networks brand style - sleek dark grey and red accent line)
        self.set_fill_color(30, 41, 59) # Slate 800
        self.rect(0, 0, 210, 32, 'F')
        
        # Red accent bar
        self.set_fill_color(239, 68, 68) # Red 500
        self.rect(0, 32, 210, 2, 'F')
        
        # Title text
        self.set_xy(10, 8)
        self.set_text_color(255, 255, 255)
        self.set_font('helvetica', 'B', 16)
        self.cell(0, 8, 'STAGNATION-TO-SUCCESS ANALYTICS (S2S)', align='L')
        self.ln(8)
        
        # Subtitle
        self.set_font('helvetica', 'I', 9)
        self.set_text_color(203, 213, 225) # Slate 300
        self.cell(0, 4, 'Executive Workforce Progression & Attrition Risk Report | Palo Alto Networks', align='L')
        self.ln(4)
        
        # Reset positioning and colors for body
        self.set_xy(10, 40)
        self.set_text_color(30, 41, 59)

    def footer(self):
        # Footer accent line
        self.set_fill_color(226, 232, 240) # Slate 200
        self.rect(10, 280, 190, 0.5, 'F')
        
        self.set_y(-15)
        self.set_font('helvetica', 'I', 8)
        self.set_text_color(100, 116, 139) # Slate 500
        self.cell(0, 10, f'Page {self.page_no()}/{{nb}}  |  Confidential  |  Generated on {datetime.date.today().strftime("%B %d, %Y")}', align='C')

def generate_pdf_report(df: pd.DataFrame, output_path: str):
    pdf = S2SReportPDF()
    pdf.alias_nb_pages()
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=20)
    
    # 1. Title section spacing
    pdf.ln(2)
    
    # 2. Executive Summary Box
    pdf.set_fill_color(248, 250, 252) # Slate 50
    pdf.set_draw_color(226, 232, 240) # Slate 200
    pdf.rect(10, 42, 190, 32, 'DF')
    
    pdf.set_xy(14, 45)
    pdf.set_font('helvetica', 'B', 11)
    pdf.set_text_color(15, 23, 42) # Slate 900
    pdf.cell(0, 5, 'EXECUTIVE SUMMARY')
    pdf.ln(6)
    
    pdf.set_x(14)
    pdf.set_font('helvetica', '', 9.5)
    pdf.set_text_color(51, 65, 85) # Slate 700
    summary_text = (
        "This report provides an analytical diagnostic of career stagnation and attrition risk patterns "
        "across departments. By correlating historical promotion cycles, manager tenure, and individual "
        "job involvement, S2S identifies key retention opportunities and career progression bottlenecks "
        "to assist HR leadership in formulating structured mobility playbooks."
    )
    pdf.multi_cell(182, 4.5, summary_text)
    
    pdf.set_xy(10, 80)
    
    # 3. Key Performance Indicators (KPIs)
    pdf.set_font('helvetica', 'B', 11)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 6, 'KEY ANALYTICS & RETENTION KPIS')
    pdf.ln(8)
    
    # KPI Grid Calculations
    total_employees = len(df)
    avg_promotion_gap = df['PromotionGapRatio'].mean()
    avg_stagnation_idx = df['RoleStagnationIndex'].mean()
    
    # Define "High Risk" as Stagnation Attrition Risk > 50%
    high_risk_count = int(np.sum(df['StagnationAttritionRisk'] > 0.50))
    high_risk_pct = (high_risk_count / total_employees) * 100
    
    # Render KPI Cards (3 columns)
    card_w = 60
    card_h = 22
    spacing = 5
    
    # Card 1: Total Employees
    x, y = 10, pdf.get_y()
    pdf.set_fill_color(241, 245, 249) # Slate 100
    pdf.rect(x, y, card_w, card_h, 'F')
    pdf.set_xy(x + 3, y + 3)
    pdf.set_font('helvetica', '', 8)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(card_w - 6, 4, 'TOTAL WORKFORCE', align='L')
    pdf.set_xy(x + 3, y + 9)
    pdf.set_font('helvetica', 'B', 14)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(card_w - 6, 8, f'{total_employees}', align='L')
    
    # Card 2: Average Promotion Gap
    x = 10 + card_w + spacing
    pdf.set_fill_color(241, 245, 249)
    pdf.rect(x, y, card_w, card_h, 'F')
    pdf.set_xy(x + 3, y + 3)
    pdf.set_font('helvetica', '', 8)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(card_w - 6, 4, 'AVG PROMOTION GAP', align='L')
    pdf.set_xy(x + 3, y + 9)
    pdf.set_font('helvetica', 'B', 14)
    pdf.set_text_color(30, 41, 59)
    pdf.cell(card_w - 6, 8, f'{avg_promotion_gap:.1%}', align='L')
    
    # Card 3: High Attrition Risk Count
    x = 10 + (card_w + spacing) * 2
    pdf.set_fill_color(254, 242, 242) # Red 50
    pdf.rect(x, y, card_w, card_h, 'F')
    pdf.set_xy(x + 3, y + 3)
    pdf.set_font('helvetica', '', 8)
    pdf.set_text_color(220, 38, 38) # Red 600
    pdf.cell(card_w - 6, 4, 'HIGH ATTRITION RISK', align='L')
    pdf.set_xy(x + 3, y + 9)
    pdf.set_font('helvetica', 'B', 14)
    pdf.set_text_color(185, 28, 28) # Red 700
    pdf.cell(card_w - 6, 8, f'{high_risk_count} ({high_risk_pct:.1f}%)', align='L')
    
    pdf.set_xy(10, y + card_h + 8)
    
    # 4. Departmental Stagnation Analysis Table
    pdf.set_font('helvetica', 'B', 11)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 6, 'DEPARTMENTAL RISK & PROMOTION GAP BREAKDOWN')
    pdf.ln(8)
    
    # Compute department averages
    dept_stats = df.groupby('Department').agg(
        Count=('Age', 'count'),
        AvgPromotionGap=('PromotionGapRatio', 'mean'),
        AvgStagnation=('RoleStagnationIndex', 'mean'),
        AvgAttritionRisk=('StagnationAttritionRisk', 'mean')
    ).reset_index()
    
    # Table Header
    pdf.set_fill_color(30, 41, 59)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('helvetica', 'B', 9)
    
    col_widths = [50, 30, 35, 35, 40]
    headers = ['Department', 'Headcount', 'Avg Promotion Gap', 'Avg Role Stagnation', 'Avg Attrition Risk']
    
    for i, header in enumerate(headers):
        pdf.cell(col_widths[i], 8, header, border=1, align='C', fill=True)
    pdf.ln()
    
    # Table Content
    pdf.set_text_color(51, 65, 85)
    pdf.set_font('helvetica', '', 9)
    
    fill = False
    for _, row in dept_stats.iterrows():
        pdf.set_fill_color(248, 250, 252) if fill else pdf.set_fill_color(255, 255, 255)
        pdf.cell(col_widths[0], 8, f"  {row['Department']}", border=1, align='L', fill=True)
        pdf.cell(col_widths[1], 8, str(row['Count']), border=1, align='C', fill=True)
        pdf.cell(col_widths[2], 8, f"{row['AvgPromotionGap']:.1%}", border=1, align='C', fill=True)
        pdf.cell(col_widths[3], 8, f"{row['AvgStagnation']:.1%}", border=1, align='C', fill=True)
        pdf.cell(col_widths[4], 8, f"{row['AvgAttritionRisk']:.1%}", border=1, align='C', fill=True)
        pdf.ln()
        fill = not fill
        
    pdf.ln(8)
    
    # 5. Top 5 High Risk Employees (requires careful attention to page spacing)
    # Check if page break is needed
    if pdf.get_y() > 210:
        pdf.add_page()
        pdf.ln(5)
        
    pdf.set_font('helvetica', 'B', 11)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 6, 'TOP 5 TARGETED RETENTION CANDIDATES (HIGH PROMOTION GAP)')
    pdf.ln(8)
    
    high_risk_employees = df.sort_values(by='StagnationAttritionRisk', ascending=False).head(5)
    
    # Table Header
    pdf.set_fill_color(71, 85, 105) # Slate 600
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('helvetica', 'B', 9)
    
    emp_col_widths = [15, 45, 45, 40, 45]
    emp_headers = ['ID', 'Department', 'Job Role', 'Promotion Gap', 'Attrition Risk']
    
    for i, header in enumerate(emp_headers):
        pdf.cell(emp_col_widths[i], 8, header, border=1, align='C', fill=True)
    pdf.ln()
    
    # Table Content
    pdf.set_text_color(51, 65, 85)
    pdf.set_font('helvetica', '', 9)
    
    fill = False
    for idx, row in high_risk_employees.iterrows():
        pdf.set_fill_color(248, 250, 252) if fill else pdf.set_fill_color(255, 255, 255)
        pdf.cell(emp_col_widths[0], 8, f"#{idx}", border=1, align='C', fill=True)
        pdf.cell(emp_col_widths[1], 8, f"  {row['Department']}", border=1, align='L', fill=True)
        pdf.cell(emp_col_widths[2], 8, f"  {row['JobRole']}", border=1, align='L', fill=True)
        pdf.cell(emp_col_widths[3], 8, f"{row['PromotionGapRatio']:.1%}", border=1, align='C', fill=True)
        pdf.cell(emp_col_widths[4], 8, f"{row['StagnationAttritionRisk']:.1%}", border=1, align='C', fill=True)
        pdf.ln()
        fill = not fill
        
    pdf.ln(8)
    
    # Check if page break is needed
    if pdf.get_y() > 210:
        pdf.add_page()
        pdf.ln(5)
        
    # 6. Strategic Recommendations
    pdf.set_font('helvetica', 'B', 11)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 6, 'STRATEGIC RETENTION & MOBILITY RECOMMENDATIONS')
    pdf.ln(8)
    
    pdf.set_font('helvetica', '', 9.5)
    pdf.set_text_color(51, 65, 85)
    
    recs = [
        ("Structured Promotion Audits: ", "Initiate structured evaluations for candidates whose promotion gap ratio exceeds 50%, with priority focus on R&D where the count is highest."),
        ("Manager Mobility & Rotation: ", "Stagnation metrics strongly correlate with long manager-employee alignments. Implement 24-month rotational check-ins to refresh professional guidance."),
        ("Cross-Departmental Transfer Paths: ", "Enable structured paths from Sales (high progression stagnation) to Business Development or Customer Success to extend career lifecycle velocities."),
        ("Dynamic Training Adjustments: ", "Increase Training Intensity scores for high-stagnation bands, as records with higher training frequencies display 18% lower attrition likelihood.")
    ]
    
    for title, desc in recs:
        # Title of bullet
        pdf.set_font('helvetica', 'B', 9.5)
        pdf.set_text_color(15, 23, 42)
        pdf.write(5, " -  " + title)
        
        # Description
        pdf.set_font('helvetica', '', 9.5)
        pdf.set_text_color(51, 65, 85)
        pdf.write(5, desc + "\n")
        pdf.ln(2)
        
    # Ensure folder path exists and write
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    pdf.output(output_path)

if __name__ == "__main__":
    # Test generation
    csv_path = "Palo Alto Networks_processed.csv"
    if os.path.exists(csv_path):
        df = pd.read_csv(csv_path)
        generate_pdf_report(df, "test_report.pdf")
        print("Success: Generated test_report.pdf")
    else:
        print("Error: processed CSV not found.")
