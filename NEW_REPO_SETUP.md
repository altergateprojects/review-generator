# New Repository Setup Guide

## 🎯 Goal
Create a new GitHub repository and deploy the AI Review Generator.

## 📋 Step-by-Step Instructions

### Step 1: Clean Up and Prepare

Run the setup script:
```bash
./setup-new-repo.sh
```

This will:
- ✅ Remove old git history
- ✅ Remove test files
- ✅ Remove temporary documentation
- ✅ Initialize new git repository
- ✅ Create initial commit

### Step 2: Create GitHub Repository

1. **Go to GitHub:**
   - Visit: https://github.com/new

2. **Repository Settings:**
   - **Name:** `review-generator` (or your preferred name)
   - **Description:** `AI-Powered Google Review Generator with multi-business support`
   - **Visibility:** Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

3. **Click "Create repository"**

### Step 3: Push to GitHub

Copy the commands from GitHub (or use these):

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/review-generator.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

### Step 4: Verify on GitHub

1. Go to your repository: `https://github.com/YOUR_USERNAME/review-generator`
2. Check that all files are there:
   - ✅ README.md
   - ✅ config.js
   - ✅ frontend/ folder
   - ✅ backend/ folder
   - ✅ vercel.json
   - ✅ Documentation files

### Step 5: Deploy to Vercel

1. **Install Vercel CLI** (if not already installed):
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel --prod
```

4. **Follow the prompts:**
   - Link to existing project? **No**
   - Project name? **review-generator** (or press Enter)
   - Directory? **./** (press Enter)
   - Override settings? **No** (press Enter)

5. **Note your production URL:**
   - Example: `https://review-generator-abc123.vercel.app`

### Step 6: Configure Environment Variables in Vercel

1. **Go to Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Select your project

2. **Go to Settings → Environment Variables**

3. **Add these variables:**

   | Name | Value |
   |------|-------|
   | `GEMINI_API_KEY` | `AIzaSyA6C3dAK22APo4v7Z_8Vk4FrOvQm3AIi9I` |
   | `NODE_ENV` | `production` |
   | `RATE_LIMIT_WINDOW_MS` | `3600000` |
   | `RATE_LIMIT_MAX_REQUESTS` | `10` |

4. **Click "Save"**

5. **Redeploy** (Vercel will automatically redeploy)

### Step 7: Test Production URLs

Test each business URL:

**Royal Shourya Resort:**
```
https://your-domain.vercel.app/royal-shourya-resort
```
- ✅ Page loads
- ✅ No navbar visible
- ✅ Shows "Royal Shourya Resort"
- ✅ Blue color theme
- ✅ Can generate review
- ✅ Opens correct Google Review URL

**Royal Villa Resort:**
```
https://your-domain.vercel.app/royal-villa-resort
```
- ✅ Page loads
- ✅ No navbar visible
- ✅ Shows "Royal Villa Resort"
- ✅ Brown color theme
- ✅ Can generate review
- ✅ Opens correct Google Review URL

### Step 8: Update QR Codes with Production URL

1. **Edit `generate-qr-codes.js`:**
```javascript
// Line 10 - Change from:
const BASE_URL = 'http://localhost:3000';

// To your production URL:
const BASE_URL = 'https://your-actual-domain.vercel.app';
```

2. **Regenerate QR codes:**
```bash
node generate-qr-codes.js
```

3. **Open QR codes:**
```bash
open qr-codes/qr-codes.html
```

4. **Test QR codes:**
   - Scan with phone camera
   - Should open production URL
   - Should work correctly

### Step 9: Print and Distribute QR Codes

1. **Open `qr-codes/qr-codes.html` in browser**

2. **Print QR codes:**
   - Click Print (Ctrl+P / Cmd+P)
   - Each business prints on separate page
   - Use high-quality paper

3. **Share with business owners:**

**Royal Shourya Resort:**
```
Your Review Page:
https://your-domain.vercel.app/royal-shourya-resort

Display QR code at:
- Reception desk
- Dining area
- Room cards

Share URL via:
- WhatsApp
- Email
- Social media
```

**Royal Villa Resort:**
```
Your Review Page:
https://your-domain.vercel.app/royal-villa-resort

Display QR code at:
- Reception desk
- Dining area
- Room cards

Share URL via:
- WhatsApp
- Email
- Social media
```

### Step 10: Monitor and Maintain

1. **Check Vercel Dashboard:**
   - Monitor deployments
   - Check error logs
   - View analytics

2. **Monitor API Usage:**
   - Check Gemini API quota
   - Monitor rate limiting

3. **Collect Feedback:**
   - Ask business owners for feedback
   - Monitor review generation success rate

## 🔧 Troubleshooting

### Issue: Git push fails
**Solution:**
```bash
# Check remote
git remote -v

# If wrong, remove and re-add
git remote remove origin
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git push -u origin main
```

### Issue: Vercel deployment fails
**Solution:**
- Check `vercel.json` is present
- Check `package.json` is present
- Check environment variables are set
- Check logs in Vercel dashboard

### Issue: QR codes don't work
**Solution:**
- Verify production URL is correct
- Test URL in browser first
- Regenerate QR codes with correct URL
- Clear phone camera cache

### Issue: Reviews don't generate
**Solution:**
- Check `GEMINI_API_KEY` in Vercel dashboard
- Check API quota hasn't been exceeded
- Check browser console for errors
- Check Vercel function logs

## 📊 Success Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables set
- [ ] Production URLs tested
- [ ] QR codes updated with production URL
- [ ] QR codes printed
- [ ] QR codes distributed to business owners
- [ ] First reviews generated successfully

## 📁 Repository Structure

```
review-generator/
├── README.md                           # Main documentation
├── config.js                           # Business configuration
├── package.json                        # Dependencies
├── vercel.json                         # Vercel configuration
├── generate-qr-codes.js                # QR code generator
├── .gitignore                          # Git ignore rules
├── frontend/                           # Frontend files
│   ├── index.html
│   ├── style.css
│   └── app.js
├── backend/                            # Backend files
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── routes/
│       └── review.js
├── qr-codes/                           # Generated QR codes
│   ├── royal-shourya-resort-qr-code.png
│   ├── royal-villa-resort-qr-code.png
│   └── qr-codes.html
└── docs/                               # Documentation
    ├── QUICK_START.md
    ├── SEPARATE_BUSINESS_PAGES.md
    ├── DEPLOYMENT_WITH_QR_CODES.md
    └── TESTING_CHECKLIST.md
```

## 🎉 You're Done!

Your AI Review Generator is now:
- ✅ On GitHub
- ✅ Deployed to production
- ✅ Ready for customers
- ✅ QR codes printed and distributed

## 📞 Support

If you need help:
1. Check the documentation files
2. Check Vercel logs
3. Check GitHub issues
4. Contact support

## 🚀 Next Steps

1. Monitor first reviews
2. Collect feedback from business owners
3. Adjust SEO keywords if needed
4. Add more businesses if needed
5. Consider adding analytics

---

**Repository URL:** https://github.com/YOUR_USERNAME/review-generator
**Production URL:** https://your-domain.vercel.app
**Status:** 🟢 Ready for Production
