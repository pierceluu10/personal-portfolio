import { Trophy } from "lucide-react";
import { Container } from "@/components/Container";
import { ProjectCover } from "@/components/ProjectCover";
import { TopNav } from "@/components/TopNav";
import { projects, type Project } from "@/data/projects";

const projectHref = (project: Project) => project.url ?? project.github;

/** The award, behind a trophy, for winners; the stack for everything else. */
function ProjectMeta({ project: { award, cardTech }, className }: { project: Project; className: string }) {
  if (!award) return <span className={className}>{cardTech?.join(" · ")}</span>;
  return (
    <span className={`inline-flex items-baseline gap-1.5 ${className}`}>
      <Trophy aria-label="Award" className="h-3 w-3 shrink-0 translate-y-[1px] self-center text-[#b08a2e] dark:text-[#d9b95e]" />
      {award.title} @ {award.event}
    </span>
  );
}

function ExternalLink({ project, className, children }: { project: Project; className: string; children: React.ReactNode }) {
  const href = projectHref(project);
  if (!href) return <div className={className}>{children}</div>;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}, opens in a new tab`} className={className}>
      {children}
    </a>
  );
}

/** Every project as a framed screenshot on its gradient, two to a row on desktop. Hovering a cover zooms in. */
export default function ProjectsPage() {
  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground">
      <TopNav />
      <Container as="main" className="grid grid-cols-1 gap-x-5 gap-y-12 pb-24 pt-28 lg:grid-cols-2 lg:px-[10vw]">
        {projects.map((project, i) => (
          <ExternalLink key={project.slug} project={project} className="group flex flex-col outline-none focus-visible:underline">
            <ProjectCover project={project} priority={i < 2} className="w-full" />
            <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2 className="text-[15px]">{project.title}</h2>
              <ProjectMeta project={project} className="font-mono text-[12px] text-muted" />
            </div>
            <p className="mt-1 text-[14px] leading-[1.5] text-muted">{project.description}</p>
          </ExternalLink>
        ))}
      </Container>
    </div>
  );
}
