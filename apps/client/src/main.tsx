import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "./router";

// The libs/axios module handles localStorage mode internally,
// so we can render the app immediately without waiting for imports
function renderApp() {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const root = ReactDOM.createRoot(document.querySelector("#root")!);

  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}

// Render immediately - axios setup is handled by libs/axios.ts
renderApp();
