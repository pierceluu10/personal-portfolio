"use client";

import { useCallback, useRef, useEffect } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/data/projects";

interface ProjectScrollerProps {
  projects: Project[];
}

const FRICTION = 0.94;
const HOLD_FRICTION = 0.88; // Slower decay when holding down (not moving)

export function ProjectScroller({ projects }: ProjectScrollerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const isHoldingRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const friction = isHoldingRef.current ? HOLD_FRICTION : FRICTION;
    velocityRef.current *= friction;

    if (Math.abs(velocityRef.current) > 0.5) {
      container.scrollLeft += velocityRef.current;
    } else if (!isHoldingRef.current) {
      velocityRef.current = 0;
    }
    if (isHoldingRef.current || Math.abs(velocityRef.current) > 0.5) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isHoldingRef.current = true;
    lastXRef.current = e.clientX;
    lastTimeRef.current = Date.now();
    velocityRef.current = 0;
    startAnimation();
  }, [startAnimation]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isHoldingRef.current || !containerRef.current) return;
    const now = Date.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const dx = e.clientX - lastXRef.current;
    velocityRef.current = -dx * (1000 / dt) * 0.12;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;
    containerRef.current.scrollLeft += dx;
  }, []);

  const handlePointerUp = useCallback(() => {
    isHoldingRef.current = false;
    if (Math.abs(velocityRef.current) > 0.5) startAnimation();
  }, [startAnimation]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="scrollbar-hide flex gap-6 overflow-x-auto overflow-y-hidden pb-4 cursor-grab active:cursor-grabbing select-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {projects.map((p) => (
        <div key={p.title} className="shrink-0">
          <ProjectCard {...p} />
        </div>
      ))}
    </div>
  );
}
