"use client";

import { motion } from "motion/react";
import PythonPlainIcon from "@devicon/react/python/plain";
import CPlainIcon from "@devicon/react/c/plain";
import CplusplusPlainIcon from "@devicon/react/cplusplus/plain";
import TypescriptPlainIcon from "@devicon/react/typescript/plain";
import JavascriptPlainIcon from "@devicon/react/javascript/plain";
import ReactOriginalIcon from "@devicon/react/react/original";
import NextjsPlainIcon from "@devicon/react/nextjs/plain";
import FastapiPlainIcon from "@devicon/react/fastapi/plain";
import { SqlIcon } from "./icons/SqlIcon";

const techItems: { name: string; icon: React.ComponentType<{ size?: string | number; color?: string }> }[] = [
  { name: "python", icon: PythonPlainIcon },
  { name: "c", icon: CPlainIcon },
  { name: "c++", icon: CplusplusPlainIcon },
  { name: "typescript", icon: TypescriptPlainIcon },
  { name: "javascript", icon: JavascriptPlainIcon },
  { name: "react", icon: ReactOriginalIcon },
  { name: "next.js", icon: NextjsPlainIcon },
  { name: "fastapi", icon: FastapiPlainIcon },
  { name: "sql", icon: SqlIcon },
];

export function StackSection() {
  return (
    <section className="group mt-10 space-y-3">
      <h2 className="text-base font-semibold lowercase text-slate-900 dark:text-white">
        technologies im strongest with
      </h2>
      <div className="flex flex-wrap gap-2">
        {techItems.map(({ name, icon: Icon }) => (
          <motion.div
            key={name}
            className="inline-flex items-center gap-1.5 rounded-lg border-2 border-[#d3d3d3] bg-[#FAF6F0] px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-[#ebe4dc] dark:border-[#3A3A3A] dark:bg-[#333333] dark:text-white dark:hover:bg-[#2a2a2a] dark:hover:text-white"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="relative inline-flex shrink-0">
              {name === "sql" ? (
                <SqlIcon size={12} />
              ) : (
                <>
                  <span className="dark:hidden">
                    <Icon size="12px" color="#1a1a1a" />
                  </span>
                  <span className="hidden dark:inline">
                    <Icon size="12px" color="white" />
                  </span>
                </>
              )}
            </span>
            <span className="lowercase">{name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
