import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatProjectDate(
  dateStr: string,
  style: "short" | "long" = "long"
): string {
  try {
    const [y, m, d] = dateStr.split("-").map(Number);
    const date = new Date(y, (m || 1) - 1, d || 1);
    return date.toLocaleDateString("en-US", {
      month: style === "short" ? "short" : "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}
