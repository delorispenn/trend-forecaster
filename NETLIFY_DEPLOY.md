# Deploying Josie's Journal Trend Forecaster to Netlify

## Quick Overview
You have 3 deployment options:
1. **Drag & Drop** (Easiest - 2 minutes)
2. **GitHub Integration** (Best for updates)
3. **Netlify CLI** (Most control)

I'll walk through all three. Start with #1 for fastest results.

---

## Option 1: Drag & Drop Deploy (Recommended First Time)

### Step 1: Build the Project Locally

Open your terminal and navigate to the project folder:

```bash
cd trend-forecaster
npm install
npm run build
```

This creates a `dist` folder with all the production files.

**Expected output:**
```
✓ building for production...
✓ 150 modules transformed.
dist/index.html                   0.45 kB
dist/assets/index-a1b2c3d4.css   12.34 kB
dist/assets/index-a1b2c3d4.js    245.67 kB
✓ built in 3.21s
```

### Step 2: Deploy to Netlify

1. Go to https://app.netlify.com/drop
2. **Drag the entire `dist` folder** onto the page
3. Wait 10-30 seconds for upload
4. You'll get a live URL like `https://random-name-123456.netlify.app`

**That's it!** Your trend forecaster is live.

### Step 3: Customize Your URL (Optional)

1. In Netlify, click **Site settings**
2. Click **Change site name**
3. Enter something like: `josies-journal-trends`
4. New URL: `https://josies-journal-trends.netlify.app`

---

## Option 2: GitHub Integration (Best for Ongoing Updates)

This is better if you plan to update the app regularly.

### Step 1: Push to GitHub

If you haven't already:

```bash
cd trend-forecaster
git init
git add .
git commit -m "Initial commit - Trend Forecaster"
```

Create a new repo on GitHub, then:

```bash
git remote add origin https://github.com/YOUR-USERNAME/trend-forecaster.git
git branch -M main
git push -u origin main
```

### Step 2: Connect to Netlify

1. Go to https://app.netlify.com
2. Click **Add new site** → **Import an existing project**
3. Choose **GitHub**
4. Authorize Netlify to access your repos
5. Select your `trend-forecaster` repository

### Step 3: Configure Build Settings

Netlify should auto-detect these, but verify:

**Build settings:**
- Build command: `npm run build`
- Publish directory: `dist`
- Node version: 18 or higher

Click **Deploy site**

### Step 4: Automatic Deploys

Now whenever you push to GitHub:
```bash
git add .
git commit -m "Updated keywords"
git push
```

Netlify automatically rebuilds and deploys. You'll see the deploy progress in the Netlify dashboard.

---

## Option 3: Netlify CLI (For Power Users)

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

This opens your browser to authorize the CLI.

### Step 3: Initialize and Deploy

```bash
cd trend-forecaster
netlify init
```

Follow the prompts:
- **Create & configure a new site**
- Choose your team
- Site name: `josies-journal-trends` (or whatever you want)
- Build command: `npm run build`
- Publish directory: `dist`

### Step 4: Deploy

```bash
npm run build
netlify deploy --prod
```

---

## Environment Variables (For Production Claude API)

If you're using the Claude API in production mode (not in artifacts), you need to add your API key securely.

### In Netlify Dashboard:

1. Go to **Site settings** → **Environment variables**
2. Click **Add a variable**
3. Key: `VITE_ANTHROPIC_API_KEY`
4. Value: Your Anthropic API key
5. Click **Save**

### In Your Code:

Update `src/teen-trend-forecaster.jsx`:

```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'anthropic-version': '2023-06-01',
    'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY  // Add this line
  },
  // ... rest of code
});
```

**Note:** Environment variables starting with `VITE_` are accessible in your React app.

---

## Post-Deployment Checklist

After deploying, test these:

### ✅ Basic Functionality
- [ ] Page loads without errors
- [ ] Season selection works
- [ ] Category filters work
- [ ] "Analyze Trends" button works (in demo mode)
- [ ] Export CSV downloads properly

### ✅ Design/Responsive
- [ ] Fonts load correctly (Playfair Display + Montserrat)
- [ ] Colors match Mom Dashboard aesthetic
- [ ] Mobile responsive (test on phone)
- [ ] Trend cards display properly

### ✅ Performance
- [ ] Initial load under 3 seconds
- [ ] Images/icons load
- [ ] No console errors (press F12)

