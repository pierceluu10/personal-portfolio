"use client";

import { Github, Trophy } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ProjectAward } from "./ProjectAward";
import { ProjectTechBadge } from "./ProjectTechBadge";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  suppressHoverIcons?: boolean;
  compactAward?: boolean;
  onClick: (e: React.MouseEvent) => void;
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export function ProjectCard({ project, suppressHoverIcons, compactAward = false, onClick }: ProjectCardProps) {
  const { title, description, github, award, cardTech, tech = [], url } = project;
  const displayTech = cardTech ?? tech;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onClick}
        className="group/project w-full text-left focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
      >
        <Card className="relative min-w-0 border-2 border-[#d3d3d3] bg-[#FAF6F0] shadow-lg ring-0 transition-colors hover:bg-[#ebe4dc] dark:border-[#3A3A3A] dark:bg-[#333333] dark:hover:bg-[#2a2a2a]">
          {award && compactAward && (
            <span
              className="absolute right-4 top-4 text-[#b08a2e] dark:text-[#d9b95e]"
              title={`${award.title} · ${award.event}`}
              aria-label={`${award.title} at ${award.event}`}
            >
              <Trophy className="h-3.5 w-3.5" aria-hidden />
            </span>
          )}
          {/* Hover overlay icons - top right, only visible on card hover */}
          <div
            className={`pointer-events-none absolute top-4 flex items-center gap-1.5 ${award && compactAward ? "right-10" : "right-4"}`}
            onClick={(e) => e.stopPropagation()}
          >
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className={`pointer-events-auto rounded p-1 text-slate-600 transition-opacity group-hover/project:text-slate-900 dark:text-gray-mid dark:group-hover/project:text-white ${suppressHoverIcons ? "opacity-0" : "opacity-0 group-hover/project:opacity-100"}`}
              >
                <ArrowUpRightIcon className="h-3 w-3" />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className={`pointer-events-auto rounded p-1 text-slate-600 transition-opacity group-hover/project:text-slate-900 dark:text-gray-mid dark:group-hover/project:text-white ${suppressHoverIcons ? "opacity-0" : "opacity-0 group-hover/project:opacity-100"}`}
              >
                <Github className="h-3 w-3" />
              </a>
            )}
          </div>

          <CardHeader className="gap-2 pb-0 pr-16">
            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-white">
              {title}
            </CardTitle>
            {award && !compactAward && (
              <div className="-mr-12">
                <ProjectAward award={award} />
              </div>
            )}
          </CardHeader>
        <CardContent className="flex-1 pt-0">
          <p className="break-words text-xs text-slate-600 transition-colors group-hover/project:text-black dark:text-gray-mid dark:group-hover/project:text-white">
            {description}
          </p>
          {displayTech.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {displayTech.map((t) => (
                <ProjectTechBadge
                  key={t}
                  name={t}
                  className="border-2 border-[#d3d3d3] bg-[#FAF6F0] text-slate-600 transition-colors group-hover/project:text-black dark:border-[#3A3A3A] dark:bg-[#333333] dark:text-gray-mid dark:group-hover/project:text-white"
                />
              ))}
            </div>
          )}
        </CardContent>
        </Card>
      </button>
    </div>
  );
}
