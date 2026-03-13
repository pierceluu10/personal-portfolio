"use client";

import { Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ProjectTechBadge } from "./ProjectTechBadge";
import { formatProjectDate } from "@/lib/utils";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  suppressHoverIcons?: boolean;
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

export function ProjectCard({ project, suppressHoverIcons, onClick }: ProjectCardProps) {
  const { title, description, github, date, cardTech, tech = [], url } = project;
  const displayTech = cardTech ?? tech;

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={onClick}
        className="group/project w-full text-left focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
      >
        <Card className="relative h-full min-w-0 border-2 border-[#d3d3d3] bg-[#FAF6F0] shadow-lg ring-0 transition-colors hover:bg-[#ebe4dc] dark:border-[#3A3A3A] dark:bg-[#333333] dark:hover:bg-[#2a2a2a]">
          {/* Hover overlay icons - top right, only visible on card hover */}
          <div
            className="pointer-events-none absolute right-4 top-4 flex items-center gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={`pointer-events-auto rounded p-1 text-slate-600 transition-opacity group-hover/project:text-slate-900 dark:text-gray-mid dark:group-hover/project:text-white ${suppressHoverIcons ? "opacity-0" : "opacity-0 group-hover/project:opacity-100"}`}
            >
              <ArrowUpRightIcon className="h-3 w-3" />
            </a>
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

          <CardHeader className="pb-1 pr-16">
            <CardTitle className="text-sm font-semibold text-slate-900 dark:text-white">
              {title}
            </CardTitle>
            {date && (
              <CardDescription className="text-xs text-slate-500 transition-colors group-hover/project:text-black dark:text-gray-mid dark:group-hover/project:text-white">
              {formatProjectDate(date, "short")}
            </CardDescription>
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
