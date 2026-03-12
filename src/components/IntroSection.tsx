import { Github, Linkedin, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function IntroSection() {
  return (
    <section className="group/intro space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-3">
          <h1 className="text-xl font-bold lowercase tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            hi, i&apos;m pierce luu
          </h1>
          <ul className="list-inside list-disc space-y-0.5 text-sm lowercase text-slate-600 dark:text-gray-mid dark:transition-colors group-hover/intro:dark:text-white">
            <li>placeholder bullet: what you do</li>
            <li>placeholder bullet: another thing you do</li>
            <li>placeholder bullet: third point</li>
          </ul>
          <p className="text-sm lowercase text-slate-600 dark:text-gray-mid dark:transition-colors group-hover/intro:dark:text-white">
            i&apos;m open to new opportunities. short line of text you can edit later.
          </p>
        </div>
        <div className="flex items-center gap-2 sm:flex-col sm:items-end">
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/pierceluu10"
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-1.5 text-black transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="github"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://www.linkedin.com/in/pierce-luu-481a28331/"
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-1.5 text-black transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="linkedin"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://pierceluu10.github.io/pierceluu10-resume/CURRENT_RESUME_PIERCE.pdf"
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-1.5 text-black transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-white dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="resume"
            >
              <FileText className="h-3.5 w-3.5" />
            </a>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </section>
  );
}
