import React, { useState } from 'react';

const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/>
    <line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const UserIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

const TrendDownIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
    <polyline points="17 18 23 18 23 12"/>
  </svg>
);

const riskCohorts = [
  { id: 1, role: 'Senior Engineer', dept: 'R&D', yearsStuck: 4.2, satisfScore: 1, risk: 0.87, action: 'Immediate Review' },
  { id: 2, role: 'Sales Executive', dept: 'Sales', yearsStuck: 3.8, satisfScore: 2, risk: 0.74, action: 'Rotation Proposed' },
  { id: 3, role: 'HR Specialist', dept: 'Human Resources', yearsStuck: 3.1, satisfScore: 2, risk: 0.68, action: 'Career Discussion' },
  { id: 4, role: 'Cloud Architect', dept: 'Cloud Security', yearsStuck: 2.9, satisfScore: 1, risk: 0.65, action: 'Immediate Review' },
  { id: 5, role: 'Product Manager', dept: 'R&D', yearsStuck: 2.6, satisfScore: 3, risk: 0.42, action: 'Monitor' },
];

const deptRiskData = [
  { dept: 'Sales', risk: 78, count: 34 },
  { dept: 'R&D', risk: 61, count: 82 },
  { dept: 'Cloud Security', risk: 55, count: 26 },
  { dept: 'Customer Success', risk: 44, count: 19 },
  { dept: 'Human Resources', risk: 38, count: 11 },
  { dept: 'Marketing', risk: 29, count: 8 },
];

const satisfTrendPoints = [
  { label: 'Q1 23', val: 2.8 },
  { label: 'Q2 23', val: 2.5 },
  { label: 'Q3 23', val: 2.9 },
  { label: 'Q4 23', val: 2.6 },
  { label: 'Q1 24', val: 3.1 },
  { label: 'Q2 24', val: 3.3 },
];

