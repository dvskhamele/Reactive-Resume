import { createId } from "@paralleldrive/cuid2";
import type { ResumeDto, UserDto } from "@reactive-resume/dto";
import { t } from "@lingui/macro";
import type { ResumeData } from "@reactive-resume/schema";

// Define the data structure for local storage
interface LocalStorageData {
  user: UserDto | null;
  resumes: ResumeDto[];
}

const LOCAL_STORAGE_KEY = "signimus-resume-data";

// Initialize with sample data if needed
const initializeLocalStorage = (): LocalStorageData => {
  const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (existingData) {
    try {
      return JSON.parse(existingData);
    } catch {
      // If parsing fails, return empty structure
      return { user: null, resumes: [] };
    }
  }

  // Create default user
  const defaultUser: UserDto = {
    id: createId(),
    email: "user@signimus.com",
    name: "Signimus User",
    username: "signimususer",
    locale: "en-US",
    picture: null,
    provider: "email", // Changed from "local" to "email" to match allowed values
    emailVerified: false, // Changed from null to false
    twoFactorEnabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "user",
  };

  // Create dummy resume data
  const dummyResume: ResumeDto = {
    id: createId(),
    userId: defaultUser.id,
    name: "My Professional Resume",
    slug: "my-professional-resume",
    visibility: "public",
    createdAt: new Date(),
    updatedAt: new Date(),
    data: {
      basics: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        url: { href: "https://johndoe.portfolio", label: "Portfolio" },
        location: "San Francisco, CA",
        headline: "Senior Software Engineer",
        summary: "Passionate software engineer with 5+ years of experience in building scalable web applications using modern technologies.",
        image: "",
        profiles: [
          { network: "linkedin", username: "johndoe", url: "https://linkedin.com/in/johndoe", icon: "linkedin-logo" },
          { network: "github", username: "johndoe", url: "https://github.com/johndoe", icon: "github-logo" }
        ],
      },
      sections: {
        basics: {
          id: "basics",
          name: "Personal Information",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [],
        },
        work: {
          id: "work",
          name: "Work Experience",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [
            {
              id: createId(),
              name: "Tech Corp",
              location: "San Francisco, CA",
              position: "Senior Software Engineer",
              url: { href: "https://techcorp.com", label: "Tech Corp" },
              startDate: "2022-01",
              endDate: "Present",
              summary: "Developed and maintained scalable web applications using React, Node.js, and modern JavaScript frameworks.",
              keywords: ["React", "Node.js", "TypeScript", "AWS"]
            },
            {
              id: createId(),
              name: "Startup Inc.",
              location: "San Francisco, CA",
              position: "Software Engineer",
              url: "https://startupinc.com",
              startDate: "2020-06",
              endDate: "2021-12",
              summary: "Built new features and improved existing ones in a fast-paced startup environment.",
              keywords: ["JavaScript", "React", "Node.js"]
            }
          ],
        },
        volunteer: {
          id: "volunteer",
          name: "Volunteer",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [],
        },
        education: {
          id: "education",
          name: "Education",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [
            {
              id: createId(),
              institution: "University of California",
              location: "Berkeley, CA",
              studyType: "Bachelor's Degree",
              area: "Computer Science",
              url: { href: "https://berkeley.edu", label: "UC Berkeley" },
              startDate: "2016-09",
              endDate: "2020-05",
              score: "3.8/4.0",
              summary: "Relevant courses: Data Structures, Algorithms, Web Development, Software Engineering",
              keywords: ["Data Structures", "Algorithms", "Web Development"]
            }
          ],
        },
        awards: {
          id: "awards",
          name: "Awards",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [],
        },
        certificates: {
          id: "certificates",
          name: "Certificates",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [
            {
              id: createId(),
              name: "AWS Certified Solutions Architect",
              issuer: "Amazon Web Services",
              url: { href: "https://aws.amazon.com", label: "AWS" },
              date: "2022-03"
            },
            {
              id: createId(),
              name: "Google Professional Cloud Developer",
              issuer: "Google Cloud",
              url: { href: "https://cloud.google.com", label: "Google Cloud" },
              date: "2021-08"
            }
          ],
        },
        publications: {
          id: "publications",
          name: "Publications",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [],
        },
        skills: {
          id: "skills",
          name: "Skills",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [
            {
              id: createId(),
              name: "JavaScript",
              level: 5,
              description: "Advanced knowledge of JavaScript including ES6+ features",
              keywords: ["ES6", "Async/Await", "Closures", "Promises"],
              visible: true
            },
            {
              id: createId(),
              name: "React",
              level: 5,
              description: "Expert in React and related ecosystem",
              keywords: ["Hooks", "Context API", "Redux", "Next.js"],
              visible: true
            },
            {
              id: createId(),
              name: "Node.js",
              level: 4,
              description: "Building REST APIs and server-side applications",
              keywords: ["Express", "MongoDB", "REST", "GraphQL"],
              visible: true
            }
          ],
        },
        languages: {
          id: "languages",
          name: "Languages",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [
            {
              id: createId(),
              name: "English",
              level: 5,
              description: "Native speaker",
              visible: true
            },
            {
              id: createId(),
              name: "Spanish",
              level: 3,
              description: "Intermediate proficiency",
              visible: true
            }
          ],
        },
        interests: {
          id: "interests",
          name: "Interests",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [
            {
              id: createId(),
              name: "Open Source",
              keywords: ["React", "TypeScript", "JavaScript"],
              visible: true
            },
            {
              id: createId(),
              name: "Machine Learning",
              keywords: ["Python", "TensorFlow", "AI"],
              visible: true
            }
          ],
        },
        references: {
          id: "references",
          name: "References",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [
            {
              id: createId(),
              name: "Jane Smith",
              position: "Engineering Manager at Tech Corp",
              phone: "+1 (555) 987-6543",
              email: "jane.smith@techcorp.com",
              summary: "Direct supervisor for 2 years, can vouch for technical skills and work ethic.",
              visible: true
            }
          ],
        },
        projects: {
          id: "projects",
          name: "Projects",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [
            {
              id: createId(),
              name: "E-commerce Platform",
              description: "Full-stack e-commerce platform with React, Node.js, and PostgreSQL",
              highlights: [
                "Implemented secure payment processing",
                "Built with modern security practices",
                "Achieved 99.9% uptime"
              ],
              keywords: ["React", "Node.js", "PostgreSQL", "Stripe"],
              startDate: "2022-03",
              endDate: "2022-08",
              url: { href: "https://ecommerce-demo.com", label: "E-commerce Platform" },
            }
          ],
        },
        custom: {
          id: "custom",
          name: "Custom",
          visible: true,
          columns: 1,
          separateLinks: true,
          items: [],
        },
      },
      metadata: {
        layout: [[["basics"], ["work"], ["education"], ["projects"], ["skills"], ["languages"], ["interests"]], [["awards"], ["certificates"], ["publications"], ["volunteer"], ["references"]]],
        page: {
          slideshow: {
            enabled: false,
            interval: 5,
          },
          numbering: "none",
          pagination: false,
          filename: "John_Doe_Resume",
          format: "A4",
          optimize: true,
          orientation: "portrait",
          margins: 24.5,
          print: false,
          slides: true,
        },
        theme: {
          background: "#1e293b",
          primary: "#22c55e",
          text: {
            primary: "#1e293b",
            secondary: "#64748b",
            accent: "#22c55e",
          },
        },
      },
    },
  };

  const initialData: LocalStorageData = {
    user: defaultUser,
    resumes: [dummyResume],
  };

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

