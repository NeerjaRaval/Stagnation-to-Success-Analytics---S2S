import React, { useState } from 'react';

export default function Interventions() {
  const [selectedAction, setSelectedAction] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('emp_245');
  const [customNotes, setCustomNotes] = useState('');
  const [simulatedScore, setSimulatedScore] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [deploymentLog, setDeploymentLog] = useState([
    { id: 1, emp: 'Employee #142', action: 'Department Rotation', status: 'Completed', impact: '-32% Attrition Risk', date: '2026-05-28' },
    { id: 2, emp: 'Employee #89', action: 'Salary Adjust & Bonus', status: 'Active', impact: '-45% Attrition Risk', date: '2026-05-29' }
  ]);

  const mockPrescribedActions = [
    { 
      id: 'rotate_rd', 
      title: "Schedule Career Rotation Review", 
      action: "Flag for job level 3 progression check", 
      priority: "🔴 Critical", 
      desc: "For employees stuck in the Research & Development department with > 7 years tenure.",
      impactEstimate: '42%'
    },
    { 
      id: 'train_sales', 
      title: "Targeted Leadership Training", 
      action: "Assign to Executive Mentor Circle", 
      priority: "🟡 Warning", 
      desc: "For Sales Executives whose manager stability index shows high team churn.",
      impactEstimate: '28%'
    },
    { 
      id: 'rotation_internal', 
      title: "Internal Department Rotation", 
      action: "Promote Technical Field Change", 
      priority: "🟢 Opportunity", 
      desc: "For technical employees whose environment satisfaction shows early warning signs.",
      impactEstimate: '15%'
    }
  ];

  const handleSimulate = (action) => {
    setIsSimulating(true);
    setSimulatedScore(null);
    setSelectedAction(action);
    setTimeout(() => {
      // Calculate a pseudo-random result based on the action
      let baseReduction = action.id === 'rotate_rd' ? 45 : action.id === 'train_sales' ? 30 : 18;
      setSimulatedScore({
        before: 82,
        after: 82 - baseReduction,
        reduction: baseReduction,
        costEstimate: action.id === 'rotate_rd' ? 'Low (Policy change)' : action.id === 'train_sales' ? 'Medium (Resource cost)' : 'Low (Job change)'
      });
      setIsSimulating(false);
    }, 1200);
  };

  const handleDeploy = () => {
    if (!selectedAction || !simulatedScore) return;
    const newEntry = {
      id: Date.now(),
      emp: selectedEmployee.replace('_', ' #'),
      action: selectedAction.title,
      status: 'Active',
      impact: `-${simulatedScore.reduction}% Attrition Risk`,
      date: new Date().toISOString().split('T')[0]
    };
    setDeploymentLog(prev => [newEntry, ...prev]);
    alert(`Successfully deployed retention action to ${newEntry.emp}!`);
    // Reset simulation
    setSimulatedScore(null);
    setSelectedAction(null);
    setCustomNotes('');
  };

  return (
    <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px' }}>
      
      {/* Left panel: Prescribed Actions & Selector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '8px' }}>Proactive Retention Playbook</h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Workforce action items prioritized by calculated ML Promotion Stagnation index. Choose a playbook to simulate risk mitigation.
          </p>
        </div>

        <section style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {mockPrescribedActions.map((item) => (
            <div 
              key={item.id} 
              className={`glass-panel glass-panel-interactive ${selectedAction?.id === item.id ? 'pulse-glow-border' : ''}`} 
              style={{ 
                padding: '24px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '12px',
                background: selectedAction?.id === item.id ? 'rgba(99, 102, 241, 0.05)' : ''
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--accent)' }}>RECOMMENDED ACTION</span>
                <strong style={{ color: item.priority.includes('Critical') ? 'var(--danger)' : item.priority.includes('Warning') ? 'var(--warning)' : 'var(--success)' }}>
                  {item.priority}
                </strong>
              </div>
              
              <div>
                <h4 style={{ fontSize: '1.1rem', color: '#fff', fontWeight: 600 }}>{item.title}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{item.desc}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-glass)' }}>
                <div style={{ fontSize: '0.78rem', color: 'var(--success)' }}>
                  🎯 Suggestion: <strong>{item.action}</strong>
                </div>
                <button
                  onClick={() => handleSimulate(item)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'var(--primary)',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    boxShadow: 'var(--glow-primary)'
                  }}
                >
                  Configure Action ⚡
                </button>
              </div>
            </div>
          ))}
        </section>

      </div>

      {/* Right panel: Simulation sandbox & audit log */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Sandbox */}
        <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>Intervention Sandbox</h3>
          
          {selectedAction ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '14px', borderRadius: '8px', border: '1px solid var(--border-glass)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Selected Action Plan:</span>
                <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '2px' }}>{selectedAction.title}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent)', marginTop: '4px' }}>Est. Impact: ~{selectedAction.impactEstimate} Risk Reduction</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Target Employee ID</label>
                <select
                  value={selectedEmployee}
                  onChange={e => setSelectedEmployee(e.target.value)}
                  style={{
                    padding: '10px 14px', borderRadius: '8px',
                    background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)',
                    color: '#fff', fontSize: '0.85rem', outline: 'none'
                  }}
                >
                  <option value="emp_245">Employee #245 (R&D - Senior Scientist)</option>
                  <option value="emp_83">Employee #83 (Sales - Executive)</option>
                  <option value="emp_401">Employee #401 (R&D - Developer)</option>
                  <option value="emp_17">Employee #17 (Human Resources - Specialist)</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Special Notes / Adjustments</label>
                <textarea
                  rows="2"
                  placeholder="E.g., Pair with manager Sarah K. for rotation cycle starting July 1."
                  value={customNotes}
                  onChange={e => setCustomNotes(e.target.value)}
                  style={{
                    padding: '10px 14px', borderRadius: '8px',
                    background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)',
                    color: '#fff', fontSize: '0.85rem', outline: 'none', resize: 'none'
                  }}
                />
              </div>

              {isSimulating ? (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                  Calculating telemetry changes... ⚡
                </div>
              ) : simulatedScore ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '16px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Current Attrition Risk:</span>
                    <strong style={{ color: 'var(--danger)' }}>{simulatedScore.before}%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Simulated Risk After Action:</span>
                    <strong style={{ color: 'var(--success)' }}>{simulatedScore.after}%</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Cost Estimate:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{simulatedScore.costEstimate}</strong>
                  </div>

                  <button
                    onClick={handleDeploy}
                    style={{
                      padding: '12px',
                      background: 'linear-gradient(135deg, var(--success) 0%, #059669 100%)',
                      border: 'none',
                      borderRadius: '8px',
                      color: '#fff',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                      marginTop: '6px'
                    }}
                  >
                    Deploy Intervention Log 🚀
                  </button>
                </div>
              ) : (
                <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem', padding: '10px 0' }}>
                  Click "Configure Action" to calculate dynamic risk adjustments.
                </div>
              )}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0' }}>
              <span style={{ fontSize: '32px', display: 'block', marginBottom: '10px' }}>⚡</span>
              Select a recommended action from the left panel to configure and simulate mitigation outcomes.
            </div>
          )}
        </div>

        {/* Audit Log / History */}
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <h4 style={{ fontSize: '1rem', color: '#fff', fontWeight: 600 }}>Active Interventions Log</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {deploymentLog.map(log => (
              <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', borderRadius: '8px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--border-glass)', fontSize: '0.8rem' }}>
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{log.emp}</strong>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem' }}>{log.action}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="badge badge-success" style={{ padding: '2px 8px', fontSize: '0.68rem' }}>{log.impact}</span>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.72rem', marginTop: '2px' }}>{log.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
