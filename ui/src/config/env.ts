export const config = {
  BASE_URL:
    import.meta.env.VITE_IS_PROD === 1 ? "/api" : import.meta.env.VITE_BASE_URL,
  TIMEOUT: import.meta.env.VITE_TIMEOUT,
};
