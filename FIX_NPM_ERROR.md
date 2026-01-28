# 🔧 Fix for Docker Build Error on EC2

## ❌ Error You Got:
```
ERROR [4/6] RUN npm ci --production --silent
failed to solve: process "/bin/sh -c npm ci --production --silent" did not complete successfully: exit code: 1
```

## ✅ What Was Fixed:

1. **Removed `package-lock.json` from `.dockerignore`** - It was blocking the file needed by `npm ci`
2. **Changed `npm ci` to `npm install`** in Dockerfile - More reliable for production
3. **Removed obsolete `version: '3.8'`** from docker-compose.yml - Fixes the warning

---

## 🚀 How to Deploy the Fix on EC2

### **Option 1: Pull Latest Changes (If Using Git)**

```bash
# On EC2
cd ~/Web_Cookie_chall

# Pull latest changes
git pull origin main

# Rebuild and deploy
sudo docker-compose down
sudo docker-compose up -d --build
```

### **Option 2: Upload Fixed Files (If Not Using Git)**

```bash
# On your local machine
cd d:\CTFD\Web_Challenges\Cookie_chall\Ctf_cookie

# Upload fixed files to EC2
scp -i your-key.pem .dockerignore ubuntu@your-ec2-ip:~/Web_Cookie_chall/
scp -i your-key.pem Dockerfile ubuntu@your-ec2-ip:~/Web_Cookie_chall/
scp -i your-key.pem docker-compose.yml ubuntu@your-ec2-ip:~/Web_Cookie_chall/

# Then on EC2
ssh -i your-key.pem ubuntu@your-ec2-ip
cd ~/Web_Cookie_chall
sudo docker-compose down
sudo docker-compose up -d --build
```

### **Option 3: Manual Fix on EC2 (Quick)**

```bash
# On EC2
cd ~/Web_Cookie_chall

# Fix .dockerignore - remove package-lock.json exclusion
sed -i '/package-lock.json/d' .dockerignore

# Fix Dockerfile - change npm ci to npm install
sed -i 's/npm ci --production --silent/npm install --production --silent/g' Dockerfile

# Fix docker-compose.yml - remove version line
sed -i '/^version:/d' docker-compose.yml

# Rebuild and deploy
sudo docker-compose down
sudo docker-compose up -d --build
```

---

## 🎯 Expected Output

After running `sudo docker-compose up -d --build`, you should see:

```
[+] Building 45.2s (12/12) FINISHED
 => [internal] load build definition from Dockerfile
 => [internal] load .dockerignore
 => [internal] load metadata for docker.io/library/node:18-alpine
 => [1/6] FROM docker.io/library/node:18-alpine
 => [2/6] WORKDIR /app
 => [3/6] COPY package*.json ./
 => [4/6] RUN npm install --production --silent  ✓
 => [5/6] COPY . .
 => [6/6] RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
 => exporting to image
 => => naming to docker.io/library/web_cookie_chall-app

[+] Running 2/2
 ✔ Container jwt-ctf-mongo  Started
 ✔ Container jwt-ctf-app    Started
```

---

## ✅ Verify Deployment

```bash
# Check containers are running
sudo docker-compose ps

# Should show:
# NAME              STATE       PORTS
# jwt-ctf-app       Up          0.0.0.0:3000->3000/tcp
# jwt-ctf-mongo     Up          0.0.0.0:27017->27017/tcp

# Test the app
curl http://localhost:3000

# View logs
sudo docker-compose logs -f
```

---

## 🌐 Access Your App

```
http://your-ec2-public-ip:3000
```

---

## 📝 What Changed in Files

### **.dockerignore**
**Before:**
```
node_modules/
npm-debug.log*
package-lock.json  ← This was the problem!
```

**After:**
```
node_modules/
npm-debug.log*
# package-lock.json removed - needed for npm install
```

### **Dockerfile**
**Before:**
```dockerfile
RUN npm ci --production --silent
```

**After:**
```dockerfile
RUN npm install --production --silent
```

### **docker-compose.yml**
**Before:**
```yaml
version: '3.8'  ← Obsolete warning

services:
  app:
    ...
```

**After:**
```yaml
services:
  app:
    ...
```

---

## 🆘 If You Still Get Errors

### **Error: "Cannot find package.json"**
```bash
# Make sure you're in the right directory
cd ~/Web_Cookie_chall
ls -la package.json
```

### **Error: "npm ERR! missing script: start"**
```bash
# Check package.json has start script
cat package.json | grep "start"
```

### **Error: "Port 3000 already in use"**
```bash
# Stop existing containers
sudo docker-compose down
sudo docker ps -a
sudo docker-compose up -d --build
```

### **Error: "MongoDB connection failed"**
```bash
# Check MongoDB is running
sudo docker-compose logs mongo

# Restart MongoDB
sudo docker-compose restart mongo
```

---

## 🎉 Summary

The fix is simple:
1. ✅ Remove `package-lock.json` from `.dockerignore`
2. ✅ Change `npm ci` to `npm install` in Dockerfile
3. ✅ Remove `version: '3.8'` from docker-compose.yml
4. ✅ Rebuild: `sudo docker-compose up -d --build`

Your app should now build and run successfully! 🚀
