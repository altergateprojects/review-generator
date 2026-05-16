# Quick Start - Separate Business Pages

## ✅ What's Done

Each business now has its own private review page. Customers can't see other businesses.

## URLs

### Royal Shourya Resort
**Local:** http://localhost:3000/royal-shourya-resort
**Production:** https://your-domain.vercel.app/royal-shourya-resort

### Royal Villa Resort
**Local:** http://localhost:3000/royal-villa-resort
**Production:** https://your-domain.vercel.app/royal-villa-resort

## QR Codes

✅ **Generated!** Open `qr-codes/qr-codes.html` in your browser to see them.

### What You'll See:
- 2 QR codes (one per business)
- Each QR code in business brand color
- Buttons to download, copy URL, or open page
- Print-friendly layout

## Test Now

### Test Royal Shourya Resort:
1. Open: http://localhost:3000/royal-shourya-resort
2. You should see:
   - ✅ No business selector
   - ✅ Only "Royal Shourya Resort" name
   - ✅ Blue color theme
3. Click 5 stars, generate review
4. Should open: https://g.page/r/Cd21nPf9tKmqEBE/review

### Test Royal Villa Resort:
1. Open: http://localhost:3000/royal-villa-resort
2. You should see:
   - ✅ No business selector
   - ✅ Only "Royal Villa Resort" name
   - ✅ Brown color theme
3. Click 5 stars, generate review
4. Should open: https://g.page/r/CSXp9WVaZAtjEBM/review

### Test QR Codes:
1. Open: `qr-codes/qr-codes.html` in browser
2. Scan QR code with your phone
3. Should open the correct business page
4. Try generating a review on phone

## Deploy to Production

```bash
# 1. Commit changes
git add .
git commit -m "Add separate business pages"
git push

# 2. Deploy
vercel --prod

# 3. Note your production URL
# Example: https://review-abc123.vercel.app

# 4. Update QR codes with production URL
# Edit generate-qr-codes.js line 10:
const BASE_URL = 'https://your-actual-url.vercel.app';

# 5. Regenerate QR codes
node generate-qr-codes.js

# 6. Print QR codes from qr-codes/qr-codes.html
```

## Share with Business Owners

### Royal Shourya Resort:
```
Your Review Page: https://your-domain.vercel.app/royal-shourya-resort

Print the QR code and display at:
- Reception desk
- Dining area
- Room cards

Share URL via:
- WhatsApp messages to guests
- Email signatures
- Social media
```

### Royal Villa Resort:
```
Your Review Page: https://your-domain.vercel.app/royal-villa-resort

Print the QR code and display at:
- Reception desk
- Dining area
- Room cards

Share URL via:
- WhatsApp messages to guests
- Email signatures
- Social media
```

## How It Works

### Customer Experience:
1. Customer scans QR code or clicks link
2. Page opens with ONLY their business
3. Customer rates experience (1-5 stars)
4. Customer selects language (English/Marathi/Hindi)
5. Customer adds optional tags and notes
6. Customer clicks "Generate My Review"
7. AI generates personalized review
8. Customer clicks "Copy & Open Google Reviews"
9. Review copied, Google Reviews page opens
10. Customer pastes and submits

### Privacy:
- ✅ Each business has unique URL
- ✅ Customers can't see other businesses
- ✅ No business selector visible
- ✅ Direct access only

### Admin Access:
- Visit: http://localhost:3000/
- You'll see business selector
- Can test both businesses

## Files

```
qr-codes/
├── royal-shourya-resort-qr-code.png    ← Print this
├── royal-villa-resort-qr-code.png      ← Print this
└── qr-codes.html                       ← Open in browser

Documentation:
├── QUICK_START.md                      ← This file
├── SEPARATE_BUSINESS_PAGES.md          ← Full details
└── DEPLOYMENT_WITH_QR_CODES.md         ← Deployment guide
```

## Troubleshooting

**QR code shows business selector:**
- Make sure URL includes business ID: `/royal-shourya-resort`

**Wrong business appears:**
- Check URL matches business ID exactly

**Can't generate review:**
- Check server is running: `node backend/server.js`
- Check GEMINI_API_KEY in `backend/.env`

## Next Steps

1. ✅ Test both URLs in browser
2. ✅ Test QR codes with phone
3. ✅ Deploy to Vercel
4. ✅ Update QR codes with production URL
5. ✅ Print QR codes
6. ✅ Give to business owners

## Status

✅ **READY TO USE**

Server running on: http://localhost:3000
QR codes: Open `qr-codes/qr-codes.html`
