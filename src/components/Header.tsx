import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-[#f7f4ed]/80 backdrop-blur-sm dark:border-slate-800/50 dark:bg-[#28282B]/80">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          href="/"
          className="text-lg font-medium text-slate-900 transition-colors hover:text-slate-700 dark:text-slate-100 dark:hover:text-white"
        >
          Your Name Here
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
