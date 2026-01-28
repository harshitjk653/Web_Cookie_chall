# 🚀 Quick Start - Docker on EC2

## ✅ Files Ready for Deployment

All necessary files are configured and ready:

- ✅ **Dockerfile** - Optimized with security & health checks
- ✅ **docker-compose.yml** - Production-ready with MongoDB
- ✅ **package.json** - All dependencies defined
- ✅ **server.js** - Express app ready to run

---

## 🎯 Deploy to EC2 (3 Simple Steps)

### Step 1: Upload to EC2
```bash
# Option A: Using Git (Recommended)
ssh -i your-key.pem ubuntu@your-ec2-ip
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Option B: Using SCP
scp -i your-key.pem -r d:\CTFD\Web_Challenges\Cookie_chall\Ctf_cookie ubuntu@your-ec2-ip:~/app
```

### Step 2: Run Docker Compose
```bash
# On EC2
cd ~/app  # or your project directory
docker-compose up -d --build
```

### Step 3: Access Your App
```
http://your-ec2-public-ip:3000
```

**That's it!** 🎉

---

## 🧪 Test Locally First (Recommended)

### Windows (PowerShell)
```powershell
cd d:\CTFD\Web_Challenges\Cookie_chall\Ctf_cookie
.\test-docker.ps1
```

### Linux/Mac (Bash)
```bash
cd /path/to/project
chmod +x test-docker.sh
./test-docker.sh
```

### Manual Test
```bash
# Build and start
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Test endpoint
curl http://localhost:3000

# Stop
docker-compose down
```

---

## 🔧 Common Commands

### Start
```bash
docker-compose up -d
```

### Stop
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

### Restart
```bash
docker-compose restart
```

### Rebuild
```bash
docker-compose up -d --build
```

### Check Status
```bash
docker-compose ps
docker ps
```

---

## ⚙️ EC2 Security Group Setup

**Required Inbound Rules:**

| Type       | Port | Source    | Description        |
|------------|------|-----------|--------------------|
| SSH        | 22   | Your IP   | SSH access         |
| Custom TCP | 3000 | 0.0.0.0/0 | Application access |

---

## 🐛 Troubleshooting

### Container won't start?
```bash
docker-compose logs app
docker-compose down -v
docker-compose up -d --build
```

### Can't access from browser?
1. Check EC2 Security Group (port 3000 open)
2. Check if app is running: `docker-compose ps`
3. Test locally: `curl http://localhost:3000`

### MongoDB issues?
```bash
docker-compose logs mongo
docker exec -it jwt-ctf-mongo mongosh --eval "db.adminCommand('ping')"
```

---

## 📊 What's Configured

### Dockerfile Features
- ✅ Node.js 18 Alpine (lightweight)
- ✅ Production dependencies only
- ✅ Non-root user (security)
- ✅ Health checks
- ✅ Optimized layer caching

### Docker Compose Features
- ✅ MongoDB with persistent storage
- ✅ Automatic restart on failure
- ✅ Health checks for both services
- ✅ Log rotation (10MB max, 3 files)
- ✅ Environment variable support
- ✅ Network isolation

### Environment Variables
Default values (can override in .env):
- `JWT_SECRET=secret123`
- `FLAG=AKIRA{jwt_role_escalation_success}`
- `PORT=3000`
- `MONGODB_URI=mongodb://mongo:27017/jwt_ctf`

---

## 🔒 Production Checklist

Before going live:

- [ ] Change JWT_SECRET to secure random string
- [ ] Restrict Security Group port 3000 to specific IPs
- [ ] Set up HTTPS with nginx reverse proxy
- [ ] Configure backups for MongoDB
- [ ] Set up monitoring/alerts
- [ ] Review logs regularly

---

## 📚 Documentation

- **Full Guide**: `EC2_DOCKER_DEPLOYMENT.md`
- **Test Script (Windows)**: `test-docker.ps1`
- **Test Script (Linux)**: `test-docker.sh`

---

## 🆘 Quick Help

**App not responding?**
```bash
docker-compose restart app
docker-compose logs -f app
```

**Need to update code?**
```bash
git pull origin main
docker-compose up -d --build
```

**Clean slate?**
```bash
docker-compose down -v
docker-compose up -d --build
```

---

## ✨ Summary

Your Docker setup is **production-ready** with:
- Optimized Dockerfile
- Health checks
- Auto-restart
- Persistent MongoDB storage
- Security best practices
- Log management

Just deploy to EC2 and run `docker-compose up -d --build`! 🚀
