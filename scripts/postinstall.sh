#!/bin/bash

# Ensure support logos are available in the dist directory
mkdir -p apps/client/dist/assets/logos
cp apps/client/public/support-logos/* apps/client/dist/assets/logos/ 2>/dev/null || true

# Also ensure they're available in the main dist directory
mkdir -p dist/apps/client/assets/logos
cp apps/client/public/support-logos/* dist/apps/client/assets/logos/ 2>/dev/null || true