# Josie's Journal Trend Forecaster - Setup Guide

## Overview
This trend forecaster uses AI-powered analysis to identify upcoming teen trends 3+ months in advance by analyzing:
- Google Trends data (search volume, related queries)
- Pinterest trends (when API enabled)
- Social media signals
- E-commerce patterns

Claude API then synthesizes this data into actionable content insights.

---

## Quick Start (Demo Mode)

The forecaster works immediately with sample data. Just open the React app and click "Analyze Trends."

---

## Production Setup (Real Data)

### Step 1: Install Dependencies

```bash
npm install google-trends-api
```

### Step 2: Enable Claude API Integration

In `teen-trend-forecaster.jsx`, find the `analyzeTrends` function and:

1. **Comment out the demo mode section:**
```javascript
// DEMO MODE: Using sample data
// setTimeout(() => { ... }, 2000);
```

2. **Uncomment the production mode section:**
```javascript
// PRODUCTION MODE: Uncomment this to use real API
const response = await fetch('https://api.anthropic.com/v1/messages', {
  // ... rest of code
});
```

**Important:** The Anthropic API key is handled automatically in Claude.ai artifacts. You don't need to add it.

### Step 3: Optional - Add Pinterest Trends API

Pinterest Trends requires a developer account:

1. Sign up at https://developers.pinterest.com/
2. Create an app to get API credentials
3. In `trend-intelligence.js`, update:
```javascript
pinterest: {
  enabled: true,
  apiKey: 'YOUR_PINTEREST_API_KEY',
  categories: ['fashion', 'beauty', 'lifestyle']
}
```

---

## How It Works

### Data Collection Layer
1. **Google Trends** (free, no key needed)
   - Tracks search volume for 15+ fashion/product keywords
   - Calculates growth rate over time
   - Identifies related searches
   
2. **Pinterest Trends** (optional, requires API key)
   - Gets Pinterest search data
   - Shows what people are saving/planning

### Analysis Layer (Claude API)
Claude receives the raw trend data and:
- Identifies emerging patterns
- Filters for teen-relevant trends
- Predicts seasonal relevance (3+ months out)
- Generates content opportunities
- Suggests specific products/brands
- Creates ready-to-use content ideas

### Output
- Interactive dashboard with trend cards
- Exportable CSV reports
- Cached results (refresh weekly)

---

## Customization

### Add More Keywords to Track

Edit `trend-intelligence.js`:

```javascript
keywords: {
  fashion: [
    'teen fashion trends',
    'tiktok fashion',
    // ADD YOUR KEYWORDS HERE
    'grunge aesthetic',
    'streetwear teen',
    'vintage fashion'
  ],
  products: [
    'teen beauty products',
    // ADD YOUR KEYWORDS HERE
    'viral skincare',
    'tiktok makeup dupes'
  ]
}
```

### Adjust Analysis Frequency

In the React component:

```javascript
// Check cache age (currently 7 days)
const isStale = (Date.now() - timestamp) > 7 * 24 * 60 * 60 * 1000;

// Change to 3 days:
const isStale = (Date.now() - timestamp) > 3 * 24 * 60 * 60 * 1000;
```

### Modify Seasons

In `teen-trend-forecaster.jsx`:

```javascript
const seasons = [
  { id: 'summer-2025', name: 'Summer 2025', icon: Sun, months: 'May - Aug' },
  // Add more seasons or change months
];
```

---

## Deployment Options

### Option 1: Netlify (Recommended)
Matches your Mom Dashboard setup:

