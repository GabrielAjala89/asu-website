import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * `cn` — merge Tailwind class strings safely, deduping conflicting utilities.
 * Use it any time you build className strings conditionally.
 *
 *   cn("p-4 bg-asu-blue", isActive && "ring-2 ring-asu-orange")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
