# 🚀 Push & Deploy in 3 Steps

## Step 1: Create New GitHub PAT (Personal Access Token)
1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** (classic)
3. Name it something like `interview-deploy`
4. Select **`repo`** scope
5. Click **"Generate token"** at bottom
6. **Copy the token** (starts with `ghp_`)

## Step 2: Push Code to GitHub (Run Once)
Open PowerShell and run:

```powershell
# Set your new PAT (session-only, local)
$env:GITHUB_TOKEN = "ghp_YOUR_NEW_TOKEN_HERE"

# Go to project folder
cd "C:\Debosmita\My_Project"

# Run the push script
.\push_to_github.ps1
```

Wait for `✅ Push complete!` message.

## Step 3: Deploy to Vercel (Browser Only)
1. Go to https://vercel.com
2. Sign in (create account if needed)
3. Click **"Add New"** → **"Project"**
4. Click **"Select a Git Repository"**
5. Find and click **"Interview-Simulator"**
6. Click **"Import"**
7. Vercel will auto-detect settings. Click **"Deploy"**
8. Wait 2-3 minutes for build to complete
9. Go to **Settings** → **Environment Variables**
10. Add these (one by one):

```
MONGODB_URI = mongodb+srv://user:password@host/dbname
CLAUDE_API_KEY = sk-ant-xxxxx (from https://console.anthropic.com)
JWT_SECRET = any-random-secret
REACT_APP_API_URL = https://your-vercel-domain.vercel.app
```

11. Click **"Save"**
12. Go to **"Deployments"** → click the latest → **"Redeploy"**

## Step 4: Test Live App
After redeploy completes, click the **"Visit"** button or go to the domain shown. You should see the login page.

---

**That's it!** Your app is now live on Vercel. 🎉

### Tips:
- **MONGODB_URI**: Get from MongoDB Atlas (https://www.mongodb.com/cloud/atlas) — create free cluster
- **CLAUDE_API_KEY**: Get from https://console.anthropic.com — create free API key
- **JWT_SECRET**: Any random string, e.g., `my-super-secret-key-12345`
- **REACT_APP_API_URL**: This is your Vercel app's domain (shown in Vercel after deploy)

### Troubleshooting:
- **"Build failed"** → Check Vercel build logs for errors
- **"Cannot find module"** → Missing env var, add it and redeploy
- **MongoDB connection error** → Check MONGODB_URI is correct
- **Blank page** → Check browser console for errors (F12)
