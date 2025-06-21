// components/toast/ToastContainer.tsx
import React from "react";
import Toast from "./Toast";
import { Toast as ToastType } from "./types";

interface ToastContainerProps {
  toasts: ToastType[];
  onDismiss: (id: string) => void;
  animation?: "fade" | "slide" | "scale";
}

export default function ToastContainer({
  toasts,
  onDismiss,
  animation = "slide",
}: ToastContainerProps) {
  return (
    <div
      aria-live="assertive"
      className="fixed top-4 right-4 flex flex-col items-end z-50 max-w-full"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={onDismiss}
          animation={animation}
        />
      ))}
    </div>
  );
}
