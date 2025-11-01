#!/bin/bash
# Permanent deployment script for Reactive-Resume that works with monorepo setup
# This script handles all the deployment process automatically

echo "🚀 Starting Reactive-Resume deployment process..."

# Navigate to project root
cd /Users/test/startups/Reactive-Resume

# Build the application with proper environment variables
echo "🔨 Building the application..."
VITE_USE_LOCAL_STORAGE=true npx nx build client

# Also build the artboard app
echo "🎨 Building the artboard app..."
VITE_USE_LOCAL_STORAGE=true npx nx build artboard

# Deploy to Netlify with explicit filter to avoid monorepo detection
echo "📦 Deploying to Netlify..."
netlify deploy --prod --no-build --dir=./dist/apps/client --filter client

echo "✅ Deployment completed successfully!"
echo "🌐 Visit: https://resumebench.netlify.app"