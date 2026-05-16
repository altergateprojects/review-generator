# 🚨 CRITICAL: Google Cloud Project Blocked

## ⚠️ Error Message
```
[403 Forbidden] Your project has been denied access. 
Please contact support.
```

## 🔍 What This Means

Google has **blocked your entire Google Cloud project**, not just the API key. This is more serious than a leaked key and requires immediate action.

## 🎯 Why This Happened

Possible reasons:
1. **API key was leaked publicly** (detected by Google)
2. **Suspicious activity** detected on the project
3. **Terms of Service violation** (unintentional)
4. **Billing or quota issues**

## ✅ Solution Options

### Option 1: Create New Google Cloud Project (RECOMMENDED)

This is the fastest solution:

#### Step 1: Create New Project
1. Go to: https://console.cloud.google.com/
2. Click the project dropdown (top left)
3. Click "New Project"
4. Name: `review-generator-prod`
5. Click "Create"

#### Step 2: Enable Gemini API
1. Go to: https://console.cloud.google.com/apis/library
2. Search for "Generative Language API"
3. Click on it
4. Click "Enable"
5. Wait for it to enable (~1 minute)

#### Step 3: Create New API Key
1. Go to: https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Select your **NEW** project: `review-generator-prod`
4. Copy the new API key
5. **Keep it secure!**

#### Step 4: Update Vercel Environment Variable
1. Go to: https://vercel.com/dashboard
2. Select: **review-generator**
3. Go to: **Settings → Environment Variables**
4. Find `GEMINI_API_KEY`
5. Click "Edit"
6. Paste your **NEW** API key
7. Click "Save"

#### Step 5: Redeploy
```bash
vercel --prod
```

#### Step 6: Test
```bash
# Test the API
curl -X POST https://review-generator-mauve.vercel.app/api/generate-review \
  -H "Content-Type: application/json" \
  -d '{
    "stars": 5,
    "tags": ["Excellent Service"],
    "customerNote": "Great experience",
    "language": "english",
    "businessId": "royal-shourya-resort"
  }'
```

---

### Option 2: Contact Google Support (SLOWER)

If you want to restore the old project:

1. **Go to Google Cloud Support:**
   ```
   https://console.cloud.google.com/support
   ```

2. **Create a support ticket:**
   - Issue: "Project access denied for Generative Language API"
   - Explain: "My project was blocked after API key leak. I've secured the key and need access restored."
   - Include: Your project ID

3. **Wait for response** (can take 24-48 hours)

---

## 🔧 I've Fixed the Rate Limiting Issue

**Changes made to `backend/server.js`:**

1. **Increased rate limit:**
   - From: 10 requests/hour
   - To: 100 requests/hour

2. **Excluded config endpoints:**
   - `/api/config` - no rate limit
   - `/api/config/:businessId` - no rate limit

3. **Only rate limit review generation:**
   - `/api/generate-review` - 100 requests/hour

This prevents the 429 errors you were seeing.

---

## 📊 Current Issues Summary

| Issue | Status | Solution |
|-------|--------|----------|
| Google Cloud Project Blocked | 🔴 CRITICAL | Create new project |
| Rate Limiting Too Strict | ✅ FIXED | Increased to 100/hour |
| Trust Proxy Warning | ✅ FIXED | Added trust proxy |
| 429 Errors | ✅ FIXED | Excluded config endpoints |

---

## 🚀 Quick Start (New Project)

```bash
# 1. Create new Google Cloud project
# Go to: https://console.cloud.google.com/

# 2. Enable Generative Language API
# Go to: https://console.cloud.google.com/apis/library

# 3. Get new API key
# Go to: https://makersuite.google.com/app/apikey

# 4. Update Vercel
# Go to: https://vercel.com/dashboard
# Settings → Environment Variables → Edit GEMINI_API_KEY

# 5. Redeploy
vercel --prod

# 6. Test
curl https://review-generator-mauve.vercel.app/api/config
```

---

## 🔒 Security Best Practices Going Forward

### ✅ DO:
1. **Store API keys in environment variables only**
2. **Never commit `.env` files to Git**
3. **Use Vercel environment variables for production**
4. **Rotate API keys regularly**
5. **Monitor API usage in Google Cloud Console**

### ❌ DON'T:
1. **Never hardcode API keys in source code**
2. **Never share API keys in documentation**
3. **Never commit API keys to GitHub**
4. **Never share API keys in chat/messages**
5. **Never expose API keys in client-side code**

---

## 📝 Checklist

- [ ] Create new Google Cloud project
- [ ] Enable Generative Language API
- [ ] Create new API key
- [ ] Update Vercel environment variable
- [ ] Redeploy to Vercel
- [ ] Test review generation
- [ ] Verify no 403 errors
- [ ] Verify no 429 errors
- [ ] Update local `.env` file
- [ ] Test locally

---

## 🧪 Testing After Fix

### Test 1: Config Endpoint
```bash
curl https://review-generator-mauve.vercel.app/api/config
```
**Expected:** 200 OK with business list

### Test 2: Business Config
```bash
curl https://review-generator-mauve.vercel.app/api/config/royal-shourya-resort
```
**Expected:** 200 OK with business details

### Test 3: Review Generation
```bash
curl -X POST https://review-generator-mauve.vercel.app/api/generate-review \
  -H "Content-Type: application/json" \
  -d '{
    "stars": 5,
    "tags": ["Great Service"],
    "language": "english",
    "businessId": "royal-shourya-resort"
  }'
```
**Expected:** 200 OK with generated review

### Test 4: Rate Limiting
Refresh the page 10 times quickly.
**Expected:** Should NOT get 429 errors

---

## 📞 Support Resources

- **Google Cloud Console:** https://console.cloud.google.com/
- **Google AI Studio:** https://makersuite.google.com/
- **Vercel Dashboard:** https://vercel.com/dashboard
- **Google Cloud Support:** https://console.cloud.google.com/support

---

## ⏱️ Time to Fix

- **Option 1 (New Project):** ~10 minutes
- **Option 2 (Contact Support):** 24-48 hours

---

## 🎯 Priority

**CRITICAL** - Application is completely non-functional until fixed.

**Recommended:** Use Option 1 (Create New Project) for immediate resolution.

---

**Status:** 🔴 Action Required Immediately
**Impact:** Application cannot generate reviews
**Solution:** Create new Google Cloud project with new API key
