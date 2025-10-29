#!/bin/bash
# Simple deploy script that respects Vercel rate limits

echo "Building the client app with localStorage enabled..."
export VITE_USE_LOCAL_STORAGE="true"
cd /Users/test/startups/Reactive-Resume
pnpm build:client

echo "Deployment ready. To deploy to Vercel, run:"
echo "  cd /Users/test/startups/Reactive-Resume"
echo "  vercel --prod"
echo ""
echo "Note: If you get rate limit errors, wait 7 hours or try with archive option:"
echo "  vercel --prod --archive=tgz"