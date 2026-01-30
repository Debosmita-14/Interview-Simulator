# 🆕 Create Fresh Repo on GitHub Web (Simplest)

## Step 1: Create Empty Repo on GitHub.com
1. Go to https://github.com/new
2. Repository name: `Interview-Simulator`
3. Description: `Premium IT Interview Preparation Platform`
4. **Public** (not private)
5. **Do NOT** check "Initialize with README"
6. Click **"Create repository"**

You should see a page with setup instructions. **Stop there.**

---

## Step 2: Copy-Paste These Commands in PowerShell

Open PowerShell and run **exactly** these commands (one at a time):

```powershell
cd "C:\Debosmita\My_Project"
```

```powershell
git config user.name "Debosmita-14"
```

```powershell
git config user.email "your-email@example.com"
```

```powershell
git branch -M main
```

```powershell
git remote add origin https://github.com/Debosmita-14/Interview-Simulator.git
```

```powershell
git push -u origin main
```

On that last command, **Git will ask for your GitHub password or token**. 
- If it prompts for password, enter your GitHub password.
- If it prompts for token, paste a fresh PAT (if you have one).
- If it says "failed", reply here with the exact error.

---

## Step 3: Verify on GitHub
Go to https://github.com/Debosmita-14/Interview-Simulator

You should see all your files (backend, frontend, package.json, etc.).

---

## Done!
Reply **"✅ Repo created and pushed"** and I'll give the Vercel deployment steps (browser only, no more terminal).
