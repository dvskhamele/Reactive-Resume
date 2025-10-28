import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "./router";

// Check if we should use local storage mode
const useLocalStorage = import.meta.env.VITE_USE_LOCAL_STORAGE === "true";

if (useLocalStorage) {
  // Override the axios instance with our mock implementation
  import("./services/local-storage/mock-axios").then(({ mockAxios }) => {
    // Replace the global axios instance with our mock
    window.axios = mockAxios;
    
    // Render the app after setting up the mock
    renderApp();
  }).catch((error) => {
    console.error("Failed to load mock axios:", error);
    renderApp();
  });
} else {
  // Use the regular app
  renderApp();
}

function renderApp() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = ReactDOM.createRoot(document.querySelector("#root")!);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
