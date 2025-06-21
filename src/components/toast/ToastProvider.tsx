// components/toast/ToastProvider.tsx
"use client"
import React, { createContext, useContext, useState, useCallback } from "react";
import { Toast as ToastType, ToastType as ToastVariant } from "./types";
import ToastContainer from "./ToastContainer";
import { nanoid } from "nanoid";

interface ToastContextValue {
  addToast: (
    message: string,
    type?: ToastVariant,
    duration?: number
  ) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

interface ToastProviderProps {
  children: React.ReactNode;
  animation?: "fade" | "slide" | "scale";
}

export function ToastProvider({ children, animation = "slide" }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastType[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, type: ToastVariant = "info", duration = 5000) => {
      const id = nanoid();
      setToasts((current) => [...current, { id, message, type, duration }]);

      // Auto-remove after duration
      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} animation={animation} />
    </ToastContext.Provider>
  );
}

export function useToastContext(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}
