"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

export function ProjectsSection({ limit = 3 }: { limit?: number }) {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const featured = projects.slice(0, limit);

  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => setIsScrolling(false), 150);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <>
      <section className="mt-10 space-y-3">
        <h2 className="text-base font-semibold lowercase text-slate-900 dark:text-white">
          recent projects
        </h2>
        <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <div key={p.slug} className="min-w-0">
              <ProjectCard
                project={p}
                suppressHoverIcons={isScrolling}
                onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setOrigin({
                  x: rect.left + rect.width / 2,
                  y: rect.top + rect.height / 2,
                  width: rect.width,
                  height: rect.height,
                });
                setOpenProject(p);
              }}
              />
            </div>
          ))}
        </div>
      </section>
      <AnimatePresence>
        {openProject && (
          <ProjectModal
            project={openProject}
            origin={origin}
            onClose={() => {
              setOpenProject(null);
              setOrigin(null);
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
