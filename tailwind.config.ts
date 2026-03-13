import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "var(--border)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#1e6794",
        "gray-mid": "#A9A9A9",
      },
    },
  },
  plugins: [],
} satisfies Config;
