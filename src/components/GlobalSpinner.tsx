// components/GlobalSpinner.tsx
"use client"

import { useLoadingStore } from "@/store/useLoadingStore"
import { cn } from "@/lib/utils"

export default function GlobalSpinner() {
  const { isLoading } = useLoadingStore()

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-black/40 transition-opacity",
        isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-white" />
    </div>
  )
}
