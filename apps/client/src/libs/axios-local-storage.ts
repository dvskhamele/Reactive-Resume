import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { createId } from "@paralleldrive/cuid2";
import { t } from "@lingui/macro";

// Define basic types to avoid import errors
interface ResumeDto {
  id: string;
  name: string;
  data: any;
  createdAt: Date;
  updatedAt: Date;
  visibility: string;
}

interface UserDto {
  id: string;
  email: string;
  name: string;
}

// Create a minimal local storage service for essential operations
class LocalStorageService {
  private storageKey = 'reactive-resume-local';

  getResumes(): ResumeDto[] {
    const data = this.getData();
    return data.resumes || [];
  }

  getResume(id: string): ResumeDto | undefined {
    const resumes = this.getResumes();
    return resumes.find(resume => resume.id === id);
  }

  createResume(name: string): ResumeDto {
    const data = this.getData();
    const newResume: ResumeDto = {
      id: createId(),
      name,
      data: this.getDefaultResumeData(),
      createdAt: new Date(),
      updatedAt: new Date(),
      visibility: 'private'
    };
    
    if (!data.resumes) data.resumes = [];
    data.resumes.push(newResume);
    this.saveData(data);
    return newResume;
  }

  updateResume(id: string, data: any): ResumeDto {
    const resumes = this.getResumes();
    const index = resumes.findIndex(resume => resume.id === id);
    
    if (index === -1) {
      throw new Error('Resume not found');
    }
    
    const updatedResume = {
      ...resumes[index],
      data,
      updatedAt: new Date()
    };
    
    resumes[index] = updatedResume;
    this.saveData({ ...this.getData(), resumes });
    return updatedResume;
  }

  deleteResume(id: string): void {
    const data = this.getData();
    data.resumes = data.resumes?.filter(resume => resume.id !== id) || [];
    this.saveData(data);
  }

  getUser(): UserDto | null {
    // Return a mock user
    return {
      id: createId(),
      email: 'local@user.com',
      name: 'Local User'
    };
  }

  private getData(): any {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : { resumes: [] };
  }

  private saveData(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  private getDefaultResumeData(): any {
    return {
      basics: {
        name: '',
        email: '',
        phone: '',
        url: { href: '', label: '' },
        location: '',
        headline: '',
        summary: '',
        image: '',
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
          numbering: "none",
          pagination: false,
          filename: "Resume",
          format: "a4",
          optimize: true,
          orientation: "portrait",
          margins: 24.5,
          print: false,
          slides: true,
        },
        theme: {
          background: "#1e293b",
          primary: "#22c55e",
          text: "#1e293b",
        },
      },
    };
  }
}

const localStorageService = new LocalStorageService();

// Create a minimal mock axios instance
const createMockResponse = <T>(data: T): AxiosResponse<T> => {
  return {
    data,
    status: 200,
    statusText: "OK",
    headers: {},
    config: { url: "", method: "GET", headers: {} } as InternalAxiosRequestConfig
  };
};

export const mockAxiosInstance: AxiosInstance = {
  // Implement essential methods for resume operations
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    if (url === '/resume') {
      const resumes = localStorageService.getResumes();
      return createMockResponse<T>(resumes as unknown as T);
    } else if (url.startsWith('/resume/')) {
      const id = url.split('/')[2];
      const resume = localStorageService.getResume(id);
      if (resume) {
        return createMockResponse<T>(resume as unknown as T);
      } else {
        throw { response: { status: 404, data: { message: 'Resume not found' } } };
      }
    } else if (url === '/user/me') {
      const user = localStorageService.getUser();
      return createMockResponse<T>(user as unknown as T);
    }
    
    // Return empty response for other endpoints
    return createMockResponse<T>(undefined as unknown as T);
  },
  
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    if (url === '/resume' && data) {
      const resume = localStorageService.createResume(data.name || 'New Resume');
      return createMockResponse<T>(resume as unknown as T);
    } else if (url === '/auth/login') {
      // Return mock auth response
      return createMockResponse<T>({ 
        user: localStorageService.getUser(), 
        accessToken: 'local-token',
        refreshToken: 'local-refresh-token'
      } as unknown as T);
    }
    
    return createMockResponse<T>(undefined as unknown as T);
  },
  
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    if (url.startsWith('/resume/')) {
      const id = url.split('/')[2];
      const resume = localStorageService.updateResume(id, data);
      return createMockResponse<T>(resume as unknown as T);
    }
    
    return createMockResponse<T>(undefined as unknown as T);
  },
  
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    if (url.startsWith('/resume/')) {
      const id = url.split('/')[2];
      localStorageService.deleteResume(id);
      // Return the deleted resume
      const resume = localStorageService.getResume(id); 
      return createMockResponse<T>(resume as unknown as T);
    }
    
    return createMockResponse<T>(undefined as unknown as T);
  },
  
  // Additional axios interface methods
  defaults: {
    headers: {
      common: { 'Content-Type': 'application/json' }
    },
    baseURL: "/api",
    timeout: 10000,
    withCredentials: true,
  },
  interceptors: {
    request: {
      use: () => 0,
      eject: () => {},
      clear: () => {}
    },
    response: {
      use: () => 0,
      eject: () => {},
      clear: () => {}
    }
  },
  getUri: (config?: AxiosRequestConfig) => config?.url || "",
  request: async <T>(config?: AxiosRequestConfig) => {
    if (config?.method === 'GET') {
      return (mockAxiosInstance.get as any)(config.url, config);
    } else if (config?.method === 'POST') {
      return (mockAxiosInstance.post as any)(config.url, config.data, config);
    } else if (config?.method === 'PUT') {
      return (mockAxiosInstance.post as any)(config.url, config.data, config); // Simplified: treat PUT as POST
    } else if (config?.method === 'PATCH') {
      return (mockAxiosInstance.patch as any)(config.url, config.data, config);
    } else if (config?.method === 'DELETE') {
      return (mockAxiosInstance.delete as any)(config.url, config);
    }
    return createMockResponse<T>(undefined as unknown as T);
  },
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig) => {
    // Simplified: treat PUT as POST
    return mockAxiosInstance.post<T>(url, data, config);
  },
  head: async <T>(url: string, config?: AxiosRequestConfig) => {
    return createMockResponse<T>(undefined as unknown as T);
  },
  options: async <T>(url: string, config?: AxiosRequestConfig) => {
    return createMockResponse<T>(undefined as unknown as T);
  }
};