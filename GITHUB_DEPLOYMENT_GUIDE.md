# Complete Beginner's Guide: Deploy Trend Forecaster with GitHub & Netlify

This guide assumes you've NEVER used GitHub before. I'll walk through every single step.

---

## Part 1: Install Git (One-Time Setup)

### Step 1: Download Git

1. Go to https://git-scm.com/downloads
2. Click the big button for **Windows** (or your operating system)
3. The download starts automatically
4. Open the downloaded file (`Git-2.XX.X-64-bit.exe`)

### Step 2: Install Git

Click through the installer:
1. Click **"Next"** on the welcome screen
2. Leave default install location → Click **"Next"**
3. Leave all checkboxes as they are → Click **"Next"**
4. Default editor: Leave as "Vim" → Click **"Next"**
5. Keep clicking **"Next"** through all screens (defaults are fine)
6. Click **"Install"**
7. Click **"Finish"**

### Step 3: Verify Git is Installed

1. Press `Windows Key`
2. Type `cmd`
3. Press Enter (Command Prompt opens)
4. Type: `git --version`
5. Press Enter
6. You should see something like: `git version 2.43.0`

✅ **Git is now installed!**

---

## Part 2: Create GitHub Account

### Step 1: Sign Up for GitHub

1. Go to https://github.com
2. Click **"Sign up"** (top right)
3. Enter your email address → Click **"Continue"**
4. Create a password → Click **"Continue"**
5. Choose a username (e.g., `deloris-fm` or `josies-journal`) → Click **"Continue"**
6. Email preferences: Choose "n" for no → Click **"Continue"**
7. Verify you're human (solve the puzzle)
8. Click **"Create account"**
9. Check your email for verification code
10. Enter the 6-digit code
11. Click **"Continue"**

### Step 2: Skip the Questionnaire

GitHub will ask some questions:
- Click **"Skip personalization"** at the bottom

You'll see your GitHub dashboard - you're in! ✅

---

## Part 3: Upload Your Project to GitHub

### Step 1: Create a New Repository on GitHub

1. On GitHub, click the **green "New"** button (top left)
   - Or go to: https://github.com/new
