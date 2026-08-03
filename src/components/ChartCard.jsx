import React from 'react';

export default function ChartCard({ num, title, badge, children }) {
  return (
    <div style={{
      background: 'linear-gradient(145deg,#13132388,#1a1a2e88)',
      border: '1px solid #2d3748', borderRadius: 18,
      padding: '20px 22px', backdropFilter: 'blur(8px)',
    }}>
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <span style={{
          background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
          color: '#fff', fontWeight: 700, fontSize: 12,
          borderRadius: 8, padding: '3px 10px', flexShrink: 0,
        }}>
          Chart {num}
        </span>
        <span style={{ fontWeight: 600, fontSize: '1rem', color: '#e2e8f0', flex: 1 }}>
          {title}
        </span>
        <span style={{
          background: '#0d3321', color: '#6ee7b7',
          border: '1px solid #10b981', borderRadius: 12,
          fontSize: 11, padding: '3px 10px', flexShrink: 0,
        }}>
          ⏰ {badge} IST
        </span>
      </div>

      {children}
    </div>
  );
}
