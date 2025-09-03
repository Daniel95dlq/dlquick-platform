# Deployment setup for DLQuick on AWS

## Option 1: AWS Amplify (Recommended)
1. Push code to GitHub repository
2. Connect GitHub repo to AWS Amplify
3. Use the amplify.yml configuration file
4. Auto-deploy on every push

## Option 2: AWS S3 + CloudFront
1. Build the static export: npm run build && npm run export
2. Upload to S3 bucket
3. Enable static website hosting
4. Configure CloudFront distribution

## Option 3: AWS EC2 with PM2
1. Launch EC2 instance (t3.micro for testing)
2. Install Node.js and PM2
3. Clone repository
4. Run: npm install && pm2 start npm -- start

## Environment Variables Needed:
- NEXT_PUBLIC_API_URL=https://api.dlquick.co.uk
- NEXT_PUBLIC_STRIPE_KEY=pk_live_...
- DATABASE_URL=postgresql://...

## Domain Configuration:
- Primary: dlquick.co.uk
- CDN: cdn.dlquick.co.uk
- API: api.dlquick.co.uk
