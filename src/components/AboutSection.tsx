import { Section } from "./Section";

export function AboutSection() {
  return (
    <Section title="About">
      <p className="text-slate-600 dark:text-slate-400">
        Short bio goes here. One or two paragraphs describing you and your
        interests. Placeholder text for you to replace.
      </p>
      <p className="text-slate-600 dark:text-slate-400">
        Another paragraph if you want. More about your background, what drives
        you, or what you&apos;re passionate about.
      </p>
      <ul className="list-inside list-disc space-y-1 text-slate-600 dark:text-slate-400">
        <li>Technology one</li>
        <li>Technology two</li>
        <li>Technology three</li>
      </ul>
    </Section>
  );
}
