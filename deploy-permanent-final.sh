#!/bin/bash
# Permanent deployment script for Reactive-Resume that works with monorepo setup
# This script handles all deployment process automatically without manual intervention

echo "🚀 Starting Reactive-Resume permanent deployment process..."

# Navigate to project root
cd /Users/test/startups/Reactive-Resume

# Temporary rename workspace files to avoid monorepo detection
echo "🔄 Temporarily renaming workspace files..."
mv nx.json nx.json.tmp
mv pnpm-workspace.yaml pnpm-workspace.yaml.tmp

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist-for-netlify

# Build the client application with local storage mode
echo "🔨 Building client application..."
cd apps/client
VITE_USE_LOCAL_STORAGE=true npx vite build --emptyOutDir --outDir ../../dist-for-netlify/apps/client
cd ../..

# Build the artboard application
echo "🎨 Building artboard application..."
cd apps/artboard
VITE_USE_LOCAL_STORAGE=true npx vite build --outDir ../../../dist-for-netlify/apps/client/artboard --emptyOutDir
cd ../..

# Deploy to Netlify with explicit site specification to avoid monorepo detection
echo "📦 Deploying to Netlify (resumebench)..."
netlify deploy --prod --no-build --dir=./dist-for-netlify/apps/client --site="533382bf-13bd-4e3b-99aa-ec0dff36320d"

# Restore workspace files
echo "🔄 Restoring workspace files..."
mv nx.json.tmp nx.json
mv pnpm-workspace.yaml.tmp pnpm-workspace.yaml

echo "✅ Deployment completed successfully!"
echo "🌐 Visit: https://resumebench.netlify.app"