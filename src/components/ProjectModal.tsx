"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import { X, Github, ExternalLink } from "lucide-react";
import { ProjectTechBadge } from "./ProjectTechBadge";
import { formatProjectDate } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectModalProps {
  project: Project;
  origin: { x: number; y: number; width: number; height: number } | null;
  onClose: () => void;
}

export function ProjectModal({ project, origin, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [project, onClose]);

  const description = project.longDescription || project.description;

  return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          aria-hidden
        />
        <motion.div
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border-2 border-[#d3d3d3] bg-[#f8f0e3] p-6 shadow-2xl dark:border-[#3A3A3A] dark:bg-[#28282B] md:p-8"
          onClick={(e) => e.stopPropagation()}
          initial={
            origin && typeof window !== "undefined"
              ? {
                  opacity: 0,
                  scale: 0.2,
                  x: origin.x - window.innerWidth / 2,
                  y: origin.y - window.innerHeight / 2,
                }
              : { opacity: 0, scale: 0.2 }
          }
          animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          exit={
            origin && typeof window !== "undefined"
              ? {
                  opacity: 0,
                  scale: 0.2,
                  x: origin.x - window.innerWidth / 2,
                  y: origin.y - window.innerHeight / 2,
                }
              : { opacity: 0, scale: 0.2 }
          }
          transition={{ type: "spring", damping: 22, stiffness: 280 }}
          style={{ transformOrigin: "center center" }}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-2 text-[#343434] transition-colors hover:bg-[#ebe4dc] hover:text-slate-900 dark:text-slate-400 dark:hover:bg-[#363636] dark:hover:text-slate-100"
            aria-label="close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="mb-4 flex flex-wrap items-center gap-3 pr-10">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
              {project.title}
            </h2>
            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-[#343434] transition-colors hover:bg-[#ebe4dc] hover:text-slate-900 dark:text-gray-mid dark:hover:bg-[#363636] dark:hover:text-slate-100"
                >
                  <Github className="h-4 w-4" />
                  github
                </a>
              )}
              {project.slug === "finco" && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-[#343434] transition-colors hover:bg-[#ebe4dc] hover:text-slate-900 dark:text-gray-mid dark:hover:bg-[#363636] dark:hover:text-slate-100"
                >
                  <ExternalLink className="h-4 w-4" />
                  live
                </a>
              )}
            </div>
          </div>

          {project.date && (
            <p className="mb-4 text-xs text-slate-600 dark:text-gray-mid">
              {formatProjectDate(project.date)}
            </p>
          )}

          <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-gray-mid">
            {description}
          </p>

          {project.tech && project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <ProjectTechBadge
                  key={t}
                  name={t}
                  className="rounded-lg border-2 border-[#d3d3d3] bg-[#f8f0e3]/80 text-slate-600 transition-colors hover:bg-[#ebe4dc]/90 dark:border-[#3A3A3A] dark:bg-white/5 dark:text-gray-mid dark:hover:bg-[#363636]/80"
                />
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
  );
}
