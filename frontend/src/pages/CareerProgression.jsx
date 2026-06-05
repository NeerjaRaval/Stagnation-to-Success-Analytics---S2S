import React, { useState } from 'react';

const NetworkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><circle cx="5" cy="19" r="3"/>
    <line x1="12" y1="8" x2="19" y2="16"/><line x1="12" y1="8" x2="5" y2="16"/>
  </svg>
);

const RocketIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
  </svg>
);

// Career levels with horizontal pipeline visualization
const careerLevels = [
  { id: 'L1', label: 'Entry', role: 'Associate / Junior', count: 1248, color: 'var(--accent)', x: 60 },
  { id: 'L2', label: 'Mid', role: 'Specialist / Engineer', count: 2341, color: 'var(--primary)', x: 230 },
  { id: 'L3', label: 'Senior', role: 'Senior / Staff', count: 1643, color: 'var(--purple)', x: 400 },
  { id: 'L4', label: 'Lead', role: 'Director / Architect', count: 346, color: 'var(--orange)', x: 570 },
];

const flowStats = [
  { label: 'Promoted', pct: 41, color: 'var(--success)', width: 18 },
  { label: 'Lateral Move', pct: 32, color: 'var(--primary)', width: 14 },
  { label: 'No Change', pct: 17, color: 'var(--warning)', width: 10 },
  { label: 'Attrition', pct: 10, color: 'var(--danger)', width: 6 },
];

const departmentProgression = [
  { dept: 'R&D', avgMonths: 18, promotionRate: 41, color: 'var(--success)' },
  { dept: 'Sales', avgMonths: 28, promotionRate: 22, color: 'var(--danger)' },
  { dept: 'Cloud Security', avgMonths: 22, promotionRate: 35, color: 'var(--warning)' },
  { dept: 'Customer Success', avgMonths: 20, promotionRate: 38, color: 'var(--accent)' },
  { dept: 'Human Resources', avgMonths: 16, promotionRate: 44, color: 'var(--success)' },
];

const stagnationBuckets = [
  { range: '0–1 yr', count: 412, pct: 41 },
  { range: '1–2 yrs', count: 298, pct: 30 },
  { range: '2–3 yrs', count: 172, pct: 17 },
  { range: '3–4 yrs', count: 88, pct: 9 },
  { range: '4+ yrs', count: 41, pct: 4, highlight: true },
];

