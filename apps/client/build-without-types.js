const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs-extra');

// Create a build that bypasses TypeScript checking
async function buildWithoutTypes() {
  try {
    console.log('Building without TypeScript checking...');
    
    // Output directory
    const outDir = path.join(__dirname, '../../dist/apps/client-no-types');
    fs.ensureDirSync(outDir);
    
    // Copy public assets
    const publicDir = path.join(__dirname, 'public');
    if (fs.existsSync(publicDir)) {
      fs.copySync(publicDir, outDir);
      console.log('Copied public assets');
    }
    
    // Bundle the main application files
    await esbuild.build({
      entryPoints: [path.join(__dirname, 'src/main.tsx')],
      bundle: true,
      outdir: outDir,
      format: 'esm',
      target: ['es2020'],
      external: ['react', 'react-dom', 'react-router', 'react-router-dom'],
      loader: {
        '.tsx': 'tsx',
        '.ts': 'ts',
        '.js': 'js',
        '.jsx': 'jsx',
        '.po': 'text',
      },
      jsx: 'automatic',
      define: {
        'process.env.NODE_ENV': '"production"',
        'import.meta.env.VITE_USE_LOCAL_STORAGE': '"true"',
      },
      sourcemap: true,
      minify: true,
    });
    
    console.log('Bundled application files');
    
    // Create a simple HTML file
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <base href="/" />
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Signimus Resume Creator</title>
    <style>
      body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
      #loading { display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column; }
      .spinner { width: 40px; height: 40px; border-radius: 50%; border: 4px solid rgba(0, 0, 0, 0.1); border-left-color: #22c55e; animation: spin 1s linear infinite; margin-bottom: 20px; }
      @keyframes spin { to { transform: rotate(360deg); } }
      h1 { color: #1e293b; margin: 0 0 10px 0; }
      p { color: #64748b; margin: 0; }
    </style>
  </head>
  <body>
    <div id="loading">
      <div class="spinner"></div>
      <h1>Signimus Resume Creator</h1>
      <p>Loading application...</p>
    </div>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/react-router@6/umd/react-router.production.min.js"></script>
    <script src="https://unpkg.com/react-router-dom@6/umd/react-router-dom.production.min.js"></script>
    <script type="module" src="/main.js"></script>
  </body>
</html>`;
    
    fs.writeFileSync(path.join(outDir, 'index.html'), htmlContent);
    console.log('Created index.html');
    
    console.log('Build completed successfully!');
    console.log(`Output directory: ${outDir}`);
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildWithoutTypes();