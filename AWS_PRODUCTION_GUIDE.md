# 🚀 DLQuick AWS Production Deployment Guide

## 📋 Pre-requisites
- AWS Account with appropriate permissions
- GitHub account (for Amplify deployment)
- Domain name (dlquick.co.uk) configured in Route 53

## 🎯 Method 1: AWS Amplify (Recommended)

### Step 1: GitHub Repository
1. Create new repository on GitHub: `dlquick-platform`
2. Push local code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/dlquick-platform.git
git branch -M main
git push -u origin main
```

### Step 2: AWS Amplify Setup
1. Login to AWS Console → AWS Amplify
2. Click "New app" → "Host web app"
3. Choose GitHub → Select your repository
4. Configure build settings (use amplify.yml)
5. Review and deploy

### Step 3: Custom Domain
1. In Amplify console → Domain management
2. Add custom domain: dlquick.co.uk
3. Configure DNS records in Route 53

## 🎯 Method 2: AWS S3 + CloudFront

### Step 1: S3 Bucket Setup
```bash
# Create S3 bucket
aws s3 mb s3://dlquick-web-production

# Enable static website hosting
aws s3 website s3://dlquick-web-production --index-document index.html
```

### Step 2: Build and Deploy
```bash
# Build production version
npm run build

# Deploy to S3
aws s3 sync .next/static/ s3://dlquick-web-production/static/ --delete
aws s3 sync .next/server/ s3://dlquick-web-production/server/ --delete
```

### Step 3: CloudFront Distribution
1. Create CloudFront distribution
2. Origin: S3 bucket
3. Behaviors: Cache policies for static assets
4. Custom error pages for SPA routing

## 🎯 Method 3: AWS EC2 with PM2

### Step 1: EC2 Instance
```bash
# Launch t3.small instance (Ubuntu 22.04)
# Security Group: HTTP (80), HTTPS (443), SSH (22)
```

### Step 2: Server Setup
```bash
# Connect to EC2
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Clone repository
git clone https://github.com/YOUR_USERNAME/dlquick-platform.git
cd dlquick-platform

# Install dependencies
npm install

# Build production
npm run build

# Start with PM2
pm2 start npm --name "dlquick" -- start
pm2 save
pm2 startup
```

### Step 3: Nginx Reverse Proxy
```bash
# Install Nginx
sudo apt install nginx

# Configure Nginx
sudo nano /etc/nginx/sites-available/dlquick

# Nginx config:
server {
    listen 80;
    server_name dlquick.co.uk www.dlquick.co.uk;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Enable site
sudo ln -s /etc/nginx/sites-available/dlquick /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

## 🔒 SSL Certificate (Let's Encrypt)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d dlquick.co.uk -d www.dlquick.co.uk
```

## 🌍 Environment Variables
Create `.env.production` file:
```env
NEXT_PUBLIC_API_URL=https://api.dlquick.co.uk
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=...
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=...
STRIPE_SECRET_KEY=sk_live_...
```

## 📊 Monitoring & Logging
- CloudWatch for logs and metrics
- Route 53 health checks
- AWS WAF for security
- AWS Shield for DDoS protection

## 🚀 Production Checklist
- [ ] SSL certificate configured
- [ ] Custom domain working
- [ ] Database configured
- [ ] Environment variables set
- [ ] Monitoring enabled
- [ ] Backup strategy implemented
- [ ] CDN configured for assets
- [ ] Security headers configured

## 📈 Performance Optimization
- Enable gzip compression
- Configure browser caching
- Optimize images with CloudFront
- Use Redis for session storage
- Database connection pooling

## 🔧 Useful Commands
```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs dlquick

# Restart application
pm2 restart dlquick

# Update application
git pull
npm install
npm run build
pm2 restart dlquick
```

## 📞 Production URLs
- **Main Site**: https://dlquick.co.uk
- **API**: https://api.dlquick.co.uk
- **Admin**: https://admin.dlquick.co.uk
- **CDN**: https://cdn.dlquick.co.uk
