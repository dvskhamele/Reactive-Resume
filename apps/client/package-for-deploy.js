const fs = require('fs-extra');
const path = require('path');

// Directories
const projectRoot = path.resolve(__dirname, '../..'); // Project root directory
const clientDir = path.resolve(__dirname); // Client directory
const deployDir = path.join(projectRoot, 'dist', 'apps', 'client');
const publicDir = path.join(clientDir, 'public');

console.log('Creating deployable package...');
console.log(`Source: ${clientDir}`);
console.log(`Destination: ${deployDir}`);

// Ensure deploy directory exists and is clean
fs.emptyDirSync(deployDir);
console.log('Cleaned deploy directory');

// Copy public assets
if (fs.pathExistsSync(publicDir)) {
  fs.copySync(publicDir, deployDir);
  console.log('Copied public assets');
}

// Copy or create index.html
const indexPath = path.join(clientDir, 'static-index.html');
const targetIndexPath = path.join(deployDir, 'index.html');

if (fs.pathExistsSync(indexPath)) {
  fs.copyFileSync(indexPath, targetIndexPath);
} else {
  // Create a basic index.html if static-index.html doesn't exist
  const basicHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Signimus Resume Creator</title>
    <style>
      body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
      #root { display: flex; align-items: center; justify-content: center; height: 100vh; }
      .message { text-align: center; }
      button { padding: 10px 20px; background: #22c55e; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div id="root">
      <div class="message">
        <h1>Signimus Resume Creator</h1>
        <p>Client-only version deployed successfully!</p>
        <p>All data is stored locally in your browser.</p>
        <button onclick="location.reload()">Continue</button>
      </div>
    </div>
  </body>
</html>`;
  fs.writeFileSync(targetIndexPath, basicHtml);
}
console.log('Created index.html');

// Copy static assets
const assetsToCopy = [
  'assets',
  'backgrounds',
  'brand-logos',
  'favicon.ico',
  'icon',
  'logo',
  'sample-resumes',
  'screenshots',
  'scripts',
  'styles',
  'support-logos',
  'templates'
];

assetsToCopy.forEach(asset => {
  const sourceAsset = path.join(clientDir, 'public', asset);
  const targetAsset = path.join(deployDir, asset);
  
  if (fs.pathExistsSync(sourceAsset)) {
    fs.copySync(sourceAsset, targetAsset);
    console.log(`Copied ${asset}`);
  }
});

console.log('\nDeployment package ready!');
console.log(`Location: ${deployDir}`);
console.log('\nTo serve locally:');
console.log(`cd ${deployDir} && npx serve -s`); 
console.log('\nTo deploy to Vercel:');
console.log(`vercel ${deployDir}`);
console.log('\nYour app is ready for deployment!');