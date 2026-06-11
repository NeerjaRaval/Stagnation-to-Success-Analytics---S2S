import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';

const RouteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3"/>
    <circle cx="18" cy="18" r="3"/>
    <path d="M18 15V9a4 4 0 0 0-4-4H9"/>
  </svg>
);

const levelLabels = [
  { lv: 1, name: 'L1: Junior Entry' },
  { lv: 2, name: 'L2: Associate' },
  { lv: 3, name: 'L3: Senior Specialist' },
  { lv: 4, name: 'L4: Manager / Architect' },
  { lv: 5, name: 'L5: Director / Executive' }
];

export default function TalentMobility() {
  // Simulator state with 6 key sliders. Other inputs are fixed to standard averages.
  const [inputs, setInputs] = useState({
    YearsSinceLastPromotion: 1,
    YearsInCurrentRole: 3,
    YearsAtCompany: 5,
    JobLevel: 2,
    TrainingTimesLastYear: 2,
    JobSatisfaction: 3
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [personas, setPersonas] = useState([]);

  // Fetch personas for descriptive guide
  useEffect(() => {
    fetch(`${API_BASE}/api/explainability`)
      .then(res => res.json())
      .then(data => {
        if (data && data.personas) {
          setPersonas(data.personas);
        }
      })
      .catch(err => console.error("Error loading personas:", err));
  }, []);

  // Run prediction automatically when slider inputs change
  useEffect(() => {
    setLoading(true);
    // Standard average values for other columns required by model
    const payload = {
      Age: 35,
      BusinessTravel: 'Travel_Rarely',
      DailyRate: 800,
      Department: 'Research & Development',
      DistanceFromHome: 6,
      Education: 3,
      EducationField: 'Life Sciences',
      EnvironmentSatisfaction: 3,
      Gender: 'Male',
      HourlyRate: 65,
      JobInvolvement: 3,
      JobRole: 'Research Scientist',
      MaritalStatus: 'Married',
      MonthlyIncome: inputs.JobLevel * 2500, // proportional to job level
      MonthlyRate: 15000,
      NumCompaniesWorked: 1,
      OverTime: 'No',
      PercentSalaryHike: 15,
      PerformanceRating: 3,
      RelationshipSatisfaction: 3,
      StockOptionLevel: 1,
      TotalWorkingYears: Math.max(inputs.YearsAtCompany + 2, inputs.JobLevel * 3),
      YearsWithCurrManager: Math.min(inputs.YearsAtCompany, 3),
      ...inputs
    };

    const timer = setTimeout(() => {
      fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(res => {
          if (!res.ok) throw new Error("Simulation failed");
          return res.json();
        })
        .then(data => {
          setPrediction(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }, 150); // debounce input changes

    return () => clearTimeout(timer);
  }, [inputs]);

  const handleSliderChange = (key, val) => {
    setInputs(prev => {
      const next = { ...prev, [key]: val };
      // Sanity checks: Years Since Last Promotion & Years in Current Role cannot exceed Years at Company
      if (key === 'YearsAtCompany') {
        if (next.YearsSinceLastPromotion > val) next.YearsSinceLastPromotion = val;
        if (next.YearsInCurrentRole > val) next.YearsInCurrentRole = val;
      } else if (key === 'YearsSinceLastPromotion' || key === 'YearsInCurrentRole') {
        if (val > next.YearsAtCompany) next.YearsAtCompany = val;
      }
      return next;
    });
  };

  const getRiskColor = (prob) => {
    if (prob > 0.6) return 'var(--danger)';
    if (prob > 0.3) return 'var(--warning)';
    return 'var(--success)';
  };

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Page Header */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RouteIcon />
            Talent Mobility & Career Pathway Simulator
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Perform interactive "What-If" simulations on career progression timelines to model attrition risks and career cluster profiles.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5fr', gap: '24px', alignItems: 'start' }}>
        
        {/* Sliders Form Card */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Simulated Telemetry Sliders</h3>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Adjust inputs to observe the ML model forecast in real time.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Slider 1: Years at Company */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Years at Company</span>
                <strong style={{ color: 'var(--primary)' }}>{inputs.YearsAtCompany} years</strong>
              </div>
              <input 
                type="range" min="1" max="25" step="1"
                value={inputs.YearsAtCompany}
                onChange={e => handleSliderChange('YearsAtCompany', parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>

            {/* Slider 2: Years Since Last Promotion */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Years Since Last Promotion</span>
                <strong style={{ color: 'var(--accent)' }}>{inputs.YearsSinceLastPromotion} years</strong>
              </div>
              <input 
                type="range" min="0" max="15" step="1"
                value={inputs.YearsSinceLastPromotion}
                onChange={e => handleSliderChange('YearsSinceLastPromotion', parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
            </div>

            {/* Slider 3: Years in Current Role */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Years in Current Role</span>
                <strong style={{ color: 'var(--purple)' }}>{inputs.YearsInCurrentRole} years</strong>
              </div>
              <input 
                type="range" min="0" max="15" step="1"
                value={inputs.YearsInCurrentRole}
                onChange={e => handleSliderChange('YearsInCurrentRole', parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--purple)' }}
              />
            </div>

            {/* Slider 4: Training Times Last Year */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Training Times (Last Year)</span>
                <strong style={{ color: 'var(--success)' }}>{inputs.TrainingTimesLastYear} sessions</strong>
              </div>
              <input 
                type="range" min="0" max="6" step="1"
                value={inputs.TrainingTimesLastYear}
                onChange={e => handleSliderChange('TrainingTimesLastYear', parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--success)' }}
              />
            </div>

            {/* Slider 5: Job Level */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Job Level</span>
                <strong style={{ color: 'var(--warning)' }}>Level {inputs.JobLevel}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                {[1, 2, 3, 4, 5].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => handleSliderChange('JobLevel', lvl)}
                    style={{
                      flex: 1, padding: '8px 0', border: '1px solid var(--border-glass)', borderRadius: '6px',
                      background: inputs.JobLevel === lvl ? 'var(--warning)' : 'rgba(0,0,0,0.1)',
                      color: inputs.JobLevel === lvl ? '#000' : 'var(--text-secondary)',
                      fontWeight: 700, fontSize: '0.76rem', cursor: 'pointer', transition: 'all 0.15s'
                    }}
                  >
                    L{lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 6: Job Satisfaction */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>Job Satisfaction</span>
                <strong style={{ color: 'var(--orange)' }}>{inputs.JobSatisfaction} / 4</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '6px' }}>
                {[1, 2, 3, 4].map(sat => (
                  <button
                    key={sat}
                    onClick={() => handleSliderChange('JobSatisfaction', sat)}
                    style={{
                      flex: 1, padding: '8px 0', border: '1px solid var(--border-glass)', borderRadius: '6px',
                      background: inputs.JobSatisfaction === sat ? 'var(--orange)' : 'rgba(0,0,0,0.1)',
                      color: inputs.JobSatisfaction === sat ? '#000' : 'var(--text-secondary)',
                      fontWeight: 700, fontSize: '0.76rem', cursor: 'pointer', transition: 'all 0.15s'
                    }}
                  >
                    {sat}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Forecast Output & Visualization Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Main output indicators */}
          <div className="glass-panel" style={{ padding: '28px', minHeight: '230px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            
            {loading && (
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15,23,42,0.7)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                <span style={{ color: '#fff', fontSize: '0.86rem', fontWeight: 600 }} className="animate-pulse">Analyzing pathway shift... ⚡</span>
              </div>
            )}

            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Pathway Simulation Output</h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Predicted career profile matching and flight risk.</p>
            </div>

            {prediction ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                  {/* Gauge Attrition Risk */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <div style={{ position: 'relative', width: '100px', height: '100px' }}>
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle cx="55" cy="55" r="40" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="7" />
                        <circle 
                          cx="55" cy="55" r="40" fill="none" 
                          stroke={getRiskColor(prediction.stagnation_attrition_risk_probability)} 
                          strokeWidth="7" 
                          strokeDasharray="251.2" 
                          strokeDashoffset={251.2 * (1 - prediction.stagnation_attrition_risk_probability)}
                          strokeLinecap="round"
                          transform="rotate(-90 55 55)"
                          style={{ transition: 'stroke-dashoffset 0.4s ease-out' }}
                        />
                      </svg>
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 800, color: '#fff' }}>
                        {(prediction.stagnation_attrition_risk_probability * 100).toFixed(0)}%
                      </div>
                    </div>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Attrition Risk</span>
                  </div>

                  {/* Profile Details text */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Cluster Assignment</span>
                    <strong style={{ fontSize: '1.25rem', color: 'var(--accent)', fontWeight: 700 }} className="text-gradient-accent">
                      {prediction.persona}
                    </strong>
                    <div style={{ display: 'flex', gap: '10px', fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      <span>Promotion Stagnation: <strong>{(prediction.ratios.promotion_gap_ratio * 100).toFixed(0)}%</strong></span>
                      <span>•</span>
                      <span>Role Stagnation: <strong>{(prediction.ratios.role_stagnation_index * 100).toFixed(0)}%</strong></span>
                    </div>
                  </div>
                </div>

                {/* Prescription card */}
                <div style={{
                  padding: '14px 18px', borderRadius: '8px',
                  background: prediction.stagnation_attrition_risk_probability > 0.5 ? 'rgba(239, 68, 68, 0.05)' : 'rgba(16, 185, 129, 0.04)',
                  border: `1px solid ${prediction.stagnation_attrition_risk_probability > 0.5 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.1)'}`,
                  fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4'
                }}>
                  {prediction.stagnation_attrition_risk_probability > 0.5 ? (
                    <span style={{ color: 'var(--danger)', fontWeight: 700, display: 'block', marginBottom: '2px', fontSize: '0.72rem', textTransform: 'uppercase' }}>⚠️ Retentive Intervention Advised</span>
                  ) : (
                    <span style={{ color: 'var(--success)', fontWeight: 700, display: 'block', marginBottom: '2px', fontSize: '0.72rem', textTransform: 'uppercase' }}>✓ Stagnation Velocity Normal</span>
                  )}
                  {prediction.stagnation_attrition_risk_probability > 0.5 
                    ? "Flight risk triggers. Consider scheduling a progression audit or initiating cross-departmental rotation to break manager-employee tenure stagnation."
                    : "Employee displays healthy career velocity indicators. Standard annual progression checks and training resources remain sufficient."}
                </div>

              </div>
            ) : (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Waiting for simulator telemetry inputs...</div>
            )}

          </div>

          {/* Interactive Career pathway diagram */}
          <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <h4 style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Active Path Placement</h4>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Visual positioning of simulated employee along organization levels</span>
            </div>

            {/* SVG Flow diagram */}
            <div style={{ width: '100%', background: 'rgba(0,0,0,0.1)', padding: '20px 10px', borderRadius: '10px', display: 'flex', justifyContent: 'center' }}>
              <svg width="100%" height="80" viewBox="0 0 500 80" style={{ overflow: 'visible' }}>
                {/* Horizontal flow line */}
                <line x1="40" y1="40" x2="460" y2="40" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
                
                {/* Connection paths */}
                <line 
                  x1="40" y1="40" 
                  x2={40 + (inputs.JobLevel - 1) * 105} 
                  y2="40" 
                  stroke="var(--warning)" 
                  strokeWidth="4" 
                  style={{ transition: 'x2 0.3s ease' }} 
                />

                {/* Level Nodes */}
                {[1, 2, 3, 4, 5].map((lvl, idx) => {
                  const cx = 40 + idx * 105;
                  const active = inputs.JobLevel === lvl;
                  const passed = inputs.JobLevel > lvl;
                  return (
                    <g key={lvl} style={{ cursor: 'pointer' }} onClick={() => handleSliderChange('JobLevel', lvl)}>
                      <circle 
                        cx={cx} cy="40" r={active ? "12" : "8"} 
                        fill={active ? "var(--warning)" : passed ? "rgba(245,158,11,0.3)" : "rgba(255,255,255,0.08)"} 
                        stroke={active ? "#fff" : "rgba(255,255,255,0.1)"}
                        strokeWidth={active ? "2" : "1"}
                        style={{ transition: 'all 0.2s' }}
                      />
                      {/* Badge / text for current state */}
                      {active && (
                        <circle cx={cx} cy="40" r="16" fill="none" stroke="var(--warning)" strokeWidth="1" className="animate-ping" style={{ transformOrigin: `${cx}px 40px`, opacity: 0.5 }} />
                      )}
                      <text 
                        x={cx} y="68" 
                        textAnchor="middle" 
                        fill={active ? "#fff" : "var(--text-muted)"} 
                        fontSize="9" 
                        fontWeight={active ? "700" : "500"}
                      >
                        L{lvl}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {levelLabels.map(lbl => (
                <div key={lbl.lv} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 8px', borderRadius: '4px', background: inputs.JobLevel === lbl.lv ? 'rgba(245,158,11,0.06)' : 'transparent' }}>
                  <span style={{ fontSize: '0.7rem', color: inputs.JobLevel === lbl.lv ? 'var(--warning)' : 'var(--text-muted)', fontWeight: 700 }}>L{lbl.lv}</span>
                  <span style={{ color: inputs.JobLevel === lbl.lv ? '#fff' : 'var(--text-secondary)' }}>{lbl.name}</span>
                  {inputs.JobLevel === lbl.lv && <span style={{ marginLeft: 'auto', fontSize: '0.68rem', color: 'var(--warning)', fontWeight: 700 }}>Active Placement</span>}
                </div>
              ))}
            </div>

          </div>

          {/* Personas Reference list */}
          {personas.length > 0 && (
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>Workforce Personas Reference Guide</h4>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Learn about the unsupervised K-Means clusters found in our dataset.</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {personas.map(p => (
                  <div key={p.cluster} style={{ padding: '12px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff' }}>{p.persona}</span>
                      <span className="badge badge-primary" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>Cluster {p.cluster}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      <span>Average Tenure: <strong>{p.avg_tenure.toFixed(1)} years</strong></span>
                      <span>Promotion Gap Ratio: <strong>{(p.avg_promotion_gap_ratio * 100).toFixed(0)}%</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </section>

    </div>
  );
}
