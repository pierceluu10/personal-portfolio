import * as React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div
      className={`mx-auto max-w-2xl px-6 py-12 md:px-8 md:py-16 ${className}`}
    >
      {children}
    </div>
  );
}
