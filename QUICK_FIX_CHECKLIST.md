# ✅ Quick Fix Checklist - Registration Error on Vercel

## Problem
Registration shows "registration failed" on your Vercel deployment.

## Quick Fix (10 minutes)

### ☐ Step 1: MongoDB Setup (5 min)
1. Go to https://mongodb.com/cloud/atlas
2. Create free account + free cluster (M0)
3. Create database user with password
4. Network Access → Add IP → Allow from anywhere (0.0.0.0/0)
5. Copy connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/interview-simulator
   ```

### ☐ Step 2: Vercel Environment Variables (3 min)
Go to Vercel Dashboard → Your Project → Settings → Environment Variables

Add these:
- ☐ `MONGODB_URI` = (paste your MongoDB connection string)
- ☐ `JWT_SECRET` = (any random 32+ character string)
- ☐ `NODE_ENV` = `production`

**Generate JWT_SECRET:**
```bash
# Mac/Linux:
openssl rand -base64 32

# Windows:
[Convert]::ToBase64String((1..32|%{Get-Random -Max 256}))

# Or just use:
MyR@nd0mS3cur3Key!2024#ABC
```

### ☐ Step 3: Deploy (2 min)
Option A: Automatic
- Just push any change to GitHub → Auto deploys

Option B: Manual
- Vercel Dashboard → Deployments → Latest → "..." → Redeploy

### ☐ Step 4: Test (1 min)
1. Visit `https://your-app.vercel.app`
2. Click "Sign Up"
3. Enter test details
4. Click "Sign Up"
5. ✅ Should redirect to dashboard!

## Verification

### Check API is Working:
```
https://your-app.vercel.app/api/health
```
Should return:
```json
{"status":"ok","message":"Interview Simulator API is running"}
```

### Check Vercel Logs:
1. Vercel Dashboard → Functions
2. Click `/api/auth/register`
3. Should see logs (no errors)

## Troubleshooting

### Still failing?
1. ☐ Check environment variables are saved in Vercel
2. ☐ Check MongoDB connection string has correct password
3. ☐ Check MongoDB Network Access allows 0.0.0.0/0
4. ☐ Check latest code is deployed (git push)
5. ☐ Check Vercel function logs for errors

### Need more help?
- See `REGISTRATION_FIX_SUMMARY.md` for detailed explanation
- See `VERCEL_DEPLOYMENT.md` for complete deployment guide
- See `api/README.md` for API technical details

## What Changed?

✅ Added `/api` directory with serverless functions for:
- `/api/auth/register` - User registration
- `/api/auth/login` - User login  
- `/api/health` - Health check

✅ Updated `vercel.json` for serverless deployment

✅ Your backend now runs as Vercel serverless functions instead of Express server

## Done? ✅

- [x] MongoDB Atlas set up
- [x] Environment variables configured in Vercel
- [x] Deployed to Vercel
- [x] Registration tested and working
- [x] 🎉 You're all set!

---

**Need detailed instructions?** → See `VERCEL_DEPLOYMENT.md`

**Need technical details?** → See `REGISTRATION_FIX_SUMMARY.md`
