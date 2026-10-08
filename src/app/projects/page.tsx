import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProjectsSection } from "@/components/ProjectsSection";

const HOME_PROJECTS_HREF = "/";
const PROJECTS_PAGE_SECTION_OFFSET_CLASS_NAME = "-mt-2";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ed] dark:bg-[#28282B]">
      <div className="mx-auto min-w-0 max-w-[44rem] bg-[#f7f4ed] px-4 py-9 dark:bg-[#28282B] md:px-6 md:py-11">
        <Link
          href={HOME_PROJECTS_HREF}
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-900 dark:text-gray-mid dark:hover:text-white"
        >
          <ArrowLeft className="h-3 w-3" />
          back
        </Link>
        <div className={PROJECTS_PAGE_SECTION_OFFSET_CLASS_NAME}>
          <ProjectsSection />
        </div>
      </div>
    </main>
  );
}
