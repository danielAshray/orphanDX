import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/styles/global/index.css";
import App from "@/app";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./config/query.config";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
