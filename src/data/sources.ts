import { projects } from "./projects";

/** What a mention's hover card shows, plus where a click lands. */
export type Source = {
  key: string;
  /** Shown beside the logo in the card header. */
  name: string;
  /** Path under public/; without one the card shows the name's initial. */
  logo?: string;
  /** Prominent line in the card, the title slot. */
  role: string;
  /** Right-aligned metadata in the header. */
  dates?: string;
  /** One line on the work itself. */
  summary?: string;
  /** Where a click lands; without one the card is information only. */
  href?: string;
  /** Sources this one rolls up; the card lists each of them instead of one role. */
  group?: Source[];
};

const UOFT_LOGO = "/logos/uoft.png";

const EVENT_LOGOS: Record<string, string> = {
  "Hack the North": "/logos/hack-the-north.png",
  "Hack the Valley": "/logos/hack-the-valley.svg",
  "Cursor x Toronto Tech Week": "/logos/cursor.svg",
  MakeUofT: "/logos/makeuoft.png",
};

const hackathonWins: Source[] = projects.flatMap(({ slug, title, github, award }) =>
  award
    ? [{ key: slug, name: award.event, logo: EVENT_LOGOS[award.event], role: `${award.title} · ${title}`, href: github }]
    : [],
);

export const SOURCES: Record<string, Source> = {
  uoft: {
    key: "uoft",
    name: "University of Toronto",
    logo: UOFT_LOGO,
    role: "BASc in Computer Engineering",
    dates: "sophomore",
    href: "https://www.utoronto.ca/",
  },
  papiers: {
    key: "papiers",
    name: "Papiers.ai",
    logo: "/logos/papiers.svg",
    role: "AI Engineer Intern",
    dates: "present",
    summary: "RAG and semantic search",
    href: "https://papiers.ai/",
  },
  research: {
    key: "research",
    name: "University of Toronto",
    logo: UOFT_LOGO,
    role: "Software Engineer Intern",
    summary: "3D Virtual Teaching Lab and student metrics database",
  },
  hackathons: {
    key: "hackathons",
    name: "Hackathons",
    role: `${hackathonWins.length} wins`,
    group: hackathonWins,
  },
};
