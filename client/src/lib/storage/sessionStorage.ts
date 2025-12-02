export const sessionStorageUtil = {
  set: (key: string, value: any) => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("SessionStorage set error:", error);
    }
  },

  get: <T>(key: string): T | null => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : null;
    } catch (error) {
      console.error("SessionStorage get error:", error);
      return null;
    }
  },

  remove: (key: string) => {
    try {
      sessionStorage.removeItem(key);
    } catch (error) {
      console.error("SessionStorage remove error:", error);
    }
  },

  clear: () => {
    try {
      sessionStorage.clear();
    } catch (error) {
      console.error("SessionStorage clear error:", error);
    }
  },
};
