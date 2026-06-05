import React, { useState, useEffect } from 'react';

export default function Employees({ presetRiskLevel, hideFilterBar }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [department, setDepartment] = useState('');
  const [riskLevel, setRiskLevel] = useState('all');
  const [searchRole, setSearchRole] = useState('');
  const [total, setTotal] = useState(0);
  const [expandedEmployeeId, setExpandedEmployeeId] = useState(null);

  // Sync state if risk level is overridden by parent component (like Alerts.jsx)
  useEffect(() => {
    if (presetRiskLevel) {
      setRiskLevel(presetRiskLevel);
      setPage(1);
    }
  }, [presetRiskLevel]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Construct request URL
    const queryRisk = presetRiskLevel || riskLevel;
    const url = `http://localhost:8000/api/employees?page=${page}&limit=10&department=${encodeURIComponent(department)}&risk_level=${queryRisk}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`Server error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        // Safely set records and count
        const records = Array.isArray(data.records) ? data.records : [];
        
        // Handle search filter locally for smoother UX (if searching for a role)
        if (searchRole.trim()) {
          const filtered = records.filter(emp => 
            emp.JobRole?.toLowerCase().includes(searchRole.toLowerCase())
          );
          setEmployees(filtered);
          setTotal(filtered.length);
        } else {
          setEmployees(records);
          setTotal(typeof data.total === 'number' ? data.total : 0);
        }
        
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch employees:', err);
        setEmployees([]);
        setTotal(0);
        setError(err.message);
        setLoading(false);
      });
  }, [page, department, riskLevel, searchRole, presetRiskLevel]);

  const toggleExpand = (empId) => {
    if (expandedEmployeeId === empId) {
      setExpandedEmployeeId(null);
    } else {
      setExpandedEmployeeId(empId);
    }
  };

  const safeEmployeeCount = employees.length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* Filter Bar */}
      {!hideFilterBar && (
        <section className="glass-panel" style={{ padding: '20px 24px', display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'center' }}>
          
          {/* Quick Search */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, minWidth: '220px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Search Role</label>
            <input 
              type="text"
              placeholder="Search by job role e.g. Lab Technician..."
              value={searchRole}
              onChange={(e) => { setSearchRole(e.target.value); setPage(1); }}
              style={{
                padding: '9px 14px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)',
                color: '#fff', fontSize: '0.86rem', outline: 'none'
              }}
            />
          </div>

          {/* Department Select */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Department</label>
            <select
              value={department}
              onChange={(e) => { setDepartment(e.target.value); setPage(1); }}
              style={{
                padding: '10px 16px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)', minWidth: '180px', outline: 'none'
              }}
            >
              <option value="">All Departments</option>
              <option value="Research & Development">Research & Development</option>
              <option value="Sales">Sales</option>
              <option value="Human Resources">Human Resources</option>
            </select>
          </div>

          {/* Alert Level Select */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Stagnation Alert Level</label>
            <select
              value={riskLevel}
              onChange={(e) => { setRiskLevel(e.target.value); setPage(1); }}
              style={{
                padding: '10px 16px', borderRadius: '8px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)', minWidth: '180px', outline: 'none'
              }}
            >
              <option value="all">All Levels</option>
              <option value="high">High Stagnation Gap</option>
              <option value="medium">Medium Stagnation Monitor</option>
              <option value="low">Healthy Progression</option>
            </select>
          </div>

          <div style={{ alignSelf: 'flex-end', fontSize: '0.84rem', color: 'var(--text-secondary)', paddingBottom: '4px' }}>
            {loading ? 'Syncing...' : <span>Found <strong>{total}</strong> entries</span>}
          </div>
        </section>
      )}

      {/* Error Banner */}
      {error && (
        <div style={{
          padding: '16px 20px', borderRadius: '10px',
          background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)',
          color: '#f87171', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '10px'
        }}>
          <span>⚠️</span>
          <span>Could not load employee telemetry data from localhost:8000. Error: {error}</span>
        </div>
      )}

      {/* Table Loading Skeleton */}
      {loading && (
        <section className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', padding: '12px 0', borderBottom: '1px solid var(--border-glass)' }}>
              <div style={{ height: '14px', width: '8%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }} />
              <div style={{ height: '14px', width: '25%', background: 'rgba(255,255,255,0.07)', borderRadius: '4px' }} />
              <div style={{ height: '14px', width: '20%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }} />
              <div style={{ height: '14px', width: '15%', background: 'rgba(255,255,255,0.04)', borderRadius: '4px' }} />
              <div style={{ height: '14px', width: '12%', background: 'rgba(255,255,255,0.06)', borderRadius: '4px' }} />
            </div>
          ))}
        </section>
      )}

      {/* Employee Datatable */}
      {!loading && !error && (
        <>
          {safeEmployeeCount === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <span style={{ fontSize: '36px', display: 'block', marginBottom: '12px' }}>👥</span>
              No employee matches found for the active filter set.
            </div>
          ) : (
            <div className="glass-panel custom-scroll" style={{ overflowX: 'auto', padding: '10px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '16px 24px', fontWeight: 600 }}>EMPLOYEE</th>
                    <th style={{ padding: '16px 12px', fontWeight: 600 }}>JOB ROLE</th>
                    <th style={{ padding: '16px 12px', fontWeight: 600 }}>DEPARTMENT</th>
                    <th style={{ padding: '16px 12px', fontWeight: 600 }}>PROMOTION GAP</th>
                    <th style={{ padding: '16px 12px', fontWeight: 600 }}>ATTRITION RISK</th>
                    <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp, idx) => {
                    const gapRatio = emp.PromotionGapRatio ?? 0;
                    const riskScore = emp.StagnationAttritionRisk ?? emp.AttritionProbability ?? 0.28;
                    const empId = emp.id ?? idx;
                    const isExpanded = expandedEmployeeId === empId;

                    let badgeClass = 'badge-success';
                    let badgeLabel = 'Healthy';
                    if (gapRatio > 0.5) { badgeClass = 'badge-danger'; badgeLabel = 'Critical'; }
                    else if (gapRatio > 0.25) { badgeClass = 'badge-warning'; badgeLabel = 'Warning'; }

                    return (
                      <React.Fragment key={empId}>
                        <tr 
                          onClick={() => toggleExpand(empId)}
                          style={{ 
                            borderBottom: '1px solid var(--border-glass)', 
                            background: isExpanded ? 'rgba(255, 255, 255, 0.02)' : 'transparent',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                          }}
                          className="glass-panel-interactive"
                        >
                          <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-primary)' }}>
                            #{empId}
                          </td>
                          <td style={{ padding: '16px 12px', color: 'var(--text-primary)', fontWeight: 500 }}>
                            {emp.JobRole ?? 'Specialist'}
                          </td>
                          <td style={{ padding: '16px 12px', color: 'var(--text-secondary)' }}>
                            {emp.Department ?? 'R&D'}
                          </td>
                          <td style={{ padding: '16px 12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <span className={`badge ${badgeClass}`} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                                {(gapRatio * 100).toFixed(0)}%
                              </span>
                              <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>({emp.YearsSinceLastPromotion ?? 0} yrs stuck)</span>
                            </div>
                          </td>
                          <td style={{ padding: '16px 12px', fontWeight: 600, color: riskScore > 0.5 ? 'var(--danger)' : 'var(--success)' }}>
                            {(riskScore * 100).toFixed(0)}%
                          </td>
                          <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                            <button
                              style={{
                                padding: '6px 12px', borderRadius: '6px',
                                border: '1px solid var(--border-glass)', background: 'transparent',
                                color: 'var(--accent)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600
                              }}
                            >
                              {isExpanded ? 'Hide Details ▲' : 'Inspect ▼'}
                            </button>
                          </td>
                        </tr>
                        
                        {/* Collapsible Telemetry Row */}
                        {isExpanded && (
                          <tr>
                            <td colSpan="6" style={{ padding: '0px', background: 'rgba(0,0,0,0.15)' }}>
                              <div style={{ padding: '24px 30px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', borderBottom: '1px solid var(--border-glass)' }}>
                                <div>
                                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Demographics</span>
                                  <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                                    Age: <strong>{emp.Age ?? '—'}</strong> | Gender: <strong>{emp.Gender ?? '—'}</strong> | Education: <strong>{emp.EducationField ?? '—'} (Lvl {emp.Education ?? '—'})</strong>
                                  </p>
                                </div>
                                <div>
                                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Satisfaction Metrics</span>
                                  <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                                    Job: <strong>{emp.JobSatisfaction ?? '—'}/4</strong> | Environment: <strong>{emp.EnvironmentSatisfaction ?? '—'}/4</strong> | Relationship: <strong>{emp.RelationshipSatisfaction ?? '—'}/4</strong>
                                  </p>
                                </div>
                                <div>
                                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Job & Career Metrics</span>
                                  <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                                    Level: <strong>{emp.JobLevel ?? '—'}/5</strong> | WorkLife Balance: <strong>{emp.WorkLifeBalance ?? '—'}/4</strong> | Travel: <strong>{emp.BusinessTravel ?? '—'}</strong>
                                  </p>
                                </div>
                                <div>
                                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Tenure Details</span>
                                  <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', marginTop: '4px' }}>
                                    With Company: <strong>{emp.YearsAtCompany ?? '—'} yrs</strong> | Under Manager: <strong>{emp.YearsWithCurrManager ?? '—'} yrs</strong>
                                  </p>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination bar */}
          <section style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }}>
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              style={{
                padding: '10px 20px', borderRadius: '8px',
                background: page === 1 ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-glass)',
                color: page === 1 ? 'var(--text-muted)' : 'var(--text-primary)',
                cursor: page === 1 ? 'not-allowed' : 'pointer'
              }}
            >← Previous</button>
            <span style={{ padding: '10px 14px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Page {page}
            </span>
            <button
              disabled={safeEmployeeCount < 10}
              onClick={() => setPage(p => p + 1)}
              style={{
                padding: '10px 20px', borderRadius: '8px',
                background: safeEmployeeCount < 10 ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border-glass)',
                color: safeEmployeeCount < 10 ? 'var(--text-muted)' : 'var(--text-primary)',
                cursor: safeEmployeeCount < 10 ? 'not-allowed' : 'pointer'
              }}
            >Next →</button>
          </section>
        </>
      )}
    </div>
  );
}