export default function RetentionAnalysis() {
  const [selectedRisk, setSelectedRisk] = useState('all');

  const filteredCohorts = selectedRisk === 'high'
    ? riskCohorts.filter(e => e.risk >= 0.6)
    : selectedRisk === 'medium'
    ? riskCohorts.filter(e => e.risk >= 0.3 && e.risk < 0.6)
    : riskCohorts;

  const maxVal = 3.5;
  const svgWidth = 280;
  const svgHeight = 80;
  const pts = satisfTrendPoints.map((p, i) => {
    const x = 20 + (i / (satisfTrendPoints.length - 1)) * (svgWidth - 40);
    const y = svgHeight - 10 - ((p.val / maxVal) * (svgHeight - 20));
    return { x, y, ...p };
  });
  const pathD = pts.map((p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)).join(' ');

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldIcon />
            Retention Risk Analysis
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Identify flight risk employees, examine satisfaction trends, and evaluate disengagement signals across the organisation.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['all', 'high', 'medium'].map(level => (
            <button
              key={level}
              onClick={() => setSelectedRisk(level)}
              style={{
                padding: '7px 14px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 600,
                border: `1px solid ${selectedRisk === level ? 'var(--primary)' : 'var(--border-glass)'}`,
                background: selectedRisk === level ? 'rgba(0,130,240,0.12)' : 'transparent',
                color: selectedRisk === level ? 'var(--text-primary)' : 'var(--text-secondary)',
                cursor: 'pointer', textTransform: 'capitalize'
              }}
            >
              {level === 'all' ? 'All Risk' : level === 'high' ? 'High Risk' : 'Medium Risk'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Strip */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total Monitored', val: '1,011', sub: 'employees tracked', color: 'var(--primary)', icon: <UserIcon /> },
          { label: 'High Risk', val: '47', sub: '4.6% of workforce', color: 'var(--danger)', icon: <AlertTriangleIcon /> },
          { label: 'Medium Risk', val: '121', sub: '12% of workforce', color: 'var(--warning)', icon: <TrendDownIcon /> },
          { label: 'Avg Satisfaction', val: '3.1 / 4', sub: 'improving +0.5 QoQ', color: 'var(--success)', icon: <ShieldIcon /> },
        ].map(kpi => (
          <div key={kpi.label} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: kpi.color }}>
              {kpi.icon}
              <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{kpi.label}</span>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{kpi.val}</div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{kpi.sub}</span>
          </div>
        ))}
      </section>

      {/* Middle row: Risk by dept + Satisfaction Trend */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '20px' }}>

        {/* Department Risk Bars */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Attrition Risk by Department</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Composite flight-risk index per department</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {deptRiskData.map(d => {
              const color = d.risk >= 70 ? 'var(--danger)' : d.risk >= 50 ? 'var(--warning)' : 'var(--success)';
              return (
                <div key={d.dept}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{d.dept}</span>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{d.count} employees</span>
                      <strong style={{ fontSize: '0.82rem', color }}>{d.risk}%</strong>
                    </div>
                  </div>
                  <div style={{ height: '7px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${d.risk}%`, height: '100%', borderRadius: '4px',
                      background: `linear-gradient(90deg, ${color} 0%, ${color}99 100%)`,
                      transition: 'width 0.6s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Satisfaction Trend Line Chart */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Satisfaction Score Trend</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Average job satisfaction (1–4 scale), quarterly</span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <svg width="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ overflow: 'visible' }}>
              <defs>
                <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Grid */}
              {[0, 1, 2].map(i => (
                <line key={i} x1="10" y1={10 + i * 30} x2={svgWidth - 10} y2={10 + i * 30}
                  stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              ))}
              {/* Area fill */}
              <path
                d={`${pathD} L ${pts[pts.length - 1].x} ${svgHeight} L ${pts[0].x} ${svgHeight} Z`}
                fill="url(#trendFill)"
              />
              {/* Line */}
              <path d={pathD} fill="none" stroke="var(--primary)" strokeWidth="2.5" strokeLinejoin="round" />
              {/* Dots */}
              {pts.map((p, i) => (
                <g key={i}>
                  <circle cx={p.x} cy={p.y} r="4" fill="var(--bg-card)" stroke="var(--accent)" strokeWidth="2" />
                </g>
              ))}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              {satisfTrendPoints.map(p => (
                <span key={p.label} style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>{p.label}</span>
              ))}
            </div>
          </div>

          <div style={{ padding: '10px 14px', borderRadius: '8px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', fontSize: '0.76rem', color: '#34d399' }}>
            Score improved from 2.5 → 3.3 over 6 quarters — driven by structured career audit programs.
          </div>
        </div>
      </section>

      {/* Flight Risk Register Table */}
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-glass)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Flight Risk Register</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Top at-risk employees based on composite stagnation score</span>
          </div>
          <span className="badge badge-danger">
            {filteredCohorts.length} at risk
          </span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                {['Job Role', 'Department', 'Yrs Stagnant', 'Satisfaction', 'Risk Score', 'Recommended Action'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCohorts.map((emp) => {
                const riskColor = emp.risk >= 0.7 ? 'var(--danger)' : emp.risk >= 0.5 ? 'var(--warning)' : 'var(--success)';
                return (
                  <tr key={emp.id} style={{ borderBottom: '1px solid var(--border-glass)', transition: 'background 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '14px 20px', color: 'var(--text-primary)', fontWeight: 600 }}>{emp.role}</td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-secondary)' }}>{emp.dept}</td>
                    <td style={{ padding: '14px 20px', color: 'var(--text-primary)' }}>{emp.yearsStuck} yrs</td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', gap: '3px' }}>
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} style={{
                            width: '10px', height: '10px', borderRadius: '2px',
                            background: i <= emp.satisfScore ? 'var(--primary)' : 'rgba(255,255,255,0.08)'
                          }} />
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '5px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden', maxWidth: '60px' }}>
                          <div style={{ width: `${emp.risk * 100}%`, height: '100%', background: riskColor, borderRadius: '3px' }} />
                        </div>
                        <strong style={{ color: riskColor, fontSize: '0.82rem' }}>{(emp.risk * 100).toFixed(0)}%</strong>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span className={`badge ${emp.risk >= 0.7 ? 'badge-danger' : emp.risk >= 0.5 ? 'badge-warning' : 'badge-primary'}`}>
                        {emp.action}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