---

## Troubleshooting Common Issues

### Issue: "Command not found: npm"
**Fix:** Install Node.js from https://nodejs.org (version 18+)

### Issue: Build fails with "Cannot find module"
**Fix:** 
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: Fonts not loading on Netlify
**Fix:** They're loaded from Google Fonts CDN, should work automatically. Check your browser's network tab.

### Issue: "Page not found" after deploy
**Fix:** Check the publish directory is set to `dist` in Netlify settings.

### Issue: Claude API not working in production
**Fix:** 
1. Make sure you uncommented the production code
2. Add your API key as environment variable
3. Redeploy after adding env variable

### Issue: Blank page on Netlify
**Fix:** Check browser console (F12). Usually means:
- Build error (check Netlify deploy logs)
- Missing environment variable
- Path issue (make sure paths start with `/` or `./`)

---

## Updating Your Deployed Site

### If you used Drag & Drop:
1. Make changes locally
2. Run `npm run build`
3. Go to Netlify dashboard → **Deploys** tab
4. Drag the new `dist` folder to the deploy area

### If you used GitHub:
1. Make changes locally
2. Commit and push:
```bash
git add .
git commit -m "Updated trend keywords"
git push
```
3. Netlify auto-deploys in ~2 minutes

### If you used CLI:
```bash
npm run build
netlify deploy --prod
```

---

## Custom Domain (Optional)

Want to use your own domain like `trends.josiesjournal.com`?

### In Netlify:
1. Go to **Domain settings**
2. Click **Add custom domain**
3. Enter your domain
4. Follow DNS configuration instructions

### In Your Domain Registrar:
Add a CNAME record:
- Name: `trends` (or `@` for root domain)
- Value: `josies-journal-trends.netlify.app`

**Wait 24-48 hours for DNS propagation.**

---

## Performance Optimization

### Enable Netlify Features:

1. **Asset Optimization**
   - Go to **Build & deploy** → **Post processing**
   - Enable: Bundle CSS, Minify CSS, Minify JS
   - Enable: Image optimization

2. **HTTPS**
   - Automatically enabled
   - Force HTTPS redirect in domain settings

3. **Caching**
   - Already configured in Vite build
   - Netlify caches static assets automatically

---

## Cost

**Netlify Free Tier includes:**
- 100 GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS
- Continuous deployment

Your trend forecaster easily fits within free tier limits.

**Bandwidth estimate:**
- ~2 MB per page load
- 50,000 pageviews = 100 GB
- You're well within limits

---

## Monitoring

### Netlify Analytics (Optional Paid Feature)
- Real-time visitor stats
- Top pages
- Traffic sources

### Free Alternative: Google Analytics
Add to `index.html`:

```html
<head>
  <!-- ... other tags ... -->
  
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

---

## Quick Reference Commands

### Build
```bash
npm run build
```

### Local Development
```bash
npm run dev
```

### Deploy (CLI)
```bash
netlify deploy --prod
```

### Check Build Locally
```bash
npm run build
npm run preview
```

### Clear Cache and Rebuild
```bash
rm -rf node_modules dist .cache
npm install
npm run build
```

---

## Support Resources

- **Netlify Docs:** https://docs.netlify.com
- **Netlify Support:** https://answers.netlify.com
- **Vite Docs:** https://vitejs.dev
- **Your Setup Guide:** See `SETUP_GUIDE.md` in project

---

## Next Steps After Deployment

1. ✅ Test all features on live site
2. ✅ Bookmark your Netlify dashboard
3. ✅ Set up weekly reminder to analyze trends
4. ✅ Create first content from insights
5. ✅ Share the URL in your portfolio/resume

**Your trend forecaster is now live and ready to use!** 🎉

---

## Pro Tips

### Faster Deploys
- Use `netlify deploy --prod` instead of drag & drop
- GitHub integration is fastest for regular updates

### Preview Deploys
- Each Git branch gets a preview URL
- Test changes before merging to main

### Rollbacks
- In Netlify dashboard, click any previous deploy
- Click "Publish deploy" to rollback instantly

### Build Notifications
- Netlify can notify you via:
  - Email
  - Slack
  - Webhook
- Set up in **Site settings** → **Notifications**

---

**Ready to deploy?** Start with Option 1 (Drag & Drop) - you'll be live in 2 minutes! 🚀
