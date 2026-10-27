import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

// The single source of horizontal gutters for page-level content; sections must not set px-* themselves.
const GUTTER = "px-6 lg:px-[20vw]";

type ContainerProps = { as?: ElementType; className?: string; children?: ReactNode };

export function Container({ as: Component = "div", className, children }: ContainerProps) {
  return <Component className={cn("mx-auto w-full", GUTTER, className)}>{children}</Component>;
}
