#!/bin/bash
# Netlify Build Script for Reactive Resume

set -e # Exit on any error

echo "Installing dependencies..."
npm install -g pnpm
pnpm install

echo "Building app for Netlify deployment..."
VITE_USE_LOCAL_STORAGE=true pnpm build:netlify

echo "Build completed successfully!"
echo "Build output is in: dist/apps/client"

# Verify the build was successful
if [ -f "dist/apps/client/index.html" ]; then
    echo "✓ index.html found - build successful"
else
    echo "✗ index.html not found - build failed"
    exit 1
fi