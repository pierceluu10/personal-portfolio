"use client";

interface ProjectTechBadgeProps {
  name: string;
  className?: string;
}

export function ProjectTechBadge({ name, className = "" }: ProjectTechBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-lg border-2 border-[#d3d3d3] bg-white/5 px-2.5 py-1 text-xs text-gray-mid dark:border-[#3A3A3A] ${className}`}
    >
      {name}
    </span>
  );
}
