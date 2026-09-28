import type { IconType } from "react-icons";
import { FaAws } from "react-icons/fa";
import {
  SiCplusplus,
  SiDocker,
  SiFastapi,
  SiKubernetes,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiTypescript,
} from "react-icons/si";
import { Section } from "./Section";

interface StackItem {
  name: string;
  icon: IconType;
}

interface StackGroup {
  label: string;
  items: StackItem[];
}

const STACK_GROUPS: StackGroup[] = [
  {
    label: "languages",
    items: [
      { name: "python", icon: SiPython },
      { name: "c/c++", icon: SiCplusplus },
      { name: "typescript", icon: SiTypescript },
    ],
  },
  {
    label: "backend & infra",
    items: [
      { name: "fastapi", icon: SiFastapi },
      { name: "postgresql", icon: SiPostgresql },
      { name: "docker", icon: SiDocker },
      { name: "kubernetes", icon: SiKubernetes },
      { name: "aws", icon: FaAws },
    ],
  },
  {
    label: "ml",
    items: [{ name: "pytorch", icon: SiPytorch }],
  },
];

function StackChip({ name, icon: Icon }: StackItem) {
  return (
    <li className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#d3d3d3] bg-[#FAF6F0] px-2.5 py-1 text-sm text-slate-600 transition-colors hover:bg-[#ebe4dc] dark:border-[#3A3A3A] dark:bg-[#333333] dark:text-white dark:hover:bg-[#2a2a2a]">
      <Icon className={`shrink-0 ${name === "aws" ? "h-4 w-4" : "h-3 w-3"}`} aria-hidden />
      <span>{name}</span>
    </li>
  );
}

export function StackSection() {
  return (
    <Section title="strong suits" className="mt-5">
      <dl className="space-y-3 sm:space-y-2">
        {STACK_GROUPS.map((group) => (
          <div key={group.label} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3">
            <dt className="shrink-0 text-xs text-slate-500 dark:text-gray-mid sm:w-24 sm:pt-2">{group.label}</dt>
            <dd className="min-w-0 flex-1">
              <ul className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <StackChip key={item.name} {...item} />
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
