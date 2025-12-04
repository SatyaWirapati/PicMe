import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <NotificationProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </NotificationProvider>
  </AuthProvider>
);
