# Separate Business Pages - Customer Access

## Overview

Each business now has its own dedicated URL. Customers will only see their specific business - no business selector, no other businesses visible.

## Business URLs

### Royal Shourya Resort
**URL:** `http://localhost:3000/royal-shourya-resort`
**Production:** `https://your-domain.com/royal-shourya-resort`

### Royal Villa Resort
**URL:** `http://localhost:3000/royal-villa-resort`
**Production:** `https://your-domain.com/royal-villa-resort`

## How It Works

### Customer Experience:
1. Customer scans QR code or clicks link
2. Page loads directly with business branding (no selector shown)
3. Customer sees only their business name and logo
4. Customer rates, selects language, adds tags, writes note
5. Customer generates review
6. Review opens correct Google Review page for that business

### Admin Experience:
1. Admin visits root URL: `http://localhost:3000/`
2. Admin sees business selector (both businesses)
3. Admin can test both businesses

## URL Structure

```
/                           → Shows business selector (admin mode)
/royal-shourya-resort       → Royal Shourya Resort only
/royal-villa-resort         → Royal Villa Resort only
/invalid-business           → 404 error
```

## Implementation Details

### Backend (`backend/server.js`)
- Added route handler for `/:businessId`
- Validates business ID against config
- Serves `index.html` for valid business IDs
- Returns 404 for invalid business IDs

### Frontend (`frontend/app.js`)
- Detects business ID from URL path
- If business ID found: loads that business directly, hides navbar
- If no business ID: shows business selector (admin mode)
- "Start over" button resets form but stays on same business

## Features

✅ **Privacy:** Customers can't see other businesses
✅ **Branding:** Each URL shows only that business's name and colors
✅ **Security:** Invalid business IDs return 404
✅ **QR Codes:** Each business gets unique QR code
✅ **Google Reviews:** Correct review URL for each business
✅ **Multi-language:** Each business has its own language settings

## Testing

### Test Royal Shourya Resort:
```bash
# Open in browser
http://localhost:3000/royal-shourya-resort

# Expected:
- ✅ No navbar visible
- ✅ No business selector
- ✅ Shows "Royal Shourya Resort" as title
- ✅ Blue brand color (#4A90D9)
- ✅ Can generate reviews
- ✅ Opens https://g.page/r/Cd21nPf9tKmqEBE/review
```

### Test Royal Villa Resort:
```bash
# Open in browser
http://localhost:3000/royal-villa-resort

# Expected:
- ✅ No navbar visible
- ✅ No business selector
- ✅ Shows "Royal Villa Resort" as title
- ✅ Brown brand color (#8B4513)
- ✅ Can generate reviews
- ✅ Opens https://g.page/r/CSXp9WVaZAtjEBM/review
```

### Test Admin Mode:
```bash
# Open in browser
http://localhost:3000/

# Expected:
- ✅ Navbar visible with dropdown
- ✅ Business selector cards shown
- ✅ Can switch between businesses
```

### Test Invalid URL:
```bash
# Open in browser
http://localhost:3000/invalid-business

# Expected:
- ❌ 404 error or blank page
```

## QR Code Generation

### Option 1: Online QR Code Generator
1. Visit: https://www.qr-code-generator.com/
2. Enter URL: `https://your-domain.com/royal-shourya-resort`
3. Customize design (add logo, colors)
4. Download QR code
5. Print and display at business location

### Option 2: Using Node.js (Automated)
I can create a script to generate QR codes automatically.

### Option 3: Using API
```bash
# Google Charts API (simple)
https://chart.googleapis.com/chart?cht=qr&chs=300x300&chl=https://your-domain.com/royal-shourya-resort
```

## Deployment Checklist

### Before Deployment:
- [ ] Test both business URLs locally
- [ ] Verify no business selector appears for customers
- [ ] Test review generation for both businesses
- [ ] Verify correct Google Review URLs open
- [ ] Test on mobile devices

### After Deployment:
- [ ] Update URLs in this document with production domain
- [ ] Generate QR codes with production URLs
- [ ] Test production URLs
- [ ] Share URLs with business owners
- [ ] Print QR codes for display

## Sharing with Business Owners

### Royal Shourya Resort Owner:
```
Your Review Page: https://your-domain.com/royal-shourya-resort

Share this link with customers via:
- QR code at reception desk
- WhatsApp messages
- Email signatures
- Printed on receipts
- Social media posts
- Table tents/standees
```

### Royal Villa Resort Owner:
```
Your Review Page: https://your-domain.com/royal-villa-resort

Share this link with customers via:
- QR code at reception desk
- WhatsApp messages
- Email signatures
- Printed on receipts
- Social media posts
- Table tents/standees
```

## Marketing Materials

### QR Code Signage Template:
```
┌─────────────────────────────────┐
│                                 │
│   Love Your Experience?         │
│   Share Your Review!            │
│                                 │
│   [QR CODE HERE]                │
│                                 │
│   Scan to leave a review        │
│   Takes only 2 minutes          │
│                                 │
│   Royal Shourya Resort          │
│                                 │
└─────────────────────────────────┘
```

### WhatsApp Message Template:
```
Hi [Customer Name]! 👋

Thank you for choosing Royal Shourya Resort! 

We'd love to hear about your experience. 
Could you take 2 minutes to share a review?

👉 https://your-domain.com/royal-shourya-resort

Your feedback helps us serve you better! 🙏

- Team Royal Shourya Resort
```

## Security Considerations

✅ **Isolated Access:** Each business only sees their own data
✅ **No Cross-Contamination:** Customer can't accidentally review wrong business
✅ **Valid URLs Only:** Invalid business IDs return 404
✅ **Rate Limiting:** 10 reviews per hour per IP (prevents spam)
✅ **Honeypot Protection:** Bot detection enabled

## Analytics (Future Enhancement)

Track separately for each business:
- Number of page visits
- Number of reviews generated
- Average star rating
- Most selected tags
- Language preferences
- Conversion rate (visits → reviews)

## Troubleshooting

### Issue: Page shows business selector
**Solution:** Make sure URL includes business ID: `/royal-shourya-resort`

### Issue: Wrong business name appears
**Solution:** Check URL matches business ID in config.js

### Issue: 404 error
**Solution:** Verify business ID matches exactly (case-sensitive, use hyphens)

### Issue: Navbar still visible
**Solution:** Clear browser cache and reload

## Next Steps

1. ✅ Test both URLs in browser
2. ✅ Verify customer experience (no selector)
3. ✅ Generate QR codes
4. ✅ Deploy to production
5. ✅ Update QR codes with production URLs
6. ✅ Share with business owners
7. ✅ Print and display QR codes

## Status

✅ **IMPLEMENTED** - Ready for testing

- Backend routes configured
- Frontend detects business from URL
- Navbar hidden for customer access
- Admin mode still available at root URL
- Ready for QR code generation
