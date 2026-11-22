#!/usr/bin/env bash
# ==============================================================================
# Skyrovix Learning Platform - 1-Click Automated Setup for Contabo VPS (Ubuntu)
# ==============================================================================

set -e

echo "=========================================================="
echo "🚀 Starting Skyrovix Deployment on Contabo VPS"
echo "=========================================================="

# 1. Update system packages
echo "📦 Updating Ubuntu package repositories..."
sudo apt update && sudo apt upgrade -y

# 2. Install essential dependencies
echo "📦 Installing Git, Curl, Nginx, UFW, Build essentials..."
sudo apt install -y git curl wget ufw nginx build-essential

# 3. Install Node.js 20 LTS (if not installed)
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js 20 LTS..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi

echo "✅ Node.js: $(node -v)"
echo "✅ NPM: $(npm -v)"

# 4. Install PM2 globally
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2 process manager..."
    sudo npm install -g pm2
fi

# 5. Configure UFW Firewall
echo "🛡️ Configuring firewall rules..."
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

# 6. Clone or Update Application
APP_DIR="/var/www/skyrovix"
if [ ! -d "$APP_DIR" ]; then
    echo "📂 Cloning Skyrovix repository to $APP_DIR..."
    sudo git clone https://github.com/skyrovix/SKYROVIX-LEARNING-PLATFORM.git $APP_DIR
    sudo chown -R $USER:$USER $APP_DIR
else
    echo "📂 Skyrovix repository already exists at $APP_DIR. Pulling latest main branch..."
    cd $APP_DIR
    git pull origin main
fi

cd $APP_DIR

# 7. Install dependencies
echo "📦 Installing npm dependencies..."
npm install

# 8. Build production frontend
echo "🔨 Building production Vite frontend..."
npm run build

# 9. Start / Restart Backend using PM2
echo "⚡ Starting Express Backend (Port 5000) with PM2..."
pm2 start ecosystem.config.cjs || pm2 restart ecosystem.config.cjs
pm2 save
pm2 startup systemd -u $USER --hp $HOME || true

# 10. Configure Nginx
echo "🌐 Configuring Nginx reverse proxy..."
sudo cp deploy/nginx.conf /etc/nginx/sites-available/skyrovix
sudo ln -sf /etc/nginx/sites-available/skyrovix /etc/nginx/sites-enabled/skyrovix
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

echo "=========================================================="
echo "🎉 DEPLOYMENT COMPLETE! Skyrovix is live on your Contabo VPS!"
echo "🌐 Open your Contabo Server IP in your browser to view your site."
echo "🔒 To setup free SSL for your domain, run:"
echo "   sudo apt install certbot python3-certbot-nginx -y"
echo "   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com"
echo "=========================================================="
