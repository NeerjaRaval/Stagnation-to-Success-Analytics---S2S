import React, { useState, useEffect } from 'react';

const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const RadioCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

export default function Tasks({ metrics, onRefresh }) {
  // Local list of integration tasks that can be checked off in real time
  const [tasks, setTasks] = useState([
    { id: 1, text: "Wire up K-Means Career Clusters Dashboard (Analytics.jsx)", desc: "Mounts the unsupervised clustering profiles and Random Forest feature importances.", completed: true },
    { id: 2, text: "Integrate Promotion Gap Alerts List (Alerts.jsx & Employees.jsx)", desc: "Enables granular filtering of high-gap, attention, and normal progression cases.", completed: true },
    { id: 3, text: "Activate Retention Playbook Sandbox (Interventions.jsx)", desc: "Enables simulation of career rotations and mentor training risk-reduction outcomes.", completed: true },
    { id: 4, text: "Map Manager Tenure Stability Dashboard (Relationships.jsx)", desc: "Displays team stagnation ratios and manager-employee tenure correlations.", completed: true },
    { id: 5, text: "Configure Live Diagnostics & Telemetry (Tasks.jsx)", desc: "Builds a control center to show server metrics, active threshold settings, and task statuses.", completed: true }
  ]);

  const [pingStatus, setPingStatus] = useState('checking');
  const [latency, setLatency] = useState(null);

  useEffect(() => {
    // Ping API server to calculate response latency
    const start = performance.now();
    fetch('http://localhost:8000/api/settings')
      .then(res => {
        if (res.ok) {
          setPingStatus('online');
          setLatency(Math.round(performance.now() - start));
        } else {
          setPingStatus('error');
        }
      })
      .catch(() => {
        setPingStatus('offline');
        setLatency(null);
      });
  }, [metrics]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const percentCompleted = Math.round((completedCount / tasks.length) * 100);

  return (
    <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '30px' }}>
      
      {/* Task Checklist Panel */}
      <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', fontWeight: 700 }}>Live Platform Integration Checklist</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Track the status of individual UI modules as they are activated on the Palo Alto Networks S2S Platform.
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255,255,255,0.01)', padding: '16px', borderRadius: '10px', border: '1px solid var(--border-glass)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Overall Integration Progress</span>
            <strong style={{ color: 'var(--accent)' }}>{percentCompleted}%</strong>
          </div>
          <div style={{ height: '10px', background: 'rgba(255,255,255,0.03)', borderRadius: '5px', overflow: 'hidden', border: '1px solid var(--border-glass)', marginTop: '4px' }}>
            <div style={{ width: `${percentCompleted}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent))', borderRadius: '5px', transition: 'width 0.4s ease' }} />
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{completedCount} of {tasks.length} sub-tasks completed</span>
        </div>

        {/* Task Items List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {tasks.map(task => (
            <div 
              key={task.id}
              onClick={() => toggleTask(task.id)}
              style={{
                padding: '16px',
                borderRadius: '8px',
                background: task.completed ? 'rgba(16, 185, 129, 0.02)' : 'rgba(255, 255, 255, 0.01)',
                border: `1px solid ${task.completed ? 'rgba(16, 185, 129, 0.15)' : 'var(--border-glass)'}`,
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              className="glass-panel-interactive"
            >
              <div style={{ marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {task.completed ? <CheckCircleIcon /> : <RadioCircleIcon />}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <h4 style={{ 
                  fontSize: '0.86rem', 
                  fontWeight: 600, 
                  color: task.completed ? '#fff' : 'var(--text-secondary)',
                  textDecoration: task.completed ? 'none' : 'none' 
                }}>
                  {task.text}
                </h4>
                <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{task.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagnostics & API Telemetry Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Connection Status Panel */}
        <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>System Telemetry & Live Diagnostics</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            
            {/* API Status Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>FastAPI Connection:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ 
                  width: '8px', 
                  height: '8px', 
                  borderRadius: '50%', 
                  background: pingStatus === 'online' ? 'var(--success)' : pingStatus === 'checking' ? 'var(--warning)' : 'var(--danger)',
                  boxShadow: pingStatus === 'online' ? '0 0 10px var(--success)' : pingStatus === 'checking' ? '0 0 10px var(--warning)' : '0 0 10px var(--danger)'
                }} />
                <span style={{ 
                  fontSize: '0.82rem', 
                  fontWeight: 700, 
                  color: pingStatus === 'online' ? 'var(--success)' : pingStatus === 'checking' ? 'var(--warning)' : 'var(--danger)',
                  textTransform: 'uppercase'
                }}>
                  {pingStatus === 'online' ? 'Online' : pingStatus === 'checking' ? 'Checking...' : 'Offline'}
                </span>
              </div>
            </div>

            {/* API Latency */}
            {pingStatus === 'online' && latency !== null && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>API Latency:</span>
                <strong style={{ fontSize: '0.82rem', color: latency < 100 ? 'var(--success)' : 'var(--warning)' }}>
                  {latency} ms
                </strong>
              </div>
            )}

            {/* Total Dataset Employees */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Employees Synced:</span>
              <strong style={{ fontSize: '0.84rem', color: '#fff' }}>
                {metrics ? metrics.total_employees.toLocaleString() : 'N/A'}
              </strong>
            </div>

          </div>

          <button
            onClick={() => {
              if (onRefresh) onRefresh();
            }}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--primary)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.86rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: 'var(--glow-primary)'
            }}
          >
            <RefreshIcon />
            Sync Platform Telemetry
          </button>
        </div>

        {/* Live Active Settings */}
        <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h4 style={{ fontSize: '0.98rem', color: '#fff', fontWeight: 600 }}>Active Analytics Thresholds</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Promotion Gap Threshold', val: metrics?.active_settings?.promotion_gap_threshold ? `${metrics.active_settings.promotion_gap_threshold * 100}%` : '50%', color: 'var(--accent)' },
              { label: 'Role Stagnation Threshold', val: metrics?.active_settings?.role_stagnation_threshold ? `${metrics.active_settings.role_stagnation_threshold * 100}%` : '50%', color: 'var(--purple)' },
              { label: 'Warning Satisfaction Limit', val: metrics?.active_settings?.warning_satisfaction_limit ? `${metrics.active_settings.warning_satisfaction_limit} / 4` : '2 / 4', color: 'var(--warning)' }
            ].map(setting => (
              <div key={setting.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', paddingBottom: '8px', borderBottom: '1px solid var(--border-glass)' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{setting.label}</span>
                <strong style={{ color: setting.color }}>{setting.val}</strong>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
