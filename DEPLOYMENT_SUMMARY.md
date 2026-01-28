# ✅ Docker Deployment - Ready for EC2

## Summary of Changes

I've optimized your Docker setup for production deployment on AWS EC2. Here's what was improved:

---

## 🔧 Files Updated

### 1. **Dockerfile** ✅
**Improvements:**
- ✅ Changed from `npm install` to `npm ci` (faster, more reliable)
- ✅ Added `--production` flag (smaller image, no dev dependencies)
- ✅ Added non-root user `nodejs` (security best practice)
- ✅ Added health check (monitors app status)
- ✅ Changed CMD from `npm start` to `node server.js` (faster startup)

**Before:**
```dockerfile
RUN npm install --production
CMD ["npm", "start"]
```

**After:**
```dockerfile
RUN npm ci --production --silent
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 && \
    chown -R nodejs:nodejs /app
USER nodejs
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
CMD ["node", "server.js"]
```

---

### 2. **docker-compose.yml** ✅
**Improvements:**
- ✅ Added health checks for both app and MongoDB
- ✅ Added `depends_on` with health condition (app waits for MongoDB)
- ✅ Added log rotation (prevents disk space issues)
- ✅ Environment variables now support `.env` file overrides
- ✅ Better restart policies

**Key Changes:**
```yaml
# App waits for MongoDB to be healthy
depends_on:
  mongo:
    condition: service_healthy

# Health check for app
healthcheck:
  test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
  interval: 30s
  timeout: 3s
  retries: 3
  start_period: 10s

# Log rotation
logging:
  driver: "json-file"
  options:
    max-size: "10m"
    max-file: "3"

# Environment variables with defaults
- JWT_SECRET=${JWT_SECRET:-secret123}
- FLAG=${FLAG:-AKIRA{jwt_role_escalation_success}}
```

---

### 3. **package.json** ✅
**Already Perfect:**
- ✅ All dependencies defined
- ✅ Start script configured
- ✅ Node version specified

---

## 📁 New Files Created

### 1. **EC2_DOCKER_DEPLOYMENT.md**
Complete deployment guide with:
- EC2 setup instructions
- Docker installation steps
- Deployment process
- Testing procedures
- Troubleshooting guide
- Security best practices
- Backup/restore instructions

### 2. **DOCKER_QUICKSTART.md**
Quick reference with:
- 3-step deployment
- Common commands
- Security group setup
- Quick troubleshooting

### 3. **test-docker.ps1** (Windows)
Automated test script that:
- Checks Docker installation
- Verifies all files exist
- Builds and starts containers
- Tests all endpoints
- Shows health status
- Displays logs

### 4. **test-docker.sh** (Linux/Mac)
Same as above for Unix systems

---

## 🚀 How to Deploy to EC2

### Quick Version:
```bash
# 1. Upload to EC2
scp -i key.pem -r ./Ctf_cookie ubuntu@ec2-ip:~/app

# 2. SSH to EC2
ssh -i key.pem ubuntu@ec2-ip

# 3. Run Docker Compose
cd ~/app
docker-compose up -d --build

# 4. Access app
# http://your-ec2-ip:3000
```

### Detailed Version:
See `EC2_DOCKER_DEPLOYMENT.md` for complete instructions

---

## 🧪 Test Locally First

### Windows:
```powershell
cd d:\CTFD\Web_Challenges\Cookie_chall\Ctf_cookie
.\test-docker.ps1
```

### Manual Test:
```bash
docker-compose up -d --build
docker-compose ps
curl http://localhost:3000
docker-compose logs -f
```

---

## ✅ What Works Now

### Security
- ✅ Non-root user in container
- ✅ Production dependencies only
- ✅ No sensitive data in images
- ✅ Health monitoring

### Reliability
- ✅ Auto-restart on failure
- ✅ Health checks
- ✅ Proper dependency management
- ✅ MongoDB persistence

### Operations
- ✅ Log rotation (no disk fill)
- ✅ Easy updates (`docker-compose up -d --build`)
- ✅ Simple rollback (`docker-compose down && docker-compose up -d`)
- ✅ Resource monitoring

### Development
- ✅ Fast builds with layer caching
- ✅ Environment variable support
- ✅ Easy local testing
- ✅ Consistent environments

---

## 🔍 Verification Checklist

Before deploying to EC2:

- [ ] Test locally: `docker-compose up -d --build`
- [ ] Check containers: `docker-compose ps`
- [ ] Test endpoint: `curl http://localhost:3000`
- [ ] Check logs: `docker-compose logs -f`
- [ ] Verify MongoDB: `docker exec jwt-ctf-mongo mongosh --eval "db.adminCommand('ping')"`
- [ ] Stop: `docker-compose down`

After deploying to EC2:

- [ ] EC2 Security Group allows port 3000
- [ ] Containers are running: `docker-compose ps`
- [ ] App is accessible: `http://ec2-ip:3000`
- [ ] Health checks passing: `docker inspect jwt-ctf-app`
- [ ] Logs look good: `docker-compose logs`

---

## 🎯 Next Steps

1. **Test Locally** (Recommended)
   ```powershell
   .\test-docker.ps1
   ```

2. **Deploy to EC2**
   - Upload code
   - Run `docker-compose up -d --build`
   - Configure Security Group

3. **Verify Deployment**
   - Check containers: `docker-compose ps`
   - Test endpoint: `curl http://localhost:3000`
   - View logs: `docker-compose logs -f`

4. **Production Hardening** (Optional)
   - Change JWT_SECRET
   - Restrict Security Group
   - Set up HTTPS
   - Configure backups

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| `DOCKER_QUICKSTART.md` | Quick reference & common commands |
| `EC2_DOCKER_DEPLOYMENT.md` | Complete deployment guide |
| `test-docker.ps1` | Windows test script |
| `test-docker.sh` | Linux/Mac test script |
| `Dockerfile` | Container image definition |
| `docker-compose.yml` | Multi-container orchestration |

---

## 🆘 Common Issues & Solutions

### "Container exits immediately"
```bash
docker-compose logs app
# Usually missing environment variables or MongoDB not ready
```

### "Can't access from browser"
1. Check Security Group (port 3000 open)
2. Check container: `docker-compose ps`
3. Test locally: `curl http://localhost:3000`

### "MongoDB connection failed"
```bash
docker-compose logs mongo
docker exec -it jwt-ctf-mongo mongosh --eval "db.adminCommand('ping')"
```

---

## ✨ Benefits of This Setup

1. **Production-Ready**: Security, health checks, logging
2. **Easy to Deploy**: Single command deployment
3. **Easy to Maintain**: Simple updates and rollbacks
4. **Reliable**: Auto-restart, health monitoring
5. **Portable**: Works anywhere Docker runs
6. **Documented**: Complete guides and scripts

---

## 🎉 You're Ready!

Your Docker setup is **production-ready** and optimized for EC2 deployment.

**To deploy:**
1. Test locally with `.\test-docker.ps1`
2. Upload to EC2
3. Run `docker-compose up -d --build`
4. Access at `http://your-ec2-ip:3000`

**Need help?** Check:
- `DOCKER_QUICKSTART.md` for quick commands
- `EC2_DOCKER_DEPLOYMENT.md` for detailed guide
