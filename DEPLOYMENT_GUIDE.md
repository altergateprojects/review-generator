# 🚀 Deployment Guide - Go Live!

## Option 1: Vercel (Recommended - Easiest & Free)

### Why Vercel?
- ✅ **Free tier** with generous limits
- ✅ **Automatic HTTPS**
- ✅ **Global CDN**
- ✅ **Easy environment variables**
- ✅ **Auto-deploy from Git**

### Step-by-Step Deployment:

#### 1. Prepare Your Project

Make sure you have a `.gitignore` file (already created):
```
node_modules/
.env
.DS_Store
*.log
.vercel
```

#### 2. Install Vercel CLI

```bash
npm install -g vercel
```

#### 3. Login to Vercel

```bash
vercel login
```

Follow the prompts to login with your email or GitHub.

#### 4. Deploy

From your project root directory:

```bash
vercel
```

Answer the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → review-generator (or your choice)
- **Directory?** → ./ (current directory)
- **Override settings?** → No

#### 5. Add Environment Variables

After deployment, add your API key:

```bash
vercel env add GEMINI_API_KEY
```

Paste your Gemini API key when prompted.

Select:
- **Production** → Yes
- **Preview** → Yes
- **Development** → Yes

#### 6. Redeploy with Environment Variables

```bash
vercel --prod
```

#### 7. Done! 🎉

Your app is now live! Vercel will give you a URL like:
```
https://review-generator-xyz.vercel.app
```

### Update Frontend API URL

After deployment, you need to update the frontend to use the production API:

Edit `frontend/app.js`:
```javascript
// Change this line:
const API_BASE_URL = 'http://localhost:3000/api';

// To your production URL:
const API_BASE_URL = 'https://your-app-name.vercel.app/api';
```

Then redeploy:
```bash
vercel --prod
```

---

## Option 2: Render (Alternative Free Option)

### Step-by-Step:

1. **Create account** at https://render.com

2. **Create New Web Service**
   - Connect your GitHub repository
   - Or upload your code

3. **Configure:**
   - **Name**: review-generator
   - **Environment**: Node
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: Free

4. **Add Environment Variables:**
   - `GEMINI_API_KEY` = your_api_key
   - `NODE_ENV` = production

5. **Deploy** - Render will build and deploy automatically

6. **Static Site for Frontend:**
   - Create another service for frontend
   - Type: Static Site
   - Build Command: (leave empty)
   - Publish Directory: `frontend`

---

## Option 3: Railway (Another Alternative)

### Step-by-Step:

1. **Create account** at https://railway.app

2. **New Project** → Deploy from GitHub

3. **Add Environment Variables:**
   - `GEMINI_API_KEY`
   - `PORT` = 3000

4. **Deploy** - Railway handles the rest

---

## Option 4: Your Own Server (VPS)

### Requirements:
- Ubuntu/Debian server
- Node.js installed
- Domain name (optional)

### Steps:

1. **SSH into your server**

2. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone/Upload your project**

4. **Install dependencies:**
```bash
cd backend
npm install
```

5. **Create .env file:**
```bash
nano .env
```
Add your `GEMINI_API_KEY`

6. **Install PM2 (process manager):**
```bash
sudo npm install -g pm2
```

7. **Start the app:**
```bash
pm2 start backend/server.js --name review-generator
pm2 save
pm2 startup
```

8. **Setup Nginx (reverse proxy):**
```bash
sudo apt install nginx
```

Create config:
```bash
sudo nano /etc/nginx/sites-available/review-generator
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/your/project/frontend;
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable:
```bash
sudo ln -s /etc/nginx/sites-available/review-generator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

9. **Setup SSL (free with Let's Encrypt):**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔧 Post-Deployment Checklist

### 1. Update Frontend API URL
Change `API_BASE_URL` in `frontend/app.js` to your production URL

### 2. Test All Features
- ✅ Star rating selection
- ✅ Language selector
- ✅ Tag selection
- ✅ Review generation
- ✅ Copy & redirect to Google
- ✅ Regenerate function

### 3. Configure CORS (if needed)
If frontend and backend are on different domains, update `backend/server.js`:

```javascript
app.use(cors({
  origin: 'https://your-frontend-domain.com'
}));
```

### 4. Monitor API Usage
Check your Gemini API usage at:
https://aistudio.google.com/app/apikey

### 5. Set Up Custom Domain (Optional)
- Buy domain from Namecheap, GoDaddy, etc.
- Point DNS to your deployment
- Vercel: Add domain in project settings
- Others: Update A/CNAME records

---

## 📊 Free Tier Limits

### Vercel:
- ✅ 100 GB bandwidth/month
- ✅ Unlimited requests
- ✅ Automatic SSL
- ✅ Global CDN

### Gemini API:
- ✅ 15 requests/minute
- ✅ 1,500 requests/day
- ✅ Free tier (no credit card)

---

## 🐛 Troubleshooting

### "API key not found"
- Make sure you added `GEMINI_API_KEY` in environment variables
- Redeploy after adding env vars

### "CORS error"
- Update CORS settings in `backend/server.js`
- Allow your frontend domain

### "Cannot connect to API"
- Check if backend is running
- Verify API_BASE_URL in frontend
- Check firewall/security groups

### "Rate limit exceeded"
- You've hit Gemini API limits
- Wait or upgrade to paid tier

---

## 🎯 Quick Deploy with Vercel (5 minutes)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel

# 4. Add API key
vercel env add GEMINI_API_KEY

# 5. Deploy to production
vercel --prod

# Done! 🎉
```

---

## 📱 Share Your Review Page

After deployment, share your review page URL:
- **QR Code**: Generate at https://qr-code-generator.com
- **Short Link**: Use bit.ly or your domain
- **WhatsApp**: Send directly to customers
- **Email**: Include in email signatures
- **Social Media**: Share on Facebook, Instagram

---

## 🔒 Security Best Practices

1. ✅ Never commit `.env` file
2. ✅ Use environment variables for secrets
3. ✅ Enable rate limiting (already configured)
4. ✅ Keep dependencies updated
5. ✅ Monitor API usage
6. ✅ Use HTTPS (automatic with Vercel)

---

**Need help?** Check the logs:
- Vercel: `vercel logs`
- PM2: `pm2 logs review-generator`
- Railway: Check dashboard logs
