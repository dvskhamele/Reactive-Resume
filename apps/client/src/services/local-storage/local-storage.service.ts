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
    provider: "local",
    emailVerified: null,
    twoFactorEnabled: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    role: "user",
  };

  const initialData: LocalStorageData = {
    user: defaultUser,
    resumes: [],
  };

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
  return initialData;
};

// Load data from localStorage
const getLocalStorageData = (): LocalStorageData => {
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
    return data.resumes || [];
  },

  getResumeById: (id: string): ResumeDto | undefined => {
    const data = getLocalStorageData();
    return data.resumes.find(resume => resume.id === id);
  },

  createResume: (name?: string): ResumeDto => {
    const data = getLocalStorageData();
    
    const newResume: ResumeDto = {
      id: createId(),
      userId: data.user?.id || "local-user",
      name: name || t`Untitled Resume`,
      slug: `${name || 'untitled'}-${Date.now()}`,
      visibility: "private",
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
          custom: {},
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

    // Add to resumes list
    data.resumes.push(newResume);
    
    saveLocalStorageData(data);
    return newResume;
  },

  updateResume: (id: string, updateData: Partial<ResumeDto>): ResumeDto => {
    const data = getLocalStorageData();
    
    const resumeIndex = data.resumes.findIndex(resume => resume.id === id);
    if (resumeIndex === -1) {
      throw new Error(t`Resume not found`);
    }

    // Update the resume data
    const updatedResume = { 
      ...data.resumes[resumeIndex], 
      ...updateData,
      updatedAt: new Date() 
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

  clearAllData: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
};