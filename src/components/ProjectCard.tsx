"use client";

import { ExternalLink, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  url: string;
  github?: string;
  date?: string;
  tech?: string[];
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export function ProjectCard({
  title,
  description,
  url,
  github,
  date,
  tech = [],
}: ProjectCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="block rounded-lg transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950"
    >
      <Card className="flex h-full min-w-0 flex-col">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            {title}
            <ExternalLink className="h-4 w-4 shrink-0 text-slate-500" />
          </CardTitle>
          {date && (
            <CardDescription className="text-xs">{formatDate(date)}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-sm text-slate-600 dark:text-slate-400">{description}</p>
          {tech.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {tech.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-slate-200 px-2 py-0.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2 pt-0">
          {github && (
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              <Github className="h-4 w-4" />
              Source
            </a>
          )}
        </CardFooter>
      </Card>
    </a>
  );
}
