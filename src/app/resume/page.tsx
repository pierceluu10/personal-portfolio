import { PageContainer } from "@/components/PageContainer";

export default function ResumePage() {
  return (
    <main className="pt-16">
      <PageContainer>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-100">
          Resume
        </h1>
        <p className="text-slate-400">
          My resume will go here. Add a link to{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm">
            /resume.pdf
          </code>{" "}
          in <code className="rounded bg-slate-800 px-1.5 py-0.5 text-sm">public/</code> or
          embed it.
        </p>
      </PageContainer>
    </main>
  );
}
