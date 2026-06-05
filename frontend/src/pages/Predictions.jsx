import React, { useState } from 'react';

export default function Predictions() {
  const [form, setForm] = useState({
    Age: 35,
    BusinessTravel: 'Travel_Rarely',
    DailyRate: 1000,
    Department: 'Research & Development',
    DistanceFromHome: 5,
    Education: 3,
    EducationField: 'Life Sciences',
    EnvironmentSatisfaction: 3,
    Gender: 'Male',
    HourlyRate: 75,
    JobInvolvement: 3,
    JobLevel: 2,
    JobRole: 'Research Scientist',
    JobSatisfaction: 3,
    MaritalStatus: 'Married',
    MonthlyIncome: 5000,
    MonthlyRate: 15000,
    NumCompaniesWorked: 1,
    OverTime: 'No',
    PercentSalaryHike: 15,
    PerformanceRating: 3,
    RelationshipSatisfaction: 3,
    StockOptionLevel: 1,
    TotalWorkingYears: 8,
    TrainingTimesLastYear: 2,
    WorkLifeBalance: 3,
    YearsAtCompany: 6,
    YearsInCurrentRole: 4,
    YearsSinceLastPromotion: 1,
    YearsWithCurrManager: 3
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(data => {
        setResult(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const getPrescription = (risk, gap) => {
    if (risk > 0.5) {
      return {
        level: 'CRITICAL WARNING',
        color: 'var(--danger)',
        bg: 'rgba(239, 68, 68, 0.08)',
        border: 'rgba(239, 68, 68, 0.2)',
        advice: 'Flight risk is high due to stagnation indicators. We recommend adjusting Job Satisfaction levels (e.g. environment or manager change) or deploying a salary hike (> 15%) or stock options to balance career delays.'
      };
    }
    if (gap > 0.4) {
      return {
        level: 'PROGRESSION MONITOR',
        color: 'var(--warning)',
        bg: 'rgba(245, 158, 11, 0.08)',
        border: 'rgba(245, 158, 11, 0.2)',
        advice: 'The promotion gap is high, but the employee shows stable engagement. Schedule a leadership review to discuss internal career milestones and prevent stagnation drift.'
      };
    }
    return {
      level: 'HEALTHY VELOCITY',
      color: 'var(--success)',
      bg: 'rgba(16, 185, 129, 0.08)',
      border: 'rgba(16, 185, 129, 0.2)',
      advice: 'Employee is in a stable career progression window. Continue standard training intervals and monitor work-life balance ratios during annual checks.'
    };
  };

  return (
    <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'start' }}>
      
      {/* Simulation Inputs Form */}
      <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>Career Simulator Sandbox</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Modify career telemetry parameters to simulate stagnation metrics and predict flight risk scores instantly.
          </p>
        </div>

        {/* Input Groups */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Years at Company</label>
            <input
              type="number"
              min="0"
              value={form.YearsAtCompany}
              onChange={(e) => setForm({ ...form, YearsAtCompany: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Years Since Last Promotion</label>
            <input
              type="number"
              min="0"
              value={form.YearsSinceLastPromotion}
              onChange={(e) => setForm({ ...form, YearsSinceLastPromotion: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Years in Current Role</label>
            <input
              type="number"
              min="0"
              value={form.YearsInCurrentRole}
              onChange={(e) => setForm({ ...form, YearsInCurrentRole: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Training Times Last Year</label>
            <input
              type="number"
              min="0"
              max="10"
              value={form.TrainingTimesLastYear}
              onChange={(e) => setForm({ ...form, TrainingTimesLastYear: parseInt(e.target.value) || 0 })}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Job Satisfaction (1-4)</label>
            <select
              value={form.JobSatisfaction}
              onChange={(e) => setForm({ ...form, JobSatisfaction: parseInt(e.target.value) || 3 })}
              style={{
                padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)',
                color: '#fff', fontSize: '0.85rem', outline: 'none'
              }}
            >
              <option value="1">1 - Extremely Dissatisfied</option>
              <option value="2">2 - Dissatisfied</option>
              <option value="3">3 - Satisfied</option>
              <option value="4">4 - Highly Satisfied</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Job Level (1-5)</label>
            <select
              value={form.JobLevel}
              onChange={(e) => setForm({ ...form, JobLevel: parseInt(e.target.value) || 1 })}
              style={{
                padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)',
                color: '#fff', fontSize: '0.85rem', outline: 'none'
              }}
            >
              <option value="1">Level 1 - Junior Entry</option>
              <option value="2">Level 2 - Associate</option>
              <option value="3">Level 3 - Senior Specialist</option>
              <option value="4">Level 4 - Manager / Architect</option>
              <option value="5">Level 5 - Director / Executive</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Overtime Required</label>
            <select
              value={form.OverTime}
              onChange={(e) => setForm({ ...form, OverTime: e.target.value })}
              style={{
                padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)',
                color: '#fff', fontSize: '0.85rem', outline: 'none'
              }}
            >
              <option value="No">No Overtime</option>
              <option value="Yes">Yes (Regular Overtime)</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Work-Life Balance (1-4)</label>
            <select
              value={form.WorkLifeBalance}
              onChange={(e) => setForm({ ...form, WorkLifeBalance: parseInt(e.target.value) || 3 })}
              style={{
                padding: '10px 14px', borderRadius: '8px',
                background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)',
                color: '#fff', fontSize: '0.85rem', outline: 'none'
              }}
            >
              <option value="1">1 - Poor Balance</option>
              <option value="2">2 - Fair Balance</option>
              <option value="3">3 - Good Balance</option>
              <option value="4">4 - Outstanding Balance</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '14px',
            background: 'var(--primary)',
            border: 'none',
            borderRadius: '8px',
            color: '#fff',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: 'var(--glow-primary)',
            marginTop: '10px',
            fontSize: '0.92rem'
          }}
        >
          {loading ? 'Simulating ML Forecast...' : 'Run ML Stagnation Forecast 🚀'}
        </button>
      </form>

      {/* Output Results Panel */}
      <div className="glass-panel" style={{ padding: '30px', minHeight: '440px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {result ? (
          <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '10px' }}>Forecast Success</span>
              <h3 style={{ fontSize: '1.45rem', color: 'var(--text-primary)', fontWeight: 700 }} className="text-gradient-accent">
                {result.persona}
              </h3>
            </div>

            {/* Visual SVG Gauges */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
              
              {/* Dial 1: Attrition Risk */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative', width: '110px', height: '110px' }}>
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="8" />
                    <circle 
                      cx="55" cy="55" r="48" fill="none" 
                      stroke={result.stagnation_attrition_risk_probability > 0.5 ? 'var(--danger)' : 'var(--success)'} 
                      strokeWidth="8" 
                      strokeDasharray="301.6" 
                      strokeDashoffset={301.6 * (1 - result.stagnation_attrition_risk_probability)}
                      strokeLinecap="round"
                      transform="rotate(-90 55 55)"
                      style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {(result.stagnation_attrition_risk_probability * 100).toFixed(0)}%
                  </div>
                </div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Attrition Risk</span>
              </div>

              {/* Dial 2: Promotion Stagnation */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ position: 'relative', width: '110px', height: '110px' }}>
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r="48" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="8" />
                    <circle 
                      cx="55" cy="55" r="48" fill="none" 
                      stroke="var(--accent)" 
                      strokeWidth="8" 
                      strokeDasharray="301.6" 
                      strokeDashoffset={301.6 * (1 - result.ratios.promotion_gap_ratio)}
                      strokeLinecap="round"
                      transform="rotate(-90 55 55)"
                      style={{ transition: 'stroke-dashoffset 0.8s ease-in-out' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {(result.ratios.promotion_gap_ratio * 100).toFixed(0)}%
                  </div>
                </div>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Promotion Gap</span>
              </div>

            </div>

            {/* Prescriptive feedback */}
            {(() => {
              const presc = getPrescription(result.stagnation_attrition_risk_probability, result.ratios.promotion_gap_ratio);
              return (
                <div style={{
                  padding: '20px',
                  borderRadius: '12px',
                  background: presc.bg,
                  border: `1px solid ${presc.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}>
                  <span style={{ fontSize: '0.78rem', color: presc.color, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em' }}>
                    {presc.level}
                  </span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                    {presc.advice}
                  </p>
                </div>
              );
            })()}

          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '20px 0' }}>
            <span style={{ fontSize: '48px', display: 'block', marginBottom: '14px' }}>🎮</span>
            Configure the parameters on the left and submit to evaluate real-time career path trajectory segments.
          </div>
        )}
      </div>
    </div>
  );
}
