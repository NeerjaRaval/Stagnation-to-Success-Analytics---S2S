import React, { useState } from 'react';

const ScaleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3l3 6H9l3-6zM3 12l3 6 3-6H3zM15 12l3 6 3-6h-6z"/>
    <line x1="12" y1="9" x2="12" y2="21"/>
  </svg>
);

const genderData = [
  { label: 'Female', pct: 52, color: 'var(--primary)', r: 52 },
  { label: 'Male', pct: 48, color: 'var(--purple)', r: 48 },
];

const ageGroups = [
  { label: 'Under 25', gap: 14, rate: 52, color: 'var(--success)' },
  { label: '25 – 35 yrs', gap: 22, rate: 44, color: 'var(--accent)' },
  { label: '36 – 45 yrs', gap: 34, rate: 31, color: 'var(--warning)' },
  { label: '46+ yrs', gap: 42, rate: 21, color: 'var(--danger)' },
];

const ethnicityData = [
  { label: 'White', pct: 38, color: 'var(--primary)' },
  { label: 'Asian', pct: 29, color: 'var(--accent)' },
  { label: 'Hispanic', pct: 18, color: 'var(--purple)' },
  { label: 'Black', pct: 10, color: 'var(--orange)' },
  { label: 'Other', pct: 5, color: 'var(--success)' },
];

const educationData = [
  { field: 'STEM / Engineering', promRate: 58, avgGap: 14 },
  { field: 'Business / Finance', promRate: 42, avgGap: 24 },
  { field: 'Life Sciences', promRate: 47, avgGap: 19 },
  { field: 'Social Sciences', promRate: 35, avgGap: 31 },
  { field: 'Other / Technical', promRate: 51, avgGap: 18 },
];

// Build SVG donut segments from percentage array
function buildDonutSegments(items, r = 52, stroke = 10) {
  const circ = 2 * Math.PI * r;
  let offset = 0;
  return items.map(item => {
    const dashArray = (item.pct / 100) * circ;
    const dashOffset = circ - dashArray;
    const seg = { ...item, dashArray, dashOffset, startOffset: offset, circ };
    offset += (item.pct / 100) * 360;
    return seg;
  });
}

export default function DEIAnalytics() {
  const [activeView, setActiveView] = useState('gender');

  const donutCirc = 2 * Math.PI * 52;
  let cumPct = 0;
  const donutSegs = genderData.map(d => {
    const arc = (d.pct / 100) * donutCirc;
    const seg = { ...d, dashArray: arc, dashOffset: donutCirc - arc, rotation: cumPct * 3.6 - 90 };
    cumPct += d.pct;
    return seg;
  });

  const ethCirc = 2 * Math.PI * 45;
  let cumEth = 0;
  const ethSegs = ethnicityData.map(d => {
    const arc = (d.pct / 100) * ethCirc;
    const seg = { ...d, dashArray: arc, dashOffset: ethCirc - arc, rotation: cumEth * 3.6 - 90 };
    cumEth += d.pct;
    return seg;
  });

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
        {[
          { label: 'Gender Equity Score', val: '52 / 48', sub: 'Female / Male promotion split', color: 'var(--primary)' },
          { label: 'DEI Index', val: '74 / 100', sub: 'Based on pay & promo equity', color: 'var(--accent)' },
          { label: 'Underrep. at L3+', val: '31%', sub: 'Leadership representation gap', color: 'var(--warning)' },
          { label: 'Pay Gap', val: '8.2%', sub: 'Avg gender pay difference', color: 'var(--danger)' },
        ].map(k => (
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
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Promotions by Gender</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Distribution of promotions across genders this period</span>
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
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>52%</span>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)' }}>Female</span>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
              {genderData.map(d => (
                <div key={d.label}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{d.label}</span>
                    <strong style={{ marginLeft: 'auto', color: '#fff', fontSize: '0.82rem' }}>{d.pct}%</strong>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.04)', borderRadius: '2px', overflow: 'hidden' }}>
                    <div style={{ width: `${d.pct}%`, height: '100%', background: d.color, borderRadius: '2px' }} />
                  </div>
                </div>
              ))}
              <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', fontSize: '0.72rem', color: '#34d399', marginTop: '4px' }}>
                Gender equity above industry average of 49/51
              </div>
            </div>
          </div>
        </div>

        {/* Age Group Stagnation */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Stagnation Risk by Age Group</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Avg promotion gap &amp; promotion rate per age bracket</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {ageGroups.map(ag => (
              <div key={ag.label} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 1fr', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{ag.label}</span>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: '3px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Stagnation Gap</span>
                    <strong style={{ color: ag.color }}>{ag.gap}%</strong>
                  </div>
                  <div style={{ height: '5px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${ag.gap}%`, height: '100%', background: ag.color, borderRadius: '3px' }} />
                  </div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', marginBottom: '3px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Promo Rate</span>
                    <strong style={{ color: '#fff' }}>{ag.rate}%</strong>
                  </div>
                  <div style={{ height: '5px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${ag.rate}%`, height: '100%', background: 'rgba(255,255,255,0.2)', borderRadius: '3px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Row */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '20px' }}>

        {/* Ethnicity Donut */}
        <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Diversity Composition</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Workforce ethnicity breakdown</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
              <svg width="110" height="110" viewBox="0 0 110 110">
                {ethSegs.map((seg, i) => (
                  <circle key={i} cx="55" cy="55" r="45"
                    fill="none" stroke={seg.color} strokeWidth="9"
                    strokeDasharray={`${seg.dashArray} ${ethCirc - seg.dashArray}`}
                    strokeDashoffset={ethCirc * 0.25}
                    transform={`rotate(${seg.rotation} 55 55)`}
                  />
                ))}
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'center' }}>5 Groups</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
              {ethnicityData.map(d => (
                <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: d.color, flexShrink: 0 }} />
                  <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{d.label}</span>
                  <strong style={{ color: '#fff' }}>{d.pct}%</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Education Field Promotion Rate Table */}
        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-glass)' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Promotion Outcomes by Education Field</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Promotion rate &amp; avg promotion gap per education background</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  {['Education Field', 'Promotion Rate', 'Avg Gap'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.72rem', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {educationData.map(ed => (
                  <tr key={ed.field} style={{ borderBottom: '1px solid var(--border-glass)', transition: 'background 0.15s' }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '13px 20px', color: 'var(--text-primary)', fontWeight: 500 }}>{ed.field}</td>
                    <td style={{ padding: '13px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ height: '5px', width: '70px', background: 'rgba(255,255,255,0.04)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{ width: `${ed.promRate}%`, height: '100%', background: ed.promRate >= 50 ? 'var(--success)' : 'var(--primary)', borderRadius: '3px' }} />
                        </div>
                        <strong style={{ color: ed.promRate >= 50 ? 'var(--success)' : 'var(--text-primary)', fontSize: '0.82rem' }}>{ed.promRate}%</strong>
                      </div>
                    </td>
                    <td style={{ padding: '13px 20px' }}>
                      <span className={`badge ${ed.avgGap > 25 ? 'badge-danger' : ed.avgGap > 18 ? 'badge-warning' : 'badge-success'}`}>{ed.avgGap}%</span>
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
