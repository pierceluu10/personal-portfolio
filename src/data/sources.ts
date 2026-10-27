import { projects } from "./projects";

/** What a mention's hover card shows, plus where a click lands. */
export type Source = {
  key: string;
  /** Shown beside the monogram in the card header. */
  name: string;
  /** Prominent line in the card, the title slot. */
  role: string;
  /** Right-aligned metadata in the header. */
  dates?: string;
  /** One line on the work itself. */
  summary: string;
  /** Where a click lands; without one the card is information only. */
  href?: string;
  /** Sources this one rolls up; the card lists each of them instead of one role. */
  group?: Source[];
};

const hackathonWins: Source[] = projects.flatMap(({ slug, title, description, github, award }) =>
  award
    ? [{ key: slug, name: award.event, role: `${award.title} · ${title}`, summary: description, href: github }]
    : [],
);

export const SOURCES: Record<string, Source> = {
  uoft: {
    key: "uoft",
    name: "University of Toronto",
    role: "Computer Engineering",
    dates: "second year",
    summary: "BASc in computer engineering.",
    href: "https://www.utoronto.ca/",
  },
  research: {
    key: "research",
    name: "University of Toronto",
    role: "Summer Research Intern",
    summary: "Built infrastructure for a virtual lab now securely used by 3 engineering courses.",
  },
  hackathons: {
    key: "hackathons",
    name: "Hackathons",
    role: `${hackathonWins.length} wins`,
    summary: "Weekend builds that placed.",
    group: hackathonWins,
  },
};
