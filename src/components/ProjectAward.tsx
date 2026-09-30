import { Trophy } from "lucide-react";
import type { ProjectAward as ProjectAwardData } from "@/data/projects";

interface ProjectAwardProps {
  award: ProjectAwardData;
  size?: "sm" | "md";
}

export function ProjectAward({ award, size = "sm" }: ProjectAwardProps) {
  const isMedium = size === "md";

  return (
    <span
      className={`inline-flex max-w-full items-start gap-1.5 text-slate-500 dark:text-gray-mid ${isMedium ? "text-xs" : "text-[11px]"}`}
    >
      <Trophy
        className={`shrink-0 text-[#b08a2e] dark:text-[#d9b95e] ${isMedium ? "mt-px h-3.5 w-3.5" : "mt-[2px] h-3 w-3"}`}
        aria-hidden
      />
      <span className="leading-snug">
        {award.title} · {award.event}
      </span>
    </span>
  );
}
