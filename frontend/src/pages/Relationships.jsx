import React, { useState } from 'react';

export default function Relationships() {
  const [selectedLeader, setSelectedLeader] = useState(null);

  const leadersData = [
    { id: 'leader_1', name: 'Marcus Aurelius', dept: 'Research & Development', reports: 12, avgManagerTenure: 4.8, teamStagnationRatio: 0.58, status: 'Warning', riskLevel: 'high' },
    { id: 'leader_2', name: 'Sarah Connor', dept: 'Sales', reports: 8, avgManagerTenure: 2.1, teamStagnationRatio: 0.32, status: 'Stable', riskLevel: 'low' },
    { id: 'leader_3', name: 'Ada Lovelace', dept: 'Research & Development', reports: 15, avgManagerTenure: 5.2, teamStagnationRatio: 0.65, status: 'Critical', riskLevel: 'high' },
    { id: 'leader_4', name: 'Linus Torvalds', dept: 'Research & Development', reports: 9, avgManagerTenure: 3.5, teamStagnationRatio: 0.41, status: 'Monitor', riskLevel: 'medium' },
    { id: 'leader_5', name: 'Grace Hopper', dept: 'Human Resources', reports: 5, avgManagerTenure: 1.8, teamStagnationRatio: 0.15, status: 'Healthy', riskLevel: 'low' },
    { id: 'leader_6', name: 'Alan Turing', dept: 'Sales', reports: 11, avgManagerTenure: 4.2, teamStagnationRatio: 0.49, status: 'Monitor', riskLevel: 'medium' }
  ];

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Overview stats panel */}
      <section className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>Managerial Stability & Tenure Correlation</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          This interface maps working tenure under individual managers against employee promotion stagnation indices. 
          Long-standing manager relationships (&gt; 4 years) without internal promotion are flagged for dynamic progression risk.
        </p>
        <div style={{
          padding: '16px 20px',
          borderRadius: '12px',
          background: 'rgba(99,102,241,0.04)',
          border: '1px solid var(--border-glass)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginTop: '10px'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Optimum Leader Rotation</span>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--success)', marginTop: '4px' }}>2 - 4 Years</h4>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Yields the highest team job satisfaction metrics.</p>
          </div>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Stagnation Correlation</span>
            <h4 style={{ fontSize: '1.1rem', color: 'var(--danger)', marginTop: '4px' }}>+38% Alert Trigger</h4>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>For employees under same manager &gt; 5 years without promotion.</p>
          </div>
        </div>
      </section>

      {/* Leader Grid & Detail Panels */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Leaders Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {leadersData.map(leader => {
            let statusColor = 'var(--success)';
            let statusBg = 'rgba(16, 185, 129, 0.1)';
            if (leader.riskLevel === 'high') {
              statusColor = 'var(--danger)';
              statusBg = 'rgba(239, 68, 68, 0.1)';
            } else if (leader.riskLevel === 'medium') {
              statusColor = 'var(--warning)';
              statusBg = 'rgba(245, 158, 11, 0.1)';
            }

            return (
              <div 
                key={leader.id} 
                onClick={() => setSelectedLeader(leader)}
                className={`glass-panel glass-panel-interactive ${selectedLeader?.id === leader.id ? 'pulse-glow-border' : ''}`}
                style={{ 
                  padding: '20px', 
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  background: selectedLeader?.id === leader.id ? 'rgba(255,255,255,0.03)' : ''
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                    {leader.dept.includes('Development') ? 'R&D' : 'Sales'}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: statusColor,
                    background: statusBg,
                    padding: '2px 8px',
                    borderRadius: '4px',
                    textTransform: 'uppercase'
                  }}>{leader.status}</span>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', fontWeight: 600 }}>{leader.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{leader.reports} Direct Reports</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '8px', borderTop: '1px solid var(--border-glass)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Avg Tenure with Leader:</span>
                    <strong style={{ color: 'var(--text-secondary)' }}>{leader.avgManagerTenure} yrs</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.76rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Team Stagnation Index:</span>
                    <strong style={{ color: statusColor }}>{Math.round(leader.teamStagnationRatio * 100)}%</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Leader Detail */}
        <div className="glass-panel" style={{ padding: '30px', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {selectedLeader ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Leader Deep-Dive</span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', fontWeight: 700 }}>{selectedLeader.name}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{selectedLeader.dept} Manager</p>
              </div>

              {/* Stagnation gauge representation */}
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ position: 'relative', width: '60px', height: '60px', flexShrink: 0 }}>
                  <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="5" />
                    <circle cx="30" cy="30" r="24" fill="none" 
                      stroke={selectedLeader.riskLevel === 'high' ? 'var(--danger)' : selectedLeader.riskLevel === 'medium' ? 'var(--warning)' : 'var(--success)'} 
                      strokeWidth="5" 
                      strokeDasharray="150.7" 
                      strokeDashoffset={150.7 * (1 - selectedLeader.teamStagnationRatio)}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyCenter: 'center', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', margin: 'auto', width: 'fit-content', height: 'fit-content' }}>
                    {Math.round(selectedLeader.teamStagnationRatio * 100)}%
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Stagnation Alert Score</span>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    {selectedLeader.riskLevel === 'high' 
                      ? '🔴 High Risk: Tenure under this leader is leading to stagnation blocks.'
                      : selectedLeader.riskLevel === 'medium'
                      ? '🟡 Monitor: Progression rate is slightly slower than benchmarks.'
                      : '🟢 Healthy: Solid team rotation and progression metrics.'}
                  </p>
                </div>
              </div>

              {/* Mitigation playbooks suggested */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Prescribed Actions:</span>
                <ul style={{ paddingLeft: '18px', fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {selectedLeader.riskLevel === 'high' ? (
                    <>
                      <li>Conduct internal rotation cycles for employees with tenure &gt; 4 years.</li>
                      <li>Review job levels and evaluate potential promotions.</li>
                    </>
                  ) : selectedLeader.riskLevel === 'medium' ? (
                    <>
                      <li>Conduct feedback session with the manager regarding progression paths.</li>
                      <li>Examine environment satisfaction scores for direct reports.</li>
                    </>
                  ) : (
                    <>
                      <li>Maintain current mentoring practices.</li>
                      <li>Document team workflow as a benchmark for other departments.</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>🤝</span>
              Select any manager card on the left to analyze team stability and view leadership risk recommendations.
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
