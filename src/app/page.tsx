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
        <StackSection />
        <ProjectsSection limit={3} />
        <p className="mt-10 text-sm text-slate-600 dark:text-gray-mid">
          if anything on my portfolio interests you, feel free to reach out via linkedin or email; i&apos;m always open to new opportunities or discussion. if you like this portfolio or have any advice for me, please also let me know :)
        </p>
      </div>
    </main>
  );
}
