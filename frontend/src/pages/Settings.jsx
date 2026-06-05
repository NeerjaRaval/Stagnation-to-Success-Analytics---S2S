import React, { useState, useEffect } from 'react';

export default function Settings({ settings, onUpdateSettings }) {
  const [localSettings, setLocalSettings] = useState({
    promotion_gap_threshold: 0.5,
    role_stagnation_threshold: 0.5,
    warning_satisfaction_limit: 2
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (settings) {
      setLocalSettings(settings);
    }
  }, [settings]);

  const handleChange = (key, val) => {
    const updated = { ...localSettings, [key]: val };
    setLocalSettings(updated);
    setIsSaved(false); // Reset saved indicator when user makes changes
  };

  const handleSave = () => {
    onUpdateSettings(localSettings);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000); // Reset save notification after 3 seconds
  };

  const handleReset = () => {
    const defaults = {
      promotion_gap_threshold: 0.5,
      role_stagnation_threshold: 0.5,
      warning_satisfaction_limit: 2
    };
    setLocalSettings(defaults);
    onUpdateSettings(defaults);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '30px', alignItems: 'start' }}>
      
      {/* Settings Form */}
      <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '6px' }}>Dashboard Stagnation Thresholds</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Configure and save critical alert parameters driving Stagnation indicators.
          </p>
        </div>

        {/* Promotion Gap Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            <span style={{ fontWeight: 600 }}>Promotion Gap Ratio Limit</span>
            <strong style={{ color: 'var(--primary)' }}>{Math.round(localSettings.promotion_gap_threshold * 100)}%</strong>
          </label>
          <input
            type="range" min="0.10" max="0.90" step="0.05"
            value={localSettings.promotion_gap_threshold}
            onChange={e => handleChange('promotion_gap_threshold', parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>10% (Strict)</span><span>90% (Lenient)</span>
          </div>
        </div>

        {/* Role Stagnation Slider */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-primary)' }}>
            <span style={{ fontWeight: 600 }}>Role Stagnation Index Limit</span>
            <strong style={{ color: 'var(--accent)' }}>{Math.round(localSettings.role_stagnation_threshold * 100)}%</strong>
          </label>
          <input
            type="range" min="0.10" max="0.90" step="0.05"
            value={localSettings.role_stagnation_threshold}
            onChange={e => handleChange('role_stagnation_threshold', parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>10% (Strict)</span><span>90% (Lenient)</span>
          </div>
        </div>

        {/* Satisfaction Limit Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>
            Warning Job Satisfaction Threshold
          </label>
          <select
            value={localSettings.warning_satisfaction_limit}
            onChange={e => handleChange('warning_satisfaction_limit', parseInt(e.target.value))}
            style={{
              padding: '10px 14px', borderRadius: '8px',
              background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-glass)',
              color: '#fff', fontSize: '0.85rem', outline: 'none'
            }}
          >
            <option value="1">1 - Extremely Dissatisfied</option>
            <option value="2">2 - Dissatisfied (Default Warning Limit)</option>
            <option value="3">3 - Satisfied</option>
            <option value="4">4 - Highly Satisfied</option>
          </select>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Employees under this level with stagnant markers trigger a Retention Opportunity Alert.
          </span>
        </div>

        {/* Save/Reset Controls */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <button
            onClick={handleSave}
            style={{
              flex: 1, padding: '12px',
              background: 'var(--primary)', border: 'none', borderRadius: '8px',
              color: '#fff', fontWeight: 600, cursor: 'pointer',
              boxShadow: 'var(--glow-primary)', transition: 'background 0.2s'
            }}
          >
            Save Changes 💾
          </button>
          
          <button
            onClick={handleReset}
            style={{
              padding: '12px 18px',
              background: 'transparent', border: '1px solid var(--border-glass)', borderRadius: '8px',
              color: 'var(--text-secondary)', cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            Reset
          </button>
        </div>

        {isSaved && (
          <div style={{
            padding: '10px 16px', borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)',
            color: '#34d399', fontSize: '0.8rem', textAlign: 'center'
          }}>
            ✔️ Configuration updated successfully. All S2S models recalculated.
          </div>
        )}
      </div>

      {/* Threshold Guide */}
      <div className="glass-panel" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 600 }}>Parameter Definition Guide</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--primary)', display: 'block' }}>Promotion Gap Ratio Limit</span>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
              Defines the threshold ratio where the years elapsed since an employee's last promotion exceeds normal company progression standards.
              Setting this lower (e.g. 30%) raises alerts for even minor stagnation.
            </p>
          </div>

          <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-glass)' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--accent)', display: 'block' }}>Role Stagnation Index Limit</span>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
              Specifies the maximum allowable index calculated as the ratio of years spent in the current specific job role vs total tenure with Palo Alto Networks.
            </p>
          </div>

          <div>
            <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--success)', display: 'block' }}>Warning Job Satisfaction</span>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
              Specifies the disengagement floor. Employees scoring at or below this level while simultaneously meeting stagnation limits represent critical flight risks.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
