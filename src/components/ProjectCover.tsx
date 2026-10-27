import Image from "next/image";
import { cn } from "@/lib/utils";
import { projectCovers, projectPreviewImages } from "@/data/project-previews";
import type { Project } from "@/data/projects";

/**
 * A project's cover: its name on a grainy gradient, with the screenshot in a window frame running off the bottom-right
 * corner. Projects without a screenshot get the name alone, set larger.
 */
export function ProjectCover({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  const image = projectPreviewImages[project.slug];

  return (
    <div className={cn("grain relative aspect-[3/2] overflow-hidden [container-type:size]", className)} style={{ background: projectCovers[project.slug] }}>
      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
        <span
          className={cn(
            "absolute left-[7.5%] font-medium tracking-[-0.02em] text-white",
            image ? "top-[13%] text-[clamp(1rem,5.2cqh,2.4rem)]" : "top-1/2 -translate-y-1/2 text-[clamp(1.5rem,11cqh,4.5rem)]",
          )}
        >
          {project.title}
        </span>
        {image && (
          <div className="absolute left-[38%] top-[25%] w-[86%] overflow-hidden rounded-tl-[10px] bg-[#f4f4f5] shadow-[0_24px_60px_-12px_rgb(0_0_0/0.55)]">
            <div aria-hidden="true" className="flex h-[min(5cqh,22px)] items-center gap-[max(0.6cqh,4px)] px-[2.2cqh]">
              {["#ff5f57", "#febc2e", "#28c840"].map((color) => (
                <span key={color} className="aspect-square h-[42%] rounded-full" style={{ background: color }} />
              ))}
            </div>
            <Image
              src={image}
              alt=""
              priority={priority}
              placeholder="blur"
              sizes="(min-width: 1024px) 60vh, 90vw"
              quality={90}
              className="block h-auto w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
