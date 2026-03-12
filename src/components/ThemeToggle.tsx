"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored === "dark" || (stored === null && prefersDark);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const setTheme = (isDark: boolean) => {
    setDark(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <div
      role="group"
      aria-label="theme"
      className="relative z-50 isolate inline-flex rounded-full border border-slate-200 bg-slate-100 p-0.5 dark:border-white/10 dark:bg-slate-800/50"
    >
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setTheme(false);
        }}
        aria-label="light mode"
        className={cn(
          "rounded-full p-1 transition-colors",
          !dark
            ? "bg-white text-slate-900 shadow-sm dark:bg-transparent dark:text-slate-400"
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        )}
      >
        <Sun className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setTheme(true);
        }}
        aria-label="dark mode"
        className={cn(
          "rounded-full p-1 transition-colors",
          dark
            ? "bg-slate-800 text-gray-mid shadow-sm dark:bg-white/10 dark:text-gray-mid"
            : "text-gray-mid hover:text-slate-700 dark:text-gray-mid dark:hover:text-slate-200"
        )}
      >
        <Moon className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
