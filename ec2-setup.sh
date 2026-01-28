#!/bin/bash

# EC2 Setup Script for Docker Deployment
# Run this script on your EC2 instance to install Docker and Docker Compose

set -e  # Exit on error

echo "=========================================="
echo "  EC2 Docker Setup Script"
echo "=========================================="
echo ""

# Update system
echo "1. Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Docker if not already installed
echo ""
echo "2. Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    echo "✓ Docker installed successfully"
else
    echo "✓ Docker already installed: $(docker --version)"
fi

# Install Docker Compose
echo ""
echo "3. Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
    echo "✓ Docker Compose installed successfully"
else
    echo "✓ Docker Compose already installed: $(docker-compose --version)"
fi

# Verify installations
echo ""
echo "4. Verifying installations..."
docker --version
docker-compose --version

echo ""
echo "=========================================="
echo "  Setup Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Logout and login again (for docker group changes)"
echo "2. Navigate to your project directory"
echo "3. Run: docker-compose up -d --build"
echo ""
echo "Note: You may need to logout and login again for"
echo "docker group changes to take effect."
echo ""
