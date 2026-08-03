import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { C4_KEYS, C4_COLORS, C4_LABELS, C4_DATA } from '../data/chartData';
import { momGrowthIndexes, fmtNum } from '../utils/timeUtils';

// Pre-compute growth month indexes per series
const growthIdx = {};
const allGrowth  = new Set();
C4_KEYS.forEach(k => {
  const arr = C4_DATA.map(d => d[k]);
  growthIdx[k] = momGrowthIndexes(arr, 0.20);
  growthIdx[k].forEach(i => allGrowth.add(i));
});

const GrowthDot = (color, key) => (props) => {
  const { cx, cy, index } = props;
  if (!cx || !cy) return null;
  const big = growthIdx[key]?.includes(index);
  return <circle cx={cx} cy={cy} r={big?9:4} fill={big?color:'#0a0a14'} stroke={color} strokeWidth={big?3:2} />;
};

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const mi = C4_DATA.findIndex(d => d.month === label);
  return (
    <div style={{ background:'#1e2a3a', border:'1px solid #3b4a6b', borderRadius:10, padding:'10px 14px', fontSize:12 }}>
      <p style={{ fontWeight:700, color:'#90cdf4', marginBottom:6 }}>{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ color:p.color, margin:'2px 0' }}>
          {C4_LABELS[p.dataKey]||p.dataKey}: <b>{fmtNum(p.value)}</b>
          {growthIdx[p.dataKey]?.includes(mi) && <span style={{ color:'#fbbf24', marginLeft:6 }}>🔆 &gt;20% MoM</span>}
        </p>
      ))}
    </div>
  );
};

export default function Chart4() {
  const [hidden, setHidden] = useState({});
  const toggle = k => setHidden(p => ({ ...p, [k]: !p[k] }));

  return (
    <div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14 }}>
        {C4_KEYS.map((k,i) => (
          <button key={k} onClick={() => toggle(k)} style={{
            display:'flex', alignItems:'center', gap:6, padding:'4px 12px', borderRadius:20,
            border:`1px solid ${C4_COLORS[i]}`,
            background: hidden[k] ? 'transparent' : C4_COLORS[i]+'22',
            color: hidden[k] ? '#718096' : C4_COLORS[i],
            fontSize:11, cursor:'pointer', textDecoration: hidden[k] ? 'line-through' : 'none',
          }}>
            <span style={{ width:18,height:3,background:C4_COLORS[i],borderRadius:2,display:'inline-block' }} />
            {k}
          </button>
        ))}
        <span style={{ marginLeft:'auto', fontSize:11, color:'#fbbf24', background:'#12122077', padding:'3px 10px', borderRadius:8 }}>
          🔆 Large dot = &gt;20% MoM growth
        </span>
      </div>

      <ResponsiveContainer width="100%" height={310}>
        <LineChart data={C4_DATA} margin={{ top:10, right:16, bottom:8, left:8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize:11, fill:'#718096' }} />
          <YAxis tick={{ fontSize:10, fill:'#718096' }} tickFormatter={fmtNum} />
          <Tooltip content={<Tip />} />
          {[...allGrowth].map(idx => (
            <ReferenceLine key={idx} x={C4_DATA[idx]?.month}
              stroke="#fbbf2444" strokeWidth={26} strokeOpacity={0.35}
              label={{ value:'▲', position:'insideTop', fill:'#fbbf24', fontSize:10 }} />
          ))}
          {C4_KEYS.map((k,i) => !hidden[k] && (
            <Line key={k} type="monotone" dataKey={k} stroke={C4_COLORS[i]}
              strokeWidth={2.5} dot={GrowthDot(C4_COLORS[i], k)} activeDot={{ r:6 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>

      <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginTop:10, fontSize:11 }}>
        {[['सौंदर्य','Beauty (Hindi)'],['வணிகம்','Business (Tamil)'],['Termine','Dating (German)']].map(([k,d]) => (
          <span key={k} style={{ background:'#12122077', padding:'2px 10px', borderRadius:6, color:'#90cdf4' }}>
            {k} = {d}
          </span>
        ))}
        <span style={{ color:'#718096', marginLeft:'auto' }}>
          Filters: no X/Y/Z start · E,C,B cats · reviews&gt;500 · no "S" in name
        </span>
      </div>
    </div>
  );
}
