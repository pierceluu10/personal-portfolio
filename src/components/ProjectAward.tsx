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
      className={`inline-flex max-w-full items-start gap-1.5 rounded-lg border-2 border-[#e3cf9a] bg-[#f5ead0] text-[#6f5314] dark:border-[#54472a] dark:bg-[#332e24] dark:text-[#e6cc85] ${isMedium ? "award-sheen px-2.5 py-1 text-xs" : "px-2 py-0.5 text-[11px]"}`}
    >
      <Trophy className={`shrink-0 ${isMedium ? "mt-px h-3.5 w-3.5" : "mt-[2px] h-3 w-3"}`} aria-hidden />
      {isMedium ? (
        <span className="leading-snug">
          <span className="font-medium">{award.title}</span>
          <span className="opacity-70"> · {award.event}</span>
        </span>
      ) : (
        <span className="flex flex-col leading-snug">
          <span className="font-medium">{award.title}</span>
          <span className="opacity-70">{award.event}</span>
        </span>
      )}
    </span>
  );
}
