"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";

/** Runs before paint (inlined in the layout) so the first frame is already in the stored theme; dark by default. */
export const THEME_SCRIPT = `document.documentElement.classList.toggle("dark",localStorage.getItem("${STORAGE_KEY}")!=="light")`;

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}

const isLightNow = () => !document.documentElement.classList.contains("dark");

/** Whether the page is in light mode; the server renders dark, the default. */
export function useIsLight() {
  return useSyncExternalStore(subscribe, isLightNow, () => false);
}

export function toggleTheme() {
  const light = !isLightNow();
  document.documentElement.classList.toggle("dark", !light);
  localStorage.setItem(STORAGE_KEY, light ? "light" : "dark");
}
