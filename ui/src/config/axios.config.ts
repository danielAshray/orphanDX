import axios from "axios";
import { config } from "./env";
import { localStorageUtil } from "@/lib/storage/localStorage";
import { STORAGE_KEYS } from "@/lib/constants/storageKeys";
import { Notification } from "@/components";

const api = axios.create({
  baseURL: config.BASE_URL,
  timeout: config.TIMEOUT,
});

api.interceptors.request.use(
  async (config: any) => {
    const token = localStorageUtil.get(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.code === "LOGOUT" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      Notification({ toastMessage: "Token expired", toastStatus: "error" });
      setTimeout(() => {
        localStorageUtil.remove(STORAGE_KEYS.TOKEN);
        window.location.reload();
      }, 1000);

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
