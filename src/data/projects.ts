export interface Project {
  title: string;
  description: string;
  url: string;
  github?: string;
  date?: string;
  tech?: string[];
}

export const projects: Project[] = [
  {
    title: "Project One",
    description: "Short placeholder description for your first project.",
    url: "https://example.com/project-1",
    github: "https://github.com/yourusername/project-1",
    date: "2025-01-15",
    tech: ["Next.js", "TypeScript"],
  },
  {
    title: "Project Two",
    description: "Another placeholder project description.",
    url: "https://example.com/project-2",
    github: "https://github.com/yourusername/project-2",
    date: "2024-12-01",
    tech: ["React", "Tailwind"],
  },
  {
    title: "Project Three",
    description: "Third project placeholder.",
    url: "https://example.com/project-3",
    date: "2024-10-20",
    tech: ["Node.js"],
  },
  {
    title: "Project Four",
    description: "Fourth project placeholder.",
    url: "https://example.com/project-4",
    github: "https://github.com/yourusername/project-4",
    tech: ["Python", "FastAPI"],
  },
  {
    title: "Project Five",
    description: "Fifth project placeholder.",
    url: "https://example.com/project-5",
    date: "2024-08-01",
    tech: ["TypeScript", "Prisma"],
  },
];
