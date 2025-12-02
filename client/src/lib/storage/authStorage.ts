import { config } from "@/config/env";
import type { AuthUserProps } from "@/types";
import { localStorageUtil } from "./localStorage";

export const setAuthUser = (props: AuthUserProps) => {
  localStorageUtil.set(config.TOKEN_STORAGE_KEY, props);
  window.location.reload();
};

export const getAuthUser = (): AuthUserProps | null => {
  return localStorageUtil.get(config.TOKEN_STORAGE_KEY);
};

export const removeAuthUser = () => {
  localStorageUtil.remove(config.TOKEN_STORAGE_KEY);
  window.location.reload();
};
