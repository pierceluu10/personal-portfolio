"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useIsLight } from "@/lib/theme";
import { SOURCES, type Source } from "@/data/sources";

const OPEN_DELAY = 55;
const CLOSE_DELAY = 30;
const CARD_WIDTH = 440; // wide enough that the longest source name clears the date
const MARK_SIZE = 16;

/** The source's logo, or its initial on a faint plate. */
function Mark({ name, logo }: { name: string; logo?: string }) {
  if (logo) return <Image src={logo} alt="" width={MARK_SIZE} height={MARK_SIZE} unoptimized className="shrink-0 rounded-[4px]" />;
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-[4px]"
      style={{
        width: MARK_SIZE,
        height: MARK_SIZE,
        background: "color-mix(in srgb, var(--foreground) 12%, transparent)",
      }}
    >
      <span className="opacity-60" style={{ fontSize: Math.round(MARK_SIZE * 0.64), lineHeight: 1 }}>
        {name.charAt(0).toUpperCase()}
      </span>
    </span>
  );
}

function CardHeader({ source }: { source: Source }) {
  return (
    <span className="flex items-center gap-[8px] text-[12px] leading-none">
      <Mark name={source.name} logo={source.logo} />
      <span className="truncate opacity-60">{source.name}</span>
      {source.dates && <span className="ml-auto shrink-0 pl-2 tabular-nums opacity-40">{source.dates}</span>}
    </span>
  );
}

/**
 * An elevated surface: a solid step up from the page, a hairline border, a faint top highlight, and a layered shadow
 * instead of glass.
 */
export const cardSurface = (isLight: boolean) => ({
  background: isLight
    ? "color-mix(in srgb, var(--background) 45%, #ffffff)"
    : "color-mix(in srgb, var(--background) 93%, var(--foreground))",
  border: `1px solid color-mix(in srgb, var(--foreground) ${isLight ? 11 : 9}%, transparent)`,
  boxShadow: isLight
    ? "inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 1px 2px rgba(14, 19, 28, 0.06), 0 12px 32px -12px rgba(14, 19, 28, 0.18)"
    : "inset 0 1px 0 color-mix(in srgb, var(--foreground) 6%, transparent), 0 1px 2px rgba(0, 0, 0, 0.3), 0 16px 40px -12px rgba(0, 0, 0, 0.6)",
});

const open = (target: Source) => target.href && window.open(target.href, "_blank", "noopener");

/** An underlined mention whose hover card reads source / role / one line; clicking opens the source. */
export function Cited({ source, children }: { source: string; children: ReactNode }) {
  const isLight = useIsLight();
  const src = SOURCES[source];
  const [shown, setShown] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout>>();
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();

  const show = useCallback(() => {
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => setShown(true), OPEN_DELAY);
  }, []);

  const hide = useCallback(() => {
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => setShown(false), CLOSE_DELAY);
  }, []);

  useEffect(
    () => () => {
      clearTimeout(openTimer.current);
      clearTimeout(closeTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShown(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shown]);

  const members = src.group;
  // A group's mention lands on its first member; its card lets you pick one.
  const target = members?.[0] ?? src;
  const footer = members ? "click on a project" : src.href ? "open site" : undefined;

  return (
    <span
      className="relative inline-block"
      // Drives the prose dim in globals.css; :hover alone is lost once the cursor moves onto the open card.
      data-cited-open={shown ? "true" : undefined}
      data-ocean-lure
      onMouseEnter={show}
      onMouseLeave={hide}
    >
      <button
        type="button"
        onClick={() => open(target)}
        onFocus={show}
        onBlur={hide}
        aria-label={`${src.name}, ${src.role}`}
        className={`inline cursor-pointer align-baseline underline decoration-1 underline-offset-[5px] outline-none transition-[text-decoration-color] duration-150 focus-visible:decoration-2 ${
          shown
            ? "text-foreground decoration-foreground"
            : "decoration-[color-mix(in_srgb,var(--foreground)_35%,transparent)] hover:text-foreground hover:decoration-foreground focus-visible:text-foreground focus-visible:decoration-foreground"
        }`}
      >
        {children}
      </button>

      <AnimatePresence>
        {shown && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.99, transition: { duration: 0.08, ease: "easeIn" } }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            onClick={members ? undefined : () => open(src)}
            data-ocean-ignore
            className={`absolute bottom-full left-0 z-50 mb-[10px] flex origin-bottom-left flex-col overflow-hidden rounded-[8px] font-mono text-foreground ${
              src.href ? "cursor-pointer" : ""
            }`}
            style={{ width: CARD_WIDTH, ...cardSurface(isLight) }}
          >
            {members ? (
              <span className="flex flex-col p-[6px]">
                {members.map((m) => (
                  <span
                    key={m.key}
                    role="button"
                    onClick={() => open(m)}
                    className="flex cursor-pointer flex-col gap-[6px] rounded-[6px] p-[8px] transition-colors duration-100 hover:bg-[color-mix(in_srgb,var(--foreground)_6%,transparent)]"
                  >
                    <CardHeader source={m} />
                    <span className="text-[12px] leading-[18px]">{m.role}</span>
                  </span>
                ))}
              </span>
            ) : (
              <span className="flex flex-col gap-[6px] px-[14px] py-[12px]">
                <CardHeader source={src} />
                <span className="mt-[4px] text-[13px] leading-[18px]">{src.role}</span>
                {src.summary && <span className="line-clamp-3 text-[12px] leading-[18px] opacity-60">{src.summary}</span>}
              </span>
            )}

            {footer && (
              <span
                className="flex items-center justify-between px-[14px] py-[8px] text-[11px] leading-none opacity-40"
                style={{ borderTop: `1px solid color-mix(in srgb, var(--foreground) ${isLight ? 8 : 7}%, transparent)` }}
              >
                <span>{footer}</span>
                <span aria-hidden="true">↗</span>
              </span>
            )}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
