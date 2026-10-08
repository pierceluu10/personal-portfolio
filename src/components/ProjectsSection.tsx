"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

const MASONRY_LAYOUTS = [
  { columns: 1, className: "flex sm:hidden" },
  { columns: 2, className: "hidden sm:flex lg:hidden" },
  { columns: 3, className: "hidden lg:flex" },
] as const;

function splitIntoColumns<T>(items: T[], columns: number): T[][] {
  return Array.from({ length: columns }, (_, columnIndex) =>
    items.filter((_, itemIndex) => itemIndex % columns === columnIndex),
  );
}

export function ProjectsSection({ limit }: { limit?: number }) {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const featured = limit !== undefined ? projects.slice(0, limit) : projects;

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

  const renderCard = (p: Project) => (
    <div key={p.slug} className="min-w-0">
      <ProjectCard
        project={p}
        compactAward={limit !== undefined}
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
  );

  return (
    <>
      <section className="mt-5 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            {limit !== undefined ? "featured projects" : "projects"}
          </h2>
          {limit !== undefined && limit < projects.length && (
            <Link
              href="/projects"
              className="flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-gray-mid dark:hover:text-white"
            >
              all projects
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
        {MASONRY_LAYOUTS.map(({ columns, className }) => (
          <div key={columns} className={`min-w-0 items-start gap-4 ${className}`}>
            {splitIntoColumns(featured, columns).map((column, columnIndex) => (
              <div key={columnIndex} className="flex min-w-0 flex-1 flex-col gap-4">
                {column.map(renderCard)}
              </div>
            ))}
          </div>
        ))}
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
