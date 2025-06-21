// components/toast/Toast.tsx
"use client"
import React, { useEffect, useState } from "react";
import { Toast as ToastType } from "./types";
import { X } from "lucide-react";

interface ToastProps {
  toast: ToastType;
  onDismiss: (id: string) => void;
  animation?: "fade" | "slide" | "scale";
}

const animationClasses = {
  fade: {
    base: "transition-opacity duration-300",
    enter: "opacity-100",
    leave: "opacity-0",
  },
  slide: {
    base: "transform transition-all duration-300",
    enter: "translate-x-0 opacity-100",
    leave: "translate-x-6 opacity-0",
  },
  scale: {
    base: "transform transition-all duration-300",
    enter: "scale-100 opacity-100",
    leave: "scale-90 opacity-0",
  },
};

export default function Toast({
  toast,
  onDismiss,
  animation = "slide",
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation after mount
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    // Wait animation before removing
    setTimeout(() => onDismiss(toast.id), 300);
  };

  // Colors based on toast type
  const bgColors: Record<string, string> = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
    warning: "bg-yellow-500",
  };

  const color = bgColors[toast.type] || bgColors.info;

  const anim = animationClasses[animation];

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`${anim.base} ${
        visible ? anim.enter : anim.leave
      } rounded-md shadow-md p-4 mb-2 max-w-sm text-white flex items-center justify-between font-medium ${color}`}
    >
      <div>{toast.message}</div>
      <button
        onClick={handleClose}
        aria-label="Close toast"
        className="ml-4 focus:outline-none hover:opacity-80 transition-opacity"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
