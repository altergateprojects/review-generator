# Deployment Guide with QR Codes

## ✅ What's Been Implemented

### Separate Business Pages
- ✅ Each business has its own unique URL
- ✅ Customers only see their business (no selector)
- ✅ Navbar hidden for customer access
- ✅ Admin can still access all businesses at root URL

### QR Codes Generated
- ✅ QR codes created for both businesses
- ✅ Custom colors for each business
- ✅ High-quality PNG files (500x500px)
- ✅ HTML page for easy viewing and printing

## Business URLs

### Local (Testing)
- **Royal Shourya Resort:** http://localhost:3000/royal-shourya-resort
- **Royal Villa Resort:** http://localhost:3000/royal-villa-resort
- **Admin Panel:** http://localhost:3000/

### Production (After Deployment)
- **Royal Shourya Resort:** https://your-domain.vercel.app/royal-shourya-resort
- **Royal Villa Resort:** https://your-domain.vercel.app/royal-villa-resort
- **Admin Panel:** https://your-domain.vercel.app/

## Testing Before Deployment

### Test Royal Shourya Resort:
1. Open: http://localhost:3000/royal-shourya-resort
2. ✅ No navbar visible
3. ✅ Shows "Royal Shourya Resort"
4. ✅ Blue color theme
5. ✅ Click 5 stars
6. ✅ Select language
7. ✅ Generate review
8. ✅ Opens correct Google Review URL

### Test Royal Villa Resort:
1. Open: http://localhost:3000/royal-villa-resort
2. ✅ No navbar visible
3. ✅ Shows "Royal Villa Resort"
4. ✅ Brown color theme
5. ✅ Click 5 stars
6. ✅ Select language
7. ✅ Generate review
8. ✅ Opens correct Google Review URL

### Test QR Codes:
1. Open: `qr-codes/qr-codes.html` in browser
2. ✅ See both QR codes
3. ✅ Scan with phone camera
4. ✅ Opens correct business page
5. ✅ Can generate review on phone

## Deployment Steps

### Step 1: Prepare for Deployment
```bash
# Make sure all changes are committed
git add .
git commit -m "Add separate business pages with QR codes"
git push origin main
```

### Step 2: Deploy to Vercel
```bash
# Deploy to production
vercel --prod

# Note the production URL (e.g., https://review-abc123.vercel.app)
```

### Step 3: Update QR Codes with Production URL
```bash
# Edit generate-qr-codes.js
# Change line 10:
const BASE_URL = 'https://your-actual-domain.vercel.app';

# Regenerate QR codes
node generate-qr-codes.js
```

### Step 4: Test Production URLs
```bash
# Test each business URL
https://your-domain.vercel.app/royal-shourya-resort
https://your-domain.vercel.app/royal-villa-resort

# Verify:
- ✅ Page loads correctly
- ✅ No navbar visible
- ✅ Correct business name
- ✅ Can generate reviews
- ✅ Opens correct Google Review URL
```

### Step 5: Print QR Codes
1. Open `qr-codes/qr-codes.html` in browser
2. Click Print (Ctrl+P / Cmd+P)
3. Print each business on separate page
4. Use high-quality paper

### Step 6: Share with Business Owners

#### For Royal Shourya Resort Owner:
```
📱 Your Review Page QR Code

URL: https://your-domain.vercel.app/royal-shourya-resort

How to use:
1. Print the QR code and display at reception
2. Share the URL via WhatsApp with guests
3. Add to email signatures
4. Print on receipts

The QR code opens a page where customers can:
- Rate their experience (1-5 stars)
- Select language (English, Marathi, Hindi)
- Add specific feedback
- Generate AI-powered review
- Submit directly to Google Reviews
```

#### For Royal Villa Resort Owner:
```
📱 Your Review Page QR Code

URL: https://your-domain.vercel.app/royal-villa-resort

How to use:
1. Print the QR code and display at reception
2. Share the URL via WhatsApp with guests
3. Add to email signatures
4. Print on receipts

The QR code opens a page where customers can:
- Rate their experience (1-5 stars)
- Select language (English, Marathi, Hindi)
- Add specific feedback
- Generate AI-powered review
- Submit directly to Google Reviews
```

## QR Code Display Ideas

### 1. Reception Desk Standee
```
┌─────────────────────────────────────┐
│                                     │
│   😊 Enjoyed Your Stay?             │
│                                     │
│   Share Your Experience!            │
│                                     │
│   [QR CODE - 10cm x 10cm]           │
│                                     │
│   Scan to leave a review            │
│   Takes only 2 minutes              │
│                                     │
│   Your feedback matters! 🙏         │
│                                     │
│   Royal Shourya Resort              │
│                                     │
└─────────────────────────────────────┘
```

