import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { C5_CATS, C5_DATA } from '../data/chartData';
import { fmtNum } from '../utils/timeUtils';

const Tip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  return (
    <div style={{
      background:'#1e2a3a', border:`1px solid ${d.highlight ? '#FF1493' : '#3b4a6b'}`,
      borderRadius:10, padding:'10px 14px', fontSize:12,
    }}>
      <p style={{ fontWeight:700, color: d.highlight ? '#FFB6C1' : '#90cdf4', marginBottom:6 }}>
        {d.category} {d.highlight && '🎮'}
      </p>
      <p style={{ color:'#a0aec0', margin:'2px 0' }}>Size: <b style={{ color:'#e2e8f0' }}>{d.size} MB</b></p>
      <p style={{ color:'#a0aec0', margin:'2px 0' }}>Rating: <b style={{ color:'#e2e8f0' }}>{d.rating.toFixed(2)} ⭐</b></p>
      <p style={{ color:'#a0aec0', margin:'2px 0' }}>Installs: <b style={{ color:'#e2e8f0' }}>{fmtNum(d.installs)}</b></p>
    </div>
  );
};

export default function Chart5() {
  const [focus, setFocus] = useState(null);
  const filtered = focus ? C5_DATA.filter(d => d.category === focus) : C5_DATA;

  return (
    <div>
      <div style={{ display:'flex', gap:7, flexWrap:'wrap', marginBottom:14 }}>
        {C5_CATS.map(cat => (
          <button key={cat.name} onClick={() => setFocus(focus === cat.name ? null : cat.name)} style={{
            display:'flex', alignItems:'center', gap:5, padding:'4px 10px', borderRadius:20,
            border:`1px solid ${cat.highlight ? '#FF1493' : cat.color}`,
            background: focus === cat.name ? cat.color+'33' : 'transparent',
            color: cat.highlight ? '#FFB6C1' : cat.color, fontSize:11, cursor:'pointer',
            boxShadow: cat.highlight ? '0 0 10px #FF69B444' : 'none',
          }}>
            <span style={{
              width:9,height:9,borderRadius:'50%',background:cat.color,
              border: cat.highlight ? '2px solid #FF1493' : '1px solid transparent',
            }} />
            {cat.name}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={330}>
        <ScatterChart margin={{ top:20, right:24, bottom:24, left:10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
          <XAxis type="number" dataKey="size" domain={[10,105]} tick={{ fontSize:10, fill:'#718096' }}
            label={{ value:'App Size (MB)', position:'insideBottom', offset:-10, fontSize:11, fill:'#718096' }} />
          <YAxis type="number" dataKey="rating" domain={[3.3,5.2]} tick={{ fontSize:10, fill:'#718096' }}
            label={{ value:'Avg Rating', angle:-90, position:'insideLeft', fontSize:11, fill:'#718096' }} />
          <ZAxis type="number" dataKey="installs" range={[50,900]} />
          <Tooltip content={<Tip />} />
          <Scatter data={filtered}>
            {filtered.map((d, i) => (
              <Cell key={i}
                fill={d.color+(d.highlight?'ee':'99')}
                stroke={d.highlight ? '#FF1493' : d.border}
                strokeWidth={d.highlight ? 2.5 : 0.5}
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>

      <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginTop:8, fontSize:11 }}>
        <span style={{ color:'#FFB6C1', background:'#12122077', padding:'2px 10px', borderRadius:6 }}>
          🎮 Game highlighted in pink
        </span>
        <span style={{ color:'#718096' }}>
          Filters: rating&gt;3.5 · reviews&gt;500 · installs&gt;50K · subjectivity&gt;0.5 · no "S" in name
        </span>
      </div>
    </div>
  );
}
