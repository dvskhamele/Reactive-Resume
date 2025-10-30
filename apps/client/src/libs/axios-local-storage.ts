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
    data.resumes = data.resumes?.filter((resume: ResumeDto) => resume.id !== id) || [];
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

// Define a more complete mockAxiosInstance with proper typing
export const mockAxiosInstance: AxiosInstance = {
  // Implement essential methods for resume operations
  get: async <T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    if (url === '/resume') {
      const resumes = localStorageService.getResumes();
      return createMockResponse<T>(resumes as T) as R;
    } else if (url.startsWith('/resume/')) {
      const id = url.split('/')[2];
      const resume = localStorageService.getResume(id);
      if (resume) {
        return createMockResponse<T>(resume as T) as R;
      } else {
        throw { response: { status: 404, data: { message: 'Resume not found' } } };
      }
    } else if (url === '/user/me') {
      const user = localStorageService.getUser();
      return createMockResponse<T>(user as T) as R;
    }
    
    // Return empty response for other endpoints
    return createMockResponse<T>(undefined as T) as R;
  },
  
  post: async <T, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> => {
    if (url === '/resume' && data) {
      const resume = localStorageService.createResume((data as any).name || 'New Resume');
      return createMockResponse<T>(resume as T) as R;
    } else if (url === '/auth/login') {
      // Return mock auth response
      return createMockResponse<T>({ 
        user: localStorageService.getUser(), 
        accessToken: 'local-token',
        refreshToken: 'local-refresh-token'
      } as T) as R;
    }
    
    return createMockResponse<T>(undefined as T) as R;
  },
  
  patch: async <T, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> => {
    if (url.startsWith('/resume/')) {
      const id = url.split('/')[2];
      const resume = localStorageService.updateResume(id, data);
      return createMockResponse<T>(resume as T) as R;
    }
    
    return createMockResponse<T>(undefined as T) as R;
  },
  
  delete: async <T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R> => {
    if (url.startsWith('/resume/')) {
      const id = url.split('/')[2];
      localStorageService.deleteResume(id);
      // Return the deleted resume
      const resume = localStorageService.getResume(id); 
      return createMockResponse<T>(resume as T) as R;
    }
    
    return createMockResponse<T>(undefined as T) as R;
  },
  
  defaults: {
    headers: {
      common: { 'Content-Type': 'application/json' } as any,
      delete: {} as any,
      get: {} as any,
      head: {} as any,
      post: {} as any,
      put: {} as any,
      patch: {} as any,
      options: {} as any,
      purge: {} as any,
      link: {} as any,
      unlink: {} as any,
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
  request: async <T, R = AxiosResponse<T>, D = any>(config?: AxiosRequestConfig<D>): Promise<R> => {
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
    return createMockResponse<T>(undefined as T) as R;
  },
  put: async <T, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> => {
    // Simplified: treat PUT as POST
    return mockAxiosInstance.post<T, R, D>(url, data, config);
  },
  head: <T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): R => {
    return createMockResponse<T>(undefined as T) as R;
  },
  options: <T, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): R => {
    return createMockResponse<T>(undefined as T) as R;
  }
};