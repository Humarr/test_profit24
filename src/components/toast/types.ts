// components/toast/types.ts

export type ToastType = "success" | "error" | "info" | "warning";

export interface Toast {
  id: string;           // unique id to manage toast
  type: ToastType;      // toast variant
  message: string;      // text content
  duration?: number;    // how long to show in ms (optional, defaults to 5000)
}
