# 🚀 Contabo VPS-ல் Skyrovix Website-ஐ Live செய்வது எப்படி? (Complete Live Deployment Guide)

இந்த guide-ஐ பயன்படுத்தி உங்களது **Contabo VPS (Ubuntu 22.04 / 24.04)** சர்வரில் Skyrovix Learning Platform-ஐ சில நிமிடங்களில் 100% Live செய்ய முடியும்.

---

## 📋 தேவைகள் (Prerequisites)

1. **Contabo VPS** (Ubuntu 22.04 அல்லது 24.04 LTS தேர்ந்தெடுக்கவும்).
2. Contabo வழங்கிய **Server IPv4 Address** மற்றும் **Root Password**.
3. உங்களது **Domain Name** (எ.கா: `skyrovix.com` - GoDaddy, Hostinger, Namecheap அல்லது Cloudflare).

---

## ⚡ முறை 1: 1-Click தானியங்கி முறை (Recommended - Fastest)

### படி 1: சர்வரில் SSH மூலம் Login செய்யவும்
உங்கள் கணினியில் (Windows PowerShell, Command Prompt அல்லது Mac/Linux Terminal) திறந்து டைப் செய்யவும்:
```bash
ssh root@YOUR_CONTABO_SERVER_IP
```
*(Contabo மின்னஞ்சலில் அனுப்பிய root கடவுச்சொல்லை உள்ளிடவும்)*

### படி 2: இந்த ஒற்றை வரியை இயக்கவும் (Run 1-Click Script)
```bash
curl -fsSL https://raw.githubusercontent.com/skyrovix/SKYROVIX-LEARNING-PLATFORM/main/deploy/contabo-setup.sh | bash
```

இந்த ஸ்கிரிப்ட் தானாகவே:
1. Ubuntu packages-ஐ அப்டேட் செய்யும்.
2. Node.js 20 LTS, NPM, Git, Nginx, UFW, PM2 ஆகியவற்றை நிறுவும்.
3. GitHub-லிருந்து உங்களது code-ஐ clone செய்து `npm install` மற்றும் `npm run build` செய்யும்.
4. Backend API-ஐ PM2 மூலம் 24/7 background-ல் இயங்க வைக்கும்.
5. Nginx Reverse Proxy-ஐ configure செய்து site-ஐ live ஆக்கும்!

---

## 🛠️ முறை 2: படி படியாக செய்யும் முறை (Manual Step-by-Step)

### படி 1: சர்வரை அப்டேட் செய்யவும்
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl wget ufw nginx build-essential
```

### படி 2: Node.js 20 LTS நிறுவவும்
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### படி 3: Firewall (UFW) போர்ட்களை திறக்கவும்
```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

### படி 4: Code-ஐ Clone செய்து Build செய்யவும்
```bash
sudo mkdir -p /var/www
cd /var/www
sudo git clone https://github.com/skyrovix/SKYROVIX-LEARNING-PLATFORM.git skyrovix
cd skyrovix
sudo chown -R $USER:$USER /var/www/skyrovix

# Dependencies install & Build
npm install
npm run build
```

### படி 5: Express Backend API-ஐ PM2 மூலம் இயக்கவும்
```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u root --hp /root
```

### படி 6: Nginx-ஐ Configure செய்யவும்
```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/skyrovix
sudo ln -sf /etc/nginx/sites-available/skyrovix /etc/nginx/sites-enabled/skyrovix
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx syntax சரிபார்க்கவும்
sudo nginx -t

# Nginx-ஐ reload செய்யவும்
sudo systemctl reload nginx
```

இப்போது உங்கள் பிரவுசரில் `http://YOUR_CONTABO_SERVER_IP` என்று அடித்தால் உங்கள் Skyrovix website உடனடியாக திறக்கும்! 🎉

---

## 🌐 படி 7: உங்கள் Domain Name-ஐ இணைப்பது எப்படி? (Domain Setup)

GoDaddy, Hostinger, Namecheap அல்லது Cloudflare DNS Settings-ல் சென்று பின்வரும் **A Records** சேர்க்கவும்:

| Type | Name / Host | Value / Points to | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `YOUR_CONTABO_SERVER_IP` | Automatic / 300 |
| **A** | `www` | `YOUR_CONTABO_SERVER_IP` | Automatic / 300 |

DNS சேமித்த பிறகு, `/etc/nginx/sites-available/skyrovix` ஃபைலைத் திறந்து உங்களது domain பெயரை மாற்றவும்:
```bash
sudo nano /etc/nginx/sites-available/skyrovix
```
`server_name yourdomain.com www.yourdomain.com;` என்ற வரியை உங்களது domain பெயராக மாற்றவும் (எ.கா: `server_name skyrovix.in www.skyrovix.in;`).
Save செய்ய: `Ctrl + O`, பின் `Enter`, பின் `Ctrl + X`.

Nginx-ஐ reload செய்யவும்:
```bash
sudo systemctl reload nginx
```

---

## 🔒 படி 8: இலவச SSL (HTTPS) சான்றிதழ் நிறுவுவது எப்படி? (Free SSL)

Let's Encrypt Certbot மூலம் 1 நிமிடத்தில் இலவசமாக வாழ்நாள் SSL அமைக்க:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
*(உங்கள் email முகவரியை உள்ளிட்டு விதிமுறைகளை ஏற்கவும்: `Y`)*

இப்போது உங்கள் தளம் பாதுகாப்பான **`https://yourdomain.com`** ஆக மாறிவிடும்! 🔐

---

## 🗄️ படி 9: SQL Database Import செய்வது எப்படி?

Contabo சர்வரில் MySQL அல்லது PostgreSQL-ல் `database/schema.sql` ஃபைலை ஒரே கட்டளையில் import செய்யலாம்:

### MySQL முறை:
```bash
sudo apt install -y mysql-server
sudo mysql -u root -p < /var/www/skyrovix/database/schema.sql
```

### PostgreSQL முறை:
```bash
sudo apt install -y postgresql postgresql-contrib
sudo -u postgres psql -f /var/www/skyrovix/database/schema.sql
```

---

## 🔄 எதிர்காலத்தில் Code-ஐ Update செய்வது எப்படி?

GitHub-ல் நீங்கள் புதிய மாற்றங்களை push செய்த பிறகு, சர்வரில் update செய்ய இந்த 3 கட்டளைகளை மட்டும் இயக்கினால் போதும்:
```bash
cd /var/www/skyrovix
git pull origin main
npm run build
pm2 restart all
```

---

## 📊 பயனுள்ள PM2 & Nginx கட்டளைகள்

- **Backend Status பார்க்க:** `pm2 status`
- **Backend Logs பார்க்க:** `pm2 logs skyrovix-backend`
- **Backend Restart செய்ய:** `pm2 restart skyrovix-backend`
- **Nginx Status பார்க்க:** `sudo systemctl status nginx`
- **Nginx Restart செய்ய:** `sudo systemctl restart nginx`

