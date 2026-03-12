import { IntroSection } from "@/components/IntroSection";
import { AboutSection } from "@/components/AboutSection";
import { CurrentWorkSection } from "@/components/CurrentWorkSection";
import { FeaturedProjectsSection } from "@/components/FeaturedProjectsSection";

export default function HomePage() {
  return (
    <main>
      <div className="mx-auto max-w-2xl px-6 py-12 md:px-8 md:py-16">
        <IntroSection />
        <FeaturedProjectsSection />
        <div className="mt-16">
          <AboutSection />
        </div>
        <div className="mt-16">
          <CurrentWorkSection />
        </div>
      </div>
    </main>
  );
}
