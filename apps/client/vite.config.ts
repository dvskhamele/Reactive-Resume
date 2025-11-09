/// <reference types='vitest' />

import { lingui } from "@lingui/vite-plugin";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import react from "@vitejs/plugin-react";
import { defineConfig, searchForWorkspaceRoot } from "vite";
import { resolve } from "path";
import { copyFileSync, mkdirSync } from "fs";

// Function to copy support logos to the dist directory
function copySupportLogos() {
  return {
    name: 'copy-support-logos',
    closeBundle() {
      // Create logos directory in dist
      mkdirSync(resolve(__dirname, 'dist', 'assets', 'logos'), { recursive: true });
      
      // Copy logos from public directory
      try {
        copyFileSync(
          resolve(__dirname, 'public', 'support-logos', 'github-sponsors-dark.svg'),
          resolve(__dirname, 'dist', 'assets', 'logos', 'github-sponsors-dark.svg')
        );
        copyFileSync(
          resolve(__dirname, 'public', 'support-logos', 'github-sponsors-light.svg'),
          resolve(__dirname, 'dist', 'assets', 'logos', 'github-sponsors-light.svg')
        );
      } catch (error) {
        console.warn('Warning: Could not copy support logos', error);
      }
    }
  };
}

export default defineConfig({
  cacheDir: "../../node_modules/.vite/client",

  build: {
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      // Add any specific rollup configuration if needed
    }
  },

  define: {
    appVersion: JSON.stringify(process.env.npm_package_version),
  },

  // Add environment variables
  envPrefix: ["VITE_"],

  server: {
    host: true,
    port: 5173,
    fs: { allow: [searchForWorkspaceRoot(process.cwd())] },
  },

  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".po": "text",
        ".js": "jsx", // Enable JSX for .js files
      },
    },
  },

  plugins: [
    react({
      babel: {
        plugins: ["macros"],
      },
    }),
    lingui(),
    nxViteTsPaths(),
    copySupportLogos(),
  ],

  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },

  resolve: {
    alias: {
      "@/client/": `${searchForWorkspaceRoot(process.cwd())}/apps/client/src/`,
    },
  },
});
