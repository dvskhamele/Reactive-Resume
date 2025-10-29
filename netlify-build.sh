#!/bin/bash
# Netlify Build Script for Reactive Resume

set -e # Exit on any error

echo "Installing dependencies..."
cd /Users/test/startups/Reactive-Resume
npm install -g pnpm
pnpm install

echo "Building client app with localStorage enabled..."
export VITE_USE_LOCAL_STORAGE="true"
pnpm build:client

echo "Build completed successfully!"
echo "Build output is in: /Users/test/startups/Reactive-Resume/apps/client/dist"

# Verify the build was successful
if [ -f "/Users/test/startups/Reactive-Resume/apps/client/dist/index.html" ]; then
    echo "✓ index.html found - build successful"
else
    echo "✗ index.html not found - build failed"
    exit 1
fi