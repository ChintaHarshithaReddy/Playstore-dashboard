import React, { useState, useEffect } from 'react';
import { formatIST, inWindow, getISTDate } from './utils/timeUtils';
import TimeGate from './components/TimeGate';
import ChartCard from './components/ChartCard';
import Chart1 from './components/Chart1';
import Chart2 from './components/Chart2';
import Chart3 from './components/Chart3';
import Chart4 from './components/Chart4';
import Chart5 from './components/Chart5';
import Chart6 from './components/Chart6';

// Chart metadata
const CHARTS = [
  {
    num: 1, title: 'Rating vs Reviews — Top 10 Categories',
    badge: '3 PM – 5 PM', startH: 15, endH: 17,
    desc: 'Grouped bar comparing avg rating & review count. Filters: rating≥4.0, size≥10MB, updated Jan.',
    component: Chart1,
  },
  {
    num: 2, title: 'Global Installs Choropleth by Region',
    badge: '6 PM – 8 PM', startH: 18, endH: 20,
    desc: 'Top 5 categories (not A/C/G/S) across 6 global regions. Installs >1M highlighted.',
    component: Chart2,
  },
  {
    num: 3, title: 'Free vs Paid — Installs & Revenue',
    badge: '1 PM – 2 PM', startH: 13, endH: 14,
    desc: 'Dual-axis chart for top 3 categories. Filters: Android>4.0, size>15MB, name≤30 chars.',
    component: Chart3,
  },
  {
    num: 4, title: 'Monthly Installs Trend — E, C, B Categories',
    badge: '6 PM – 9 PM', startH: 18, endH: 21,
    desc: 'Line chart with >20% MoM growth shading. Beauty→Hindi, Business→Tamil, Dating→German.',
    component: Chart4,
  },
  {
    num: 5, title: 'App Size vs Rating — Bubble Chart',
    badge: '5 PM – 7 PM', startH: 17, endH: 19,
    desc: 'Bubble size = installs. Game category in pink. Filters: rating>3.5, installs>50K.',
    component: Chart5,
  },
  {
    num: 6, title: 'Stacked Area — T & P Categories',
    badge: '4 PM – 6 PM', startH: 16, endH: 18,
    desc: 'Cumulative installs. Travel→French, Productivity→Spanish, Photography→Japanese. >25% MoM highlighted.',
    component: Chart6,
  },
];

// ── Live IST clock ────────────────────────────────────────────────────────────
function Clock() {
  const [time, setTime] = useState(formatIST());
  useEffect(() => {
    const id = setInterval(() => setTime(formatIST()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      background: '#0d0d1a', border: '1px solid #3b4a6b', borderRadius: 14,
      padding: '10px 20px', textAlign: 'center',
    }}>
      <div style={{ fontSize: 11, color: '#718096', marginBottom: 3 }}>🕐 Current IST</div>
      <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#90cdf4', fontFamily: 'monospace', letterSpacing: 1 }}>
        {time}
      </div>
    </div>
  );
}

// ── Schedule badge strip ──────────────────────────────────────────────────────
function ScheduleStrip() {
  const [, tick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => tick(n => n + 1), 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(148px, 1fr))',
      gap: 8, marginTop: 16,
    }}>
      {CHARTS.map(c => {
        const live = inWindow(c.startH, c.endH);
        return (
          <div key={c.num} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: live ? '#0d3321' : '#0d0d1a',
            border: `1px solid ${live ? '#10b981' : '#2d3748'}`,
            borderRadius: 10, padding: '7px 10px', transition: 'all 0.4s',
          }}>
            <span style={{
              width: 22, height: 22, borderRadius: 6, fontWeight: 700, fontSize: 11,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              background: live ? '#10b981' : '#1e2a3a', color: live ? '#fff' : '#718096',
            }}>{c.num}</span>
            <div style={{ minWidth: 0 }}>
              <div style={{
                fontSize: 11, fontWeight: 600, color: live ? '#6ee7b7' : '#a0aec0',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{c.title.split('—')[0].trim()}</div>
              <div style={{ fontSize: 10, color: live ? '#10b981' : '#4a5568' }}>
                {c.badge}{live ? ' ✓ LIVE' : ''}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a14' }}>

      {/* ── Header ── */}
      <header style={{
        background: 'linear-gradient(135deg,#12122e 0%,#16213e 60%,#0f3460 100%)',
        borderBottom: '1px solid #2d3748',
        padding: '20px 24px 16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, flexShrink: 0,
            }}>📊</div>
            <div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                Play Store Analytics Dashboard
              </h1>
              <p style={{ fontSize: '0.82rem', color: '#718096', marginTop: 3 }}>
                6 Interactive Time-Gated Charts · Google Play Store Data
              </p>
            </div>
          </div>
          <Clock />
        </div>
        <ScheduleStrip />
      </header>

      {/* ── Charts Grid ── */}
      <main style={{ padding: '28px 24px', maxWidth: 1400, margin: '0 auto' }}>

        {/* Info banner */}
        <div style={{
          background: 'linear-gradient(90deg,#1e2a3a,#1a1a30)',
          border: '1px solid #3b4a6b', borderRadius: 14,
          padding: '14px 20px', marginBottom: 28,
          display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 20 }}>ℹ️</span>
          <span style={{ color: '#90cdf4', fontSize: 13, lineHeight: 1.5 }}>
            Each chart is <strong>visible only during its scheduled IST window</strong>.
            Outside that window a 🔒 locked placeholder is shown. The status refreshes every 15 seconds.
          </span>
        </div>

        {/* 2-column grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 560px), 1fr))',
          gap: 22,
        }}>
          {CHARTS.map(c => {
            const ChartComponent = c.component;
            return (
              <ChartCard key={c.num} num={c.num} title={c.title} badge={c.badge}>
                {/* Description */}
                <p style={{ fontSize: 12, color: '#718096', marginBottom: 14, lineHeight: 1.5 }}>
                  {c.desc}
                </p>
                <TimeGate startH={c.startH} endH={c.endH} title={c.title} badge={c.badge}>
                  <ChartComponent />
                </TimeGate>
              </ChartCard>
            );
          })}
        </div>

        {/* Footer */}
        <footer style={{ textAlign: 'center', marginTop: 40, paddingBottom: 24 }}>
          <p style={{ color: '#4a5568', fontSize: 12 }}>
            Play Store Analytics Dashboard · Built with React + Recharts · Synthetic dataset
          </p>
          <p style={{ color: '#4a5568', fontSize: 11, marginTop: 4 }}>
            All time gates operate on IST (Indian Standard Time, UTC+5:30)
          </p>
        </footer>
      </main>
    </div>
  );
}
