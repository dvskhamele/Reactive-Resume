#!/bin/bash
# Permanent deployment script for Reactive-Resume that works with monorepo setup
# This script handles all deployment process automatically without manual intervention

echo "🚀 Starting Reactive-Resume permanent deployment process..."

# Navigate to project root
cd /Users/test/startups/Reactive-Resume

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist-for-netlify

# Build the client application with local storage mode
echo "🔨 Building client application..."
VITE_USE_LOCAL_STORAGE=true npx nx build client

# Build the artboard application
echo "🎨 Building artboard application..."
VITE_USE_LOCAL_STORAGE=true npx nx build artboard

# Deploy to Netlify with explicit site specification to avoid monorepo detection
echo "📦 Deploying to Netlify (resumebench)..."
netlify deploy --prod --no-build --dir=./dist/apps/client --site="resumebench"

echo "✅ Deployment completed successfully!"
echo "🌐 Visit: https://resumebench.netlify.app"