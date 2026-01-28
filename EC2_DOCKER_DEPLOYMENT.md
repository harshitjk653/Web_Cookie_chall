# 🚀 AWS EC2 Docker Deployment Guide

## ✅ Prerequisites Checklist

- [ ] AWS EC2 instance running (Ubuntu 20.04+ or Amazon Linux 2)
- [ ] Docker installed on EC2
- [ ] Docker Compose installed on EC2
- [ ] Security Group allows inbound traffic on port 3000
- [ ] SSH access to EC2 instance

---

## 📦 Files Ready for Deployment

✅ **Dockerfile** - Optimized with:
- Multi-stage build for smaller image
- Non-root user for security
- Health checks
- Production dependencies only

✅ **docker-compose.yml** - Configured with:
- MongoDB service with persistent storage
- Health checks for both services
- Automatic restart policies
- Log rotation
- Environment variable support

✅ **package.json** - Ready with:
- All dependencies defined
- Start script configured
- Node version specified

---

## 🔧 EC2 Setup (One-Time)

### 1. Connect to EC2
```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 2. Install Docker (if not installed)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add user to docker group
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version

# Logout and login again for group changes
exit
```

### 3. Configure Security Group
In AWS Console → EC2 → Security Groups:
- Add inbound rule: **Custom TCP**, Port **3000**, Source **0.0.0.0/0** (or your IP)
- Add inbound rule: **SSH**, Port **22**, Source **Your IP**

---

## 🚀 Deployment Steps

### 1. Upload Code to EC2

**Option A: Using Git (Recommended)**
```bash
# On EC2
cd ~
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

**Option B: Using SCP**
```bash
# On your local machine
scp -i your-key.pem -r d:\CTFD\Web_Challenges\Cookie_chall\Ctf_cookie ubuntu@your-ec2-ip:~/app
```

### 2. Set Environment Variables (Optional)
```bash
# On EC2
cd ~/app  # or your project directory

# Create .env file (optional, docker-compose has defaults)
cat > .env << EOF
JWT_SECRET=your-super-secret-key-change-this
FLAG=AKIRA{jwt_role_escalation_success}
EOF
```

### 3. Build and Run with Docker Compose
```bash
# Build and start containers
docker-compose up -d --build

# Check if containers are running
docker-compose ps

# View logs
docker-compose logs -f
```

### 4. Verify Deployment
```bash
# Check app health
curl http://localhost:3000

# Check from outside EC2
curl http://your-ec2-public-ip:3000

# Check container health
docker ps
```

---

## 🔍 Testing the Application

### Test from Browser
1. Open browser: `http://your-ec2-public-ip:3000`
2. You should see the login page
3. Try registering a user
4. Try logging in

### Test from Command Line
```bash
# Test registration
curl -X POST http://your-ec2-ip:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Test login
curl -X POST http://your-ec2-ip:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}' \
  -c cookies.txt

# Test profile
curl http://your-ec2-ip:3000/api/profile -b cookies.txt
```

---

## 🛠️ Common Commands

### View Logs
```bash
# All logs
docker-compose logs

# Follow logs (real-time)
docker-compose logs -f

# App logs only
docker-compose logs -f app

# MongoDB logs only
docker-compose logs -f mongo

# Last 100 lines
docker-compose logs --tail=100
```

### Restart Services
```bash
# Restart all
docker-compose restart

# Restart app only
docker-compose restart app

# Restart MongoDB only
docker-compose restart mongo
```

### Stop Services
```bash
# Stop all containers
docker-compose down

# Stop and remove volumes (WARNING: deletes database)
docker-compose down -v
```

### Update Application
```bash
# Pull latest code
git pull origin main

# Rebuild and restart
docker-compose up -d --build

# Or rebuild without cache
docker-compose build --no-cache
docker-compose up -d
```

### Check Container Health
```bash
# Check status
docker-compose ps

# Check health
docker inspect jwt-ctf-app | grep -A 10 Health

# Check resource usage
docker stats
```

