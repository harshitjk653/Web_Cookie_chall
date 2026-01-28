# 🐳 Docker Setup for JWT CTF Challenge

## Quick Start with Docker

### Prerequisites
- Install **Docker Desktop**: https://www.docker.com/products/docker-desktop

### Run the Application

**1. Start everything (app + MongoDB):**
```bash
docker-compose up -d
```

**2. Access the application:**
Open your browser and go to: **http://localhost:3000**

**3. Stop the application:**
```bash
docker-compose down
```

---

## Docker Commands

### View logs:
```bash
# All services
docker-compose logs -f

# Just the app
docker-compose logs -f app

# Just MongoDB
docker-compose logs -f mongo
```

### Restart services:
```bash
docker-compose restart
```

### Rebuild after code changes:
```bash
docker-compose up -d --build
```

### Remove everything (including database):
```bash
docker-compose down -v
```

---

## What's Included

- **Node.js App**: Your CTF challenge running on port 3000
- **MongoDB**: Database running on port 27017
- **Persistent Storage**: Database data is saved in a Docker volume

---

## Advantages of Docker

✅ No need to install Node.js or MongoDB  
✅ One command to start everything  
✅ Consistent environment across different machines  
✅ Easy to deploy to cloud platforms  
✅ Isolated from your system  

---

## Troubleshooting

**Port already in use:**
- Stop the npm server first (Ctrl+C)
- Or change ports in `docker-compose.yml`

**Docker not starting:**
- Make sure Docker Desktop is running
- Check if you have enough disk space

**Changes not reflecting:**
- Rebuild: `docker-compose up -d --build`

---

## Deploy to Cloud

You can deploy this Docker setup to:
- **Render.com** (supports Docker)
- **Railway.app** (auto-detects Docker)
- **DigitalOcean App Platform**
- **AWS ECS/Fargate**
- **Google Cloud Run**

Just push your code to GitHub and connect it to these platforms!
