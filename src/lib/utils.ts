import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

const SHORT_MONTH_NAMES = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
] as const

const LONG_MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatProjectDate(
  dateStr: string,
  style: "short" | "long" = "long"
): string {
  try {
    const [year, month] = dateStr.split("-").map(Number);
    const monthIndex = (month || 1) - 1;
    const monthNames = style === "short" ? SHORT_MONTH_NAMES : LONG_MONTH_NAMES;
    const monthName = monthNames[monthIndex];

    if (!year || monthName === undefined) {
      return dateStr;
    }

    return `${monthName} ${year}`;
  } catch {
    return dateStr;
  }
}
