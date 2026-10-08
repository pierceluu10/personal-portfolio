import { IntroSection } from "@/components/IntroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";
import { CopyEmail } from "@/components/CopyEmail";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f4ed] dark:bg-[#28282B]">
      <div className="mx-auto min-w-0 max-w-3xl bg-[#f7f4ed] px-5 py-9 dark:bg-[#28282B] md:px-7 md:py-11">
        <IntroSection />
        <div id="projects">
          <ProjectsSection limit={3} />
        </div>
        <StackSection />
        <p className="mt-5 text-sm text-slate-600 transition-colors hover:text-black dark:text-gray-mid dark:hover:text-white">
          if anything on my portfolio interests you, feel free to reach out via linkedin or <CopyEmail />; i&apos;m always open to new opportunities or discussion.
        </p>
      </div>
    </main>
  );
}
