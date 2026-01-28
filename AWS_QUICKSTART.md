# AWS Deployment Quick Start

This script helps you quickly deploy to AWS Elastic Beanstalk.

## Prerequisites

1. Install AWS EB CLI:
```bash
pip install awsebcli
```

2. Configure AWS credentials (if not already done):
```bash
aws configure
```

## Deployment Steps

### 1. Initialize Elastic Beanstalk

```bash
eb init
```

Follow the prompts:
- Select your AWS region (e.g., us-east-1)
- Enter application name: `jwt-ctf-app`
- Select platform: Node.js
- Select platform version: Node.js 18 (or latest)
- Set up SSH: Yes (recommended)

### 2. Create Environment and Deploy

```bash
eb create jwt-ctf-env
```

This will:
- Create an environment named `jwt-ctf-env`
- Deploy your application
- Set up load balancer and auto-scaling
- Provide you with a URL

### 3. Set Environment Variables

**IMPORTANT**: Replace the values with your actual credentials!

```bash
eb setenv MONGODB_URI="mongodb+srv://username:password@cluster.mongodb.net/jwt_ctf?retryWrites=true&w=majority"
eb setenv JWT_SECRET="your_super_secret_jwt_key_change_this"
eb setenv FLAG="AKIRA{jwt_role_escalation_success}"
```

### 4. Open Your Application

```bash
eb open
```

This will open your deployed application in the browser.

## Useful Commands

### Check Status
```bash
eb status
```

### View Logs
```bash
eb logs
```

### SSH into Instance
```bash
eb ssh
```

### Deploy Updates
```bash
eb deploy
```

### Terminate Environment (Delete)
```bash
eb terminate jwt-ctf-env
```

## MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP: `0.0.0.0/0` (allow all IPs for AWS)
5. Get connection string from "Connect" → "Connect your application"
6. Use the connection string in the `MONGODB_URI` environment variable

## Troubleshooting

### Application Health is "Degraded" or "Severe"
```bash
eb logs
```
Check for errors in the logs, usually MongoDB connection issues.

### Cannot Connect to MongoDB
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure database user has correct permissions

### Application Won't Start
- Check that `package.json` has correct start script
- Verify all dependencies are in `dependencies` (not `devDependencies`)
- Check EB logs for specific errors

## Cost

AWS Elastic Beanstalk free tier includes:
- 750 hours of t2.micro instance per month
- This is enough to run one instance 24/7 for free

MongoDB Atlas free tier:
- 512MB storage
- Shared cluster
- Perfect for CTF challenges

## Alternative: One-Line Deploy

If you want to deploy quickly without prompts:

```bash
eb init -p node.js-18 jwt-ctf-app --region us-east-1 && \
eb create jwt-ctf-env && \
eb setenv MONGODB_URI="YOUR_MONGODB_URI" JWT_SECRET="YOUR_SECRET" FLAG="AKIRA{jwt_role_escalation_success}" && \
eb open
```

**Remember to replace the environment variable values!**
