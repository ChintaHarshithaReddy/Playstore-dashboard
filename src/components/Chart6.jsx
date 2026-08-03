import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { C6_KEYS, C6_COLORS, C6_TRANSLATIONS, C6_DATA } from '../data/chartData';
import { momGrowthIndexes, fmtNum } from '../utils/timeUtils';

const growthIdx = {};
const allGrowth  = new Set();
C6_KEYS.forEach(k => {
  const arr = C6_DATA.map(d => d[k]);
  growthIdx[k] = momGrowthIndexes(arr, 0.25);
  growthIdx[k].forEach(i => allGrowth.add(i));
});

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const mi = C6_DATA.findIndex(d => d.month === label);
  return (
    <div style={{ background:'#1e2a3a', border:'1px solid #3b4a6b', borderRadius:10, padding:'10px 14px', fontSize:12, minWidth:190 }}>
      <p style={{ fontWeight:700, color:'#90cdf4', marginBottom:6 }}>{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ color:p.color, margin:'2px 0' }}>
          {C6_TRANSLATIONS[p.dataKey]?.split(' →')[0]||p.dataKey}: <b>{fmtNum(p.value)}</b>
          {growthIdx[p.dataKey]?.includes(mi) && <span style={{ color:'#fbbf24', marginLeft:6 }}>⬆&gt;25%</span>}
        </p>
      ))}
    </div>
  );
};

export default function Chart6() {
  const [hidden, setHidden] = useState({});
  const toggle = k => setHidden(p => ({ ...p, [k]: !p[k] }));

  return (
    <div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14 }}>
        {C6_KEYS.map((k,i) => (
          <button key={k} onClick={() => toggle(k)} style={{
            display:'flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:20,
            border:`1px solid ${C6_COLORS[i]}`,
            background: hidden[k] ? 'transparent' : C6_COLORS[i]+'22',
            color: hidden[k] ? '#718096' : C6_COLORS[i],
            fontSize:11, cursor:'pointer', textDecoration: hidden[k] ? 'line-through' : 'none',
          }}>
            <span style={{ width:14,height:9,background:C6_COLORS[i],borderRadius:2,display:'inline-block' }} />
            {k}
          </button>
        ))}
        <span style={{ marginLeft:'auto', fontSize:11, color:'#fbbf24', background:'#12122077', padding:'3px 10px', borderRadius:8 }}>
          ⬆ Gold = &gt;25% MoM growth
        </span>
      </div>

      <ResponsiveContainer width="100%" height={305}>
        <AreaChart data={C6_DATA} margin={{ top:10, right:16, bottom:8, left:8 }}>
          <defs>
            {C6_KEYS.map((k,i) => (
              <linearGradient key={k} id={`ag${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={C6_COLORS[i]} stopOpacity={0.75} />
                <stop offset="95%" stopColor={C6_COLORS[i]} stopOpacity={0.08} />
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize:11, fill:'#718096' }} />
          <YAxis tick={{ fontSize:10, fill:'#718096' }} tickFormatter={fmtNum} />
          <Tooltip content={<Tip />} />

          {[...allGrowth].map(idx => (
            <ReferenceLine key={idx} x={C6_DATA[idx]?.month}
              stroke="#fbbf24" strokeWidth={22} strokeOpacity={0.18}
              label={{ value:'⬆', position:'insideTop', fill:'#fbbf24', fontSize:11 }} />
          ))}

          {C6_KEYS.map((k,i) => !hidden[k] && (
            <Area key={k} type="monotone" dataKey={k} stackId="1"
              stroke={C6_COLORS[i]} strokeWidth={2} fill={`url(#ag${i})`} />
          ))}
        </AreaChart>
      </ResponsiveContainer>

      <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:10 }}>
        {Object.entries(C6_TRANSLATIONS).filter(([,v]) => v.includes('→')).map(([k,v]) => (
          <span key={k} style={{ fontSize:11, background:'#12122077', padding:'2px 10px', borderRadius:6, color:'#90cdf4' }}>
            {v}
          </span>
        ))}
        <span style={{ fontSize:11, color:'#718096', marginTop:4, width:'100%' }}>
          Filters: rating≥4.2 · no numbers in name · T&amp;P categories · reviews&gt;1K · size 20–80MB
        </span>
      </div>
    </div>
  );
}
