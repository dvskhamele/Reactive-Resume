// Script to fix resume data in localStorage
(function() {
  const KEY = "signimus-resume-data";
  
  // Get existing data
  const existingData = localStorage.getItem(KEY);
  if (!existingData) {
    console.log("No existing data found");
    return;
  }
  
  try {
    const data = JSON.parse(existingData);
    console.log("Current data structure:", data);
    
    // Fix resume data structure if needed
    if (data.resumes && Array.isArray(data.resumes)) {
      data.resumes = data.resumes.map(resume => {
        // Ensure all required fields exist
        const fixedResume = {
          ...resume,
          title: resume.title || resume.name || "Untitled Resume",
          locked: resume.locked !== undefined ? resume.locked : false,
          data: {
            ...resume.data,
            metadata: {
              ...resume.data?.metadata,
              template: resume.data?.metadata?.template || "catalyst",
              page: {
                ...resume.data?.metadata?.page,
                format: (resume.data?.metadata?.page?.format || "a4").toLowerCase()
              }
            }
          }
        };
        
        // Fix section data structures
        if (fixedResume.data.sections) {
          Object.keys(fixedResume.data.sections).forEach(sectionKey => {
            const section = fixedResume.data.sections[sectionKey];
            if (section && typeof section === 'object') {
              // Ensure all section fields exist
              fixedResume.data.sections[sectionKey] = {
                id: section.id || sectionKey,
                name: section.name || sectionKey.charAt(0).toUpperCase() + sectionKey.slice(1),
                visible: section.visible !== undefined ? section.visible : true,
                columns: section.columns || 1,
                separateLinks: section.separateLinks !== undefined ? section.separateLinks : true,
                items: Array.isArray(section.items) ? section.items : []
              };
            }
          });
        }
        
        return fixedResume;
      });
    }
    
    // Save fixed data
    localStorage.setItem(KEY, JSON.stringify(data));
    console.log("Data structure fixed successfully");
  } catch (error) {
    console.error("Error fixing data structure:", error);
  }
})();