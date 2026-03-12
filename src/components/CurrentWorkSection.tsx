import { Section } from "./Section";

export function CurrentWorkSection() {
  return (
    <Section title="What I'm working on">
      <p className="text-sm lowercase text-slate-600 dark:text-gray-mid dark:transition-colors group-hover:dark:text-white">
        placeholder paragraph. write about your current role, side projects, or
        what you&apos;re building. your role here.
      </p>
      <p className="text-sm lowercase text-slate-600 dark:text-gray-mid dark:transition-colors group-hover:dark:text-white">
        another paragraph if needed. future plans, goals, or anything else you
        want to share.
      </p>
    </Section>
  );
}
