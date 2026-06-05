import React, { useState } from 'react';
import Employees from './Employees';

export default function Alerts() {
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  // Map UI filters to the backend risk levels
  const getRiskLevelForBackend = () => {
    if (selectedSeverity === 'critical') return 'high';
    if (selectedSeverity === 'monitor') return 'medium';
    if (selectedSeverity === 'normal') return 'low';
    return 'all';
  };

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Alert Header Cards */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        {/* Total Alert Card */}
        <div 
          onClick={() => setSelectedSeverity('all')}
          className={`glass-panel glass-panel-interactive ${selectedSeverity === 'all' ? 'pulse-glow-border' : ''}`}
          style={{ 
            padding: '24px', 
            cursor: 'pointer',
            borderLeft: '4px solid var(--primary)',
            background: selectedSeverity === 'all' ? 'rgba(99, 102, 241, 0.08)' : ''
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
            All Alert Telemetry
          </span>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--text-primary)', margin: '8px 0 4px 0', fontWeight: 700 }}>
            Active Center
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Continuous monitoring of progression delays</p>
        </div>

        {/* Critical Warnings Card */}
        <div 
          onClick={() => setSelectedSeverity('critical')}
          className={`glass-panel glass-panel-interactive ${selectedSeverity === 'critical' ? 'pulse-glow-border' : ''}`}
          style={{ 
            padding: '24px', 
            cursor: 'pointer',
            borderLeft: '4px solid var(--danger)',
            background: selectedSeverity === 'critical' ? 'rgba(239, 68, 68, 0.08)' : ''
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
            🔴 Critical Warnings
          </span>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--danger)', margin: '8px 0 4px 0', fontWeight: 700 }}>
            High Gap
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Tenure-to-promotion ratio exceeds 50%</p>
        </div>

        {/* Monitor List Card */}
        <div 
          onClick={() => setSelectedSeverity('monitor')}
          className={`glass-panel glass-panel-interactive ${selectedSeverity === 'monitor' ? 'pulse-glow-border' : ''}`}
          style={{ 
            padding: '24px', 
            cursor: 'pointer',
            borderLeft: '4px solid var(--warning)',
            background: selectedSeverity === 'monitor' ? 'rgba(245, 158, 11, 0.08)' : ''
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
            🟡 Attention Required
          </span>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--warning)', margin: '8px 0 4px 0', fontWeight: 700 }}>
            Progression Monitor
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Stagnation gap between 25% and 50%</p>
        </div>

        {/* Normal Progression Card */}
        <div 
          onClick={() => setSelectedSeverity('normal')}
          className={`glass-panel glass-panel-interactive ${selectedSeverity === 'normal' ? 'pulse-glow-border' : ''}`}
          style={{ 
            padding: '24px', 
            cursor: 'pointer',
            borderLeft: '4px solid var(--success)',
            background: selectedSeverity === 'normal' ? 'rgba(16, 185, 129, 0.08)' : ''
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
            🟢 Healthy Progression
          </span>
          <h3 style={{ fontSize: '1.8rem', color: 'var(--success)', margin: '8px 0 4px 0', fontWeight: 700 }}>
            Normal Status
          </h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Within standard progression windows</p>
        </div>

      </section>

      {/* Embedded workforce registry with filtered list */}
      <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>
            Stagnant Employee Logs ({selectedSeverity.toUpperCase()})
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Reviewing live employee records categorized by progression velocity tags.
          </p>
        </div>

        {/* Reuse the redesigned Employees component with riskLevel override */}
        <Employees presetRiskLevel={getRiskLevelForBackend()} hideFilterBar={true} />
      </div>

    </div>
  );
}
