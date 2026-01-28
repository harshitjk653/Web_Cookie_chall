# ✅ AWS Amplify - Ready to Deploy!

Your application is now configured for **one-click deployment** to AWS Amplify.

## 🎯 What You Need to Do

### Step 1: Set Up MongoDB Atlas (5 minutes)

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Create a database user (remember username/password)
4. Whitelist all IPs: Go to "Network Access" → Add IP → "Allow Access from Anywhere" (0.0.0.0/0)
5. Get connection string: Click "Connect" → "Connect your application" → Copy the string
   - Example: `mongodb+srv://myuser:mypass@cluster0.xxxxx.mongodb.net/jwt_ctf`

### Step 2: Push to GitHub

```bash
git add .
git commit -m "Ready for AWS Amplify deployment"
git push origin main
```

### Step 3: Deploy to AWS Amplify

1. **Go to**: https://console.aws.amazon.com/amplify/
2. **Click**: "New app" → "Host web app"
3. **Connect**: Your GitHub repository
4. **Select**: Your branch (main/master)
5. **Add Environment Variables** (Click "Advanced settings"):
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/jwt_ctf
   JWT_SECRET = my_super_secret_key_12345
   FLAG = AKIRA{jwt_role_escalation_success}
   PORT = 3000
   ```
6. **Click**: "Save and Deploy"

**That's it!** AWS Amplify will automatically build and deploy your app.

---

## 📋 Environment Variables Reference

| Variable | Example Value |
|----------|---------------|
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/jwt_ctf` |
| `JWT_SECRET` | `my_super_secret_key_12345` |
| `FLAG` | `AKIRA{jwt_role_escalation_success}` |
| `PORT` | `3000` |

---

## 🎉 After Deployment

You'll get a URL like: `https://main.d1234567890.amplifyapp.com`

Your CTF challenge is now live and accessible to anyone!

---

## 🔄 Automatic Updates

Every time you push to GitHub, AWS Amplify will automatically:
- Rebuild your app
- Redeploy it
- Update the live site

No manual intervention needed!

---

## 💰 Cost: $0

Both AWS Amplify and MongoDB Atlas have free tiers that are perfect for this CTF challenge.

---

## 📚 Need More Details?

See **[AWS_AMPLIFY_DEPLOYMENT.md](AWS_AMPLIFY_DEPLOYMENT.md)** for the complete guide with screenshots and troubleshooting.
