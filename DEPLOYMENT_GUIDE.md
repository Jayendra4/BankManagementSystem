# 🚀 Bank Management System Deployment Guide

## 📱 Frontend Deployment

### Option 1: Vercel (Recommended)
1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   cd Frontend
   vercel --prod
   ```

3. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Automatic deployment on push

### Option 2: Netlify
1. **Build the project**
   ```bash
   cd Frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect GitHub repository

### Option 3: GitHub Pages
1. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/BankManagementSystem/',
     // ... rest of config
   })
   ```

2. **Deploy using script**
   ```bash
   cd Frontend
   chmod +x deploy-gh-pages.sh
   ./deploy-gh-pages.sh
   ```

## 🗄️ Backend Deployment

### Option 1: Railway (Recommended)
1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login and Deploy**
   ```bash
   cd Backend
   railway login
   railway init
   railway up
   ```

3. **Set Environment Variables**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set PORT=10000
   ```

### Option 2: Render
1. **Go to [render.com](https://render.com)**
2. **Create Web Service**
   - Connect GitHub repository
   - Select `Backend` folder as root
   - Use `render.yaml` configuration

### Option 3: Heroku
1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create and Deploy**
   ```bash
   cd Backend
   heroku create your-app-name
   git subtree push --prefix Backend heroku main
   ```

## 🔗 Connecting Frontend to Backend

### Update API Configuration
After deploying backend, update the frontend API URL:

**Frontend/src/services/api.js**
```javascript
const API_BASE_URL = 'https://your-backend-url.railway.app/api';
```

**For Vercel, update vercel.json**
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend-url.railway.app/api/$1"
    }
  ]
}
```

## 🌐 Environment Variables

### Backend (.env)
```env
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://your-connection-string
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

## 📋 Deployment Checklist

### Pre-deployment
- [ ] Remove all console.log statements
- [ ] Update API base URLs
- [ ] Set proper environment variables
- [ ] Test build locally: `npm run build`
- [ ] Update README with deployment URLs

### Post-deployment
- [ ] Test all API endpoints
- [ ] Verify frontend-backend connection
- [ ] Test authentication flow
- [ ] Check responsive design
- [ ] Monitor for errors

## 🚀 Quick Deploy Commands

### Frontend (Vercel)
```bash
cd Frontend
vercel --prod
```

### Backend (Railway)
```bash
cd Backend
railway up
```

## 📊 Monitoring

### Add Health Checks
```javascript
// Backend server-mock.js
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## 🐛 Troubleshooting

### Common Issues
1. **CORS Errors**: Update CORS origin in backend
2. **API Connection**: Check if backend URL is correct
3. **Build Failures**: Verify all dependencies are installed
4. **Environment Variables**: Ensure all required variables are set

### Debug Commands
```bash
# Check build
npm run build

# Test backend locally
cd Backend && node server-mock.js

# Check logs
railway logs
heroku logs --tail
```

## 📞 Support

For deployment issues:
1. Check platform-specific documentation
2. Review error logs
3. Verify environment configuration
4. Test locally before deploying

---

**Your Live Application URLs:**
- Frontend: (Will be provided after deployment)
- Backend: (Will be provided after deployment)
- Repository: https://github.com/Jayendra4/BankManagementSystem
