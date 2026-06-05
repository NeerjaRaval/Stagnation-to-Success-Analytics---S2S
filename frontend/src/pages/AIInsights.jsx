import React, { useState } from 'react';

const ChipIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 3h6M9 21h6M3 9v6M21 9v6M3 3l3 3M21 3l-3 3M21 21l-3-3M3 21l3-3" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const prioritizedInsights = [
  {
    id: 'INS-001', severity: 'critical', title: 'Sales Department Stagnation Surge',
    detail: 'Sales department shows the highest promotion gap at 21% — affecting 34 employees currently past their expected promotion window.',
    action: 'Initiate departmental career audit + manager 1:1 coaching sessions.',
    impact: 'Expected to reduce attrition risk by 18% within Q3.',
    tags: ['Sales', 'Promotion Gap', 'High Priority']
  },
  {
    id: 'INS-002', severity: 'high', title: 'Senior Engineers at Attrition Boundary',
    detail: '47 employees in the Senior Engineer role have remained in the same position for over 3.5 years — 37% more likely to exit than the company average.',
    action: 'Launch Senior-to-Staff Engineer fast-track promotion program.',
    impact: 'Estimated 28 of 47 employees can be retained with structured progression.',
    tags: ['Engineering', 'R&D', 'Tenure Risk']
  },
  {
    id: 'INS-003', severity: 'moderate', title: 'Manager Tenure Correlation to Satisfaction Drop',
    detail: 'Employees with the same manager for 4+ years show a 22% lower average satisfaction score — correlated with limited promotion advocacy.',
    action: 'Implement manager rotation policy for tenures exceeding 36 months.',
    impact: 'Average satisfaction improvement of +0.6 pts expected within 2 quarters.',
    tags: ['Management', 'Work Culture', 'Policy']
  },
  {
    id: 'INS-004', severity: 'moderate', title: 'Cloud Security Role Gaps at L3',
    detail: 'Level 3 Cloud Security roles show a 29% promotion gap — the highest within the department at this seniority tier.',
    action: 'Review Cloud Security Level 3→4 promotion criteria. Consider skills-based pathway.',
    impact: 'Opens internal mobility for 26 employees.',
    tags: ['Cloud Security', 'Level 3', 'Skills Gap']
  },
  {
    id: 'INS-005', severity: 'low', title: 'R&D Shows Improving Mobility Trend',
    detail: 'R&D internal mobility rate improved by 8.2% this quarter — indicating successful implementation of rotation playbooks from Q4 2023.',
    action: 'Expand rotation playbook program to Customer Success and HR departments.',
    impact: 'Replicate R&D improvement across 2 additional departments.',
    tags: ['R&D', 'Positive Signal', 'Best Practice']
  }
];

const playbooks = [
  { title: 'Career Rotation Playbook', desc: 'Structured 6-month role rotation for stagnant employees.', status: 'Active', dept: 'R&D, CS', updated: 'Jun 01' },
  { title: 'Manager Coaching Program', desc: 'Quarterly coaching for managers with low satisfaction teams.', status: 'Active', dept: 'All Departments', updated: 'May 28' },
  { title: 'Skills-based Promotion Path', desc: 'Bypass time-in-role requirement for demonstrable skill leaps.', status: 'Draft', dept: 'Engineering', updated: 'May 22' },
  { title: 'Flight Risk Early Alert', desc: 'Trigger HR intervention when ML risk score exceeds 70%.', status: 'Active', dept: 'All Departments', updated: 'Jun 01' },
];

const severityConfig = {
  critical: { color: 'var(--danger)', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', label: 'Critical' },
  high: { color: 'var(--warning)', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', label: 'High' },
  moderate: { color: 'var(--primary)', bg: 'rgba(0,130,240,0.06)', border: 'rgba(0,130,240,0.15)', label: 'Moderate' },
  low: { color: 'var(--success)', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.15)', label: 'Low' },
};

export default function AIInsights() {
  const [expandedId, setExpandedId] = useState('INS-001');

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ChipIcon />
            AI Insights &amp; Recommendations
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            ML-derived workforce intelligence — prioritised interventions with projected impact scores.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(0,130,240,0.08)', border: '1px solid rgba(0,130,240,0.2)', fontSize: '0.72rem', color: 'var(--accent)', fontWeight: 600 }}>
            ML Engine v2.4
          </div>
          <div style={{ padding: '6px 12px', borderRadius: '6px', background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', fontSize: '0.72rem', color: '#34d399', fontWeight: 600 }}>
            Model Live
          </div>
        </div>
      </div>

      {/* Summary KPI strip */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
        {[
          { label: 'Critical Insights', val: '2', color: 'var(--danger)' },
          { label: 'High Priority', val: '1', color: 'var(--warning)' },
          { label: 'Active Playbooks', val: '3', color: 'var(--primary)' },
          { label: 'Employees Protected', val: '180+', color: 'var(--success)' },
        ].map(k => (
          <div key={k.label} className="glass-panel" style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{k.label}</span>
            <span style={{ fontSize: '1.65rem', fontWeight: 800, color: k.color, lineHeight: 1 }}>{k.val}</span>
          </div>
        ))}
      </section>

      {/* Main 2-col grid */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '20px', alignItems: 'start' }}>

        {/* Insight Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {prioritizedInsights.map(ins => {
            const cfg = severityConfig[ins.severity];
            const isOpen = expandedId === ins.id;
            return (
              <div key={ins.id} style={{
                borderRadius: '10px', border: `1px solid ${isOpen ? cfg.border : 'var(--border-glass)'}`,
                background: isOpen ? cfg.bg : 'var(--bg-card)',
                overflow: 'hidden', transition: 'all 0.2s'
              }}>
                <div
                  onClick={() => setExpandedId(isOpen ? null : ins.id)}
                  style={{ padding: '16px 20px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}
                >
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: 1 }}>
                    <div style={{ marginTop: '2px', color: cfg.color }}>
                      <SparkleIcon />
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '0.64rem', fontWeight: 700, color: cfg.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{cfg.label}</span>
                        <span style={{ fontSize: '0.64rem', color: 'var(--text-muted)' }}>{ins.id}</span>
                      </div>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>{ins.title}</h4>
                    </div>
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ flexShrink: 0, transform: isOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s', marginTop: '4px' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>

                {isOpen && (
                  <div style={{ padding: '0 20px 20px 46px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{ins.detail}</p>

                    <div style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(0,130,240,0.06)', border: '1px solid rgba(0,130,240,0.12)' }}>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>Recommended Action</div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text-primary)' }}>{ins.action}</p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--success)' }}>
                      <CheckIcon />
                      <span>{ins.impact}</span>
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {ins.tags.map(t => (
                        <span key={t} style={{ padding: '3px 8px', borderRadius: '4px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-glass)', fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: 600 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Intervention Playbooks */}
        <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-glass)' }}>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#fff' }}>Active Playbooks</h3>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Configured HR intervention protocols</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {playbooks.map((pb, i) => (
              <div key={i} style={{ padding: '16px 24px', borderBottom: i < playbooks.length - 1 ? '1px solid var(--border-glass)' : 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)' }}>{pb.title}</h4>
                  <span className={`badge ${pb.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{pb.status}</span>
                </div>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{pb.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  <span>{pb.dept}</span>
                  <span>Updated {pb.updated}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px 24px', borderTop: '1px solid var(--border-glass)' }}>
            <button style={{
              width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(0,130,240,0.08)',
              border: '1px solid rgba(0,130,240,0.2)', color: 'var(--primary)', fontSize: '0.82rem',
              fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
            }}>
              Configure Playbook <ArrowRightIcon />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
