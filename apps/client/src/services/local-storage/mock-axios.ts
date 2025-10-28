import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { localStorageService } from "./local-storage.service";

// Create a mock response structure
const createMockResponse = <T>(data: T, status = 200): AxiosResponse<T> => ({
  data,
  status,
  statusText: status === 200 ? "OK" : "Error",
  headers: {},
  config: { url: "", method: "GET" } as AxiosRequestConfig,
});

// Mock axios instance that uses local storage instead of API calls
export const mockAxiosInstance: AxiosInstance = {
  // GET requests
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    try {
      // Handle different endpoints
      if (url === "/user/me") {
        const user = localStorageService.getUser();
        if (user) {
          return createMockResponse<T>(user as unknown as T);
        } else {
          return Promise.reject({ response: { status: 401, data: { message: "Unauthorized" } } });
        }
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
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // POST requests
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    try {
      // Handle authentication endpoints
      if (url === "/auth/login") {
        const result = localStorageService.login(data.email, data.password);
        return createMockResponse<T>(result as unknown as T);
      }
      
      if (url === "/auth/register") {
        const result = localStorageService.register(data.email, data.password, data.name);
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
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // PATCH requests
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    try {
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
    } catch (error) {
      return Promise.reject(error);
    }
  },

  // PUT requests (treat as PATCH for simplicity)
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return mockAxiosInstance.patch<T>(url, data, config);
  },

  // DELETE requests
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    try {
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
    } catch (error) {
      return Promise.reject(error);
    }
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
  
  request: async <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    const { url, method = "GET", data } = config;
    
    if (!url) {
      return Promise.reject(new Error("URL is required"));
    }
    
    switch (method.toUpperCase()) {
      case "GET":
        return mockAxiosInstance.get<T>(url, config);
      case "POST":
        return mockAxiosInstance.post<T>(url, data, config);
      case "PUT":
        return mockAxiosInstance.put<T>(url, data, config);
      case "PATCH":
        return mockAxiosInstance.patch<T>(url, data, config);
      case "DELETE":
        return mockAxiosInstance.delete<T>(url, config);
      default:
        return Promise.reject(new Error(`Unsupported method: ${method}`));
    }
  },
  
  head: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return createMockResponse<T>({} as T);
  },
  
  options: async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return createMockResponse<T>({} as T);
  }
};