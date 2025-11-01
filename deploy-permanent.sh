#!/bin/bash
# Permanent deployment script for Reactive-Resume

echo "🚀 Starting deployment process..."

# Navigate to project root
cd /Users/test/startups/Reactive-Resume

# Temporary rename workspace files to avoid monorepo detection
echo "🔄 Renaming workspace files..."
mv nx.json nx.json.tmp 2>/dev/null || true
mv pnpm-workspace.yaml pnpm-workspace.yaml.tmp 2>/dev/null || true

# Deploy with Netlify CLI
echo "📦 Deploying to Netlify..."
netlify deploy --prod --no-build --dir=./dist-for-netlify/apps/client --filter client

# Restore workspace files
echo "🔄 Restoring workspace files..."
mv nx.json.tmp nx.json 2>/dev/null || true
mv pnpm-workspace.yaml.tmp pnpm-workspace.yaml 2>/dev/null || true

echo "✅ Deployment completed successfully!"
echo "🌐 Visit: https://candidateprofile.netlify.app"