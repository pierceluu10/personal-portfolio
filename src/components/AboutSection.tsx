import { Section } from "./Section";

export function AboutSection() {
  return (
    <Section title="about">
      <p className="text-sm text-slate-600 transition-colors group-hover:text-black dark:text-gray-mid dark:group-hover:text-white">
        i have many interests across software and engineering, including: full-stack development, applied machine learning, computer vision, and ml infrastructure. outside of building systems, i also have a strong interest in mathematics, specifically calculus and the theory that supports machine learning and data-driven models.
      </p>
      <p className="text-sm text-slate-600 transition-colors group-hover:text-black dark:text-gray-mid dark:group-hover:text-white">
        outside of engineering, i also love snowboarding and i'm a black belt in karate.
      </p>
    </Section>
  );
}
