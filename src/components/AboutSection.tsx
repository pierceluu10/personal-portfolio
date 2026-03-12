import { Section } from "./Section";

export function AboutSection() {
  return (
    <Section title="About">
      <p className="text-sm lowercase text-slate-600 dark:text-gray-mid dark:transition-colors group-hover:dark:text-white">
        short bio goes here. one or two paragraphs describing you and your
        interests. placeholder text for you to replace.
      </p>
      <p className="text-sm lowercase text-slate-600 dark:text-gray-mid dark:transition-colors group-hover:dark:text-white">
        another paragraph if you want. more about your background, what drives
        you, or what you&apos;re passionate about.
      </p>
      <ul className="list-inside list-disc space-y-0.5 text-sm lowercase text-slate-600 dark:text-gray-mid dark:transition-colors group-hover:dark:text-white">
        <li>Technology one</li>
        <li>Technology two</li>
        <li>Technology three</li>
      </ul>
    </Section>
  );
}
