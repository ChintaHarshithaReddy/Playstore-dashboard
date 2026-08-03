import React, { useState } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { C3_DATA } from '../data/chartData';
import { fmtNum } from '../utils/timeUtils';

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#1e2a3a', border:'1px solid #3b4a6b', borderRadius:10, padding:'10px 14px', fontSize:12 }}>
      <p style={{ fontWeight:700, color:'#90cdf4', marginBottom:6 }}>{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ color:p.color||p.stroke, margin:'2px 0' }}>
          {p.name}: <b>{p.name.toLowerCase().includes('revenue') ? '$'+fmtNum(p.value) : fmtNum(p.value)}</b>
        </p>
      ))}
    </div>
  );
};

const VIEWS = ['Both','Installs','Revenue'];

export default function Chart3() {
  const [view, setView] = useState('Both');
  const showBars = view !== 'Revenue';
  const showLines = view !== 'Installs';

  return (
    <div>
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:14, alignItems:'center' }}>
        {VIEWS.map(v => (
          <button key={v} onClick={() => setView(v)} style={{
            padding:'4px 14px', borderRadius:20, border:'1px solid #4a5568', cursor:'pointer',
            background: view===v ? '#3b82f6' : 'transparent',
            color: view===v ? '#fff' : '#a0aec0', fontSize:12,
          }}>{v}</button>
        ))}
        <div style={{ display:'flex', gap:12, marginLeft:'auto', fontSize:11, flexWrap:'wrap' }}>
          <span style={{ color:'#3b82f6' }}>■ Free Installs</span>
          <span style={{ color:'#10b981' }}>■ Paid Installs</span>
          <span style={{ color:'#f97316' }}>╌ Free Revenue</span>
          <span style={{ color:'#f59e0b' }}>╌ Paid Revenue</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={C3_DATA} margin={{ top:8, right:55, bottom:8, left:10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
          <XAxis dataKey="category" tick={{ fontSize:12, fill:'#a0aec0' }} />
          <YAxis yAxisId="i" tick={{ fontSize:10, fill:'#718096' }} tickFormatter={fmtNum}
            label={{ value:'Installs', angle:-90, position:'insideLeft', fontSize:10, fill:'#718096' }} />
          <YAxis yAxisId="r" orientation="right" tick={{ fontSize:10, fill:'#718096' }} tickFormatter={v=>'$'+fmtNum(v)}
            label={{ value:'Revenue', angle:90, position:'insideRight', fontSize:10, fill:'#718096' }} />
          <Tooltip content={<Tip />} />

          {showBars && <>
            <Bar yAxisId="i" dataKey="freeInstalls" name="Free Installs" fill="#3b82f6" radius={[6,6,0,0]} maxBarSize={38} />
            <Bar yAxisId="i" dataKey="paidInstalls" name="Paid Installs" fill="#10b981" radius={[6,6,0,0]} maxBarSize={38} />
          </>}
          {showLines && <>
            <Line yAxisId="r" dataKey="freeRevenue" name="Free Revenue" stroke="#f97316" strokeWidth={2.5} strokeDasharray="6 3" dot={{ r:5, fill:'#f97316' }} />
            <Line yAxisId="r" dataKey="paidRevenue" name="Paid Revenue" stroke="#f59e0b" strokeWidth={2.5} strokeDasharray="6 3" dot={{ r:5, fill:'#f59e0b' }} />
          </>}
        </ComposedChart>
      </ResponsiveContainer>

      <p style={{ fontSize:11, color:'#718096', marginTop:8 }}>
        Filters: installs≥10K · revenue≥$10K · Android&gt;4.0 · size&gt;15MB · Content: Everyone · name≤30 chars
      </p>
    </div>
  );
}
