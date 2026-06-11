import React, { useState, useEffect } from 'react';
import { API_BASE } from '../config';

const ScaleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l3 6H9l3-6zM3 12l3 6 3-6H3zM15 12l3 6 3-6h-6z"/>
    <line x1="12" y1="9" x2="12" y2="21"/>
  </svg>
);

const genderColors = {
  Female: 'var(--primary)',
  Male: 'var(--purple)'
};

const ageColors = {
  "Under 25": 'var(--success)',
  "25-35": 'var(--accent)',
  "36-45": 'var(--warning)',
  "46+": 'var(--danger)'
};

export default function DEIAnalytics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/dei`)
      .then(res => {
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        return res.json();
      })
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '12px' }} className="animate-pulse">⚡</span>
        <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 600 }}>Analyzing Diversity Metrics...</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Querying promotion gaps and tenure distributions from active dataset.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--danger)', border: '1px solid rgba(239,68,68,0.2)' }}>
        <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: '12px' }}>⚠️</span>
        <h3 style={{ color: '#f87171', fontSize: '1.1rem', fontWeight: 600 }}>Telemetry Synchronization Failed</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '16px', padding: '8px 16px', background: 'var(--primary)', border: 'none',
            borderRadius: '6px', color: '#fff', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600
          }}
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const femalePct = data ? (data.gender_distribution.find(d => d.name === 'Female')?.percentage || 0) : 0;
  const donutCirc = 2 * Math.PI * 52;
  let cumPct = 0;
  const donutSegs = data ? data.gender_distribution.map(d => {
    const pct = d.percentage;
    const arc = (pct / 100) * donutCirc;
    const color = genderColors[d.name] || 'var(--accent)';
    const seg = { label: d.name, pct, color, dashArray: arc, dashOffset: donutCirc - arc, rotation: cumPct * 3.6 - 90 };
    cumPct += pct;
    return seg;
  }) : [];

  const kpis = [
    { label: 'Gender Split', val: `${femalePct}% / ${Math.round(100 - femalePct)}%`, sub: 'Female / Male headcount ratio', color: 'var(--primary)' },
    { label: 'DEI Equity Index', val: `${data.equity_score} / 100`, sub: 'Based on promotion gap equity', color: 'var(--accent)' },
    { label: 'Avg Female Gap', val: `${data.gender_promotion_gaps.Female}%`, sub: 'Promotion stagnation ratio (F)', color: 'var(--warning)' },
    { label: 'Avg Male Gap', val: `${data.gender_promotion_gaps.Male}%`, sub: 'Promotion stagnation ratio (M)', color: 'var(--danger)' },
  ];

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ScaleIcon />
            DEI Analytics Dashboard
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Monitor career progression velocities, promotion distribution, and satisfaction indices across diverse demographics.
          </p>
        </div>
        <div style={{ padding: '6px 14px', borderRadius: '6px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', fontSize: '0.72rem', color: 'var(--purple)', fontWeight: 700 }}>
          DEI Reporting Active
        </div>
      </div>

      {/* KPI strip */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {kpis.map(k => (
          <div key={k.label} className="glass-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{k.label}</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: k.color, lineHeight: 1 }}>{k.val}</div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{k.sub}</span>
          </div>
        ))}
      </section>

      {/* Main Grid */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Gender Donut + Details */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Gender Workforce Representation</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Distribution of overall headcount across genders</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
            {/* Donut */}
            <div style={{ position: 'relative', width: '130px', height: '130px', flexShrink: 0 }}>
              <svg width="130" height="130" viewBox="0 0 130 130">
                {donutSegs.map((seg, i) => (
                  <circle key={i} cx="65" cy="65" r="52"
                    fill="none" stroke={seg.color} strokeWidth="10"
                    strokeDasharray={`${seg.dashArray} ${donutCirc - seg.dashArray}`}
                    strokeDashoffset={donutCirc * 0.25}
                    transform={`rotate(${seg.rotation} 65 65)`}
                  />
                ))}
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{femalePct.toFixed(0)}%</span>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Female</span>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              {data.gender_distribution.map(d => {
                const color = genderColors[d.name] || 'var(--accent)';
                return (
                  <div key={d.name}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: color, flexShrink: 0 }} />
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{d.name} ({d.value} employees)</span>
                      <strong style={{ marginLeft: 'auto', color: '#fff', fontSize: '0.82rem' }}>{d.percentage}%</strong>
                    </div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${d.percentage}%`, height: '100%', background: color, borderRadius: '2px' }} />
                    </div>
                  </div>
                );
              })}
              <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', fontSize: '0.72rem', color: '#34d399', marginTop: '4px' }}>
                {Math.abs(data.gender_promotion_gaps.Female - data.gender_promotion_gaps.Male) < 1.0 
                  ? "✓ Gender promotion gap is balanced (< 1% difference)" 
                  : `Promotion gap differential is ${Math.abs(data.gender_promotion_gaps.Female - data.gender_promotion_gaps.Male).toFixed(1)}%`}
              </div>
            </div>
          </div>
        </div>

        {/* Age Group Stagnation */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Stagnation Risk by Age Group</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Avg promotion gap &amp; average role stagnation per age bracket</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {data.age_distribution.map(ag => {
              const color = ageColors[ag.group] || 'var(--accent)';
              return (
                <div key={ag.group} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{ag.group}</span>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: '3px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Stagnation Gap</span>
                      <strong style={{ color: color }}>{ag.avg_gap}%</strong>
                    </div>
                    <div style={{ height: '5px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${ag.avg_gap}%`, height: '100%', background: color, borderRadius: '3px' }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: '3px' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Role Stagnation</span>
                      <strong style={{ color: '#fff' }}>{ag.avg_stagnation}%</strong>
                    </div>
                    <div style={{ height: '5px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${ag.avg_stagnation}%`, height: '100%', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Second Row - Full Width Education Field Breakdown */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-glass)' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Promotion Outcomes by Education Field</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Workforce stagnation metrics grouped by academic background</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  {['Education Field', 'Average Role Stagnation Index', 'Promotion Stagnation Gap'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.education_distribution.map(ed => (
                  <tr key={ed.field} style={{ borderBottom: '1px solid var(--border-glass)', transition: 'background 0.15s' }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '13px 20px', color: 'var(--text-primary)', fontWeight: 500 }}>{ed.field} ({ed.count} employees)</td>
                    <td style={{ padding: '13px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ height: '5px', width: '120px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${ed.avg_stagnation}%`, height: '100%', background: ed.avg_stagnation >= 50 ? 'var(--primary)' : 'var(--accent)', borderRadius: '3px' }} />
                        </div>
                        <strong style={{ color: '#fff', fontSize: '0.82rem' }}>{ed.avg_stagnation}%</strong>
                      </div>
                    </td>
                    <td style={{ padding: '13px 20px' }}>
                      <span className={`badge ${ed.avg_gap > 30 ? 'badge-danger' : ed.avg_gap > 25 ? 'badge-warning' : 'badge-success'}`}>{ed.avg_gap}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}
