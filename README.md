# AI-Powered Google Review Generator

Generate authentic, multilingual Google reviews using AI. Perfect for businesses looking to collect more customer reviews.

## 🌟 Features

- ✅ **AI-Powered Reviews** - Uses Google Gemini AI to generate natural, human-sounding reviews
- ✅ **Multi-Business Support** - Each business gets its own unique URL and QR code
- ✅ **Multi-Language** - Supports 8 languages (English, Marathi, Hindi, Gujarati, Tamil, Telugu, Kannada, Bengali)
- ✅ **SEO Optimized** - Automatically includes business-specific keywords
- ✅ **QR Code Ready** - Generate QR codes for easy customer access
- ✅ **Mobile Friendly** - Responsive design works on all devices
- ✅ **Rate Limiting** - Built-in protection against spam
- ✅ **Privacy First** - Each business URL shows only that business

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/review-generator.git
cd review-generator
```

2. **Install dependencies**
```bash
npm install
cd backend
npm install
cd ..
```

3. **Configure environment variables**
```bash
# Create backend/.env file
cp backend/.env.example backend/.env

# Edit backend/.env and add your API key
GEMINI_API_KEY=your_api_key_here
```

4. **Configure your businesses**

Edit `config.js` and add your business details:
```javascript
{
  id: "your-business-id",
  name: "Your Business Name",
  type: "Business Type",
  googleReviewUrl: "https://g.page/r/YOUR_PLACE_ID/review",
  brandColor: "#4A90D9",
  seoKeywords: ["keyword1", "keyword2"],
  supportedLanguages: ["english", "marathi", "hindi"]
}
```

5. **Start the server**
```bash
cd backend
node server.js
```

6. **Open in browser**
```
http://localhost:3000/your-business-id
```

## 📱 Generate QR Codes

```bash
# Install QR code package
npm install qrcode

# Generate QR codes
node generate-qr-codes.js

# Open qr-codes/qr-codes.html in browser to view and print
```

## 🌐 Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

3. **Set environment variables in Vercel dashboard**
- `GEMINI_API_KEY` - Your Google Gemini API key
- `NODE_ENV` - production

4. **Update QR codes with production URL**
```bash
# Edit generate-qr-codes.js
const BASE_URL = 'https://your-domain.vercel.app';

# Regenerate QR codes
node generate-qr-codes.js
```

## 📖 Documentation

- **[Quick Start Guide](QUICK_START.md)** - Get started in 5 minutes
- **[Separate Business Pages](SEPARATE_BUSINESS_PAGES.md)** - How multi-business works
- **[Deployment Guide](DEPLOYMENT_WITH_QR_CODES.md)** - Complete deployment instructions
- **[Setup Guide](SETUP_GUIDE.md)** - Detailed setup instructions

## 🏢 Business URLs

Each business gets its own private URL:

```
https://your-domain.com/business-id-1  → Business 1 only
https://your-domain.com/business-id-2  → Business 2 only
https://your-domain.com/               → Admin panel (all businesses)
```

Customers can't see other businesses - perfect for privacy!

## 🎨 Customization

### Brand Colors
Edit `config.js` to change brand colors for each business:
```javascript
brandColor: "#4A90D9"  // Your brand color
```

### SEO Keywords
Add keywords that will be naturally included in reviews:
```javascript
seoKeywords: [
  "Your Business Name",
  "best service",
  "highly recommend"
]
```

### Supported Languages
Choose which languages to offer:
```javascript
supportedLanguages: ["english", "marathi", "hindi"]
```

## 🔒 Security Features

- ✅ Rate limiting (10 requests/hour per IP)
- ✅ Honeypot protection against bots
- ✅ Input validation
- ✅ Environment variable protection
- ✅ CORS configuration

## 📊 Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express
- **AI:** Google Gemini API (gemini-2.5-flash)
- **Deployment:** Vercel
- **QR Codes:** qrcode npm package

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use for your business!

## 🆘 Support

For issues or questions:
1. Check the documentation in the `docs/` folder
2. Open an issue on GitHub
3. Contact: your-email@example.com

## 🎯 Use Cases

- **Resorts & Hotels** - Collect guest reviews
- **Restaurants** - Get diner feedback
- **Retail Stores** - Customer testimonials
- **Service Businesses** - Client reviews
- **Healthcare** - Patient feedback
- **Education** - Student/parent reviews

## ⚡ Performance

- Fast review generation (2-3 seconds)
- Lightweight frontend (< 100KB)
- Optimized for mobile
- Works offline (after initial load)

## 🌍 Languages Supported

1. English
2. मराठी (Marathi)
3. हिंदी (Hindi)
4. ગુજરાતી (Gujarati)
5. தமிழ் (Tamil)
6. తెలుగు (Telugu)
7. ಕನ್ನಡ (Kannada)
8. বাংলা (Bengali)

## 📈 Roadmap

- [ ] Analytics dashboard
- [ ] Email notifications
- [ ] Review moderation
- [ ] Custom templates
- [ ] More languages
- [ ] WhatsApp integration

## 🙏 Acknowledgments

- Google Gemini AI for review generation
- Vercel for hosting
- Open source community

---

Made with ❤️ for businesses that care about customer feedback
