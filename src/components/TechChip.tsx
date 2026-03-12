"use client";

import { motion } from "motion/react";
import {
  NextjsIcon,
  ReactIcon,
  TSIcon,
  TailwindIcon,
  ShadcnIcon,
  AuthIcon,
  AiSdkIcon,
  PrismaIcon,
  TrpcIcon,
  CursorIcon,
  PythonIcon,
  NodeIcon,
} from "./stacks";
import { BsClaude } from "react-icons/bs";
import { SiReactquery } from "react-icons/si";
import { Braces } from "lucide-react";

const TECH_ICONS: Record<string, React.ComponentType<{ size?: string | number }>> = {
  "next.js": NextjsIcon,
  nextjs: NextjsIcon,
  react: ReactIcon,
  typescript: TSIcon,
  ts: TSIcon,
  tailwind: TailwindIcon,
  tailwindcss: TailwindIcon,
  shadcn: ShadcnIcon,
  "better-auth": AuthIcon,
  auth: AuthIcon,
  "ai-sdk": AiSdkIcon,
  prisma: PrismaIcon,
  trpc: TrpcIcon,
  cursor: CursorIcon,
  python: PythonIcon,
  c: Braces as unknown as React.ComponentType<{ size?: string | number }>,
  node: NodeIcon,
  "node.js": NodeIcon,
  claude: BsClaude as unknown as React.ComponentType<{ size?: string | number }>,
  tanstack: SiReactquery as unknown as React.ComponentType<{ size?: string | number }>,
  "react query": SiReactquery as unknown as React.ComponentType<{ size?: string | number }>,
  fastapi: PythonIcon,
};

function getIcon(tech: string) {
  const key = tech.toLowerCase().trim();
  return TECH_ICONS[key] ?? TECH_ICONS[key.replace(/\s+/g, "-")] ?? null;
}

interface TechChipProps {
  name: string;
  className?: string;
}

export function TechChip({ name, className = "" }: TechChipProps) {
  const Icon = getIcon(name);

  return (
    <motion.div
      className={`inline-flex items-center gap-1.5 rounded-lg border border-dashed px-3 py-1.5 text-sm shadow-sm [&>span]:lowercase ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {Icon && <Icon size={18} />}
      <span className="lowercase">{name.toLowerCase()}</span>
    </motion.div>
  );
}
