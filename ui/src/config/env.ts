export const config = {
  BASE_URL:
    import.meta.env.VITE_IS_PROD == 1 ? "/api" : "http://localhost:2000/api",
  TIMEOUT: import.meta.env.VITE_TIMEOUT,
  TOKEN_STORAGE_KEY: import.meta.env.VITE_TOKEN_STORAGE_KEY,
};
