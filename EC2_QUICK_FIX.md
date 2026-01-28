# 🚀 EC2 Deployment - Quick Fix Guide

## ❌ Current Issue

**Error:** `sudo: docker-compose: Command not found`

**Cause:** Docker Compose is not installed on your EC2 instance

---

## ✅ Solution (Copy & Paste These Commands)

### **Step 1: Install Docker Compose**

```bash
# Download Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Make it executable
sudo chmod +x /usr/local/bin/docker-compose

# Verify installation
docker-compose --version
```

### **Step 2: Deploy Your Application**

```bash
# Navigate to your project
cd ~/Web_Cookie_chall

# Build and start containers
sudo docker-compose up -d --build

# Check if containers are running
sudo docker-compose ps

# View logs
sudo docker-compose logs -f
```

### **Step 3: Access Your Application**

```
http://your-ec2-public-ip:3000
```

---

## 🔧 Alternative: Use Automated Setup Script

### **Option A: Upload and Run Setup Script**

```bash
# On your local machine, upload the setup script
scp -i your-key.pem ec2-setup.sh ubuntu@your-ec2-ip:~/

# On EC2, run the setup script
ssh -i your-key.pem ubuntu@your-ec2-ip
chmod +x ec2-setup.sh
./ec2-setup.sh

# Logout and login again
exit
ssh -i your-key.pem ubuntu@your-ec2-ip

# Deploy your app
cd ~/Web_Cookie_chall
docker-compose up -d --build
```

---

## 📋 Complete Deployment Steps

### **1. Install Docker Compose (One-Time)**

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

### **2. Navigate to Your Project**

```bash
cd ~/Web_Cookie_chall
```

### **3. Start Your Application**

```bash
# Build and start in detached mode
sudo docker-compose up -d --build

# Check container status
sudo docker-compose ps

# Should show:
# NAME                STATE       PORTS
# jwt-ctf-app         Up          0.0.0.0:3000->3000/tcp
# jwt-ctf-mongo       Up          0.0.0.0:27017->27017/tcp
```

### **4. Verify Deployment**

```bash
# Check if app is responding
curl http://localhost:3000

# View real-time logs
sudo docker-compose logs -f

# Press Ctrl+C to exit logs
```

### **5. Access from Browser**

```
http://your-ec2-public-ip:3000
```

---

## 🔍 Troubleshooting

### **Issue: "Permission denied" when running docker commands**

**Solution:** Add your user to docker group

```bash
sudo usermod -aG docker $USER
exit
# Login again
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### **Issue: "Cannot connect to Docker daemon"**

**Solution:** Start Docker service

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### **Issue: "Port 3000 already in use"**

**Solution:** Stop existing containers

```bash
sudo docker-compose down
sudo docker-compose up -d --build
```

### **Issue: "Cannot access from browser"**

**Solution:** Check Security Group

1. Go to AWS Console → EC2 → Security Groups
2. Find your instance's security group
3. Add inbound rule:
   - Type: Custom TCP
   - Port: 3000
   - Source: 0.0.0.0/0 (or your IP)

### **Issue: "MongoDB connection failed"**

**Solution:** Check MongoDB container

```bash
# Check if MongoDB is running
sudo docker-compose ps

# Check MongoDB logs
sudo docker-compose logs mongo

# Restart MongoDB
sudo docker-compose restart mongo
```

---

## 📊 Useful Commands

### **View Logs**

```bash
# All logs
sudo docker-compose logs

# Follow logs (real-time)
sudo docker-compose logs -f

# App logs only
sudo docker-compose logs -f app

# Last 50 lines
sudo docker-compose logs --tail=50 app
```

### **Restart Services**

```bash
# Restart all
sudo docker-compose restart

# Restart app only
sudo docker-compose restart app
```

### **Stop Services**

```bash
# Stop all
sudo docker-compose down

# Stop and remove volumes (WARNING: deletes database)
sudo docker-compose down -v
```

### **Update Application**

```bash
# Pull latest code (if using Git)
git pull origin main

# Rebuild and restart
sudo docker-compose up -d --build
```

### **Check Container Status**

```bash
# List containers
sudo docker-compose ps

# Check resource usage
sudo docker stats

# Check health
sudo docker inspect jwt-ctf-app | grep -A 10 Health
```

---

## ✅ Quick Checklist

- [ ] Docker Compose installed: `docker-compose --version`
- [ ] In project directory: `cd ~/Web_Cookie_chall`
- [ ] Containers built: `sudo docker-compose build`
- [ ] Containers started: `sudo docker-compose up -d`
- [ ] Containers running: `sudo docker-compose ps`
- [ ] App responding: `curl http://localhost:3000`
- [ ] Security Group configured (port 3000 open)
- [ ] Accessible from browser: `http://ec2-ip:3000`

---

## 🎯 Expected Output

### **After `docker-compose ps`:**

```
NAME                IMAGE                    STATUS        PORTS
jwt-ctf-app         web_cookie_chall-app     Up (healthy)  0.0.0.0:3000->3000/tcp
jwt-ctf-mongo       mongo:7.0                Up (healthy)  0.0.0.0:27017->27017/tcp
```

### **After `curl http://localhost:3000`:**

Should return HTML content (login page)

---

## 🆘 Still Having Issues?

### **1. Check Docker is running:**

```bash
sudo systemctl status docker
```

### **2. Check if ports are available:**

```bash
sudo netstat -tulpn | grep 3000
sudo netstat -tulpn | grep 27017
```

### **3. View detailed logs:**

```bash
sudo docker-compose logs -f
```

### **4. Rebuild from scratch:**

```bash
sudo docker-compose down -v
sudo docker-compose build --no-cache
sudo docker-compose up -d
```

---

## 📝 Summary

**Your current error is simple to fix:**

1. Install Docker Compose:
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

2. Deploy your app:
   ```bash
   cd ~/Web_Cookie_chall
   sudo docker-compose up -d --build
   ```

3. Access at: `http://your-ec2-ip:3000`

**That's it!** 🚀
