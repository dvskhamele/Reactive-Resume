#!/bin/bash

# Script to build and deploy the client app to Vercel

echo "Building the client app..."

# Navigate to the client directory
cd apps/client

# Build the client app
pnpm build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # Deploy to Vercel
    echo "Deploying to Vercel..."
    vercel --prod dist/apps/client
    
    if [ $? -eq 0 ]; then
        echo "Deployment successful!"
    else
        echo "Deployment failed!"
        exit 1
    fi
else
    echo "Build failed!"
    exit 1
fi