export default function CareerProgression() {
  const [hoveredLevel, setHoveredLevel] = useState(null);
  const [activeTab, setActiveTab] = useState('flow');

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <NetworkIcon />
          Career Progression Mapping
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Visualise employee flows, lateral shifts, and attrition gaps across organisational level milestones.
        </p>
      </div>

      {/* KPI Strip */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {careerLevels.map(lvl => (
          <div key={lvl.id} className="glass-panel" style={{ padding: '18px 20px', borderLeft: `3px solid ${lvl.color}`, display: 'flex', flexDirection: 'column', gap: '6px', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={e => { setHoveredLevel(lvl.id); e.currentTarget.style.boxShadow = `0 4px 20px ${lvl.color}22`; }}
            onMouseOut={e => { setHoveredLevel(null); e.currentTarget.style.boxShadow = ''; }}>
            <span style={{ fontSize: '0.68rem', fontWeight: 700, color: lvl.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{lvl.id} — {lvl.label}</span>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{lvl.count.toLocaleString()}</div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{lvl.role}</span>
          </div>
        ))}
      </section>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', padding: '4px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-glass)', width: 'fit-content' }}>
        {[
          { id: 'flow', label: 'Progression Flow' },
          { id: 'dept', label: 'Department Breakdown' },
          { id: 'stagnation', label: 'Tenure Distribution' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '7px 16px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600,
              border: 'none', cursor: 'pointer',
              background: activeTab === tab.id ? 'rgba(0,130,240,0.15)' : 'transparent',
              color: activeTab === tab.id ? 'var(--text-primary)' : 'var(--text-secondary)',
            }}
          >{tab.label}</button>
        ))}
      </div>

      {/* Tab Content: Progression Flow */}
      {activeTab === 'flow' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '20px' }}>

          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Sankey Flow Diagram — Level Transitions</h3>

            {/* SVG Flow */}
            <div style={{ position: 'relative', height: '220px', background: 'rgba(0,0,0,0.12)', borderRadius: '10px', padding: '10px', border: '1px solid var(--border-glass)' }}>
              <svg width="100%" height="100%" viewBox="0 0 650 200" style={{ overflow: 'visible' }}>
                <defs>
                  {['entryMid', 'midSenior', 'seniorLead'].map((id, i) => {
                    const colors = [['var(--success)', 'var(--primary)'], ['var(--primary)', 'var(--purple)'], ['var(--purple)', 'var(--orange)']];
                    return (
                      <linearGradient key={id} id={id} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor={colors[i][0]} stopOpacity="0.7" />
                        <stop offset="100%" stopColor={colors[i][1]} stopOpacity="0.2" />
                      </linearGradient>
                    );
                  })}
                </defs>

                {/* Connection paths */}
                <path d="M 120 100 C 185 100, 185 100, 250 100" stroke="url(#entryMid)" strokeWidth="22" fill="none" />
                <path d="M 295 100 C 360 100, 360 100, 425 100" stroke="url(#midSenior)" strokeWidth="16" fill="none" />
                <path d="M 470 100 C 535 100, 535 100, 600 100" stroke="url(#seniorLead)" strokeWidth="10" fill="none" />

                {/* Level nodes */}
                {careerLevels.map((lvl, i) => {
                  const cx = 60 + i * 185;
                  return (
                    <g key={lvl.id}>
                      <rect x={cx - 50} y={72} width={110} height={56} rx="8" ry="8" fill="var(--bg-card)" stroke={lvl.color} strokeWidth="1.5" opacity="0.9" />
                      <text x={cx} y={96} textAnchor="middle" fill={lvl.color} fontSize="8" fontWeight="700" textDecoration="uppercase">{lvl.label}</text>
                      <text x={cx} y={111} textAnchor="middle" fill="white" fontSize="11" fontWeight="800">{lvl.count.toLocaleString()}</text>
                      <text x={cx} y={122} textAnchor="middle" fill="rgba(148,163,184,0.8)" fontSize="7">{lvl.role}</text>
                    </g>
                  );
                })}

                {/* Attrition drain arrows */}
                <path d="M 185 111 L 185 145" stroke="var(--danger)" strokeWidth="5" fill="none" opacity="0.4" />
                <path d="M 357 111 L 357 145" stroke="var(--danger)" strokeWidth="4" fill="none" opacity="0.4" />
                <text x="185" y="160" textAnchor="middle" fill="var(--danger)" fontSize="7" opacity="0.7">Attrition</text>
                <text x="357" y="160" textAnchor="middle" fill="var(--danger)" fontSize="7" opacity="0.7">Attrition</text>
              </svg>
            </div>

            {/* Flow Legend */}
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {flowStats.map(f => (
                <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: `${f.width}px`, height: '6px', background: f.color, borderRadius: '3px', opacity: 0.8 }} />
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>{f.label} <strong style={{ color: '#fff' }}>{f.pct}%</strong></span>
                </div>
              ))}
            </div>
          </div>

          {/* Transition Stats */}
          <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Movement Breakdown</h3>
            {flowStats.map(f => (
              <div key={f.label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{f.label}</span>
                  <strong style={{ color: f.color }}>{f.pct}%</strong>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${f.pct}%`, height: '100%', background: f.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
            <div style={{ marginTop: '8px', padding: '12px', borderRadius: '8px', background: 'rgba(0,130,240,0.06)', border: '1px solid rgba(0,130,240,0.12)', fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--primary)', display: 'block', marginBottom: '4px' }}>Key Finding</strong>
              R&amp;D shows the strongest mid → senior transition funnel (41%), while Sales has the highest lateral movement (32%) indicating career stagnation pressure.
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Department Breakdown */}
      {activeTab === 'dept' && (
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Promotion Rate &amp; Average Promotion Cycle by Department</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
            {/* Promotion Rates */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Promotion Rate</span>
              {departmentProgression.map(d => (
                <div key={d.dept}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{d.dept}</span>
                    <strong style={{ color: d.color, fontSize: '0.82rem' }}>{d.promotionRate}%</strong>
                  </div>
                  <div style={{ height: '7px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${d.promotionRate}%`, height: '100%', background: d.color, borderRadius: '4px', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              ))}
            </div>
            {/* Avg Promotion Months */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Months to Promotion</span>
              {departmentProgression.map(d => (
                <div key={d.dept}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{d.dept}</span>
                    <strong style={{ color: '#fff', fontSize: '0.82rem' }}>{d.avgMonths} mo</strong>
                  </div>
                  <div style={{ height: '7px', background: 'rgba(255,255,255,0.04)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${(d.avgMonths / 32) * 100}%`, height: '100%', background: 'rgba(255,255,255,0.15)', borderRadius: '4px' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Tenure Distribution */}
      {activeTab === 'stagnation' && (
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Time in Current Role — Distribution</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>How long employees have stayed in their current role without progression</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {stagnationBuckets.map((b) => (
              <div key={b.range} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '0.8rem', color: b.highlight ? 'var(--danger)' : 'var(--text-secondary)', minWidth: '60px', fontWeight: b.highlight ? 700 : 400 }}>{b.range}</span>
                <div style={{ flex: 1, height: '32px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border-glass)', position: 'relative' }}>
                  <div style={{
                    width: `${b.pct}%`, height: '100%', borderRadius: '5px',
                    background: b.highlight
                      ? 'linear-gradient(90deg, rgba(239,68,68,0.5) 0%, rgba(239,68,68,0.2) 100%)'
                      : 'linear-gradient(90deg, rgba(0,130,240,0.3) 0%, rgba(0,130,240,0.1) 100%)',
                    display: 'flex', alignItems: 'center', paddingLeft: '10px'
                  }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 700, color: b.highlight ? '#f87171' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{b.count} employees</span>
                  </div>
                </div>
                <strong style={{ fontSize: '0.84rem', color: b.highlight ? 'var(--danger)' : '#fff', minWidth: '32px', textAlign: 'right' }}>{b.pct}%</strong>
                {b.highlight && (
                  <span className="badge badge-danger">Flight Risk</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
