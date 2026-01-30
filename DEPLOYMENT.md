# Deployment Guide

## Production Deployment

### Prerequisites for Production
- Node.js v16+
- MongoDB Atlas (Cloud)
- Anthropic API Key
- Git
- Docker (optional)
- PM2 for process management

## Backend Deployment

### Option 1: Deploy to Heroku

1. **Install Heroku CLI**
```bash
# Windows
npm install -g heroku

# Or download from heroku.com/download
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
cd backend
heroku create your-app-name
```

4. **Add MongoDB Atlas**
```bash
heroku config:set MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
heroku config:set JWT_SECRET=your_production_secret_key
heroku config:set CLAUDE_API_KEY=sk-ant-xxxxx
heroku config:set NODE_ENV=production
```

5. **Deploy**
```bash
git push heroku main
```

6. **View Logs**
```bash
heroku logs --tail
```

### Option 2: Deploy to Railway

1. **Connect Railway to GitHub**
- Go to railway.app
- Connect your GitHub repository

2. **Add Environment Variables**
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your_production_secret_key
CLAUDE_API_KEY=sk-ant-xxxxx
NODE_ENV=production
PORT=5000
```

3. **Deploy**
- Railway auto-deploys on git push

### Option 3: Deploy to AWS EC2

1. **Launch EC2 Instance**
- Ubuntu 20.04 or later
- t2.micro or larger
- Open ports 22 (SSH), 80, 443

2. **Install Dependencies**
```bash
sudo apt update
sudo apt install nodejs npm git

# Install PM2
sudo npm install -g pm2
```

3. **Clone Repository**
```bash
git clone <your-repo>
cd My_Project/backend
```

4. **Setup Environment**
```bash
cp .env.example .env
# Edit .env with production values
```

5. **Install & Start**
```bash
npm install
pm2 start server.js --name "interview-api"
pm2 save
pm2 startup
```

6. **Setup NGINX Reverse Proxy**
```bash
sudo apt install nginx

# Create /etc/nginx/sites-available/default
# Add proxy config pointing to localhost:5000
sudo systemctl start nginx
```

## Frontend Deployment

### Option 1: Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
cd frontend
vercel
```

3. **Add Environment Variable**
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

### Option 2: Deploy to Netlify

1. **Build**
```bash
cd frontend
npm run build
```

2. **Drag & Drop**
- Go to netlify.com
- Drag the `build` folder

3. **Add Environment Variables**
- Site settings → Environment
- Add `REACT_APP_API_URL`

### Option 3: Deploy to AWS S3 + CloudFront

1. **Build**
```bash
cd frontend
npm run build
```

2. **Create S3 Bucket**
```bash
aws s3 mb s3://your-bucket-name
```

3. **Upload**
```bash
aws s3 sync build/ s3://your-bucket-name --delete
```

4. **Create CloudFront Distribution**
- Origin: S3 bucket
- Default root object: index.html

## Database Setup

### MongoDB Atlas (Recommended)

1. **Create Account**
- Go to mongodb.com/cloud/atlas
- Sign up

2. **Create Cluster**
- Choose free tier
- Select region
- Create database

3. **Get Connection String**
- Copy MONGODB_URI
- Add to .env files

4. **Enable Network Access**
- Add 0.0.0.0/0 for development
- Add specific IPs for production

## Environment Configuration

### Production Backend (.env)
```
MONGODB_URI=mongodb+srv://prod_user:secure_password@cluster.mongodb.net/interview-simulator?retryWrites=true&w=majority
JWT_SECRET=use_a_very_long_random_string_here_at_least_32_characters
CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxxxxxxxxxxxxx
PORT=5000
NODE_ENV=production
```

### Production Frontend (.env)
```
REACT_APP_API_URL=https://api.yourdomain.com/api
```

## Security Checklist

- [ ] Change JWT_SECRET to random 32+ char string
- [ ] Use HTTPS only
- [ ] Enable CORS only for your domain
- [ ] Set secure MongoDB user credentials
- [ ] Enable MongoDB IP whitelist
- [ ] Use environment variables for secrets
- [ ] Enable HTTPS on frontend
- [ ] Set secure headers (HELMET middleware)
- [ ] Enable rate limiting
- [ ] Regular security audits

## Performance Optimization

### Backend
- Enable gzip compression
- Implement caching
- Optimize database queries
- Use CDN for static files
- Monitor with APM tools

### Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle analysis
- Minification

## Monitoring & Logging

### Tools
- **PM2 Plus** - Process monitoring
- **Sentry** - Error tracking
- **New Relic** - Performance monitoring
- **CloudWatch** - AWS monitoring
- **Datadog** - Full monitoring platform

### Setup PM2 Monitoring
```bash
# Create PM2 account
pm2 install pm2-auto-pull
pm2 link <secret_key> <public_key>
```

## Backup Strategy

### Database
- Enable MongoDB Atlas automatic backups
- Set retention to 7+ days
- Test restore procedures

### Code
- Push to GitHub regularly
- Tag releases
- Maintain changelog

## Scaling Considerations

### Vertical Scaling
- Increase server size
- More RAM and CPU

### Horizontal Scaling
- Load balancer (AWS ALB, Nginx)
- Multiple backend instances
- Database replication

### Database Optimization
- Indexing frequently queried fields
- Sharding for large datasets
- Read replicas

## Maintenance

### Regular Tasks
- Monitor disk space
- Check error logs
- Update dependencies
- Security patches
- Database maintenance

### Update Process
```bash
# Test in staging first
npm update
npm audit
# Run tests
# Deploy to production
```

## Troubleshooting Production Issues

### High Latency
- Check database indexes
- Monitor API response times
- Check server resources

### Database Errors
- Check connection string
- Verify IP whitelist
- Monitor connection pool

### Frontend Issues
- Check browser console
- Monitor API calls
- Check CORS headers

### Claude API Errors
- Verify API key validity
- Check rate limits
- Monitor token usage

## Cost Estimation (Monthly)

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| MongoDB | 512MB | $57+ |
| Heroku | Deprecated | $7-50 |
| Railway | $5 credit | Pay as you go |
| AWS EC2 | 12 months | $5-20 |
| Vercel | Yes | $20+ |
| Netlify | Yes | $20+ |
| Anthropic API | N/A | $0.003 per 1K tokens |

## Disaster Recovery

1. **Regular Backups**
   - Database: Daily
   - Code: Git + GitHub

2. **Recovery Plan**
   - Document recovery procedures
   - Test recovery process quarterly
   - Maintain runbook

3. **Uptime SLA**
   - Set targets (99%, 99.5%, 99.9%)
   - Monitor and report
   - Implement redundancy
