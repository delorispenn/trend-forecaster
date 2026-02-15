# Josie's Journal Trend Forecaster 

AI-powered trend intelligence for teen girl content planning. Analyzes Google Trends, social media signals, and e-commerce data to identify fashion styles and trending products 3+ months in advance.

![Mom Dashboard Aesthetic](https://img.shields.io/badge/Style-Mom%20Dashboard-C67C4E?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Claude AI](https://img.shields.io/badge/Claude%20AI-Powered-7B68EE?style=for-the-badge)

---

##  Features

###  Seasonal Forecasting
- **3+ month advance predictions** for Summer, Fall, Winter, Spring
- Separate fashion styles and product trends
- Momentum indicators (rising, peak, emerging, steady)

###  AI-Powered Analysis
- **Claude API integration** for intelligent trend synthesis
- Analyzes Google Trends data automatically
- Optional Pinterest Trends API support
- Generates ready-to-use content ideas

###  Actionable Insights
- **Specific products** with brands, prices, availability
- **Fashion breakdowns** with key pieces, color palettes, price points
- Content opportunity scores (0-100)
- "Why create now" timing guidance
- CSV export for content calendars

###  Beautiful Interface
- Matches Mom Dashboard aesthetic (terracotta & cream palette)
- Playfair Display + Montserrat typography
- Fully responsive design
- One-week caching for faster loads

---

##  Quick Start

### 1. Clone or Download
```bash
# If using Git
git clone <your-repo-url>
cd josies-journal-trend-forecaster

# Or just download and extract the ZIP
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```

Opens at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

Outputs to `dist/` folder ready for deployment.

---

##  What's Included

```
josies-journal-trend-forecaster/
├── src/
│   ├── teen-trend-forecaster.jsx   # Main React component
│   ├── trend-intelligence.js       # API integration & data collection
│   ├── main.jsx                    # App entry point
│   └── index.css                   # Tailwind styles
├── index.html                      # HTML template
├── package.json                    # Dependencies
├── vite.config.js                  # Build config
├── tailwind.config.js              # Design system
├── deploy.sh                       # One-click deploy script
├── SETUP_GUIDE.md                  # Detailed setup instructions
└── README.md                       # This file
```

---

##  Configuration

### Enable Claude API (Production Mode)

In `src/teen-trend-forecaster.jsx`, find the `analyzeTrends()` function:

**Current (Demo Mode):**
```javascript
// DEMO MODE: Using sample data
setTimeout(() => {
  const seasonData = sampleTrends[selectedSeason];
  // ...
}, 2000);
```

**Change to (Production Mode):**
```javascript
// PRODUCTION MODE: Real API calls
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 4000,
    messages: [{
      role: 'user',
      content: generateTrendAnalysisPrompt(selectedSeason, selectedCategory)
    }]
  })
});
```

**Note:** API key is handled automatically in Claude.ai artifacts. For standalone deployment, add your Anthropic API key.

### Add Custom Keywords

Edit `src/trend-intelligence.js`:

```javascript
keywords: {
  fashion: [
    'teen fashion trends',
    'tiktok fashion',
    // Add your keywords here
    'cottage core',
    'dark academia',
    'y2k revival'
  ],
  products: [
    'teen beauty products',
    // Add your keywords here
    'viral tiktok products',
    'sephora haul teen'
  ]
}
```

### Enable Pinterest API (Optional)

1. Get API key from https://developers.pinterest.com/
2. In `src/trend-intelligence.js`:

```javascript
pinterest: {
  enabled: true,
  apiKey: 'YOUR_PINTEREST_API_KEY',
  categories: ['fashion', 'beauty', 'lifestyle']
}
```

---

##  Deployment

### Option 1: Netlify (Recommended - Matches Mom Dashboard)

**Method A: Drag & Drop**
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist/` folder
4. Done! 

**Method B: CLI**
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod
```

**Method C: Git Integration**
1. Push to GitHub
2. Connect repo in Netlify
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 2: Vercel
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Option 3: Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
npm run build
firebase deploy
```

Or use the quick deploy script:
```bash
./deploy.sh
```

---

##  Weekly Workflow

1. **Monday morning:** Open dashboard
2. **Click "Analyze Trends"** (or auto-refreshes if cache is >7 days old)
3. **Review 5-7 trends** for the selected season
4. **Export to CSV** for your content calendar
5. **Plan 2-3 content pieces** per high-scoring trend

**Time investment:** 15 minutes/week

---

##  Use Cases

### Content Planning
- Plan blog posts 3 months ahead
- Identify Pinterest content opportunities
- Schedule YouTube videos around emerging trends

### Product Research
- Find trending products before saturation
- Identify affiliate link opportunities
- Discover new brands to feature

### Audience Intelligence
- Understand what teens are searching for
- Stay ahead of micro-trends
- Validate content ideas with data

---

##  How It Works

### 1. Data Collection
- **Google Trends:** Search volume, growth rate, related queries
- **Pinterest Trends (optional):** Saves, searches, category data
- **Social signals:** TikTok hashtag growth, Instagram trends

### 2. AI Analysis (Claude API)
- Synthesizes raw data into coherent trends
- Filters for teen audience relevance
- Predicts seasonal timing
- Generates actionable content ideas

### 3. Output
- Interactive dashboard with trend cards
- Confidence scores and momentum indicators
- Specific products and fashion pieces
- Ready-to-use content titles
- Exportable reports

---

##  Tips for Best Results

### Trend Selection
Focus on trends with:
- **High confidence scores** (80+)
- **Rising momentum** for early advantage
- **Content opportunity 85+** for best ROI
- **Specific products** you can link to

### Content Strategy
- Create content **NOW** for trends 3 months out
- Use "Suggested Content" titles as starting points
- Reference "Josie's Insight" for unique angles
- Track performance to refine keyword selection

### Keyword Management
- Start with provided keywords
- Add 2-3 new keywords weekly based on findings
- Remove declining keywords to reduce noise
- Use specific brand names when relevant

---

##  Technical Details

**Frontend:**
- React 18
- Tailwind CSS
- Lucide React Icons
- Vite (build tool)

**APIs:**
- Claude Sonnet 4 (trend analysis)
- Google Trends API (search data)
- Pinterest Trends (optional)

**Performance:**
- Results cached 7 days
- ~30-45 second analysis time
- Lazy loading for faster initial render

---

##  Portfolio Value

This project demonstrates:
-  AI API integration (Claude, Google Trends)
-  React component architecture
-  Data visualization & UX design
-  Real-world content strategy application
-  Thoughtful caching & performance optimization

Perfect for applications to content strategy or AI product roles at smaller SaaS companies.

---

##  Support

**Questions?** See `SETUP_GUIDE.md` for:
- Detailed setup instructions
- Troubleshooting guide
- Advanced customization
- Cost estimates

**Issues?**
- Check browser console for errors
- Clear cache: `localStorage.removeItem('josies-trends')`
- Verify API configuration

---

##  License

MIT License - Free to use, modify, and deploy for Josie's Journal.

---

##  Credits

**Design:** Matches Mom Dashboard aesthetic by Deloris
**AI Analysis:** Claude by Anthropic
**Trend Data:** Google Trends API
**Built with:** React, Tailwind CSS, Vite

---

**Ready to forecast the future?** 🚀

Start with: `npm run dev`
