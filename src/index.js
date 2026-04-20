import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n";
import * as serviceWorker from "./serviceWorker";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Polyfill for process (required for Webpack 5 / react-scripts 5 compatibility)
window.process = {
  env: { ...process.env },
};

// toast.configure is deprecated in favor of ToastContainer in App.js

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading translations...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
