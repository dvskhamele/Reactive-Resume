# Reactive Resume - Netlify Deployment

This is a deployment of Reactive Resume configured to work with localStorage instead of a backend API.

## Configuration

- The application is built with `VITE_USE_LOCAL_STORAGE=true` to enable localStorage mode
- All API calls are mocked and data is stored in browser localStorage
- The app is configured as a single-page application with client-side routing

## How to Deploy to Netlify

1. **Using Netlify CLI:**
   ```bash
   # Install Netlify CLI
   npm install -g netlify-cli
   
   # Login to Netlify
   netlify login
   
   # Initialize and deploy
   netlify init
   netlify deploy --prod
   ```

2. **Using Netlify Dashboard:**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your repository
   - For build settings, use:
     - Build command: `cd /Users/test/startups/Reactive-Resume && export VITE_USE_LOCAL_STORAGE=true && pnpm build:client`
     - Publish directory: `apps/client/dist`
   - Add the redirect rule automatically handled by the netlify.toml file

## Notes

- This is a client-side only version that works with localStorage
- All data is stored in the browser and is not persisted across different browsers/devices
- No backend server is required for this deployment