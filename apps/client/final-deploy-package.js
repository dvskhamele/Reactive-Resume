const fs = require('fs-extra');
const path = require('path');

// Create final deployment package
function createFinalPackage() {
  try {
    console.log('Creating final deployment package...');
    
    // Source directories
    const projectRoot = path.resolve(__dirname, '../..');
    const clientDir = __dirname;
    const minimalDist = path.join(clientDir, 'dist-minimal');
    const publicDir = path.join(clientDir, 'public');
    
    // Final deployment directory
    const finalDeployDir = path.join(projectRoot, 'dist', 'final-deploy');
    
    console.log(`Final deployment directory: ${finalDeployDir}`);
    
    // Clean and create final deployment directory
    fs.emptyDirSync(finalDeployDir);
    console.log('Cleaned deployment directory');
    
    // Copy all assets from minimal dist
    if (fs.existsSync(minimalDist)) {
      fs.copySync(minimalDist, finalDeployDir);
      console.log('Copied minimal dist assets');
    }
    
    // Copy any additional public assets that might be missing
    if (fs.existsSync(publicDir)) {
      const publicItems = fs.readdirSync(publicDir);
      publicItems.forEach(item => {
        const srcPath = path.join(publicDir, item);
        const destPath = path.join(finalDeployDir, item);
        if (!fs.existsSync(destPath)) {
          fs.copySync(srcPath, destPath);
          console.log(`Copied additional asset: ${item}`);
        }
      });
    }
    
    console.log('\nFinal deployment package ready!');
    console.log(`Location: ${finalDeployDir}`);
    console.log('\nTo serve locally:');
    console.log(`cd ${finalDeployDir} && npx serve -s`); 
    console.log('\nTo deploy to Vercel:');
    console.log(`vercel ${finalDeployDir}`);
    console.log('\nYour app is ready for deployment!');
    
  } catch (error) {
    console.error('Failed to create final package:', error);
    process.exit(1);
  }
}

createFinalPackage();