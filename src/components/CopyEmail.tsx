"use client";

import { useEffect, useRef, useState } from "react";

const EMAIL = "pierce.luu@mail.utoronto.ca";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const resetTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(resetTimeout.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      window.prompt("copy my email:", EMAIL);
      return;
    }
    setCopied(true);
    clearTimeout(resetTimeout.current);
    resetTimeout.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={copy}
        title={EMAIL}
        className="dotted-link cursor-pointer"
      >
        email
      </button>
      <span
        aria-live="polite"
        className={`pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#1a1a1a] px-2 py-1 text-[11px] text-white transition-[opacity,transform] duration-150 ease-out dark:bg-white dark:text-[#1a1a1a] ${copied ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
      >
        copied {EMAIL}
      </span>
    </span>
  );
}
