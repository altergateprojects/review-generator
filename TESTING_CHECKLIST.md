# Multi-Business Testing Checklist

## ✅ Backend Tests (All Passing)

### API Endpoints
- [x] GET `/api/config` returns multi-business configuration
- [x] GET `/api/config/royal-shourya-resort` returns Royal Shourya config
- [x] GET `/api/config/royal-villa-resort` returns Royal Villa config
- [x] POST `/api/generate-review` generates reviews

### Configuration
- [x] 2 businesses configured in `config.js`
- [x] Royal Shourya Resort: https://g.page/r/Cd21nPf9tKmqEBE/review
- [x] Royal Villa Resort: https://g.page/r/CSXp9WVaZAtjEBM/review
- [x] SEO keywords configured for both businesses
- [x] Multi-language support enabled (English, Marathi, Hindi)

### Server
- [x] Server running on port 3000
- [x] Static files being served from `/frontend`
- [x] GEMINI_API_KEY configured
- [x] Rate limiting enabled

## 🧪 Frontend Tests (Ready for Browser Testing)

### Page Load
- [ ] Open http://localhost:3000 in browser
- [ ] Page loads without errors
- [ ] No JavaScript errors in console
- [ ] Navigation bar appears at top

### Business Selection
- [ ] Business selector dropdown visible in navbar
- [ ] Dropdown shows "Choose a business..." placeholder
- [ ] 2 business cards displayed:
  - [ ] Royal Shourya Resort (Blue card)
  - [ ] Royal Villa Resort (Brown card)
- [ ] Business cards show business name and type
- [ ] Review form is hidden initially

### Business Card Selection
- [ ] Click on Royal Shourya Resort card
- [ ] Business cards hide
- [ ] Review form appears
- [ ] Business name shows "Royal Shourya Resort"
- [ ] Brand color changes to blue (#4A90D9)
- [ ] Click "Start over" button
- [ ] Business cards reappear

### Dropdown Selection
- [ ] Select "Royal Villa Resort" from navbar dropdown
- [ ] Business cards hide
- [ ] Review form appears
- [ ] Business name shows "Royal Villa Resort"
- [ ] Brand color changes to brown (#8B4513)

### Star Rating
- [ ] Click on 5 stars
- [ ] Stars turn gold/yellow
- [ ] Rating text shows "5 stars - Excellent!"
- [ ] Language selector appears
- [ ] Tags container appears with positive tags
- [ ] Note container appears
- [ ] Generate button becomes enabled

### Language Selection
- [ ] Language dropdown shows 8 languages
- [ ] Select "मराठी (Marathi)"
- [ ] Language selection saved

### Tags Selection
- [ ] Click on "Excellent Service" tag
- [ ] Tag becomes highlighted/selected
- [ ] Click again to deselect
- [ ] Multiple tags can be selected

### Customer Note
- [ ] Type in customer note textarea
- [ ] Character count updates (e.g., "45/500")
- [ ] Cannot exceed 500 characters

### Review Generation
- [ ] Click "Generate My Review ✨" button
- [ ] Loading overlay appears with spinner
- [ ] Review generates successfully
- [ ] Page 2 appears with generated review
- [ ] Review shows selected star rating
- [ ] Review text is in selected language
- [ ] Review mentions business name
- [ ] Review includes selected tags context

### Review Actions
- [ ] Click "🔄 Get a different version" button
- [ ] New review generates (different from first)
- [ ] Can regenerate up to 5 times
- [ ] Click "📋 Copy & Open Google Reviews" button
- [ ] Confetti animation plays
- [ ] Toast notification shows "Review copied!"
- [ ] New tab opens with correct Google Review URL
- [ ] Review text is in clipboard (paste to verify)

### Royal Shourya Resort Flow
- [ ] Select Royal Shourya Resort
- [ ] Generate review
- [ ] Click "Copy & Open Google Reviews"
- [ ] Opens: https://g.page/r/Cd21nPf9tKmqEBE/review
- [ ] Paste review in Google (should work)

### Royal Villa Resort Flow
- [ ] Click "Start over"
- [ ] Select Royal Villa Resort
- [ ] Generate review
- [ ] Click "Copy & Open Google Reviews"
- [ ] Opens: https://g.page/r/CSXp9WVaZAtjEBM/review
- [ ] Paste review in Google (should work)

### Multi-Language Testing
- [ ] Generate review in English - readable English text
- [ ] Generate review in Marathi - readable Marathi script
- [ ] Generate review in Hindi - readable Hindi script

### Error Handling
- [ ] Try to generate without selecting stars - button disabled
- [ ] Try to generate with honeypot filled - should fail
- [ ] Disconnect internet and try to generate - shows error toast

### Mobile Responsiveness (Optional)
- [ ] Open on mobile device or resize browser
- [ ] Business cards stack vertically
- [ ] Form elements are touch-friendly
- [ ] Buttons are easily clickable

## 🐛 Known Issues to Watch For

### Fixed Issues ✅
- ~~HTML structure error causing JavaScript failure~~ - FIXED
- ~~Backend not serving frontend files~~ - FIXED
- ~~Business cards not showing~~ - FIXED
- ~~"Cannot read properties of null" error~~ - FIXED

### Potential Issues to Monitor
- [ ] API rate limiting (10 requests per hour per IP)
- [ ] Gemini API quota limits
- [ ] Review length consistency (should be 50-100 words)
- [ ] SEO keywords appearing naturally in reviews
- [ ] Language-specific reviews being grammatically correct

## 📊 Test Results

### Date: _____________
### Tester: _____________

| Test Category | Status | Notes |
|--------------|--------|-------|
| Backend APIs | ✅ PASS | All endpoints working |
| Page Load | ⏳ PENDING | |
| Business Selection | ⏳ PENDING | |
| Star Rating | ⏳ PENDING | |
| Language Selection | ⏳ PENDING | |
| Review Generation | ⏳ PENDING | |
| Google Review URLs | ⏳ PENDING | |
| Multi-Language | ⏳ PENDING | |

## 🚀 Quick Test Commands

```bash
# Test backend APIs
node test-multi-business.js

# Check server status
curl http://localhost:3000/health

# Test config endpoint
curl http://localhost:3000/api/config | python3 -m json.tool

# Test specific business
curl http://localhost:3000/api/config/royal-shourya-resort | python3 -m json.tool

# Verify HTML structure
node verify-html-structure.js
```

## 📝 Browser Testing URL

**Main URL**: http://localhost:3000

Open this URL in your browser and go through the checklist above.

## ✅ Success Criteria

All tests must pass before deployment:
- [x] Backend APIs working
- [ ] Business selection working (both card and dropdown)
- [ ] Review generation working for both businesses
- [ ] Correct Google Review URLs opening
- [ ] Multi-language support working
- [ ] SEO keywords appearing in reviews
- [ ] No JavaScript errors in console
- [ ] Mobile responsive (optional but recommended)

## 🎯 Next Steps After Testing

1. If all tests pass → Ready for deployment
2. If any tests fail → Document issues and fix
3. Deploy to Vercel using `vercel --prod`
4. Test production deployment with same checklist
5. Share production URL with stakeholders
