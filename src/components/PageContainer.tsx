import * as React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <div
      className={`mx-auto max-w-2xl px-5 py-11 md:px-7 md:py-14 ${className}`}
    >
      {children}
    </div>
  );
}
