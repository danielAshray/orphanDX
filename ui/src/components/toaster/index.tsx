"use client";

import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";

import { cn } from "@/lib/utils";

type ToastStatus = "success" | "error" | "info";

type ToastMessage = {
  id: string;
  message: string;
  status: ToastStatus;
};

type ToastContextType = {
  addToast: (message: string, status?: ToastStatus) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
);

const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const addToast = (message: string, status: ToastStatus = "info") => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, status }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const getStatusIcon = (status: ToastStatus) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 mr-2 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 mr-2 text-red-500" />;
      case "info":
        return <AlertCircle className="w-5 h-5 mr-2 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 mr-2 text-black" />;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      <Toast.Provider swipeDirection="right">
        {children}

        {toasts.map((toast) => (
          <Toast.Root
            key={toast.id}
            open
            onOpenChange={() => removeToast(toast.id)}
            className={cn(
              "py-4 px-6 rounded-md shadow-md w-80 mb-2 flex flex-col",
              "bg-black/40",
              "text-white"
            )}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                {getStatusIcon(toast.status)}
                <span className="font-semibold capitalize">{toast.status}</span>
              </div>
              <Toast.Close asChild>
                <button>
                  <X className="w-4 h-4 text-black hover:text-black/50 cursor-pointer" />
                </button>
              </Toast.Close>
            </div>

            <Toast.Description className={cn("text-sm", "text-white")}>
              {toast.message}
            </Toast.Description>
          </Toast.Root>
        ))}

        <Toast.Viewport className="fixed top-0 right-0 p-4 w-[350px] max-w-full flex flex-col gap-2 z-50" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export { useToast, ToastProvider };
