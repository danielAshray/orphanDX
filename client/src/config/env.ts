export const config = {
  BASE_URL: import.meta.env.VITE_BASE_URL,
  MODE: import.meta.env.VITE_MODE,
  DEBUG: import.meta.env.VITE_MODE === "true",
  TIMEOUT: import.meta.env.VITE_TIMEOUT,
  IS_UNDER_MAINTENANCE: import.meta.env.VITE_IS_UNDER_MAINTENANCE === "1",
  TOKEN_STORAGE_KEY: import.meta.env.VITE_TOKEN_STORAGE_KEY,
};
