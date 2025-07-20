"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useToast } from "@/components/toast/useToast";

type RedirectWithLoadingProps = {
  route: string;
  condition: boolean;
  message: string;
  delay?: number;
};

const useRedirectWithLoading = () => {
  const router = useRouter();
  const pathname = usePathname();
  const previousPath = useRef<string>(pathname);
  const [localLoading, setLocalLoading] = useState(false);
  const { setLoading } = useLoadingStore();
  const toast = useToast();

  const redirectWithLoading = async ({
    route,
    condition,
    message,
    delay = 1500,
  }: RedirectWithLoadingProps) => {
    setLocalLoading(true);
    setLoading(true);

    if (!condition) {
      toast(message, "error", 4000);

      setTimeout(() => {
        router.push(route)
        setLoading(false);
        setLocalLoading(false);
        previousPath.current = route; // ✅ update manually on push
      }, 200);

      return;
    }

    setTimeout(() => {
      setLoading(false);
      setLocalLoading(false);
    }, delay);
  };

  // Reset spinner on any path change (covers both route changes and back/forward)
  useEffect(() => {
    if (pathname !== previousPath.current) {
      setLoading(false);
      setLocalLoading(false);
      previousPath.current = pathname;
    }
  }, [pathname, setLoading]);

  return {
    loading: localLoading,
    redirectWithLoading,
  };
};

export default useRedirectWithLoading;
