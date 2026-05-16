#!/bin/bash

echo "🚀 Deploying Review Generator to Vercel..."
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "⚠️  Warning: backend/.env file not found"
    echo "Make sure to add GEMINI_API_KEY in Vercel dashboard after deployment"
fi

echo ""
echo "📦 Installing backend dependencies..."
cd backend && npm install
cd ..

echo ""
echo "🔧 Deploying to Vercel..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📝 Next steps:"
echo "1. Add GEMINI_API_KEY environment variable in Vercel dashboard"
echo "2. Go to: https://vercel.com/dashboard"
echo "3. Select your project → Settings → Environment Variables"
echo "4. Add: GEMINI_API_KEY = your_api_key"
echo "5. Redeploy if needed"
echo ""
echo "🎉 Your review generator is now live!"
