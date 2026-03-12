export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  url: string;
  github?: string;
  date?: string;
  tech?: string[];
}

export const projects: Project[] = [
  {
    slug: "questr",
    title: "Questr",
    description: "gemini-powered task generator with sentiment analysis",
    longDescription:
      "Questr is a project management and task tracking application. Add details about features, tech stack, challenges, and what you learned.",
    url: "https://github.com/pierceluu10/Questr",
    github: "https://github.com/pierceluu10/Questr",
    date: "2025-10-01",
    tech: ["Flask", "Gemini API"],
  },
  {
    slug: "finco",
    title: "Finco",
    description:
      "ai agent-assisted financial flow visuals for spending analysis",
    longDescription:
      "Finco is a financial tracking and budgeting application. Add details about features, tech stack, challenges, and what you learned.",
    url: "https://finco-amber.vercel.app/",
    github: "https://github.com/pierceluu10/finco",
    date: "2026-03-01",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    slug: "teddytalk",
    title: "Teddytalk",
    description: "emotion detection pipeline generating poems via llm and tts",
    longDescription:
      "Teddytalk is a conversational AI or chat application. Add details about features, tech stack, challenges, and what you learned.",
    url: "https://github.com/pierceluu10/teddytalk",
    github: "https://github.com/pierceluu10/teddytalk",
    date: "2026-02-01",
    tech: ["Arduino Uno Q", "Python", "OpenCV"],
  },
  {
    slug: "project-four",
    title: "Project Four",
    description: "Fourth project placeholder.",
    url: "https://example.com/project-4",
    github: "https://github.com/yourusername/project-4",
    tech: ["Python", "FastAPI"],
  },
  {
    slug: "project-five",
    title: "Project Five",
    description: "Fifth project placeholder.",
    url: "https://example.com/project-5",
    date: "2024-08-01",
    tech: ["TypeScript", "Prisma"],
  },
];
