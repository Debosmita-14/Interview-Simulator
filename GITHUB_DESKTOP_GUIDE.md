# 📱 Push Using GitHub Desktop (Easiest)

## Step 1: Download & Install GitHub Desktop
- Go to https://desktop.github.com
- Download and install for Windows
- Open it

## Step 2: Sign In
1. Click **"File"** → **"Options"**
2. Go to **"Accounts"** tab
3. Click **"Sign in with GitHub"**
4. Enter your GitHub username (Debosmita-14) and password
5. Click **"Sign in"**

## Step 3: Add Your Project
1. In GitHub Desktop, click **"File"** → **"Add Local Repository"**
2. Click **"Choose..."** and select `C:\Debosmita\My_Project`
3. Click **"Add Repository"**

## Step 4: Publish to GitHub
1. You should see a blue button at the top that says **"Publish repository"**
2. Click it
3. Name: `Interview-Simulator` (should auto-fill)
4. Description: `Premium IT Interview Preparation Platform`
5. Make sure **"Keep this code private"** is unchecked (public)
6. Click **"Publish Repository"**

## Done!
Your code is now on GitHub automatically. GitHub Desktop shows all changes.

---

## Next: Deploy to Vercel
Once published (you'll see "Interview-Simulator" at the top of GitHub Desktop):

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"Add New"** → **"Project"**
4. Find **"Interview-Simulator"** and click **"Import"**
5. Click **"Deploy"** (settings auto-detected from vercel.json)
6. Wait 2-3 min for build
7. Add Environment Variables (Settings tab):
   - `MONGODB_URI` = your MongoDB connection
   - `CLAUDE_API_KEY` = your Claude API key
   - `JWT_SECRET` = random secret
   - `REACT_APP_API_URL` = your Vercel domain
8. Click **"Redeploy"**

Done! Your app is live. 🎉
