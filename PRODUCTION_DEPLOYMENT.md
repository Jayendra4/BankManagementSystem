# 🚀 Production Deployment Guide

## ✅ Changes Made for Production

### 1. API Configuration Updated
- **File**: `Frontend/src/services/api.js`
- **Changes**:
  - Added dynamic API base URL detection
  - Environment variable support
  - Automatic production/development detection
  - Debug logging for API URL

### 2. Vercel Configuration Updated
- **File**: `Frontend/vercel.json`
- **Changes**:
  - API proxy routes to your Render backend
  - Proper SPA routing

### 3. Environment Variables
- **File**: `Frontend/.env.production`
- **Contains**: Production API URL and app metadata

## 🔧 API URL Resolution Priority

The API base URL is determined by this priority:

1. **Environment Variable** (`VITE_API_BASE_URL`)
2. **Production Detection** (hostname not localhost)
3. **Development Proxy** (`/api`)

## 📋 Deployment Steps

### 1. Commit and Push Changes
```bash
git add .
git commit -m "Configure for production deployment"
git push origin main
```

### 2. Redeploy Frontend (Vercel)
- Your Vercel app will automatically redeploy on git push
- Or manually trigger redeploy in Vercel dashboard

### 3. Verify Backend (Render)
- Ensure your Render backend is running
- Check: https://bankbackend-vy7e.onrender.com/api/health

## 🧪 Testing Production

### 1. Check API Connection
Open browser console on your Vercel app and look for:
```
🔗 API Base URL: https://bankbackend-vy7e.onrender.com/api
🌐 Environment: {hostname: "your-vercel-app.vercel.app", isProduction: true}
```

### 2. Test Authentication
- Try login with existing accounts
- Test signup functionality
- Verify token storage

### 3. Test CRUD Operations
- Create new accounts
- Update account information
- Process transactions
- Delete accounts

## 🐛 Troubleshooting

### CORS Issues
If you get CORS errors, update your backend:
```javascript
// Backend server-mock.js
app.use(cors({
  origin: ['https://your-vercel-app.vercel.app', 'http://localhost:5173'],
  credentials: true
}));
```

### API Connection Issues
1. Check browser console for API URL logs
2. Verify backend is running: https://bankbackend-vy7e.onrender.com/api/health
3. Check network tab in browser dev tools

### Environment Variables
Ensure Vercel has access to environment variables:
- Add `VITE_API_BASE_URL` in Vercel dashboard
- Or rely on automatic detection

## 📊 Monitoring

### Add Health Check Endpoint
Add this to your backend if not already present:
```javascript
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

### Frontend Health Check
You can add this component to check API status:
```javascript
const ApiStatus = () => {
  const [status, setStatus] = useState('checking...');
  
  useEffect(() => {
    fetch(getCurrentApiUrl() + '/health')
      .then(() => setStatus('Connected'))
      .catch(() => setStatus('Disconnected'));
  }, []);
  
  return <div>API Status: {status}</div>;
};
```

## 🌐 Live URLs

After deployment:
- **Frontend**: Your Vercel URL
- **Backend**: https://bankbackend-vy7e.onrender.com
- **API Health**: https://bankbackend-vy7e.onrender.com/api/health

## 🔄 Future Updates

When making changes:
1. Test locally first
2. Update API base URL if backend changes
3. Commit and push to trigger redeploy
4. Test on production

---

**Your application is now configured for production!** 🎉
