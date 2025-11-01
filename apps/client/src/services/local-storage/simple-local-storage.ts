import { createId } from "@paralleldrive/cuid2";
import { t } from "@lingui/macro";

// Define basic types
interface BasicResumeData {
  basics: {
    name: string;
    email: string;
    phone: string;
    url: { href: string; label: string };
    location: string;
    headline: string;
    summary: string;
    image: string;
    profiles: Array<{
      id: string;
      network: string;
      username: string;
      url: string;
      icon: string;
    }>;
  };
  sections: {
    [key: string]: {
      id: string;
      name: string;
      visible: boolean;
      columns: number;
      separateLinks: boolean;
      items: any[];
    };
  };
  metadata: {
    layout: string[][][];
    page: {
      slideshow: {
        enabled: boolean;
        interval: number;
      };
      numbering: string;
      pagination: boolean;
      filename: string;
      format: string;
      optimize: boolean;
      orientation: string;
      margins: number;
      print: boolean;
      slides: boolean;
    };
    theme: {
      background: string;
      primary: string;
      text: {
        primary: string;
        secondary: string;
        accent: string;
      };
    };
  };
}

interface ResumeDto {
  id: string;
  userId: string;
  name: string;
  slug: string;
  visibility: string;
  data: BasicResumeData;
  createdAt: Date;
  updatedAt: Date;
}

interface UserDto {
  id: string;
  email: string;
  name: string;
  username: string;
  locale: string;
  picture: string | null;
  provider: string;
  emailVerified: boolean | null;
  twoFactorEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

// Local storage key
const STORAGE_KEY = "signimus-resume-data";

// Initialize with default data if needed
const initializeStorage = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      // If parsing fails, return empty structure
      return { user: null, resumes: [] };
    }
  }

  // Create default user
  const defaultUser: UserDto = {
    id: createId(),
    email: "local@signimus.com",
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

  // Create empty resumes array
  const data = {
    user: defaultUser,
    resumes: [],
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
};

// Get data from storage
const getStorageData = () => {
  return initializeStorage();
};

// Save data to storage
const saveStorageData = (data: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Local storage service
export const simpleLocalStorageService = {
  // User operations
  getUser: (): UserDto | null => {
    const data = getStorageData();
    return data.user;
  },

  updateUser: (userData: Partial<UserDto>): UserDto => {
    const data = getStorageData();
    if (!data.user) {
      data.user = {
        id: createId(),
        email: "local@signimus.com",
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
    saveStorageData(data);
    return data.user;
  },

  // Resume operations
  getResumes: (): ResumeDto[] => {
    const data = getStorageData();
    return data.resumes || [];
  },

  getResumeById: (id: string): ResumeDto | undefined => {
    const data = getStorageData();
    return (data.resumes || []).find((resume: ResumeDto) => resume.id === id);
  },

  createResume: (name?: string): ResumeDto => {
    const data = getStorageData();
    
    // Initialize resumes array if it doesn't exist
    if (!data.resumes) data.resumes = [];

    const newResume: ResumeDto = {
      id: createId(),
      userId: data.user?.id || "local-user",
      name: name || t`Untitled Resume`,
      slug: `${name || 'untitled'}-${Date.now()}`,
      visibility: "private",
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
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    data.resumes.push(newResume);
    saveStorageData(data);
    return newResume;
  },

  updateResume: (id: string, updateData: any): ResumeDto => {
    const data = getStorageData();
    
    // Initialize resumes array if it doesn't exist
    if (!data.resumes) data.resumes = [];

    const resumeIndex = data.resumes.findIndex((resume: ResumeDto) => resume.id === id);
    if (resumeIndex === -1) {
      throw new Error(t`Resume not found`);
    }

    const updatedResume = {
      ...data.resumes[resumeIndex],
      ...updateData,
      updatedAt: new Date(),
    };

    data.resumes[resumeIndex] = updatedResume;
    saveStorageData(data);
    return updatedResume;
  },

  deleteResume: (id: string): ResumeDto => {
    const data = getStorageData();
    
    // Initialize resumes array if it doesn't exist
    if (!data.resumes) data.resumes = [];

    const resumeIndex = data.resumes.findIndex((resume: ResumeDto) => resume.id === id);
    if (resumeIndex === -1) {
      throw new Error(t`Resume not found`);
    }

    const deletedResume = data.resumes[resumeIndex];
    data.resumes.splice(resumeIndex, 1);
    saveStorageData(data);
    return deletedResume;
  },



  // Auth operations
  login: (email: string, password: string) => {
    const data = getStorageData();
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
      saveStorageData(data);
    }
    return { user: data.user, accessToken: "local-token", refreshToken: "local-refresh-token" };
  },

  register: (email: string, password: string, name: string) => {
    const data = getStorageData();
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
    saveStorageData(data);
    return { user: data.user, accessToken: "local-token", refreshToken: "local-refresh-token" };
  },

  logout: () => {
    return { message: "Logged out successfully" };
  },
};