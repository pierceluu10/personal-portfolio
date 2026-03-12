import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";

const FEATURED_COUNT = 6;

export function FeaturedProjectsSection() {
  const featured = projects.slice(0, FEATURED_COUNT);

  return (
    <section className="mt-12 space-y-4">
      <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
        Featured projects
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </section>
  );
}
