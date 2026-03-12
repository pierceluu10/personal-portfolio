import * as React from "react";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className = "" }: SectionProps) {
  return (
    <section className={`group space-y-3 ${className}`}>
      {title && (
        <h2 className="text-base font-semibold lowercase text-slate-900 dark:text-white">{title}</h2>
      )}
      {children}
    </section>
  );
}
