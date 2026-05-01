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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
