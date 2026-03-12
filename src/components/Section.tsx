import * as React from "react";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className = "" }: SectionProps) {
  return (
    <section className={`space-y-4 ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
      )}
      {children}
    </section>
  );
}
