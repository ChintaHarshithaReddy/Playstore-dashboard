# 📊 Play Store Analytics Dashboard

An interactive, time-gated analytics dashboard built with **React + Recharts**,
visualising Google Play Store data across **6 charts** — each visible only during
its scheduled IST time window.

---

## 🗂️ Project Structure

```
playstore-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TimeGate.jsx      # Time-window visibility wrapper
│   │   ├── ChartCard.jsx     # Reusable card shell
│   │   ├── Chart1.jsx        # Grouped Bar  (3–5 PM IST)
│   │   ├── Chart2.jsx        # Choropleth   (6–8 PM IST)
│   │   ├── Chart3.jsx        # Dual Axis    (1–2 PM IST)
│   │   ├── Chart4.jsx        # Time Series  (6–9 PM IST)
│   │   ├── Chart5.jsx        # Bubble Chart (5–7 PM IST)
│   │   └── Chart6.jsx        # Stacked Area (4–6 PM IST)
│   ├── data/
│   │   └── chartData.js      # All synthetic Play Store data
│   ├── utils/
│   │   └── timeUtils.js      # IST time helpers
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

---

## 📈 Chart Details

| # | Type | IST Window | Key Features |
|---|------|-----------|--------------|
| 1 | Grouped Bar | 3 PM – 5 PM | Rating vs Reviews for top 10 categories; filters: rating≥4.0, size≥10MB, Jan update |
| 2 | Choropleth Bar | 6 PM – 8 PM | Global installs; top 5 cats not starting A/C/G/S; >1M highlighted |
| 3 | Dual-Axis | 1 PM – 2 PM | Free vs Paid installs + revenue; Android>4.0, size>15MB |
| 4 | Time Series | 6 PM – 9 PM | Monthly installs; >20% MoM shaded; Beauty→Hindi, Business→Tamil, Dating→German |
| 5 | Bubble Chart | 5 PM – 7 PM | Size vs Rating; bubble=installs; Game category in pink |
| 6 | Stacked Area | 4 PM – 6 PM | Cumulative installs; Travel→French, Productivity→Spanish, Photography→Japanese |

---

## 🚀 Local Setup

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/playstore-dashboard.git
cd playstore-dashboard

# 2. Install dependencies
npm install

# 3. Start development server
npm start
# Opens http://localhost:3000
```

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

### Step 1 — Update `package.json`
Replace `"homepage": "."` with your actual GitHub Pages URL:
```json
"homepage": "https://YOUR_USERNAME.github.io/playstore-dashboard"
```

### Step 2 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — Play Store Dashboard"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/playstore-dashboard.git
git push -u origin main
```

### Step 3 — Deploy
```bash
npm run deploy
```
This builds the app and pushes it to the `gh-pages` branch automatically.

### Step 4 — Enable GitHub Pages
1. Go to your repo on GitHub
2. **Settings → Pages**
3. Source: **Deploy from a branch** → branch: `gh-pages` → folder: `/ (root)`
4. Click **Save**

Your live site will be at:
`https://YOUR_USERNAME.github.io/playstore-dashboard`

---

## 🔧 Tech Stack
- **React 18** — UI framework
- **Recharts** — chart library
- **gh-pages** — GitHub Pages deployment
- **Google Fonts (Inter)** — typography

---

## ⏰ Time Gate Logic
All times are **IST (Indian Standard Time, UTC+5:30)**.
Outside a chart's window, a 🔒 locked placeholder is shown.
The dashboard re-checks every **15 seconds** automatically.
