"use client";

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from "react";
import { motion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { Cited } from "./Cited";
import { Container } from "./Container";
import type { OceanStats } from "./ocean/engine";
import { SOURCES } from "@/data/sources";

const SOCIALS = [
  { label: "github", href: "https://github.com/pierceluu10" },
  { label: "linkedin", href: "https://www.linkedin.com/in/pierceluu/" },
];

const EMAIL = "pierceluu10@gmail.com";
const COPIED_MS = 1600;

const UNDERLINE =
  "underline decoration-[color-mix(in_srgb,var(--foreground)_35%,transparent)] decoration-1 underline-offset-[5px] outline-none transition-opacity duration-150 hover:decoration-foreground focus-visible:decoration-foreground";

type MentionProps = { source: string; children: ReactNode };

// Hover cards need a pointer, so on touch the mentions link straight to each source.
function MobileMention({ source, children }: MentionProps) {
  const { href, group } = SOURCES[source];
  const target = href ?? group?.[0]?.href;
  if (!target) return <span className={UNDERLINE}>{children}</span>;
  return (
    <a href={target} target="_blank" rel="noopener noreferrer" className={UNDERLINE}>
      {children}
    </a>
  );
}

function Quote() {
  return (
    <>
      the tide moves everyone,
      <br />
      choose where you drift
      <span
        aria-hidden="true"
        className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] animate-blink bg-foreground motion-reduce:animate-none"
      />
    </>
  );
}

function Blurb({ Mention }: { Mention: ComponentType<MentionProps> }) {
  return (
    <>
      <h1>
        Hi there! I&apos;m Pierce, ECE sophomore @ <Mention source="uoft">the University of Toronto</Mention> &amp;{" "}
        <Mention source="hackathons">hackathon enthusiast</Mention>.
      </h1>
      <p>
        AI Engineer Intern @ <Mention source="papiers">Papiers.ai</Mention>, building an agentic workspace for all
        of your informative media.
      </p>
      <p>
        Previously, built infrastructure for a <Mention source="research">virtual engineering teaching lab</Mention> @
        the University of Toronto.
      </p>
    </>
  );
}

const SOCIAL_LINK = `${UNDERLINE} opacity-60 hover:opacity-100 focus-visible:opacity-100`;

/** A mailto link; hovering it raises a popup that copies the address. */
function Email() {
  const [copied, setCopied] = useState(false);
  const reset = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(reset.current), []);

  const copy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    clearTimeout(reset.current);
    reset.current = setTimeout(() => setCopied(false), COPIED_MS);
  };

  const Icon = copied ? Check : Copy;
  return (
    <span className="group/email relative inline-block">
      <a href={`mailto:${EMAIL}`} className={SOCIAL_LINK}>
        email
      </a>
      {/* Bottom padding bridges the gap, so the popup stays open while the pointer travels up to it. */}
      <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 translate-y-1 pb-2 opacity-0 transition-[opacity,transform] duration-150 ease-out group-focus-within/email:pointer-events-auto group-focus-within/email:translate-y-0 group-focus-within/email:opacity-100 group-hover/email:pointer-events-auto group-hover/email:translate-y-0 group-hover/email:opacity-100">
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : `Copy ${EMAIL}`}
          className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-md bg-foreground px-2.5 py-1.5 text-[12px] leading-none text-background outline-none"
        >
          <Icon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          <span aria-live="polite">{copied ? "copied" : EMAIL}</span>
        </button>
      </span>
    </span>
  );
}

function Socials({ className }: { className?: string }) {
  return (
    <p className={className}>
      {SOCIALS.map(({ label, href }) => (
        <span key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" className={SOCIAL_LINK}>
            {label}
          </a>
          <span className="opacity-40"> / </span>
        </span>
      ))}
      <Email />
    </p>
  );
}

const fadeIn = (opacity: number, delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity },
  transition: { duration: delay ? 0.3 : 0.4, delay },
});

export function FrontPage({ stats }: { stats: OceanStats }) {
  return (
    <>
      <Container
        as="header"
        className="relative flex h-full flex-col justify-end gap-10 bg-transparent pb-32 pt-32 font-mono max-lg:hidden lg:pl-[18.5vw] lg:pr-[16vw] [@media(max-height:720px)]:gap-6 [@media(max-height:720px)]:pb-12 [@media(max-height:720px)]:pt-20"
      >
        {stats.jellies > 0 && (
          <div
            data-ocean-avoid
            aria-hidden="true"
            className="absolute right-6 top-8 text-[11px] leading-relaxed tabular-nums lg:right-[20vw]"
          >
            <div className="opacity-[0.32]">{stats.jellies}</div>
            {/* The pulse count flashes each time it changes, tying a click to the number. */}
            <motion.div
              key={stats.pulses}
              initial={{ opacity: 1 }}
              animate={{ opacity: 0.32 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {stats.pulses}
            </motion.div>
          </div>
        )}
        <motion.blockquote data-ocean-avoid className="text-[14px] lowercase leading-relaxed tracking-[0.02em]" {...fadeIn(0.6)}>
          <Quote />
        </motion.blockquote>
        <motion.div
          data-ocean-avoid
          className="cited-prose max-w-[58.5rem] text-[15px] leading-[max(22px,3vh)]"
          {...fadeIn(1, 0.2)}
        >
          <Blurb Mention={Cited} />
          <Socials className="mt-[1.5vh]" />
        </motion.div>
      </Container>

      {/* Top padding clears the nav. */}
      <Container
        as="header"
        className="flex h-full flex-col justify-end gap-8 bg-transparent pb-12 pt-28 font-mono lg:hidden [@media(max-height:640px)]:gap-5 [@media(max-height:640px)]:pb-8"
      >
        <motion.blockquote data-ocean-avoid className="text-[13px] lowercase leading-relaxed tracking-[0.02em]" {...fadeIn(0.6)}>
          <Quote />
        </motion.blockquote>
        <motion.div data-ocean-avoid className="flex flex-col gap-3 text-[14px] leading-[1.6]" {...fadeIn(1, 0.2)}>
          <Blurb Mention={MobileMention} />
          <Socials className="mt-2" />
        </motion.div>
      </Container>
    </>
  );
}
