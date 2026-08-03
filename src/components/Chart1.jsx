import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { C1_DATA } from '../data/chartData';
import { fmtNum } from '../utils/timeUtils';

const data = C1_DATA.map(d => ({
  ...d,
  ratingX10: Math.round(d.avgRating * 10),
  reviewsK:  Math.round(d.reviews / 1000),
}));

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background:'#1e2a3a', border:'1px solid #3b4a6b', borderRadius:10, padding:'10px 14px', fontSize:12 }}>
      <p style={{ fontWeight:700, color:'#90cdf4', marginBottom:6 }}>{label}</p>
      <p style={{ color:'#3b82f6' }}>Avg Rating: <b>{(payload[0]?.value/10).toFixed(1)}</b></p>
      <p style={{ color:'#f97316' }}>Reviews: <b>{payload[1]?.value}K</b></p>
    </div>
  );
};

export default function Chart1() {
  return (
    <div>
      <div style={{ display:'flex', gap:16, flexWrap:'wrap', marginBottom:14, fontSize:12 }}>
        {[['#3b82f6','Avg Rating (×10)'],['#f97316','Reviews (K)']].map(([c,n]) => (
          <span key={n} style={{ display:'flex', alignItems:'center', gap:6, color:c }}>
            <span style={{ width:12,height:12,background:c,borderRadius:3,display:'inline-block' }}/>{n}
          </span>
        ))}
        <span style={{ marginLeft:'auto', fontSize:11, color:'#718096', background:'#12122077', padding:'3px 10px', borderRadius:8 }}>
          Filters: rating≥4.0 · size≥10MB · updated Jan
        </span>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top:8, right:10, bottom:65, left:0 }} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
          <XAxis dataKey="category" tick={{ fontSize:10, fill:'#718096' }} angle={-38} textAnchor="end" interval={0} />
          <YAxis tick={{ fontSize:10, fill:'#718096' }} />
          <Tooltip content={<Tip />} />
          <Bar dataKey="ratingX10" name="Avg Rating ×10" fill="#3b82f6" radius={[6,6,0,0]} maxBarSize={28} />
          <Bar dataKey="reviewsK"  name="Reviews K"      fill="#f97316" radius={[6,6,0,0]} maxBarSize={28} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
