import Image from "next/image";
import { cn } from "@/lib/utils";
import { projectCovers, projectPreviewImages } from "@/data/project-previews";
import type { Project } from "@/data/projects";

/**
 * A project's cover on a grainy gradient: the screenshot framed so it nearly fills the gradient. Projects without a
 * screenshot get their name instead.
 */
export function ProjectCover({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  const image = projectPreviewImages[project.slug];

  return (
    <div
      className={cn("grain relative aspect-[3/2] overflow-hidden [container-type:size]", className)}
      style={{ background: projectCovers[project.slug] }}
    >
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
        {image ? (
          // Every screenshot is at least 16:10, so at this width it always fits the 3:2 cover's height.
          <div className="absolute left-1/2 top-1/2 w-[88%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[8px] shadow-[0_24px_60px_-12px_rgb(0_0_0/0.55)]">
            <Image
              src={image}
              alt=""
              priority={priority}
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 90vw"
              quality={90}
              className="block h-auto w-full"
            />
          </div>
        ) : (
          <span className="absolute left-[7.5%] top-1/2 -translate-y-1/2 text-[clamp(1.5rem,11cqh,4.5rem)] font-medium tracking-[-0.02em] text-white">
            {project.title}
          </span>
        )}
      </div>
    </div>
  );
}
