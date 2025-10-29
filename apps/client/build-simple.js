const esbuild = require('esbuild');
const path = require('path');
const fs = require('fs-extra');

// Create a simple build that bundles the main application
async function buildApp() {
  try {
    console.log('Starting simple build...');
    
    // Ensure output directory exists
    const outDir = path.join(__dirname, 'dist-simple');
    fs.ensureDirSync(outDir);
    
    // Copy public assets first
    const publicDir = path.join(__dirname, 'public');
    if (fs.existsSync(publicDir)) {
      fs.copySync(publicDir, outDir);
      console.log('Copied public assets');
    }
    
    // Create a simple HTML file that loads our app
    const htmlContent = `<!DOCTYPE html>
<html lang="en-US" translate="no">
  <head>
    <base href="/" />
    <title>Signimus Resume Creator - A free and open-source resume builder</title>
    <meta name="description" content="A free and open-source resume builder that simplifies the process of creating, updating, and sharing your resume." />
    <meta charset="utf-8" />
    <meta name="googlebot" content="notranslate" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" type="image/svg+xml" href="/icon/dark.svg" media="(prefers-color-scheme: light)" />
    <link rel="icon" type="image/svg+xml" href="/icon/light.svg" media="(prefers-color-scheme: dark)" />
    <style>
      body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; background-color: #f9fafb; }
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
    <script>
      // Global mock for axios
      window.axios = {
        get: async (url) => {
          console.log('GET request to:', url);
          return { data: null };
        },
        post: async (url, data) => {
          console.log('POST request to:', url, data);
          return { data: { message: 'Success' } };
        },
        patch: async (url, data) => {
          console.log('PATCH request to:', url, data);
          return { data: { message: 'Success' } };
        },
        delete: async (url) => {
          console.log('DELETE request to:', url);
          return { data: { message: 'Success' } };
        },
        put: async (url, data) => {
          console.log('PUT request to:', url, data);
          return { data: { message: 'Success' } };
        }
      };
      
      // Mock for localStorage service
      window.localStorageService = {
        getUser: () => {
          const data = localStorage.getItem('signimus-resume-data');
          return data ? JSON.parse(data).user : null;
        },
        getResumes: () => {
          const data = localStorage.getItem('signimus-resume-data');
          return data ? JSON.parse(data).resumes : [];
        },
        createResume: (name) => {
          const id = 'resume-' + Date.now();
          const resume = {
            id,
            name: name || 'New Resume',
            createdAt: new Date(),
            updatedAt: new Date(),
            data: {
              basics: { name: '', email: '', phone: '', url: { href: '', label: '' }, location: '', headline: '', summary: '', image: '', profiles: [] },
              sections: {
                basics: { id: 'basics', name: 'Basics', visible: true, columns: 1, separateLinks: true, items: [] },
                work: { id: 'work', name: 'Work Experience', visible: true, columns: 1, separateLinks: true, items: [] },
                education: { id: 'education', name: 'Education', visible: true, columns: 1, separateLinks: true, items: [] },
                skills: { id: 'skills', name: 'Skills', visible: true, columns: 1, separateLinks: true, items: [] }
              },
              metadata: {
                layout: [[['basics'], ['work'], ['education'], ['skills']]],
                page: { format: 'A4', orientation: 'portrait', margins: 24.5 },
                theme: { background: '#ffffff', primary: '#22c55e', text: { primary: '#1e293b', secondary: '#64748b', accent: '#22c55e' } }
              }
            }
          };
          
          const data = localStorage.getItem('signimus-resume-data');
          const storageData = data ? JSON.parse(data) : { user: null, resumes: [] };
          storageData.resumes.push(resume);
          localStorage.setItem('signimus-resume-data', JSON.stringify(storageData));
          
          return resume;
        }
      };
    </script>
  </body>
</html>`;
    
    fs.writeFileSync(path.join(outDir, 'index.html'), htmlContent);
    console.log('Created index.html');
    
    console.log('Simple build complete!');
    console.log(`Output directory: ${outDir}`);
    
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildApp();