#!/bin/bash

# Setup New Repository Script
# This script prepares the project for a new GitHub repository

echo "🚀 Setting up new repository..."
echo ""

# Remove old git history
echo "📦 Removing old git history..."
rm -rf .git

# Remove test files
echo "🧹 Cleaning up test files..."
rm -f test-*.js test-*.html verify-*.js
rm -f backend/test-*.js

# Remove temporary documentation
echo "📄 Removing temporary documentation..."
rm -f ALTERNATIVE_DEPLOYMENT.md
rm -f COMMANDS_TO_RUN.txt
rm -f DEPLOY_NOW.md
rm -f FIX_API_KEY.md
rm -f FIX_STAR_CLICK_ERROR.md
rm -f MULTI_BUSINESS_FIX_SUMMARY.md
rm -f PRE_DEPLOYMENT_CHECKLIST.md

# Keep important documentation
echo "✅ Keeping important documentation:"
echo "   - README.md"
echo "   - QUICK_START.md"
echo "   - SEPARATE_BUSINESS_PAGES.md"
echo "   - DEPLOYMENT_WITH_QR_CODES.md"
echo "   - DEPLOYMENT_GUIDE.md"
echo "   - DEPLOYMENT_SUMMARY.md"
echo "   - SETUP_GUIDE.md"
echo "   - SEO_KEYWORDS_GUIDE.md"
echo "   - TESTING_CHECKLIST.md"
echo ""

# Initialize new git repository
echo "🔧 Initializing new git repository..."
git init

# Add all files
echo "📝 Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: AI-Powered Google Review Generator

Features:
- Multi-business support with separate URLs
- AI-powered review generation using Google Gemini
- Multi-language support (8 languages)
- QR code generation
- SEO optimization
- Rate limiting and security features
- Mobile responsive design"

echo ""
echo "✅ Repository setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   https://github.com/new"
echo ""
echo "2. Name it: review-generator (or your preferred name)"
echo ""
echo "3. Run these commands:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Deploy to Vercel:"
echo "   vercel --prod"
echo ""
echo "5. Update QR codes with production URL:"
echo "   Edit generate-qr-codes.js (line 10)"
echo "   node generate-qr-codes.js"
echo ""
echo "🎉 Done! Your project is ready to push to GitHub!"