---

## 🐛 Troubleshooting

### Container Won't Start
```bash
# Check logs
docker-compose logs app

# Check if port is already in use
sudo netstat -tulpn | grep 3000

# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
docker-compose ps mongo

# Check MongoDB logs
docker-compose logs mongo

# Test MongoDB connection
docker exec -it jwt-ctf-mongo mongosh --eval "db.adminCommand('ping')"
```

### Can't Access from Browser
```bash
# Check if app is listening
curl http://localhost:3000

# Check EC2 security group (must allow port 3000)
# Check if firewall is blocking
sudo ufw status

# If UFW is active, allow port 3000
sudo ufw allow 3000
```

### Application Crashes
```bash
# Check logs for errors
docker-compose logs -f app

# Check if MongoDB is healthy
docker-compose ps

# Restart services
docker-compose restart
```

---

## 🔒 Security Best Practices

### 1. Change Default Secrets
```bash
# Generate secure JWT secret
openssl rand -base64 32

# Update docker-compose.yml or .env file
```

### 2. Restrict Port Access
In Security Group:
- Change port 3000 source from `0.0.0.0/0` to specific IPs
- Only allow SSH from your IP

### 3. Use HTTPS (Production)
```bash
# Install nginx
sudo apt install nginx

# Configure as reverse proxy with SSL
# Use Let's Encrypt for free SSL certificate
```

### 4. Regular Updates
```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Update Docker images
docker-compose pull
docker-compose up -d
```

---

## 📊 Monitoring

### Check Container Health
```bash
# Health status
docker inspect jwt-ctf-app --format='{{.State.Health.Status}}'

# Resource usage
docker stats jwt-ctf-app jwt-ctf-mongo
```

### View Application Metrics
```bash
# Number of requests (check logs)
docker-compose logs app | grep "GET\|POST" | wc -l

# Recent errors
docker-compose logs app | grep -i error
```

---

## 🔄 Backup and Restore

### Backup MongoDB Data
```bash
# Create backup
docker exec jwt-ctf-mongo mongodump --out /data/backup

# Copy backup to host
docker cp jwt-ctf-mongo:/data/backup ./mongodb-backup
```

### Restore MongoDB Data
```bash
# Copy backup to container
docker cp ./mongodb-backup jwt-ctf-mongo:/data/restore

# Restore
docker exec jwt-ctf-mongo mongorestore /data/restore
```

---

## 🎯 Quick Reference

### Start Everything
```bash
docker-compose up -d
```

### Stop Everything
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f
```

### Restart App
```bash
docker-compose restart app
```

### Check Status
```bash
docker-compose ps
```

### Access Your App
```
http://your-ec2-public-ip:3000
```

---

## ✅ Deployment Checklist

- [ ] EC2 instance running
- [ ] Docker and Docker Compose installed
- [ ] Security group configured (port 3000 open)
- [ ] Code uploaded to EC2
- [ ] Environment variables set (if needed)
- [ ] `docker-compose up -d --build` executed
- [ ] Containers running (`docker-compose ps`)
- [ ] App accessible from browser
- [ ] MongoDB connected successfully
- [ ] Health checks passing

---

## 🆘 Need Help?

If you encounter issues:

1. **Check logs first**: `docker-compose logs -f`
2. **Verify containers are running**: `docker-compose ps`
3. **Check EC2 security group**: Port 3000 must be open
4. **Test locally**: `curl http://localhost:3000`
5. **Restart services**: `docker-compose restart`

---

## 📝 Notes

- Default JWT_SECRET: `secret123` (change in production!)
- Default FLAG: `AKIRA{jwt_role_escalation_success}`
- MongoDB data persists in Docker volume `mongo-data`
- Logs are automatically rotated (max 10MB, 3 files)
- Health checks run every 30 seconds
- Containers auto-restart unless stopped manually
