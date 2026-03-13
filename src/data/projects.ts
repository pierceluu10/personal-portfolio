export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  url: string;
  github?: string;
  date?: string;
  /** Shown on project cards (original/preview only) */
  cardTech?: string[];
  /** Full list shown in modal when project is clicked */
  tech?: string[];
}

export const projects: Project[] = [
  {
    slug: "questr",
    title: "questr",
    description: "gamified, gemini-powered task generator with sentiment-analysis",
    longDescription:
      "questr generates personalized daily tasks for users and promotes well-being through user insights and sentiment analysis.",
    url: "https://github.com/pierceluu10/Questr",
    github: "https://github.com/pierceluu10/Questr",
    date: "2025-10-01",
    cardTech: ["flask", "javascript"],
    tech: ["flask", "javascript", "python", "html", "css", "bootstrap 5", "render", "sqlalchemy", "sqlite", "gemini api"],
  },
  {
    slug: "finco",
    title: "finco",
    description:
      "ai-agent-assisted financial flow visuals for spendinganalysis",
    longDescription:
      "finco uses graph theory inspired nodes to allow the user to visualize where their money comes from, and where it goes. the app is powered by 3 ai agents that monitor your finances and provide any insights needed.",
    url: "https://finco-amber.vercel.app/",
    github: "https://github.com/pierceluu10/finco",
    date: "2026-03-01",
    cardTech: ["nextjs", "typescript"],
    tech: ["nextjs", "typescript", "tailwindcss", "radixui", "supabase", "postgresql", "auth0", "backboard.io", "vercel"],
  },
  {
    slug: "teddytalk",
    title: "teddytalk",
    description: "emotion detection pipeline generating poems via gemini and tts",
    longDescription:
      "valentine's day project built at canada's biggest hardware hackathon; won 1st place best use of arduino uno q. teddytalk detects emotion on the user's face via webcam and the teddy speaks out a poem in any customized voice.",
    url: "https://github.com/pierceluu10/teddytalk",
    github: "https://github.com/pierceluu10/teddytalk",
    date: "2026-02-01",
    cardTech: ["arduino uno q", "python"],
    tech: ["arduino uno q", "python", "gemini api", "elevenlabs api", "html"],
  },
  {
    slug: "project-four",
    title: "project four",
    description: "Fourth project placeholder.",
    url: "https://example.com/project-4",
    github: "https://github.com/yourusername/project-4",
    tech: ["python", "fastapi"],
  },
  {
    slug: "project-five",
    title: "project five",
    description: "Fifth project placeholder.",
    url: "https://example.com/project-5",
    date: "2024-08-01",
    tech: ["typescript", "prisma"],
  },
];
