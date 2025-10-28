import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { localStorageService } from "./local-storage.service";

// Create a minimal mock response structure
const createMockResponse = <T>(data: T, status = 200): AxiosResponse<T> => ({
  data,
  status,
  statusText: status === 200 ? "OK" : "Error",
  headers: {},
  config: {} as AxiosRequestConfig,
});

// Mock axios instance that uses local storage
export const mockAxios: AxiosInstance = {
  // GET requests
  get: async <T = any>(url: string): Promise<AxiosResponse<T>> => {
    // Handle different endpoints
    if (url === "/user/me") {
      const user = localStorageService.getUser();
      return createMockResponse<T>(user as unknown as T);
    }
    
    if (url === "/resume") {
      const resumes = localStorageService.getResumes();
      return createMockResponse<T>(resumes as unknown as T);
    }
    
    if (url.startsWith("/resume/")) {
      const parts = url.split("/");
      if (parts.length >= 3) {
        const id = parts[2];
        const resume = localStorageService.getResumeById(id);
        if (resume) {
          return createMockResponse<T>(resume as unknown as T);
        } else {
          return Promise.reject({ response: { status: 404, data: { message: "Resume not found" } } });
        }
      }
    }
    
    // Default response for unhandled endpoints
    return createMockResponse<T>({} as T);
  },

  // POST requests
  post: async <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    // Handle authentication endpoints
    if (url === "/auth/login") {
      const result = localStorageService.login("user@example.com", "password");
      return createMockResponse<T>(result as unknown as T);
    }
    
    if (url === "/auth/register") {
      const result = localStorageService.register("user@example.com", "password", "User Name");
      return createMockResponse<T>(result as unknown as T);
    }
    
    if (url === "/auth/logout") {
      const result = localStorageService.logout();
      return createMockResponse<T>(result as unknown as T);
    }
    
    // Handle resume creation
    if (url === "/resume") {
      const result = localStorageService.createResume(data?.name);
      return createMockResponse<T>(result as unknown as T);
    }
    
    // Default response for unhandled endpoints
    return createMockResponse<T>({} as T);
  },

  // PATCH requests
  patch: async <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    // Handle user updates
    if (url === "/user/me") {
      const result = localStorageService.updateUser(data);
      return createMockResponse<T>(result as unknown as T);
    }
    
    // Handle resume updates
    if (url.startsWith("/resume/")) {
      const parts = url.split("/");
      if (parts.length >= 3) {
        const id = parts[2];
        const result = localStorageService.updateResume(id, data);
        return createMockResponse<T>(result as unknown as T);
      }
    }
    
    // Default response for unhandled endpoints
    return createMockResponse<T>({} as T);
  },

  // PUT requests
  put: async <T = any>(url: string, data?: any): Promise<AxiosResponse<T>> => {
    // For now, treat PUT similar to PATCH
    return this.patch<T>(url, data);
  },

  // DELETE requests
  delete: async <T = any>(url: string): Promise<AxiosResponse<T>> => {
    // Handle resume deletion
    if (url.startsWith("/resume/")) {
      const parts = url.split("/");
      if (parts.length >= 3) {
        const id = parts[2];
        const result = localStorageService.deleteResume(id);
        return createMockResponse<T>(result as unknown as T);
      }
    }
    
    // Default response for unhandled endpoints
    return createMockResponse<T>({} as T);
  },

  // Additional axios methods
  defaults: {
    headers: {
      common: {}
    }
  },
  
  interceptors: {
    request: {
      use: () => 0,
      eject: () => {}
    },
    response: {
      use: () => 0,
      eject: () => {}
    }
  },
  
  getUri: () => "",
  
  request: async <T = any>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const { url, method, data } = config;
    
    if (!url) {
      return Promise.reject(new Error("URL is required"));
    }
    
    switch (method?.toUpperCase()) {
      case "GET":
        return this.get<T>(url);
      case "POST":
        return this.post<T>(url, data);
      case "PUT":
        return this.put<T>(url, data);
      case "PATCH":
        return this.patch<T>(url, data);
      case "DELETE":
        return this.delete<T>(url);
      default:
        return Promise.reject(new Error(`Unsupported method: ${method}`));
    }
  }
};