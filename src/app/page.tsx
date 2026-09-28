import { IntroSection } from "@/components/IntroSection";
import { AboutSection } from "@/components/AboutSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f4ed] dark:bg-[#28282B]">
      <div className="mx-auto min-w-0 max-w-2xl bg-[#f7f4ed] px-6 py-10 dark:bg-[#28282B] md:px-8 md:py-12">
        <IntroSection />
        <div className="mt-5">
          <AboutSection />
        </div>
        <div id="projects">
          <ProjectsSection limit={3} />
        </div>
        <StackSection />
        <p className="mt-5 text-sm text-slate-600 transition-colors hover:text-black dark:text-gray-mid dark:hover:text-white">
          if anything on my portfolio interests you, feel free to reach out via linkedin or email; i&apos;m always open to new opportunities or discussion.
        </p>
      </div>
    </main>
  );
}
