# Quick Setup Guide - Google Gemini Integration

## ✅ Project Successfully Migrated to Google Gemini API

The project is now using **Google Gemini API** (gemini-1.5-flash model) instead of Anthropic Claude.

## 🚀 Current Status

- ✅ Backend server running on `http://localhost:3000`
- ✅ Frontend server running on `http://localhost:8080`
- ✅ Gemini AI package installed
- ⚠️ **Need to add your Gemini API key**

## 📝 Next Steps

### 1. Get Your Free Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Copy the generated API key (starts with `AIza...`)

### 2. Add API Key to Project

Edit the file `backend/.env` and replace the placeholder:

```bash
GEMINI_API_KEY=AIzaSy...your_actual_key_here
```

### 3. Restart Backend Server

After adding your API key, the backend will automatically detect it. If not, restart:

```bash
# Stop the current backend (Ctrl+C in terminal)
# Then restart:
cd backend
npm start
```

### 4. Test the Application

1. Open your browser to: **http://localhost:8080**
2. Select a star rating (1-5 stars)
3. Choose experience tags (optional)
4. Add a personal note (optional)
5. Click **"Generate My Review"**
6. See your AI-generated review!
7. Click **"Copy & Open Google Reviews"**

## 🎨 Customize Your Business

Edit `config.js` in the root directory:

```javascript
module.exports = {
  BUSINESS_NAME: "Your Business Name",
  BUSINESS_TYPE: "restaurant", // or "salon", "shop", etc.
  GOOGLE_REVIEW_URL: "https://g.page/r/YOUR_PLACE_ID/review",
  LOGO_URL: "", // Optional: your logo URL
  BRAND_COLOR: "#4A90D9", // Your brand color
  CUSTOM_TAGS: [] // Optional: custom experience tags
};
```

## 🔑 How to Find Your Google Review URL

1. Go to [Google Business Profile](https://business.google.com/)
2. Select your business
3. Click on "Get more reviews"
4. Copy the review link (format: `https://g.page/r/YOUR_PLACE_ID/review`)

## 💡 Gemini API Benefits

- **Free Tier**: 15 requests per minute, 1,500 requests per day
- **Fast**: gemini-1.5-flash is optimized for speed
- **High Quality**: Generates natural, human-sounding reviews
- **High Temperature (0.95)**: Ensures unique variations every time

## 🛡️ Security Features

- ✅ Rate limiting (10 requests per hour per IP)
- ✅ Input validation
- ✅ Honeypot bot protection
- ✅ API key stored securely on backend
- ✅ No customer data logging

## 📱 Share Your Review Page

Once configured, share your review page via:
- QR codes on receipts
- WhatsApp/SMS messages
- Email signatures
- Social media posts
- Business cards

## 🐛 Troubleshooting

### "API configuration error"
- Make sure you've added your `GEMINI_API_KEY` to `backend/.env`
- Restart the backend server

### "API rate limit reached"
- Gemini free tier: 15 requests/minute
- Wait a minute and try again
- Consider upgrading for higher limits

### Frontend can't connect to backend
- Make sure backend is running on port 3000
- Check browser console for CORS errors
- Verify `API_BASE_URL` in `frontend/app.js`

## 📊 API Usage Monitoring

Monitor your Gemini API usage at:
[Google AI Studio - API Keys](https://makersuite.google.com/app/apikey)

## 🚀 Deploy to Production

When ready to deploy:

1. Push code to GitHub
2. Deploy to Vercel: `vercel`
3. Add `GEMINI_API_KEY` in Vercel dashboard
4. Update `API_BASE_URL` in frontend to your production URL

---

**Need Help?** Check the main README.md for detailed documentation.
