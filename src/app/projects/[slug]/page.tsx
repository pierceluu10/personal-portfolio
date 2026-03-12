import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const description =
    project.longDescription || project.description;

  return (
    <main className="min-h-screen bg-[#f7f4ed] dark:bg-slate-950">
      <div className="mx-auto max-w-2xl px-6 py-12 md:px-8 md:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="rounded-xl border-2 border-slate-200 bg-[#f7f4ed] p-6 shadow-lg dark:border-[#3A3A3A] dark:bg-slate-900/50 dark:shadow-xl md:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 md:text-3xl">
              {project.title}
            </h1>
            <div className="flex items-center gap-2">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              )}
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              >
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            </div>
          </div>

          {project.date && (
            <p className="mb-4 text-sm text-slate-500">
              {new Date(project.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}

          <div className="mb-6 max-w-none">
            <p className="leading-relaxed text-slate-600 dark:text-slate-400">
              {description}
            </p>
          </div>

          {project.tech && project.tech.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Badge
                  key={t}
                  variant="outline"
                  className="border-slate-200 bg-slate-100 px-3 py-1 font-normal text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-400"
                >
                  {t}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
