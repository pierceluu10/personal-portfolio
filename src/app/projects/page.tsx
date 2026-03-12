import { PageContainer } from "@/components/PageContainer";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const sorted = [...projects].sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <main className="pt-16">
      <PageContainer>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-100">
          Projects
        </h1>
        <p className="mb-12 text-slate-400">
          Short description paragraph. List of things you&apos;ve built.
        </p>
        <div className="grid gap-6 sm:grid-cols-2">
          {sorted.map((p) => (
            <ProjectCard key={p.title} {...p} />
          ))}
        </div>
      </PageContainer>
    </main>
  );
}