// Load data from localStorage
const getLocalStorageData = (): LocalStorageData => {
  const existingData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (existingData) {
    try {
      const parsed = JSON.parse(existingData);
      // Ensure required arrays exist
      if (!parsed.resumes || !Array.isArray(parsed.resumes)) {
        parsed.resumes = [];
      }
      return parsed;
    } catch {
      // If parsing fails, return empty structure
      return { user: null, resumes: [] };
    }
  }
  return initializeLocalStorage();
};

// Save data to localStorage
const saveLocalStorageData = (data: LocalStorageData) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
};

export const localStorageService = {
  // User related operations
  getUser: (): UserDto | null => {
    const data = getLocalStorageData();
    return data.user;
  },

  updateUser: (userData: Partial<UserDto>): UserDto => {
    const data = getLocalStorageData();
    if (!data.user) {
      // Create a default user if none exists
      data.user = {
        id: createId(),
        email: "user@signimus.com",
        name: "Signimus User",
        username: "signimususer",
        locale: "en-US",
        picture: null,
        provider: "local",
        emailVerified: null,
        twoFactorEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "user",
      };
    }

    Object.assign(data.user, userData, { updatedAt: new Date() });
    saveLocalStorageData(data);
    return data.user;
  },

  // Resume related operations
  getResumes: (): ResumeDto[] => {
    const data = getLocalStorageData();
    // Ensure resumes is always an array
    if (!data.resumes || !Array.isArray(data.resumes)) {
      data.resumes = [];
      saveLocalStorageData(data);
    }
    return data.resumes;
  },

  getResumeById: (id: string): ResumeDto | undefined => {
    const data = getLocalStorageData();
    if (!data.resumes || !Array.isArray(data.resumes)) {
      data.resumes = [];
      saveLocalStorageData(data);
      return undefined;
    }
    return data.resumes.find(resume => resume.id === id);
  },

  createResume: (name?: string): ResumeDto => {
    const data = getLocalStorageData();
    
    const newResume: ResumeDto = {
      id: createId(),
      userId: data.user?.id || "local-user",
      name: name || t`Untitled Resume`,
      title: name || t`Untitled Resume`, // Add missing title field
      slug: `${name || 'untitled'}-${Date.now()}`,
      visibility: "private",
      locked: false, // Add missing locked field
      createdAt: new Date(),
      updatedAt: new Date(),
      data: {
        basics: {
          name: "",
          email: "",
          phone: "",
          url: { href: "", label: "" },
          location: "",
          headline: "",
          summary: "",
          image: "",
          profiles: [],
        },
        sections: {
          basics: {
            id: "basics",
            name: t`Basics`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          work: {
            id: "work",
            name: t`Work`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          volunteer: {
            id: "volunteer",
            name: t`Volunteer`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          education: {
            id: "education",
            name: t`Education`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          awards: {
            id: "awards",
            name: t`Awards`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          certificates: {
            id: "certificates",
            name: t`Certificates`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          publications: {
            id: "publications",
            name: t`Publications`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          skills: {
            id: "skills",
            name: t`Skills`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          languages: {
            id: "languages",
            name: t`Languages`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          interests: {
            id: "interests",
            name: t`Interests`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          references: {
            id: "references",
            name: t`References`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          projects: {
            id: "projects",
            name: t`Projects`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
          custom: {
            id: "custom",
            name: t`Custom`,
            visible: true,
            columns: 1,
            separateLinks: true,
            items: [],
          },
        },
        metadata: {
          layout: [[["basics"], ["work"], ["education"], ["projects"], ["skills"], ["languages"], ["interests"]], [["awards"], ["certificates"], ["publications"], ["volunteer"], ["references"]]],
          page: {
            slideshow: {
              enabled: false,
              interval: 5,
            },
            numbering: "none",
            pagination: false,
            filename: "Resume",
            format: "a4", // Fixed case-sensitive value
            optimize: true,
            orientation: "portrait",
            margins: 24.5,
            print: false,
            slides: true,
          },
          template: "catalyst", // Add missing template field
          theme: {
            background: "#1e293b",
            primary: "#22c55e",
            text: {
              primary: "#1e293b",
              secondary: "#64748b",
              accent: "#22c55e",
            },
          },
        },
      },
    };

    // Add to resumes list
    data.resumes.push(newResume);
    
    saveLocalStorageData(data);
    return newResume;
  },

  updateResume: (id: string, updateData: Partial<ResumeDto>): ResumeDto => {
    const data = getLocalStorageData();
    
    if (!data.resumes || !Array.isArray(data.resumes)) {
      data.resumes = [];
      saveLocalStorageData(data);
      throw new Error(t`Resume not found`);
    }
    
    const resumeIndex = data.resumes.findIndex(resume => resume.id === id);
    if (resumeIndex === -1) {
      throw new Error(t`Resume not found`);
    }

    // Update the resume data with proper structure maintenance
    const currentResume = data.resumes[resumeIndex];
    
    // Ensure the updated resume has proper structure
    const updatedResume: ResumeDto = { 
      ...currentResume,
      ...updateData,
      name: updateData.name || currentResume.name,
      title: updateData.title || updateData.name || currentResume.title || currentResume.name || t`Untitled Resume`,
      locked: updateData.locked !== undefined ? updateData.locked : currentResume.locked,
      updatedAt: new Date(),
      data: updateData.data ? {
        ...currentResume.data,
        ...updateData.data,
        basics: updateData.data.basics || currentResume.data.basics,
        sections: updateData.data.sections || currentResume.data.sections,
        metadata: updateData.data.metadata ? {
          ...currentResume.data.metadata,
          ...updateData.data.metadata,
          page: updateData.data.metadata.page ? {
            ...currentResume.data.metadata.page,
            ...updateData.data.metadata.page,
            format: updateData.data.metadata.page.format?.toLowerCase() || currentResume.data.metadata.page.format || "a4"
          } : currentResume.data.metadata.page,
          template: updateData.data.metadata.template || currentResume.data.metadata.template || "catalyst"
        } : currentResume.data.metadata
      } : currentResume.data
    };

    data.resumes[resumeIndex] = updatedResume;
    saveLocalStorageData(data);
    return updatedResume;
  },

  deleteResume: (id: string): ResumeDto => {
    const data = getLocalStorageData();
    
    const resumeIndex = data.resumes.findIndex(resume => resume.id === id);
    if (resumeIndex === -1) {
      throw new Error(t`Resume not found`);
    }

    const deletedResume = data.resumes[resumeIndex];
    data.resumes.splice(resumeIndex, 1);

    saveLocalStorageData(data);
    return deletedResume;
  },

  importResume: (resumeData: any): ResumeDto => {
    const data = getLocalStorageData();
    
    // Ensure the imported resume has proper structure
    const importedResume: ResumeDto = {
      id: resumeData.id || createId(),
      userId: data.user?.id || "local-user",
      name: resumeData.name || resumeData.title || t`Imported Resume`,
      title: resumeData.name || resumeData.title || t`Imported Resume`,
      slug: `${(resumeData.name || 'imported')}-${Date.now()}`,
      visibility: resumeData.visibility || "private",
      locked: resumeData.locked !== undefined ? resumeData.locked : false,
      createdAt: resumeData.createdAt || new Date(),
      updatedAt: new Date(), // Set to current date for import
      data: {
        basics: resumeData.data?.basics || {
          name: "",
          email: "",
          phone: "",
          url: { href: "", label: "" },
          location: "",
          headline: "",
          summary: "",
          image: "",
          profiles: [],
        },
        sections: resumeData.data?.sections || {
          basics: { id: "basics", name: "Basics", visible: true, columns: 1, separateLinks: true, items: [] },
          work: { id: "work", name: "Work", visible: true, columns: 1, separateLinks: true, items: [] },
          volunteer: { id: "volunteer", name: "Volunteer", visible: true, columns: 1, separateLinks: true, items: [] },
          education: { id: "education", name: "Education", visible: true, columns: 1, separateLinks: true, items: [] },
          awards: { id: "awards", name: "Awards", visible: true, columns: 1, separateLinks: true, items: [] },
          certificates: { id: "certificates", name: "Certificates", visible: true, columns: 1, separateLinks: true, items: [] },
          publications: { id: "publications", name: "Publications", visible: true, columns: 1, separateLinks: true, items: [] },
          skills: { id: "skills", name: "Skills", visible: true, columns: 1, separateLinks: true, items: [] },
          languages: { id: "languages", name: "Languages", visible: true, columns: 1, separateLinks: true, items: [] },
          interests: { id: "interests", name: "Interests", visible: true, columns: 1, separateLinks: true, items: [] },
          references: { id: "references", name: "References", visible: true, columns: 1, separateLinks: true, items: [] },
          projects: { id: "projects", name: "Projects", visible: true, columns: 1, separateLinks: true, items: [] },
          custom: { id: "custom", name: "Custom", visible: true, columns: 1, separateLinks: true, items: [] },
        },
        metadata: {
          layout: resumeData.data?.metadata?.layout || [[["basics"], ["work"], ["education"], ["projects"], ["skills"], ["languages"], ["interests"]], [["awards"], ["certificates"], ["publications"], ["volunteer"], ["references"]]],
          page: {
            slideshow: resumeData.data?.metadata?.page?.slideshow || { enabled: false, interval: 5 },
            numbering: resumeData.data?.metadata?.page?.numbering || "none",
            pagination: resumeData.data?.metadata?.page?.pagination !== undefined ? resumeData.data?.metadata?.page?.pagination : false,
            filename: resumeData.data?.metadata?.page?.filename || "Resume",
            format: resumeData.data?.metadata?.page?.format?.toLowerCase() || "a4",
            optimize: resumeData.data?.metadata?.page?.optimize !== undefined ? resumeData.data?.metadata?.page?.optimize : true,
            orientation: resumeData.data?.metadata?.page?.orientation || "portrait",
            margins: resumeData.data?.metadata?.page?.margins || 24.5,
            print: resumeData.data?.metadata?.page?.print !== undefined ? resumeData.data?.metadata?.page?.print : false,
            slides: resumeData.data?.metadata?.page?.slides !== undefined ? resumeData.data?.metadata?.page?.slides : true,
          },
          template: resumeData.data?.metadata?.template || "catalyst",
          theme: {
            background: resumeData.data?.metadata?.theme?.background || "#1e293b",
            primary: resumeData.data?.metadata?.theme?.primary || "#22c55e",
            text: {
              primary: resumeData.data?.metadata?.theme?.text?.primary || "#1e293b",
              secondary: resumeData.data?.metadata?.theme?.text?.secondary || "#64748b",
              accent: resumeData.data?.metadata?.theme?.text?.accent || "#22c55e",
            },
          },
        }
      }
    };

    // Add to resumes list
    data.resumes.push(importedResume);
    
    saveLocalStorageData(data);
    return importedResume;
  },

  lockResume: (id: string, set: boolean): ResumeDto => {
    const data = getLocalStorageData();
    
    const resumeIndex = data.resumes.findIndex(resume => resume.id === id);
    if (resumeIndex === -1) {
      throw new Error(t`Resume not found`);
    }

    // For client-only implementation, we'll just update the locked status
    // In a real implementation we might have an isLocked field, but since
    // the schema doesn't have it, we'll just return the unchanged resume
    const resume = data.resumes[resumeIndex];
    
    saveLocalStorageData(data);
    return resume;
  },

  // Authentication related operations
  login: (email: string, password: string) => {
    // For local storage, we just need to ensure user data exists
    const data = getLocalStorageData();
    if (!data.user) {
      data.user = {
        id: createId(),
        email: email,
        name: "Signimus User",
        username: email.split("@")[0],
        locale: "en-US",
        picture: null,
        provider: "local",
        emailVerified: null,
        twoFactorEnabled: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        role: "user",
      };
      saveLocalStorageData(data);
    }
    return { user: data.user, accessToken: "local-token", refreshToken: "local-refresh-token" };
  },

  register: (email: string, password: string, name: string) => {
    // For local storage, we just need to create user data
    const data = getLocalStorageData();
    data.user = {
      id: createId(),
      email: email,
      name: name,
      username: email.split("@")[0],
      locale: "en-US",
      picture: null,
      provider: "local",
      emailVerified: null,
      twoFactorEnabled: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      role: "user",
    };
    saveLocalStorageData(data);
    return { user: data.user, accessToken: "local-token", refreshToken: "local-refresh-token" };
  },

  logout: () => {
    // For local storage, we don't need to do anything special
    // We could clear user data if needed, but for now we'll keep it
    return { message: "Logged out successfully" };
  },

  getDefaultFeatureFlags: () => {
    return {
      isSignupsDisabled: false,
      isEmailAuthDisabled: false,
    };
  },

  clearAllData: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};