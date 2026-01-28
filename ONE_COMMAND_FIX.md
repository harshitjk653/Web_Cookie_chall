# ⚡ One-Command Fix for EC2 Docker Deployment

## The Error You're Seeing:
```
sudo: docker-compose: Command not found
```

---

## ✅ The Fix (Copy This):

### **Single Command to Install Docker Compose:**

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose && docker-compose --version
```

---

## 🚀 Then Deploy Your App:

```bash
cd ~/Web_Cookie_chall && sudo docker-compose up -d --build
```

---

## 🎯 Access Your App:

```
http://YOUR-EC2-PUBLIC-IP:3000
```

Replace `YOUR-EC2-PUBLIC-IP` with your actual EC2 public IP address.

---

## 📋 Step-by-Step (If You Prefer):

### 1. Install Docker Compose
```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
docker-compose --version
```

### 2. Navigate to Project
```bash
cd ~/Web_Cookie_chall
```

### 3. Deploy
```bash
sudo docker-compose up -d --build
```

### 4. Check Status
```bash
sudo docker-compose ps
```

### 5. View Logs
```bash
sudo docker-compose logs -f
```

---

## ✅ That's It!

Your app should now be running at `http://your-ec2-ip:3000`

---

## 🔍 Verify It's Working:

```bash
# On EC2
curl http://localhost:3000

# From your browser
http://your-ec2-public-ip:3000
```

---

## ⚠️ Don't Forget:

Make sure your EC2 Security Group allows inbound traffic on port 3000!

**AWS Console → EC2 → Security Groups → Add Inbound Rule:**
- Type: Custom TCP
- Port: 3000
- Source: 0.0.0.0/0
