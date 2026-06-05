import React, { useState } from 'react';

export default function PromotionGap() {
  const [selectedCell, setSelectedCell] = useState(null);

  // Departments vs Job Levels Promotion Gap matrix
  const matrixData = [
    { dept: 'Research & Development', l1: 8, l2: 14, l3: 27, l4: 38 },
    { dept: 'Sales', l1: 12, l2: 19, l3: 32, l4: 45 },
    { dept: 'Human Resources', l1: 5, l2: 9, l3: 22, l4: 28 },
    { dept: 'Cloud Security', l1: 10, l2: 16, l3: 29, l4: 41 },
    { dept: 'Customer Success', l1: 6, l2: 11, l3: 24, l4: 33 }
  ];

  // Helper to resolve cell color based on percentage
  const getCellColor = (percentage) => {
    // 0-15%: cyan (low gap)
    // 16-30%: purple (medium gap)
    // 31%+: orange/red (high gap)
    if (percentage <= 15) return 'rgba(6, 182, 212, 0.15)';
    if (percentage <= 30) return 'rgba(139, 92, 246, 0.2)';
    return 'rgba(249, 115, 22, 0.3)';
  };

  const getCellBorder = (percentage) => {
    if (percentage <= 15) return '1px solid rgba(6, 182, 212, 0.3)';
    if (percentage <= 30) return '1px solid rgba(139, 92, 246, 0.4)';
    return '1px solid rgba(249, 115, 22, 0.5)';
  };

  const getTextColor = (percentage) => {
    if (percentage <= 15) return '#22d3ee';
    if (percentage <= 30) return '#c084fc';
    return '#fdba74';
  };

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '6px' }}>Promotion Gap Analysis Matrix</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          Detailed heatmap breakdown of Promotion Gap indices across departments and Job Levels.
        </p>
      </div>

      <section style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Heatmap Grid */}
        <div className="glass-panel" style={{ padding: '24px', overflowX: 'auto' }}>
          <h4 style={{ fontSize: '1rem', color: '#fff', marginBottom: '16px', fontWeight: 600 }}>Department vs Job Level Heatmap</h4>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>DEPARTMENT</th>
                <th style={{ padding: '12px' }}>LEVEL 1</th>
                <th style={{ padding: '12px' }}>LEVEL 2</th>
                <th style={{ padding: '12px' }}>LEVEL 3</th>
                <th style={{ padding: '12px' }}>LEVEL 4</th>
              </tr>
            </thead>
            <tbody>
              {matrixData.map(row => (
                <tr key={row.dept} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                  <td style={{ padding: '16px 12px', textAlign: 'left', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {row.dept}
                  </td>
                  {[row.l1, row.l2, row.l3, row.l4].map((cell, idx) => (
                    <td key={idx} style={{ padding: '12px' }}>
                      <div 
                        onClick={() => setSelectedCell({ dept: row.dept, lvl: idx + 1, value: cell })}
                        style={{
                          padding: '10px',
                          borderRadius: '6px',
                          background: getCellColor(cell),
                          border: getCellBorder(cell),
                          color: getTextColor(cell),
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'transform 0.15s'
                        }}
                        className="glass-panel-interactive"
                      >
                        {cell}%
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Color Scale Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px', fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(6, 182, 212, 0.2)', border: '1px solid rgba(6, 182, 212, 0.4)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Low Gap (&lt; 15%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(139, 92, 246, 0.2)', border: '1px solid rgba(139, 92, 246, 0.4)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>Monitor (16% - 30%)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: 'rgba(249, 115, 22, 0.2)', border: '1px solid rgba(249, 115, 22, 0.4)' }} />
              <span style={{ color: 'var(--text-secondary)' }}>High Stagnation (&gt; 30%)</span>
            </div>
          </div>
        </div>

        {/* Selected Details Side Panel */}
        <div className="glass-panel" style={{ padding: '24px', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {selectedCell ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Gap Breakdown</span>
                <h3 style={{ fontSize: '1.15rem', color: '#fff', fontWeight: 700 }}>{selectedCell.dept}</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Job Level {selectedCell.lvl} telemetry</p>
              </div>

              <div style={{
                padding: '16px', borderRadius: '8px', 
                background: getCellColor(selectedCell.value),
                border: getCellBorder(selectedCell.value),
                display: 'flex', flexDirection: 'column', gap: '4px'
              }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Stagnation Ratio</span>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: getTextColor(selectedCell.value) }}>
                  {selectedCell.value}%
                </div>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {selectedCell.value > 30 
                  ? '🔴 Action Required: High promotion gap detected. Multiple employees have exceeded tenure benchmarks under manager alignment. Review rotation playbooks.'
                  : '🟢 Stable Progression: Normal progression speeds observed. Continue monitoring annual satisfaction scores.'
                }
              </p>
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '36px', display: 'block', marginBottom: '10px' }}>📊</span>
              Click on any heatmap cell to view detail summaries and recommended HR playbooks.
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
