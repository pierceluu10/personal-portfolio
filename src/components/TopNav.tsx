"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";
import { toggleTheme } from "@/lib/theme";

const LINKS = [
  { label: "ocean", href: "/" },
  { label: "projects", href: "/projects" },
];

const ITEM = "outline-none transition-opacity duration-150 hover:opacity-100 focus-visible:opacity-100";

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Main" className="pointer-events-none fixed inset-x-0 top-0 z-30 flex justify-center pt-5">
      {/* A hairline edge keeps it distinct from a page of the same tone. Clicks on it never reach the water. */}
      <div
        data-ocean-avoid
        data-ocean-ignore
        className="pointer-events-auto flex items-center gap-7 rounded-full border border-black/10 bg-white/85 px-6 py-2.5 font-mono text-[13px] lowercase text-foreground shadow-[0_8px_24px_-8px_rgb(14_19_28/0.18)] backdrop-blur-md dark:border-white/10 dark:bg-black/85 dark:shadow-[0_8px_24px_-8px_rgb(0_0_0/0.5)]"
      >
        {LINKS.map(({ label, href }) => (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className={`${ITEM} ${pathname === href ? "opacity-100" : "opacity-50"}`}
          >
            {label}
          </Link>
        ))}
        <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className={`${ITEM} opacity-50`}>
          {/* Both render and CSS picks one, so the server and client markup match before the theme is known. */}
          <Moon size={15} strokeWidth={2.25} aria-hidden className="dark:hidden" />
          <Sun size={15} strokeWidth={2.25} aria-hidden className="hidden dark:inline" />
        </button>
      </div>
    </nav>
  );
}
