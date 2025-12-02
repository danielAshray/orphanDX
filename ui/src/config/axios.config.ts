import axios from "axios";
import { config } from "./env";
import { localStorageUtil } from "@/lib/storage/localStorage";

const api = axios.create({
  baseURL: config.BASE_URL,
  timeout: config.TIMEOUT,
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorageUtil.get("token");
    console.log(token);
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.code === "LOGOUT" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      setTimeout(() => {
        localStorageUtil.remove("token");
      }, 1000);

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
