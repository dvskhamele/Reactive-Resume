#!/bin/bash

# Install dependencies
npm install

# Build only the client app with type checking disabled
cd apps/client

# Install client dependencies
npm install

# Build the client with typescript isolatedModules flag disabled
npx tsc --noEmit --skipLibCheck --isolatedModules false
npx vite build