import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { C2_CATS, C2_TABLE } from '../data/chartData';

const THRESHOLD = 100; // proxy for >1M installs in scaled units

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#1e2a3a', border:'1px solid #3b4a6b', borderRadius:10, padding:'10px 14px', fontSize:12 }}>
      <p style={{ fontWeight:700, color:'#90cdf4', marginBottom:6 }}>{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ color:p.fill, margin:'2px 0' }}>
          {p.name}: <b>{p.value}M+</b>
          {p.value > THRESHOLD && <span style={{ color:'#fbbf24', marginLeft:6 }}>⭐ &gt;1M</span>}
        </p>
      ))}
    </div>
  );
};

export default function Chart2() {
  const [focus, setFocus] = useState(null);

  return (
    <div>
      {/* Category toggle legend */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14 }}>
        {C2_CATS.map(cat => (
          <button key={cat.name} onClick={() => setFocus(focus === cat.name ? null : cat.name)} style={{
            display:'flex', alignItems:'center', gap:5, padding:'4px 12px', borderRadius:20,
            border:`1px solid ${cat.color}`,
            background: focus === cat.name ? cat.color+'33' : 'transparent',
            color:cat.color, fontSize:11, cursor:'pointer',
          }}>
            <span style={{ width:8,height:8,borderRadius:'50%',background:cat.color }} />
            {cat.name}
          </button>
        ))}
        <span style={{ marginLeft:'auto', fontSize:11, color:'#fbbf24', background:'#12122077', padding:'3px 10px', borderRadius:8 }}>
          ⭐ Bright = &gt;1M installs
        </span>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={C2_TABLE} layout="vertical" margin={{ top:4, right:16, bottom:4, left:10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" horizontal={false} />
          <XAxis type="number" tick={{ fontSize:10, fill:'#718096' }} tickFormatter={v => v+'M+'} />
          <YAxis type="category" dataKey="region" tick={{ fontSize:10, fill:'#a0aec0' }} width={132} />
          <Tooltip content={<Tip />} />
          {C2_CATS.map(cat => (
            <Bar key={cat.name} dataKey={cat.name} stackId="s" fill={cat.color}
              opacity={focus && focus !== cat.name ? 0.15 : 1}>
              {C2_TABLE.map((row, i) => (
                <Cell key={i}
                  fill={row[cat.name] > THRESHOLD ? cat.color : cat.color+'77'}
                  stroke={row[cat.name] > THRESHOLD ? '#fbbf24' : 'transparent'}
                  strokeWidth={row[cat.name] > THRESHOLD ? 1.5 : 0}
                />
              ))}
            </Bar>
          ))}
        </BarChart>
      </ResponsiveContainer>

      <p style={{ fontSize:11, color:'#718096', marginTop:8 }}>
        Filters: top 5 categories · not starting A/C/G/S · installs &gt;1M highlighted · click category to isolate
      </p>
    </div>
  );
}
