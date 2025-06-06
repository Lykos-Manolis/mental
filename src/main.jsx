import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { register as registerServiceWorker } from "./serviceWorkerRegistration";

createRoot(document.getElementById("root")).render(<App />);

// Add this after your app rendering
registerServiceWorker();
