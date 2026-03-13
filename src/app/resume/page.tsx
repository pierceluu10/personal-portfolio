import { PageContainer } from "@/components/PageContainer";

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ed] pt-16 dark:bg-[#28282B]">
      <PageContainer>
        <h1 className="mb-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          resume
        </h1>
        <p className="text-sm text-slate-600 dark:text-white">
          my resume will go here. add a link to{" "}
          <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-800">
            /resume.pdf
          </code>{" "}
          in <code className="rounded bg-slate-200 px-1.5 py-0.5 text-sm dark:bg-slate-800">public/</code> or
          embed it.
        </p>
      </PageContainer>
    </main>
  );
}
