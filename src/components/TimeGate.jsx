import React, { useState, useEffect } from 'react';
import { inWindow } from '../utils/timeUtils';

export default function TimeGate({ startH, endH, title, badge, children }) {
  const [active, setActive] = useState(inWindow(startH, endH));

  useEffect(() => {
    const id = setInterval(() => setActive(inWindow(startH, endH)), 15000);
    return () => clearInterval(id);
  }, [startH, endH]);

  if (!active) {
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: 12, minHeight: 220,
        background: 'linear-gradient(135deg,#12122088,#1a1a3088)',
        border: '1.5px dashed #3b4a6b', borderRadius: 16, padding: '2.5rem 1.5rem',
        textAlign: 'center',
      }}>
        <span style={{ fontSize: '2.8rem' }}>🔒</span>
        <span style={{ fontSize: '1rem', fontWeight: 600, color: '#a0aec0' }}>{title}</span>
        <span style={{ fontSize: '.82rem', color: '#718096', maxWidth: 280, lineHeight: 1.5 }}>
          This chart is only visible during its scheduled IST time window.
        </span>
        <span style={{
          background: '#1e2a3a', border: '1px solid #3b4a6b', borderRadius: 20,
          padding: '6px 18px', fontSize: '.78rem', color: '#90cdf4', marginTop: 4,
        }}>
          ⏰ Available: {badge} IST
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
