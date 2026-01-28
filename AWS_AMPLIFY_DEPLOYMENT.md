# AWS Amplify - One-Click Deployment Guide

## 🚀 Simple Deployment Steps

### Step 1: Push Your Code to GitHub

```bash
git add .
git commit -m "Configure for AWS Amplify deployment"
git push origin main
```

### Step 2: Deploy to AWS Amplify

1. **Go to AWS Amplify Console**: https://console.aws.amazon.com/amplify/
2. **Click "New app" → "Host web app"**
3. **Connect your repository**:
   - Select GitHub (or GitLab/Bitbucket)
   - Authorize AWS Amplify
   - Select your repository
   - Select the branch (usually `main` or `master`)
4. **Configure build settings**:
   - Amplify will auto-detect the `amplify.yml` file
   - Just click **Next**
5. **Add Environment Variables** (IMPORTANT!):
   - Click "Advanced settings"
   - Add these variables:
     ```
     MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/jwt_ctf
     JWT_SECRET = your_super_secret_key_change_this
     FLAG = AKIRA{jwt_role_escalation_success}
     PORT = 3000
     ```
6. **Click "Save and Deploy"**

That's it! AWS Amplify will automatically:
- Install dependencies
- Build your app
- Deploy it
- Give you a live URL

---

## 📋 Before You Deploy - MongoDB Atlas Setup

You need a MongoDB database. Here's the quick setup:

1. **Go to**: https://www.mongodb.com/cloud/atlas
2. **Create a free account** and cluster
3. **Create a database user**:
   - Go to "Database Access"
   - Add new user with username/password
4. **Whitelist all IPs**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
5. **Get connection string**:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Example: `mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/jwt_ctf`

---

## 🎯 Environment Variables You Need

When adding environment variables in Amplify, use these:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/jwt_ctf` |
| `JWT_SECRET` | Any secure random string | `my_super_secret_jwt_key_12345` |
| `FLAG` | Your CTF flag | `AKIRA{jwt_role_escalation_success}` |
| `PORT` | Port number | `3000` |

---

## ✅ After Deployment

Once deployed, AWS Amplify will give you a URL like:
```
https://main.d1234567890.amplifyapp.com
```

Visit this URL to access your CTF challenge!

---

## 🔄 Automatic Updates

Every time you push to your GitHub repository, AWS Amplify will automatically:
1. Detect the changes
2. Rebuild your app
3. Redeploy it

No manual intervention needed!

---

## 🐛 Troubleshooting

### Build Fails
- Check the build logs in Amplify Console
- Verify all dependencies are in `dependencies` (not `devDependencies`)

### App Doesn't Start
- Check environment variables are set correctly
- Verify MongoDB connection string is correct

### Can't Connect to MongoDB
- Ensure IP whitelist includes `0.0.0.0/0` in MongoDB Atlas
- Check username/password in connection string
- Verify database user has read/write permissions

### App Shows "502 Bad Gateway"
- Check Amplify logs for errors
- Verify the app is listening on the correct PORT
- MongoDB connection might be failing

---

## 💰 Cost

**AWS Amplify Free Tier:**
- 1000 build minutes per month
- 15 GB served per month
- 5 GB storage

**MongoDB Atlas Free Tier:**
- 512 MB storage
- Shared cluster

**Total Cost: $0** (if you stay within free tier limits)

---

## 📝 Summary

1. ✅ Push code to GitHub
2. ✅ Set up MongoDB Atlas (5 minutes)
3. ✅ Connect GitHub to AWS Amplify
4. ✅ Add environment variables
5. ✅ Click Deploy
6. ✅ Done! Your app is live

No CLI tools needed, no complex configuration - just connect and deploy!
