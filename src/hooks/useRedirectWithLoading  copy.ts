"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation"; // ✅ App Router hooks
import { useLoadingStore } from "@/store/useLoadingStore"; // Your zustand spinner
import { useToast } from "@/components/toast/useToast"; // Adjust based on your toast

type RedirectWithLoadingProps = {
  route: string;
  condition: boolean;
  message: string;
  delay?: number;
};

const useRedirectWithLoading = () => {
  const router = useRouter();
  const pathname = usePathname(); // Needed to detect route changes manually
  const [loading, setLocalLoading] = useState(false);
  const { setLoading } = useLoadingStore(); // Global loading state
  const toast = useToast()

  const redirectWithLoading = async ({
    route,
    condition,
    message,
    delay = 1500,
  }: RedirectWithLoadingProps) => {
    setLocalLoading(true);
    setLoading(true); // Show global spinner

    if (!condition) {
      toast(message, "error", 4000);
      router.push(route);
      return;
    }

    setTimeout(() => {
      setLoading(false); // hide global spinner
      setLocalLoading(false);
    }, delay);
  };

  // Watch route changes to automatically reset loading
  useEffect(() => {
    setLoading(false);
    setLocalLoading(false);
  }, [pathname, setLoading]);

  return {
    loading,
    redirectWithLoading,
  };
};

export default useRedirectWithLoading;
