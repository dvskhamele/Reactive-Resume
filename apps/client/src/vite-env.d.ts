/// <reference types="vite/client" />

declare const appVersion: string;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Extend the window interface to include axios for localStorage mock
declare global {
  interface Window {
    axios: import("axios").AxiosInstance;
  }
}
