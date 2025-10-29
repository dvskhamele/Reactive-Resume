const fs = require('fs-extra');
const path = require('path');

// Source and destination directories
const srcDir = path.join(__dirname, 'public');
const destDir = path.join(__dirname, 'dist');

// Create dist directory
fs.ensureDirSync(destDir);

// Copy all public assets
fs.copySync(srcDir, destDir);

console.log('Static assets copied to dist folder');

// Create a simple index.html that loads the app
const indexPath = path.join(destDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Signimus Resume Creator</title>
    <style>
        body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
        #loading { text-align: center; padding: 50px; }
        #root { height: 100vh; }
    </style>
</head>
<body>
    <div id="loading">Loading Signimus Resume Creator...</div>
    <div id="root"></div>
    <script>
        // Simple client-side app placeholder
        document.getElementById('loading').innerHTML = 'Signimus Resume Creator - Client Version';
    </script>
</body>
</html>`;
  
  fs.writeFileSync(indexPath, indexHtml);
  console.log('Created basic index.html');
}

console.log('Static build complete!');