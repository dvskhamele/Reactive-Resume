const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs-extra');

// Bundle the minimal React app
async function bundleApp() {
  try {
    console.log('Bundling minimal React app...');
    
    const outDir = path.join(__dirname, 'dist-minimal');
    fs.ensureDirSync(outDir);
    
    // Copy public assets
    const publicDir = path.join(__dirname, 'public');
    if (fs.existsSync(publicDir)) {
      fs.copySync(publicDir, outDir);
      console.log('Copied public assets');
    }
    
    // Bundle the JavaScript
    await esbuild.build({
      entryPoints: [path.join(__dirname, 'minimal-react-app.js')],
      bundle: true,
      outfile: path.join(outDir, 'bundle.js'),
      format: 'esm',
      target: ['es2020'],
      external: ['react', 'react-dom'],
      loader: {
        '.js': 'jsx',
      },
      jsx: 'automatic',
    });
    
    console.log('Bundled JavaScript');
    
    // Create HTML file
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Signimus Resume Creator</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <!-- Load React -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-router-dom@6/dist/umd/react-router-dom.production.min.js"></script>
    <!-- Load our bundled app -->
    <script type="module" src="./bundle.js"></script>
  </body>
</html>`;
    
    fs.writeFileSync(path.join(outDir, 'index.html'), htmlContent);
    console.log('Created index.html');
    
    console.log('Minimal app bundled successfully!');
    console.log(`Output directory: ${outDir}`);
    
  } catch (error) {
    console.error('Bundle failed:', error);
    process.exit(1);
  }
}

bundleApp();