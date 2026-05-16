# 🚨 URGENT: API Key Security Issue

## ⚠️ Critical Issue Detected

Your Gemini API key has been **reported as leaked** and has been **disabled by Google**.

### Error from Logs:
```
[403 Forbidden] Your API key was reported as leaked. 
Please use another API key.
```

## 🔒 What Happened

The API key was exposed in:
1. Documentation files in the repository
2. Conversation history
3. Public GitHub repository

Google automatically detected this and disabled the key for security.

## ✅ Immediate Actions Required

### Step 1: Get a New API Key

1. **Go to Google AI Studio:**
   ```
   https://makersuite.google.com/app/apikey
   ```

2. **Delete the old key** (if still visible)

3. **Create a new API key:**
   - Click "Create API Key"
   - Select your Google Cloud project
   - Copy the new key immediately

4. **Keep it secure!** Never share or commit it to GitHub

### Step 2: Update Environment Variable in Vercel

1. **Go to Vercel Dashboard:**
   ```
   https://vercel.com/dashboard
   ```

2. **Select your project:** review-generator

3. **Go to Settings → Environment Variables**

4. **Update `GEMINI_API_KEY`:**
   - Click on the existing variable
   - Click "Edit"
   - Paste your NEW API key
   - Click "Save"

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Step 3: Update Local Environment

1. **Edit `backend/.env`:**
   ```bash
   nano backend/.env
   ```

2. **Update the key:**
   ```
   GEMINI_API_KEY=your_new_api_key_here
   ```

3. **Save and restart server:**
   ```bash
   cd backend
   node server.js
   ```

## 🛡️ Security Best Practices

### ✅ DO:
- Store API keys in environment variables only
- Use `.env` files (never commit them)
- Set environment variables in Vercel dashboard
- Keep API keys private and secure

### ❌ DON'T:
- Never commit API keys to GitHub
- Never share API keys in documentation
- Never hardcode API keys in source code
- Never share API keys in chat/messages

## 🔧 Additional Fix Applied

I've also fixed the **rate limiting issue** in your code:

**Added to `backend/server.js`:**
```javascript
app.set('trust proxy', 1);
```

This fixes the Vercel proxy warning you were seeing.

## 📝 Next Steps

1. ✅ Get new API key from Google AI Studio
2. ✅ Update in Vercel environment variables
3. ✅ Update in local `backend/.env`
4. ✅ Redeploy to Vercel
5. ✅ Test the application

## 🧪 Test After Fixing

### Test Review Generation:
1. Open: https://review-generator-mauve.vercel.app/royal-shourya-resort
2. Click 5 stars
3. Select language
4. Click "Generate My Review"
5. Should work without errors

### Check Logs:
1. Go to Vercel dashboard
2. Check function logs
3. Should see successful review generation
4. No more 403 errors

## 📊 Current Status

- ❌ API Key: **LEAKED AND DISABLED**
- ✅ Trust Proxy: **FIXED**
- ✅ Rate Limiting: **FIXED**
- ⏳ Application: **WAITING FOR NEW API KEY**

## 🆘 If You Need Help

1. **Getting new API key:** https://makersuite.google.com/app/apikey
2. **Vercel environment variables:** https://vercel.com/docs/environment-variables
3. **Google AI Studio docs:** https://ai.google.dev/

## ⚡ Quick Commands

```bash
# After getting new API key:

# 1. Update local .env
echo "GEMINI_API_KEY=your_new_key_here" > backend/.env

# 2. Commit the trust proxy fix
git add backend/server.js
git commit -m "Fix trust proxy for Vercel"
git push origin main

# 3. Redeploy
vercel --prod

# 4. Test
curl -X POST https://review-generator-mauve.vercel.app/api/generate-review \
  -H "Content-Type: application/json" \
  -d '{"stars":5,"tags":["Great"],"language":"english","businessId":"royal-shourya-resort"}'
```

## 🎯 Priority

**HIGH PRIORITY** - Application will not work until you:
1. Get new API key
2. Update in Vercel
3. Redeploy

---

**Status:** 🔴 Action Required
**Time to Fix:** ~5 minutes
**Impact:** Application cannot generate reviews until fixed