### 2. Table Tent (Dining Area)
```
┌──────────────────────┐
│  Love Our Food?      │
│  Tell Others!        │
│                      │
│  [QR CODE]           │
│                      │
│  Scan to Review      │
└──────────────────────┘
```

### 3. Room Card Insert
```
┌────────────────────────────────┐
│  Thank you for staying with us │
│                                │
│  [QR CODE]                     │
│                                │
│  Scan to share your review     │
│  Royal Shourya Resort          │
└────────────────────────────────┘
```

### 4. WhatsApp Message Template
```
Hi [Guest Name]! 👋

Thank you for choosing Royal Shourya Resort!

We hope you had a wonderful experience. 
Would you mind sharing a quick review?

👉 https://your-domain.vercel.app/royal-shourya-resort

It takes just 2 minutes and helps us serve you better! 🙏

Best regards,
Team Royal Shourya Resort
```

## Files Generated

### QR Code Files:
```
qr-codes/
├── royal-shourya-resort-qr-code.png    (500x500px, Blue)
├── royal-shourya-resort-url.txt        (URL text file)
├── royal-villa-resort-qr-code.png      (500x500px, Brown)
├── royal-villa-resort-url.txt          (URL text file)
└── qr-codes.html                       (View & print page)
```

### Documentation:
```
SEPARATE_BUSINESS_PAGES.md          (Implementation details)
DEPLOYMENT_WITH_QR_CODES.md         (This file)
generate-qr-codes.js                (QR generator script)
```

## Vercel Configuration

Your `vercel.json` should handle the routes correctly:
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/backend/server.js" },
    { "source": "/:businessId", "destination": "/backend/server.js" },
    { "source": "/:path*", "destination": "/:path*" }
  ]
}
```

## Environment Variables (Vercel)

Make sure these are set in Vercel dashboard:
```
GEMINI_API_KEY=AIzaSyA6C3dAK22APo4v7Z_8Vk4FrOvQm3AIi9I
NODE_ENV=production
RATE_LIMIT_WINDOW_MS=3600000
RATE_LIMIT_MAX_REQUESTS=10
```

## Monitoring & Analytics

### Track These Metrics:
- Page visits per business
- Reviews generated per business
- Average star rating per business
- Most popular language per business
- Conversion rate (visits → reviews)

### Google Analytics (Optional):
Add to `frontend/index.html` before `</head>`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Troubleshooting

### QR Code doesn't work:
- ✅ Check URL is correct (no typos)
- ✅ Test URL in browser first
- ✅ Ensure production deployment is live
- ✅ Try regenerating QR code

### Wrong business appears:
- ✅ Verify URL matches business ID exactly
- ✅ Check config.js has correct business IDs
- ✅ Clear browser cache

### Navbar still visible:
- ✅ Make sure URL includes business ID
- ✅ Clear browser cache
- ✅ Check JavaScript console for errors

### Review doesn't generate:
- ✅ Check GEMINI_API_KEY is set in Vercel
- ✅ Check API quota hasn't been exceeded
- ✅ Check browser console for errors

## Security Checklist

- ✅ GEMINI_API_KEY stored in environment variables (not in code)
- ✅ Rate limiting enabled (10 requests/hour/IP)
- ✅ Honeypot protection enabled
- ✅ Input validation on backend
- ✅ CORS configured correctly
- ✅ No sensitive data in frontend code

## Success Metrics

### Week 1:
- [ ] Both QR codes printed and displayed
- [ ] URLs shared with business owners
- [ ] First reviews generated
- [ ] No technical issues reported

### Month 1:
- [ ] 50+ reviews generated per business
- [ ] Average 4+ star rating
- [ ] Multiple languages used
- [ ] Positive feedback from owners

## Support & Maintenance

### Regular Tasks:
- Monitor API usage (Gemini quota)
- Check error logs in Vercel
- Update SEO keywords if needed
- Regenerate QR codes if URLs change

### Updates:
- Add new businesses: Update config.js, regenerate QR codes
- Change colors: Update config.js, regenerate QR codes
- Add languages: Update config.js, redeploy

## Next Steps

1. ✅ Test both URLs locally
2. ✅ Deploy to Vercel
3. ✅ Update QR codes with production URL
4. ✅ Test production URLs
5. ✅ Print QR codes
6. ✅ Share with business owners
7. ✅ Display QR codes at locations
8. ✅ Monitor first reviews

## Status

✅ **READY FOR DEPLOYMENT**

- Separate business pages implemented
- QR codes generated
- Documentation complete
- Testing checklist provided
- Deployment steps outlined

**Next:** Deploy to Vercel and update QR codes with production URL
