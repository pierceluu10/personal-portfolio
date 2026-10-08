import type { IconType } from "react-icons";
import { FaAws, FaJava } from "react-icons/fa";
import {
  SiCplusplus,
  SiDocker,
  SiFastapi,
  SiKubernetes,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiTypescript,
  SiJavascript,
  SiRedis,
  SiScikitlearn,
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
      { name: "c++", icon: SiCplusplus },
      { name: "typescript", icon: SiTypescript },
      { name: "javascript", icon: SiJavascript },
      { name: "java", icon: FaJava },
    ],
  },
  {
    label: "backend & infra",
    items: [
      { name: "fastapi", icon: SiFastapi },
      { name: "postgresql", icon: SiPostgresql },
      { name: "redis", icon: SiRedis },
      { name: "docker", icon: SiDocker },
      { name: "kubernetes", icon: SiKubernetes },
      { name: "aws", icon: FaAws },
    ],
  },
  {
    label: "ml",
    items: [{ name: "pytorch", icon: SiPytorch }, { name: "scikit-learn", icon: SiScikitlearn }],
  },
];

function StackChip({ name, icon: Icon }: StackItem) {
  return (
    <li className="inline-flex items-center gap-2 rounded-lg border-2 border-[#d3d3d3] bg-[#FAF6F0] px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-[#ebe4dc] dark:border-[#3A3A3A] dark:bg-[#333333] dark:text-white dark:hover:bg-[#2a2a2a]">
      <Icon className={`shrink-0 ${name === "aws" ? "h-[18px] w-[18px]" : "h-3.5 w-3.5"}`} aria-hidden />
      <span>{name}</span>
    </li>
  );
}

export function StackSection() {
  return (
    <Section title="technical skills" className="mt-3">
      <dl className="space-y-3">
        {STACK_GROUPS.map((group) => (
          <div key={group.label} className="group/stack space-y-2">
            <dt className="flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors group-hover/stack:text-black dark:text-gray-mid dark:group-hover/stack:text-white">
              <span className="shrink-0">{group.label}</span>
              <span
                className="h-[2px] flex-1 rounded-full bg-[#d3d3d3] transition-colors group-hover/stack:bg-[#bdb6ad] dark:bg-[#3A3A3A] dark:group-hover/stack:bg-[#4a4a4a]"
                aria-hidden
              />
            </dt>
            <dd>
              <ul className="flex flex-wrap gap-2">
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
