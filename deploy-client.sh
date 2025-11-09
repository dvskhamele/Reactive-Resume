#!/bin/bash

# Script to build and deploy the client app to Vercel

echo "Building the client app..."

# Set environment variable to use local storage instead of API calls
export VITE_USE_LOCAL_STORAGE="true"

<<<<<<< HEAD
# Build the client app from the project root
cd /Users/test/startups/Reactive-Resume
=======
# Build the client app from the root directory
>>>>>>> bk_Reactive-Resume_20251029_194242_MOD____6-UNT____2_MOD_
pnpm build:client

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # Deploy to Vercel from the project root
    echo "Deploying to Vercel..."
    vercel --prod
    
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