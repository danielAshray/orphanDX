import axios from "axios";
import { config } from "./env";
import { getAuthUser, removeAuthUser } from "@/lib/storage/authStorage";

const api = axios.create({
  baseURL: config.BASE_URL,
  timeout: config.TIMEOUT,
});

api.interceptors.request.use(
  async (config) => {
    const auth = getAuthUser();

    if (auth?.maskedAccessToken) {
      config.headers.Authorization = `Bearer ${auth.maskedAccessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      setTimeout(() => {
        removeAuthUser();
        window.location.href = "/login";
      }, 1000);

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
