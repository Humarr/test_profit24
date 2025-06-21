// components/toast/useToast.ts
import { useToastContext } from "./ToastProvider";

export function useToast() {
  const { addToast } = useToastContext();
  return addToast;
}
