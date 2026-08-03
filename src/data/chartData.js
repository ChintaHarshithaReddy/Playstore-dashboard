// ─── Synthetic Google Play Store Analytics Data ───────────────────────────────

export const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ── CHART 1 ── Grouped Bar: Top 10 categories
// Filters: avgRating >= 4.0, size >= 10MB, lastUpdate = January
export const C1_DATA = [
  { category: 'Entertainment', avgRating: 4.3, reviews: 89200  },
  { category: 'Education',     avgRating: 4.2, reviews: 56800  },
  { category: 'Tools',         avgRating: 4.1, reviews: 72300  },
  { category: 'Health & Fit',  avgRating: 4.4, reviews: 43100  },
  { category: 'Finance',       avgRating: 4.0, reviews: 38700  },
  { category: 'Travel',        avgRating: 4.2, reviews: 29500  },
  { category: 'Weather',       avgRating: 4.3, reviews: 18200  },
  { category: 'Lifestyle',     avgRating: 4.1, reviews: 61400  },
  { category: 'Productivity',  avgRating: 4.2, reviews: 47900  },
  { category: 'Maps & Nav',    avgRating: 4.5, reviews: 34600  },
];

// ── CHART 2 ── Choropleth: Global installs by category
// Filters: top 5 categories NOT starting with A/C/G/S, installs > 1M
export const C2_CATS = [
  { name: 'Entertainment', color: '#f97316' },
  { name: 'Education',     color: '#3b82f6' },
  { name: 'Finance',       color: '#10b981' },
  { name: 'Weather',       color: '#f59e0b' },
  { name: 'Lifestyle',     color: '#ec4899' },
];
export const C2_REGIONS = [
  'North America','Europe','Asia Pacific','Latin America','Mid East & Africa','South Asia',
];
export const C2_VALUES = {
  Entertainment: [420,380,560,290,180,340],
  Education:     [310,290,480,210,150,290],
  Finance:       [280,260,390,180,120,220],
  Weather:       [190,170,220,130, 90,160],
  Lifestyle:     [240,210,310,170,110,190],
};
export const C2_TABLE = C2_REGIONS.map((region, ri) => {
  const row = { region };
  C2_CATS.forEach(c => { row[c.name] = C2_VALUES[c.name][ri]; });
  return row;
});

// ── CHART 3 ── Dual-axis: Free vs Paid top 3 categories
// Filters: installs>=10K, revenue>=$10K, Android>4.0, size>15MB, content=Everyone, name<=30chars
export const C3_DATA = [
  { category:'Entertainment', freeInstalls:2400000, paidInstalls:180000, freeRevenue:480000,  paidRevenue:1260000 },
  { category:'Education',     freeInstalls:1800000, paidInstalls:220000, freeRevenue:360000,  paidRevenue:1540000 },
  { category:'Tools',         freeInstalls:3100000, paidInstalls: 95000, freeRevenue:620000,  paidRevenue: 665000 },
];

// ── CHART 4 ── Time series: categories E, C, B
// Beauty→सौंदर्य(Hindi), Business→வணிகம்(Tamil), Dating→Termine(German)
// Filters: no X/Y/Z start, no "S" in name, reviews>500
export const C4_KEYS   = ['Entertainment','सौंदर्य','வணிகம்','Termine'];
export const C4_COLORS = ['#3b82f6','#f97316','#10b981','#ec4899'];
export const C4_LABELS = {
  'Entertainment': 'Entertainment (E)',
  'सौंदर्य':       'सौंदर्य — Beauty (Hindi)',
  'வணிகம்':        'வணிகம் — Business (Tamil)',
  'Termine':       'Termine — Dating (German)',
};
export const C4_DATA = MONTHS.map((month, i) => ({
  month,
  Entertainment: Math.round(800000 + i*45000 + Math.random()*30000),
  'सौंदर्य':     Math.round(120000 + i*12000 + Math.random()* 8000),
  'வணிகம்':      Math.round(290000 + i*28000 + Math.random()*15000),
  Termine:       Math.round( 95000 + i* 9000 + Math.random()* 6000),
}));

// ── CHART 5 ── Bubble chart: Size vs Rating, bubble=Installs
// Categories: Game, सौंदर्य, வணிகம், Comics, Communication, Termine, Entertainment, Social, Events
// Filters: rating>3.5, reviews>500, installs>50K, no "S" in name, subjectivity>0.5
export const C5_CATS = [
  { name:'Game',          color:'#FFB6C1', border:'#FF1493', highlight:true  },
  { name:'सौंदर्य',       color:'#f97316', border:'#ea580c', highlight:false },
  { name:'வணிகம்',        color:'#3b82f6', border:'#2563eb', highlight:false },
  { name:'Comics',        color:'#10b981', border:'#059669', highlight:false },
  { name:'Communication', color:'#f59e0b', border:'#d97706', highlight:false },
  { name:'Termine',       color:'#ec4899', border:'#db2777', highlight:false },
  { name:'Entertainment', color:'#8b5cf6', border:'#7c3aed', highlight:false },
  { name:'Social',        color:'#06b6d4', border:'#0891b2', highlight:false },
  { name:'Events',        color:'#ef4444', border:'#dc2626', highlight:false },
];
export const C5_DATA = C5_CATS.flatMap(cat =>
  Array.from({ length: 8 }, () => ({
    category: cat.name,
    size:     parseFloat((Math.random()*80 + 15).toFixed(1)),
    rating:   parseFloat((Math.random()*1.4 + 3.6).toFixed(2)),
    installs: Math.round(Math.random()*4000000 + 60000),
    color: cat.color, border: cat.border, highlight: cat.highlight,
  }))
);

// ── CHART 6 ── Stacked Area: T & P categories
// Travel & Local→Voyage & Local(French), Productivity→Productividad(Spanish), Photography→写真撮影(Japanese)
// Filters: rating>=4.2, no numbers in name, reviews>1000, size 20-80MB
export const C6_KEYS   = ['Voyage & Local','Productividad','写真撮影','Parenting'];
export const C6_COLORS = ['#3b82f6','#f97316','#10b981','#f59e0b'];
export const C6_TRANSLATIONS = {
  'Voyage & Local': 'Travel & Local → Voyage & Local (FR)',
  'Productividad':  'Productivity → Productividad (ES)',
  '写真撮影':        'Photography → 写真撮影 (JA)',
  'Parenting':      'Parenting',
};
export const C6_DATA = MONTHS.map((month, i) => ({
  month,
  'Voyage & Local': Math.round(280000 + i*22000 + Math.random()*12000),
  'Productividad':  Math.round(420000 + i*35000 + Math.random()*18000),
  '写真撮影':        Math.round(190000 + i*17000 + Math.random()* 9000),
  'Parenting':      Math.round( 95000 + i* 8000 + Math.random()* 4000),
}));
