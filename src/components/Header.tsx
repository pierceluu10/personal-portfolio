import Link from "next/link";
import { Github, Linkedin, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm dark:border-slate-800/50 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="text-lg font-medium text-slate-900 transition-colors hover:text-slate-700 dark:text-slate-100 dark:hover:text-white"
        >
          Your Name Here
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="Resume"
          >
            <FileText className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noreferrer"
            className="rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
