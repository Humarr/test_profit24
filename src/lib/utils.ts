import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function formatError(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}