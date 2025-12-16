import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const getErrorMessage = (error: unknown): string => {
  return (
    (error as { response?: { data?: { message: string } } }).response?.data
      ?.message || "Unexpected Error Occurred!"
  );
};
