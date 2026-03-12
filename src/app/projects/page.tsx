import { ProjectsSection } from "@/components/ProjectsSection";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ed] dark:bg-[#28282B]">
      <div className="mx-auto max-w-2xl bg-[#f7f4ed] px-6 py-10 dark:bg-[#28282B] md:px-8 md:py-12">
        <ProjectsSection />
      </div>
    </main>
  );
}