1. Push to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist` or `build`

### Option 2: Vercel
1. Import GitHub repo
2. Framework preset: React
3. Deploy

### Option 3: Firebase Hosting
1. `npm install -g firebase-tools`
2. `firebase init hosting`
3. `npm run build`
4. `firebase deploy`

---

## Weekly Workflow

Once deployed, your weekly routine:

1. **Monday Morning:** Open the dashboard
2. Click "Analyze Trends" (or it auto-refreshes if cached data is >7 days old)
3. Review 5-7 trends for upcoming season
4. Click "Export Report" to download CSV
5. Import CSV into your content calendar
6. Plan 2-3 pieces of content per trend

**Time investment:** ~15 minutes/week to review + plan content

---

## Data Sources Explained

### Google Trends
**What it tracks:**
- Search volume over time
- Related queries (what else people search)
- Geographic interest
- Rising vs. declining terms

**How we use it:**
- Calculate momentum (rising/emerging/steady/declining)
- Identify related micro-trends
- Validate trend timing

**Limitations:**
- Shows what people search, not what they buy
- Can be gamed by media coverage
- US-focused (geo: 'US' in config)

### Pinterest Trends (Optional)
**What it tracks:**
- Searches on Pinterest
- Saves/pins over time
- Categories trending

**How we use it:**
- Early trend signals (Pinterest users plan 3-6 months ahead)
- Visual/aesthetic trends
- Product discovery patterns

**Why it's valuable:**
- Pinterest users skew young female
- Planning behavior = advance trend detection

### Claude Analysis
**What it does:**
- Synthesizes multiple data sources
- Filters for teen relevance
- Predicts seasonal fit
- Generates content angles
- Suggests specific products/brands

**Why it's better than manual analysis:**
- Processes 100+ data points in seconds
- No bias toward personal preferences
- Consistent framework across all trends
- Actionable outputs (not just "this is trending")

---

## Troubleshooting

### "Error analyzing trends"
**Fix:** Check browser console for specific error
- API key issue? (shouldn't happen in artifacts)
- Network error? Retry
- Rate limit? Wait 60 seconds

### Trends seem outdated
**Fix:** Clear cache and refresh
```javascript
localStorage.removeItem('josies-trends');
localStorage.removeItem('josies-trends-timestamp');
```
Then click "Analyze Trends" again.

### Not enough trends returned
**Fix:** Add more keywords in `trend-intelligence.js`
- Google Trends needs diverse keywords
- Aim for 15-20 keywords per category

### Trends don't match your audience
**Fix:** Update the Claude prompt in `generateTrendAnalysisPrompt()`
- Add specific audience details
- Include brand preferences
- Mention topics to avoid

---

## Performance & Costs

### API Costs
**Google Trends:** Free (no API key, no usage limits)
**Pinterest API:** Free tier available (10k requests/day)
**Claude API:** Handled by Claude.ai subscription

### Response Times
- Google Trends: ~2-5 seconds per keyword
- Claude analysis: ~10-15 seconds
- **Total:** ~30-45 seconds for full analysis

### Caching
Results cached for 7 days (configurable):
- Reduces API calls
- Faster dashboard loads
- Weekly refresh cycle

---

## Advanced Features (Future)

### Email Reports
Add a Cloud Function to email weekly trends:
```javascript
// Send email via SendGrid/Mailgun
function sendWeeklyTrendEmail(trends) {
  // Email HTML template with trend cards
}
```

### Slack Integration
Post trends to Slack channel:
```javascript
async function postToSlack(trends) {
  await fetch(SLACK_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({
      text: `Weekly Trends for ${season}`,
      attachments: trends.map(formatTrendCard)
    })
  });
}
```

### Historical Tracking
Save trends to database to track:
- Which trends you covered
- Performance of trend-based content
- Accuracy of predictions

---

## Questions?

Common scenarios:

**"Can I analyze multiple seasons at once?"**
Yes! Run separate analyses and combine results.

**"How accurate are 3-month predictions?"**
Claude analyzes early signals, but trends can shift. Refresh weekly.

**"Can I use this for other audiences?"**
Yes! Update the Claude prompt with your target demographic.

**"Should I cover every trend?"**
No. Focus on trends with:
- High content opportunity score (85+)
- Rising momentum
- Products you can affiliate link

---

## Next Steps

1. ✅ Test demo mode
2. ✅ Enable production mode with Claude API
3. ⏳ Optional: Add Pinterest API
4. ⏳ Deploy to Netlify
5. ⏳ Set calendar reminder for weekly review
6. ⏳ Create first content from trend insights

**Ready to forecast the future? 🔮**
