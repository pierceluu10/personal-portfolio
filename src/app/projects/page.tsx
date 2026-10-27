"use client";

import { useEffect, useRef } from "react";
import { Trophy } from "lucide-react";
import { Container } from "@/components/Container";
import { ProjectCover } from "@/components/ProjectCover";
import { TopNav } from "@/components/TopNav";
import { projects, type Project } from "@/data/projects";

const GLIDE = 0.18; // share of the remaining distance the strip covers each frame when scrolled with a wheel
const DESKTOP_QUERY = "(min-width: 1024px)"; // Tailwind's `lg`, where the strip replaces the mobile list
const LINE_HEIGHT_PX = 16; // a wheel that scrolls in lines (deltaMode 1) moves this far per line

const projectHref = (project: Project) => project.url ?? project.github;
/** The award, behind a trophy, for winners; the stack for everything else. */
function ProjectMeta({ project: { award, cardTech }, className }: { project: Project; className: string }) {
  if (!award) return <span className={className}>{cardTech?.join(" · ")}</span>;
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <Trophy aria-label="Award" className="h-3 w-3 shrink-0 translate-y-[1px] self-center text-[#b08a2e] dark:text-[#d9b95e]" />
      {award.title} @ {award.event}
    </span>
  );
}

export default function ProjectsPage() {
  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-background text-foreground max-lg:h-auto max-lg:min-h-[100dvh] max-lg:overflow-visible">
      <TopNav />
      <DesktopStrip />
      <MobileList />
    </div>
  );
}

/**
 * Projects side by side in one strip that starts on the page's left column and runs off the right edge. Scrolling
 * anywhere on the page moves it sideways; trackpads can also swipe it directly.
 */
function DesktopStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia(DESKTOP_QUERY);
    let target = strip.scrollLeft;
    let raf = 0;

    const glide = () => {
      const before = strip.scrollLeft;
      const gap = target - before;
      if (Math.abs(gap) >= 1) strip.scrollLeft = before + gap * GLIDE;
      // Scroll positions snap to device pixels, so a small step can land nowhere; finish there instead of looping
      // forever and dragging any native swipe back to a stale target.
      if (strip.scrollLeft === before) {
        strip.scrollLeft = target;
        target = strip.scrollLeft;
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(glide);
    };

    // A vertical wheel turns into a sideways glide. A sideways swipe over the strip is left to the browser.
    const onWheel = (e: WheelEvent) => {
      if (!desktop.matches) return;
      const sideways = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (sideways && strip.contains(e.target as Node)) return;
      e.preventDefault();
      const delta = sideways ? e.deltaX : e.deltaY;
      const max = strip.scrollWidth - strip.clientWidth;
      if (!raf) target = strip.scrollLeft;
      target = Math.max(0, Math.min(max, target + (e.deltaMode === 1 ? delta * LINE_HEIGHT_PX : delta)));
      if (still) strip.scrollLeft = target;
      else if (!raf) raf = requestAnimationFrame(glide);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <main className="flex h-full flex-col justify-center pt-12 max-lg:hidden">
      <div
        ref={stripRef}
        className="flex gap-3 overflow-x-auto px-[max(1.5rem,calc((100vw-56rem)/2))] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, i) => (
          <StripTile key={project.slug} project={project} priority={i < 2} />
        ))}
      </div>
    </main>
  );
}

function ExternalLink({ project, className, children }: { project: Project; className: string; children: React.ReactNode }) {
  const href = projectHref(project);
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}, opens in a new tab`} className={className}>
      {children}
    </a>
  );
}

/** One project: its cover, large, with the name, award or stack, and description under it. Hovering zooms in. */
function StripTile({ project, priority }: { project: Project; priority: boolean }) {
  return (
    // As wide as the cover, so a long description wraps instead of pushing the next tile along.
    <ExternalLink project={project} className="group block w-min shrink-0 outline-none focus-visible:underline">
      <div className="relative">
        <ProjectCover project={project} priority={priority} className="h-[min(62vh,42rem)]" />
        {projectHref(project) && (
          <span className="pointer-events-none absolute bottom-4 left-4 translate-y-1 rounded-full bg-[rgb(0_0_0/0.55)] px-3 py-1.5 font-mono text-[12px] text-white opacity-0 backdrop-blur-md transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            {project.url ? "visit site ↗" : "view on github ↗"}
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="whitespace-nowrap text-[15px]">{project.title}</span>
        <ProjectMeta project={project} className="whitespace-nowrap font-mono text-[12px] text-muted" />
      </div>
      <p className="mt-1 text-[14px] leading-[1.5] text-muted">{project.description}</p>
    </ExternalLink>
  );
}

function MobileList() {
  return (
    <Container as="main" className="flex flex-col gap-14 pb-[12vh] pt-24 lg:hidden">
      {projects.map((project, i) => (
        <ExternalLink key={project.slug} project={project} className="group flex flex-col">
          <ProjectCover project={project} priority={i === 0} className="w-full rounded-2xl" />
          <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-[17px]">{project.title}</h2>
            <ProjectMeta project={project} className="font-mono text-[12px] text-muted" />
          </div>
          <p className="mt-1 text-[15px] leading-[1.5] text-muted">{project.description}</p>
        </ExternalLink>
      ))}
    </Container>
  );
}
