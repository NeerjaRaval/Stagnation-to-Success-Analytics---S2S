import React from 'react';
import Predictions from './Predictions';

export default function TalentMobility() {
  return (
    <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '6px' }}>Talent Mobility & Career Simulator</h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
          Run real-time ML simulations to predict employee career paths, job satisfaction impacts, and flight risks.
        </p>
      </div>

      <Predictions />

    </div>
  );
}