2. Fill in the form:
   - **Repository name:** `trend-forecaster` (must be lowercase, no spaces)
   - **Description:** `AI-powered trend forecaster for Josie's Journal`
   - **Public or Private:** Choose **Public** (so it's free)
   - **DO NOT** check any boxes (no README, no .gitignore, no license)
3. Click **"Create repository"**

You'll see a page with instructions - **don't worry about those yet!**

### Step 2: Prepare Your Project Folder

1. Make sure you've **extracted** `trend-forecaster-with-functions.zip` to your Desktop
2. You should have a folder called `trend-forecaster` on your Desktop
3. Inside should be folders like: `src`, `netlify`, and files like `package.json`

### Step 3: Open Command Prompt in Your Project

**Method 1 (Easiest):**
1. Open File Explorer
2. Navigate to `Desktop/trend-forecaster`
3. Click in the **address bar** at the top (where it shows the path)
4. Type: `cmd`
5. Press Enter
6. Command Prompt opens in that folder! ✅

**Method 2:**
1. Press `Windows Key`
2. Type `cmd`
3. Press Enter
4. Type: `cd Desktop\trend-forecaster`
5. Press Enter

**How to know you're in the right place:**
The command prompt should show something like:
```
C:\Users\YourName\Desktop\trend-forecaster>
```

### Step 4: Configure Git (One-Time Setup)

Type these commands **one at a time**, pressing Enter after each:

```bash
git config --global user.name "Your Name"
```
(Replace "Your Name" with your actual name, keep the quotes)

```bash
git config --global user.email "your-email@example.com"
```
(Replace with the email you used for GitHub, keep the quotes)

Example:
```bash
git config --global user.name "Deloris"
git config --global user.email "deloris@example.com"
```

### Step 5: Initialize Git in Your Project

Still in Command Prompt, type each command and press Enter:

```bash
git init
```

You should see: `Initialized empty Git repository`

```bash
git add .
```

(That's "git add" then a period/dot. The dot means "add everything")

No message? That's normal! It worked. ✅

```bash
git commit -m "Initial commit - trend forecaster"
```

You should see a bunch of lines about files being created.

### Step 6: Connect to GitHub

Now we tell Git where to upload the files.

**Go back to GitHub in your browser:**
1. You should still have the repository page open
2. If not, go to: `https://github.com/YOUR-USERNAME/trend-forecaster`
3. Look for a section that says **"Quick setup"**
4. You'll see a URL like: `https://github.com/YOUR-USERNAME/trend-forecaster.git`
5. Click the **copy button** next to it

**Back in Command Prompt:**

Type this command (replace the URL with YOUR URL that you just copied):

```bash
git remote add origin https://github.com/YOUR-USERNAME/trend-forecaster.git
```

Press Enter. No message? Good! ✅

### Step 7: Upload Your Files to GitHub

Type:

```bash
git branch -M main
```

Press Enter.

Then type:

```bash
git push -u origin main
```

Press Enter.

**If you see a login window:**
1. Enter your GitHub username
2. Enter your GitHub password
3. Click "Sign in"

**You might see:**
```
Username for 'https://github.com':
```

Type your GitHub username, press Enter

```
Password for 'https://YOUR-USERNAME@github.com':
```

**IMPORTANT:** You can't use your regular password anymore. You need a **Personal Access Token**.

#### Creating a Personal Access Token:

1. **Open a new browser tab**
2. Go to: https://github.com/settings/tokens
3. Click **"Generate new token"** → **"Generate new token (classic)"**
4. Give it a name: `Netlify Deployment`
5. Expiration: Choose **"No expiration"**
6. Check the box next to **"repo"** (this checks all repo boxes automatically)
7. Scroll down, click **"Generate token"**
8. You'll see a long code starting with `ghp_...`
9. **COPY THIS CODE** - you won't see it again!
10. **Paste it** into Command Prompt when it asks for password
   - Note: When you paste, you won't see anything appear - this is normal!
11. Press Enter

**Uploading...**
You'll see progress messages like:
```
Enumerating objects: 15, done.
Counting objects: 100%
Writing objects: 100%
```

When it's done, you'll see:
```
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ **Your code is now on GitHub!**

### Step 8: Verify Upload

1. Go back to your browser
2. Refresh the GitHub page
3. You should see all your files! (src, netlify, package.json, etc.)

🎉 **Success! Your project is on GitHub!**

---

## Part 4: Connect GitHub to Netlify

### Step 1: Go to Netlify

1. Open a new tab: https://app.netlify.com
2. **If you're not logged in:** Log in with the account you used before

### Step 2: Import from Git

1. Click **"Add new site"** (top right)
2. Click **"Import an existing project"**
3. Click **"Deploy with GitHub"**

### Step 3: Authorize Netlify

**First time only:**
1. A window opens asking to authorize Netlify
2. Click **"Authorize Netlify"**
3. You might need to enter your GitHub password
4. Click **"Authorize"**

### Step 4: Select Your Repository

1. You'll see a list of your repositories
2. Find **"trend-forecaster"** and click on it

**Don't see it?**
- Click **"Configure the Netlify app on GitHub"** at the bottom
- Find **"Repository access"**
- Select **"All repositories"** OR select **"trend-forecaster"** specifically
- Click **"Save"**
- Go back to Netlify, refresh, and try again

### Step 5: Configure Build Settings

Netlify should auto-detect these, but verify:

- **Branch to deploy:** `main` ✅
- **Build command:** `npm run build` ✅
- **Publish directory:** `dist` ✅
- **Functions directory:** `netlify/functions` ✅

### Step 6: Add Your API Key

**BEFORE you click "Deploy site":**

1. Click **"Show advanced"**
2. Click **"New variable"**
3. **Key:** `VITE_ANTHROPIC_API_KEY`
4. **Value:** Paste your Anthropic API key (the one starting with `sk-ant-...`)
5. The one from Image 3 in your earlier screenshot

### Step 7: Deploy!

1. Click **"Deploy site"**
2. You'll see the deploy progress
3. Wait 2-3 minutes while it builds

**You'll see:**
```
Building...
Deploying...
Site is live!
```

### Step 8: Get Your URL

1. Netlify gives you a URL like: `https://random-name-12345.netlify.app`
2. Click on it!

---

## Part 5: Test Your Live Site

1. Visit your Netlify URL
2. Select **"Summer 2026"**
3. Click **"Analyze Summer 2026"**
4. Wait 30-60 seconds
5. **Real AI trend analysis appears!** 🎉

---

## Part 6: Customize Your URL (Optional)

1. In Netlify dashboard, click **"Site settings"**
2. Under **"Site information"**, click **"Change site name"**
3. Type: `josies-journal-trends` (or whatever you want)
4. Click **"Save"**
5. Your new URL: `https://josies-journal-trends.netlify.app`

---

## Future Updates

When you want to update your site:

1. Make changes to files on your computer
2. Open Command Prompt in the `trend-forecaster` folder
3. Type these commands:
   ```bash
   git add .
   git commit -m "Updated colors" (or describe your changes)
   git push
   ```
4. Netlify automatically detects the update and redeploys!
5. Wait 2-3 minutes, refresh your site

---

## Troubleshooting

### "git is not recognized"
→ Git isn't installed. Go back to Part 1.

### "fatal: not a git repository"
→ You're not in the right folder. Use `cd Desktop\trend-forecaster`

### "Permission denied (publickey)"
→ Use HTTPS, not SSH. The URL should start with `https://` not `git@`

### "Build failed" in Netlify
→ Check the deploy logs. Usually means `npm install` failed. 
→ Make sure `package.json` is in your repository.

### API still not working
→ Check Netlify **Environment variables** - make sure `VITE_ANTHROPIC_API_KEY` is there
→ Check Anthropic console - make sure you have credits

### Can't find my repository
→ In Netlify, click "Configure the Netlify app on GitHub" and give it access to all repos

---

## You Did It! 🎉

Your trend forecaster is now:
- ✅ Live on the internet
- ✅ Using real AI analysis
- ✅ Auto-deploying when you make changes
- ✅ Professional portfolio piece

**Your URL:** `https://YOUR-SITE-NAME.netlify.app`

Share this in your job applications! 

---

## Quick Reference Commands

**Upload changes:**
```bash
git add .
git commit -m "Description of changes"
git push
```

**Check status:**
```bash
git status
```

**See upload history:**
```bash
git log
```

That's everything! Let me know when you've deployed it and I'll help you test! 🚀
