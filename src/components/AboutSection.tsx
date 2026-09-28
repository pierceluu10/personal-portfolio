import { Section } from "./Section";

export function AboutSection() {
  return (
    <Section title="about">
      <p className="text-sm text-slate-600 transition-colors group-hover:text-black dark:text-gray-mid dark:group-hover:text-white">
        i&apos;m interested in backend systems and infrastructure, applied ml, computer vision, and mlops. i&apos;m also interested in mathematics, more specifically the theory behind data-driven models.
      </p>
      <p className="text-sm text-slate-600 transition-colors group-hover:text-black dark:text-gray-mid dark:group-hover:text-white">
        outside of engineering, i also love snowboarding and i'm a black belt in karate.
      </p>
    </Section>
  );
}
