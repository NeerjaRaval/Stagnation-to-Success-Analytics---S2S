import React from 'react';

export default function Reports() {
  const handleExport = (format) => {
    alert(`Generating ${format} report bundle. Download will begin shortly.`);
  };

  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '6px' }}>Executive Summary & Reports</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            High-level overview and impact analysis report for leadership stakeholders.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => handleExport('PDF')}
            style={{
              padding: '8px 16px', background: 'var(--primary)', border: 'none', 
              borderRadius: '6px', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem'
            }}
          >
            Export PDF 📄
          </button>
          <button 
            onClick={() => handleExport('CSV')}
            style={{
              padding: '8px 16px', background: 'transparent', border: '1px solid var(--border-glass)', 
              borderRadius: '6px', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.8rem'
            }}
          >
            Export CSV 📊
          </button>
        </div>
      </div>

      {/* Main Report Body */}
      <section style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px', alignItems: 'stretch' }}>
        
        {/* Key Findings Card */}
        <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <h4 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 600 }}>Stagnation & Attrition Assessment Summary</h4>
          
          <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '14px', lineHeight: '1.5' }}>
            <p>
              🔍 **Executive Assessment:** The introduction of ML-guided threshold configurations has enabled HR to pinpoint core retention areas earlier. Key risk vectors remain correlated with longer manager tenures (exceeding 4.5 years) and low environment satisfaction metrics.
            </p>
            <p>
              📈 **Departmental Performance:** R&D remains the largest group with active progression monitoring (142 cases). Sales displays the highest relative stagnation index (32.8% average gap) due to shorter overall promotion cycles.
            </p>
            <p>
              🛡️ **Mitigation Outcomes:** Simulated rotation playbooks suggest that internal rotations and career progression audits can mitigate up to **42% of attrition risk** for senior levels.
            </p>
          </div>
        </div>

        {/* Satisfaction trend review */}
        <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: '#fff', fontWeight: 600 }}>Overall Career Satisfaction Trends</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>Quarterly satisfaction index trajectories</p>
          </div>

          {/* SVG Line Chart */}
          <div style={{ height: '140px', width: '100%', marginTop: '10px' }}>
            <svg width="100%" height="100%" viewBox="0 0 300 120" style={{ overflow: 'visible' }}>
              {/* Grid Lines */}
              <line x1="20" y1="20" x2="280" y2="20" stroke="rgba(255,255,255,0.03)" />
              <line x1="20" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.03)" />
              <line x1="20" y1="100" x2="280" y2="100" stroke="rgba(255,255,255,0.03)" />

              {/* Path line */}
              <path d="M 20 80 Q 80 50 140 70 T 260 40" fill="none" stroke="var(--primary)" strokeWidth="3" />
              
              {/* Dots */}
              <circle cx="20" cy="80" r="4" fill="var(--accent)" />
              <circle cx="85" cy="58" r="4" fill="var(--accent)" />
              <circle cx="150" cy="71" r="4" fill="var(--accent)" />
              <circle cx="260" cy="40" r="4" fill="var(--accent)" />
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            <span>Q1 2024</span>
            <span>Q2 2024</span>
            <span>Q3 2024</span>
            <span>Q4 2024</span>
          </div>
        </div>

      </section>

    </div>
  );
}
