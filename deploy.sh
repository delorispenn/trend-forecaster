#!/bin/bash

# Josie's Journal Trend Forecaster - Quick Deploy to Netlify

echo "🔮 Deploying Josie's Journal Trend Forecaster..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project
echo "🔨 Building project..."
npm run build

echo ""
echo "✅ Build complete!"
echo ""
echo "Next steps:"
echo "1. Sign up for Netlify at https://netlify.com"
echo "2. Drag and drop the 'dist' folder to Netlify"
echo "3. Or use Netlify CLI:"
echo "   npm install -g netlify-cli"
echo "   netlify deploy --prod"
echo ""
echo "Your trend forecaster is ready! 🎉"
