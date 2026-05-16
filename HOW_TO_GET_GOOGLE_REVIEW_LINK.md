# 🔗 How to Get Your Google Review Link

## Method 1: Google Business Profile (Recommended)

1. **Go to Google Business Profile**:
   👉 https://business.google.com/

2. **Select your business** from the list

3. **Click "Get more reviews"** (or "Ask for reviews")

4. **Copy the review link**
   - Format: `https://g.page/r/YOUR_PLACE_ID/review`
   - Or: `https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID`

5. **Paste it in `config.js`**:
   ```javascript
   GOOGLE_REVIEW_URL: "https://g.page/r/YOUR_PLACE_ID/review",
   ```

---

## Method 2: Google Maps

1. **Search for your business** on Google Maps:
   👉 https://maps.google.com/

2. **Click on your business** listing

3. **Click "Write a review"** button

4. **Copy the URL** from your browser address bar

5. **Paste it in `config.js`**

---

## Method 3: Manual Construction

If you know your **Place ID**:

```
https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID
```

### How to find your Place ID:

1. Go to: https://developers.google.com/maps/documentation/places/web-service/place-id
2. Use the Place ID Finder tool
3. Search for your business
4. Copy the Place ID

---

## 📝 Example URLs

### Short format (g.page):
```
https://g.page/r/CZQxBUMvZ3JhEAE/review
```

### Long format (search.google.com):
```
https://search.google.com/local/writereview?placeid=ChIJrXGZ3vUMBUMvZ3Jh
```

Both formats work! Use whichever one you get from Google.

---

## ⚙️ Update Your Config

Edit the file: **`config.js`** (in the root directory)

```javascript
module.exports = {
  BUSINESS_NAME: "Your Business Name",
  BUSINESS_TYPE: "restaurant", // or "salon", "shop", etc.
  GOOGLE_REVIEW_URL: "https://g.page/r/YOUR_PLACE_ID/review", // ← Add here
  LOGO_URL: "",
  BRAND_COLOR: "#4A90D9",
  CUSTOM_TAGS: []
};
```

---

## 🧪 Test Your Link

After adding the link:

1. **Restart the backend** (it will auto-restart if you save the file)
2. **Refresh your browser** at http://localhost:8080
3. **Generate a review**
4. **Click "Copy & Open Google Reviews"**
5. **Verify it opens your Google Review page**

---

## ❓ Don't Have a Google Business Profile?

If you don't have a business listing yet:

1. **Create one**: https://business.google.com/create
2. **Verify your business** (takes 1-2 weeks)
3. **Then get your review link**

For testing purposes, you can use any business's review link temporarily.

---

## 🎯 Quick Test Link

For testing only, you can use this example:
```
https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4
```
(This is Google's Sydney office - just for testing!)

---

**After updating `config.js`, the app will automatically use your Google Review link!**
