import { IntroSection } from "@/components/IntroSection";
import { AboutSection } from "@/components/AboutSection";
import { CurrentWorkSection } from "@/components/CurrentWorkSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { StackSection } from "@/components/StackSection";

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f7f4ed] dark:bg-[#28282B]">
      <div className="mx-auto min-w-0 max-w-2xl bg-[#f7f4ed] px-6 py-10 dark:bg-[#28282B] md:px-8 md:py-12">
        <IntroSection />
        <StackSection />
        <ProjectsSection />
        <div className="mt-10">
          <AboutSection />
        </div>
        <div className="mt-10">
          <CurrentWorkSection />
        </div>
      </div>
    </main>
  );
}
