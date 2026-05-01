import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n";
import * as serviceWorker from "./serviceWorker";
import "react-toastify/dist/ReactToastify.css";
import FullPageLoader from "./components/Ui/FullPageLoader";

// Polyfill for process (required for Webpack 5 / react-scripts 5 compatibility)
window.process = {
  env: { ...process.env },
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Suspense fallback={<FullPageLoader />}>
      <App />
    </Suspense>
  </React.StrictMode>
);

// To fix the "MIME type ('text/html')" security error on production,
// we unregister the service worker unless offline caching is specifically required.
// This prevents the browser from incorrectly requesting service-worker.js
serviceWorker.unregister();
