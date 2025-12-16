import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import App from "@/app";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/query.config";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/auth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
