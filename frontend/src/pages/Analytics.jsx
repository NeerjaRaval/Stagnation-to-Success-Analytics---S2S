import React, { useState } from 'react';

export default function Analytics({ explainability }) {
  const [selectedCluster, setSelectedCluster] = useState(null);

  if (!explainability) {
    return (
      <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Loading Clustering Analytics... ⚡
      </div>
    );
  }

  const personas = explainability.personas ?? [];
  const featureImportances = explainability.feature_importances ?? [];

  // Find max value in feature importances to scale SVG chart perfectly
  const maxImportance = featureImportances.length > 0 
    ? Math.max(...featureImportances.map(f => f.importance))
    : 1.0;

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* Overview Block */}
      <section className="glass-panel" style={{ padding: '30px' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '8px' }}>Unsupervised Cluster Personas</h3>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Detailed breakdowns of employee trajectory groups mapped by K-Means clustering algorithms. 
          Use these personas to deploy targeted department-wide career interventions.
        </p>
      </section>

      {/* Grid of Clusters & Deep Dive Panel */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '30px', alignItems: 'stretch' }}>
        
        {/* Cluster Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {personas.map(p => {
            const isActive = selectedCluster?.cluster === p.cluster;
            const riskRatio = p.attrition_rate ?? 0;
            let statusColor = 'var(--success)';
            if (riskRatio > 0.4) statusColor = 'var(--danger)';
            else if (riskRatio > 0.2) statusColor = 'var(--warning)';

            return (
              <div
                key={p.cluster}
                onClick={() => setSelectedCluster(p)}
                className={`glass-panel glass-panel-interactive ${isActive ? 'pulse-glow-border' : ''}`}
                style={{
                  padding: '24px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  background: isActive ? 'rgba(255,255,255,0.03)' : ''
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-primary">Cluster #{p.cluster}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: statusColor, textTransform: 'uppercase' }}>
                    {riskRatio > 0.4 ? 'High Attrition' : riskRatio > 0.2 ? 'Monitor' : 'Stable'}
                  </span>
                </div>

                <h4 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>{p.persona}</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {p.description}
                </p>

                <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-glass)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <div>
                    <span>Avg Tenure:</span>
                    <p style={{ fontWeight: 600, color: '#fff', marginTop: '2px' }}>{p.avg_tenure?.toFixed(1)} yrs</p>
                  </div>
                  <div>
                    <span>Promotion Gap:</span>
                    <p style={{ fontWeight: 600, color: '#fff', marginTop: '2px' }}>{(p.avg_promotion_gap_ratio * 100)?.toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cluster Deep Dive Detail Panel */}
        <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {selectedCluster ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Cluster Analytics Profile</span>
                <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', fontWeight: 700 }}>{selectedCluster.persona}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '4px' }}>{selectedCluster.description}</p>
              </div>

              {/* Progress bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '16px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)' }}>
                {/* Attrition Risk Gauge */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Attrition Probability Rate:</span>
                    <strong style={{ color: selectedCluster.attrition_rate > 0.4 ? 'var(--danger)' : 'var(--text-primary)' }}>
                      {Math.round(selectedCluster.attrition_rate * 100)}%
                    </strong>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                    <div style={{ 
                      width: `${selectedCluster.attrition_rate * 100}%`, 
                      height: '100%', 
                      background: selectedCluster.attrition_rate > 0.4 ? 'var(--danger)' : selectedCluster.attrition_rate > 0.2 ? 'var(--warning)' : 'var(--success)',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>

                {/* Avg Stagnation Index */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Average Promotion Gap Index:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>
                      {Math.round(selectedCluster.avg_promotion_gap_ratio * 100)}%
                    </strong>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
                    <div style={{ 
                      width: `${selectedCluster.avg_promotion_gap_ratio * 100}%`, 
                      height: '100%', 
                      background: 'var(--accent)',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              </div>

              {/* Recommended retention playbook */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>Prescribed Retention Play:</span>
                <div style={{ padding: '12px 16px', borderRadius: '8px', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                  {selectedCluster.attrition_rate > 0.4 ? (
                    <strong>⚡ Urgent Action:</strong>
                  ) : (
                    <strong>ℹ️ Strategic Action:</strong>
                  )}{' '}
                  {selectedCluster.persona.includes('Stagnation') 
                    ? 'Requires immediate rotation interviews. Assign executive mentor pairing and analyze daily rate compensation structure.'
                    : selectedCluster.persona.includes('Fast')
                    ? 'Provide continued leadership pipeline opportunities. Ensure equity compensation or stock options are aligned.'
                    : 'Conduct standard environment satisfaction check-ins and promote healthy work-life balance initiatives.'}
                </div>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '40px', display: 'block', marginBottom: '10px' }}>🧠</span>
              Select any cluster persona card on the left to examine group characteristics and model suggestions.
            </div>
          )}
        </div>

      </section>

      {/* Model Explainability / Feature Importance Custom SVG Chart */}
      <section className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', fontWeight: 600 }}>Model Feature Importances</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Random Forest model parameters driving overall stagnation-to-attrition calculations.
          </p>
        </div>

        {featureImportances.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '10px' }}>
            {featureImportances.map((item, idx) => {
              const percentage = (item.importance / maxImportance) * 100;
              return (
                <div key={item.feature ?? idx} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 60px', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    {item.feature}
                  </span>
                  
                  {/* Visual SVG Progress Bar */}
                  <div style={{ height: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', border: '1px solid var(--border-glass)', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${percentage}%`, 
                      height: '100%', 
                      background: 'linear-gradient(90deg, var(--primary), var(--accent))', 
                      borderRadius: '6px',
                      transition: 'width 1s ease-in-out'
                    }} />
                  </div>

                  <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right' }}>
                    {item.importance.toFixed(3)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>No feature importance telemetry available.</p>
        )}
      </section>

    </div>
  );
}
