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
    <nav
      data-ocean-avoid
      aria-label="Main"
      className="fixed inset-x-0 top-0 z-30 flex items-center justify-center gap-8 pt-8 font-mono text-[13px] lowercase text-foreground"
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
      {/* A margin of dead space around the toggle, so a near miss doesn't send a pulse through the water behind it. */}
      <span data-ocean-ignore className="-m-4 flex p-4">
        <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className={`${ITEM} opacity-50`}>
          {/* Both render and CSS picks one, so the server and client markup match before the theme is known. */}
          <Moon size={15} strokeWidth={2.25} aria-hidden className="dark:hidden" />
          <Sun size={15} strokeWidth={2.25} aria-hidden className="hidden dark:inline" />
        </button>
      </span>
    </nav>
  );
}
