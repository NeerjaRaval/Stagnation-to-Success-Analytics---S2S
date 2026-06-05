import React from 'react';

// Handcrafted SVG icons for KPI Cards & AI insights
const TrendUpIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const PromotionGapIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const ShieldRiskIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const MobilityRateIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="23 4 23 10 17 10" />
    <polyline points="1 20 1 14 7 14" />
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const SparklesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const UsersIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
  </svg>
);

const BulbIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A7.5 7.5 0 0 0 3 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
  </svg>
);

export default function Dashboard({ metrics, onNavigate }) {
  const sparklineData = {
    health: "M 0 15 Q 10 5 20 18 T 40 10 T 60 5",
    gap: "M 0 15 Q 10 18 20 10 T 40 22 T 60 25",
    risk: "M 0 25 Q 10 15 20 22 T 40 12 T 60 10",
    mobility: "M 0 25 Q 10 20 20 15 T 40 12 T 60 8",
    satisfaction: "M 0 15 Q 10 25 20 10 T 40 18 T 60 12"
  };

  const gapDepts = [
    { name: "Engineering", val: 8, color: "var(--accent)" },
    { name: "Cloud Security", val: 12, color: "var(--accent)" },
    { name: "Sales", val: 21, color: "var(--orange)" },
    { name: "Marketing", val: 5, color: "var(--success)" },
    { name: "Product", val: 9, color: "var(--accent)" },
    { name: "Customer Success", val: 14, color: "var(--accent)" },
    { name: "G&A", val: 7, color: "var(--success)" }
  ];

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Dashboard Title Header */}
      <div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Dashboard Overview</h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Real-time workforce health and career progression insights</p>
      </div>

      {/* 1. Metric KPI Cards Row */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        {/* KPI 1: Workforce Health */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <TrendUpIcon />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Workforce Health Score</span>
            </div>
            <svg width="40" height="20" style={{ overflow: 'visible' }}>
              <path d={sparklineData.health} fill="none" stroke="var(--success)" strokeWidth="2" />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>78</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600 }}>Good</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--success)' }}>↑ 6 pts <span style={{ color: 'var(--text-secondary)' }}>vs last quarter</span></span>
        </div>

        {/* KPI 2: Promotion Gap Index */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <PromotionGapIcon />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Promotion Gap Index</span>
            </div>
            <svg width="40" height="20" style={{ overflow: 'visible' }}>
              <path d={sparklineData.gap} fill="none" stroke="var(--danger)" strokeWidth="2" />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>15%</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--danger)', fontWeight: 600 }}>High Gap</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--danger)' }}>↑ 3% <span style={{ color: 'var(--text-secondary)' }}>vs last quarter</span></span>
        </div>

        {/* KPI 3: Retention Risk Score */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldRiskIcon />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Retention Risk Score</span>
            </div>
            <svg width="40" height="20" style={{ overflow: 'visible' }}>
              <path d={sparklineData.risk} fill="none" stroke="var(--warning)" strokeWidth="2" />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>23%</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--warning)', fontWeight: 600 }}>Medium Risk</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--success)' }}>↓ 5% <span style={{ color: 'var(--text-secondary)' }}>vs last quarter</span></span>
        </div>

        {/* KPI 4: Internal Mobility Rate */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MobilityRateIcon />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Internal Mobility Rate</span>
            </div>
            <svg width="40" height="20" style={{ overflow: 'visible' }}>
              <path d={sparklineData.mobility} fill="none" stroke="var(--success)" strokeWidth="2" />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>12.4%</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600 }}>Good</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--success)' }}>↑ 2.1% <span style={{ color: 'var(--text-secondary)' }}>vs last quarter</span></span>
        </div>

        {/* KPI 5: Career Satisfaction */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <StarIcon />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Career Satisfaction</span>
            </div>
            <svg width="40" height="20" style={{ overflow: 'visible' }}>
              <path d={sparklineData.satisfaction} fill="none" stroke="var(--success)" strokeWidth="2" />
            </svg>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '1.8rem', fontWeight: 700, color: '#fff' }}>72%</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--success)', fontWeight: 600 }}>Good</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--success)' }}>↑ 8% <span style={{ color: 'var(--text-secondary)' }}>vs last quarter</span></span>
        </div>
      </section>

      {/* 2. Middle Row Grid: Career Progression Flow, Dept Promotion Gap, AI Insights */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr',
        gap: '20px',
        alignItems: 'stretch'
      }}>
        {/* Career Progression Flow (Sankey SVG Chart) */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#fff' }}>Career Progression Flow</h3>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Employee movement across career levels</span>
            </div>
            <button 
              onClick={() => onNavigate('progression')}
              style={{
                padding: '6px 12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-glass)',
                borderRadius: '6px', color: '#fff', fontSize: '0.72rem', cursor: 'pointer'
              }}
            >
              View Details
            </button>
          </div>

          {/* SVG Diagram */}
          <div style={{ display: 'flex', alignItems: 'center', height: '220px', position: 'relative' }}>
            {/* Left labels */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%', fontSize: '0.74rem', width: '130px', flexShrink: 0 }}>
              <div>
                <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Entry Level</span>
                <strong style={{ color: '#fff' }}>1,248</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Mid Level</span>
                <strong style={{ color: '#fff' }}>2,341</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Senior Level</span>
                <strong style={{ color: '#fff' }}>1,643</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-secondary)', display: 'block' }}>Leadership</span>
                <strong style={{ color: '#fff' }}>346</strong>
              </div>
            </div>

            {/* Custom SVG Drawing paths linking left and right */}
            <svg style={{ flex: 1, height: '100%', overflow: 'visible' }}>
              {/* Green Path - Promoted */}
              <path d="M 0 25 C 80 25, 80 40, 160 40" stroke="var(--success)" strokeWidth="18" fill="none" opacity="0.35" />
              {/* Cyan Path - Side Move */}
              <path d="M 0 85 C 80 85, 80 90, 160 90" stroke="var(--accent)" strokeWidth="14" fill="none" opacity="0.35" />
              {/* Purple/Orange Path - No movement */}
              <path d="M 0 145 C 80 145, 80 140, 160 140" stroke="var(--orange)" strokeWidth="10" fill="none" opacity="0.3" />
              {/* Red Path - Exited */}
              <path d="M 0 190 C 80 190, 80 195, 160 195" stroke="var(--danger)" strokeWidth="6" fill="none" opacity="0.35" />
            </svg>

            {/* Right outcomes stack */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '90%', fontSize: '0.74rem', width: '110px', paddingLeft: '16px', flexShrink: 0 }}>
              <div>
                <span style={{ width: '8px', height: '8px', background: 'var(--success)', display: 'inline-block', borderRadius: '50%', marginRight: '6px' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Promoted</span>
                <strong style={{ color: 'var(--success)', display: 'block', paddingLeft: '14px' }}>41%</strong>
              </div>
              <div>
                <span style={{ width: '8px', height: '8px', background: 'var(--accent)', display: 'inline-block', borderRadius: '50%', marginRight: '6px' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Side Move</span>
                <strong style={{ color: 'var(--accent)', display: 'block', paddingLeft: '14px' }}>32%</strong>
              </div>
              <div>
                <span style={{ width: '8px', height: '8px', background: 'var(--orange)', display: 'inline-block', borderRadius: '50%', marginRight: '6px' }} />
                <span style={{ color: 'var(--text-secondary)' }}>No Move</span>
                <strong style={{ color: 'var(--orange)', display: 'block', paddingLeft: '14px' }}>17%</strong>
              </div>
              <div>
                <span style={{ width: '8px', height: '8px', background: 'var(--danger)', display: 'inline-block', borderRadius: '50%', marginRight: '6px' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Exited</span>
                <strong style={{ color: 'var(--danger)', display: 'block', paddingLeft: '14px' }}>10%</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Promotion Gap by Department */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#fff' }}>Promotion Gap by Dept</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>% difference between eligible & promoted</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
            {gapDepts.map(dept => (
              <div key={dept.name} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 34px', alignItems: 'center', gap: '10px', fontSize: '0.74rem' }}>
                <span style={{ color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{dept.name}</span>
                
                {/* Horizontal mini bar */}
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(dept.val / 25) * 100}%`, height: '100%', background: dept.color, borderRadius: '4px' }} />
                </div>

                <strong style={{ color: '#fff', textAlign: 'right' }}>{dept.val}%</strong>
              </div>
            ))}
          </div>

          {/* Color bar legend at bottom */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.64rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-glass)', paddingTop: '8px' }}>
            <span>Low Gap</span>
            <span>High Gap</span>
          </div>
        </div>

        {/* AI Insights Card list */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 600, color: '#fff' }}>AI Insights</h3>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Top recommendations for you</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
            {[
              { icon: <SparklesIcon />, text: "Sales department has the highest promotion gap (21%)." },
              { icon: <UsersIcon />, text: "47 employees in Senior Engineer role are at high risk of attrition." },
              { icon: <BulbIcon />, text: "Employees with >3.5 years in the same role are 37% more likely to leave." }
            ].map((insight, idx) => (
              <div key={idx} style={{ padding: '10px', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{ marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '18px', height: '18px' }}>
                  {insight.icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', lineHeight: '1.3' }}>{insight.text}</p>
                  <button 
                    onClick={() => onNavigate('ai_insights')}
                    style={{ background: 'none', border: 'none', color: 'var(--accent)', fontSize: '0.7rem', cursor: 'pointer', textAlign: 'left', fontWeight: 600, width: 'fit-content' }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bottom Grid: Attrition, Diversity, Satisfaction */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '20px'
      }}>
        {/* Attrition Risk Overview */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff', alignSelf: 'flex-start' }}>Attrition Risk Overview</h4>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', width: '100%', justifyContent: 'center' }}>
            {/* SVG Donut */}
            <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="var(--success)" strokeWidth="8" strokeDasharray="238.7" strokeDashoffset="40" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="var(--warning)" strokeWidth="8" strokeDasharray="238.7" strokeDashoffset="238.7" strokeDashoffset="198" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="var(--danger)" strokeWidth="8" strokeDasharray="238.7" strokeDashoffset="238.7" strokeDashoffset="228" transform="rotate(42 50 50)" />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>1,011</span>
                <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Employees</span>
              </div>
            </div>

            {/* Donut Legend */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--danger)' }} />
                <span>High Risk: <strong>47 (4.6%)</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--warning)' }} />
                <span>Medium Risk: <strong>121 (12.0%)</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--success)' }} />
                <span>Low Risk: <strong>843 (83.4%)</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Diversity in Promotions */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff', alignSelf: 'flex-start' }}>Diversity in Promotions</h4>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px', width: '100%', justifyContent: 'center' }}>
            <div style={{ position: 'relative', width: '100px', height: '100px', flexShrink: 0 }}>
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="38" fill="none" stroke="var(--primary)" strokeWidth="8" strokeDasharray="238.7" strokeDashoffset="114" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="var(--purple)" strokeWidth="8" strokeDasharray="238.7" strokeDashoffset="238.7" strokeDashoffset="124" transform="rotate(172 50 50)" />
              </svg>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>52%</span>
                <span style={{ fontSize: '0.58rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Female</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
                <span>Female: <strong>52%</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--purple)' }} />
                <span>Male: <strong>48%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Career Satisfaction Trend (SVG Line Chart) */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: '#fff' }}>Career Satisfaction Trend</h4>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Satisfaction score over time</span>
          </div>

          <div style={{ height: '90px', width: '100%', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 200 80" style={{ overflow: 'visible' }}>
              <path d="M 10 60 Q 50 35 100 45 T 190 20" fill="none" stroke="var(--primary)" strokeWidth="2.5" />
              <circle cx="10" cy="60" r="3.5" fill="var(--accent)" />
              <circle cx="55" cy="42" r="3.5" fill="var(--accent)" />
              <circle cx="100" cy="45" r="3.5" fill="var(--accent)" />
              <circle cx="190" cy="20" r="3.5" fill="var(--accent)" />
              <text x="175" y="14" fill="var(--primary)" fontSize="7" fontWeight="bold">72%</text>
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-glass)', paddingTop: '6px' }}>
            <span>May 23</span>
            <span>Aug 23</span>
            <span>Nov 23</span>
            <span>Feb 24</span>
            <span>Apr 24</span>
          </div>
        </div>
      </section>

    </div>
  );
}
