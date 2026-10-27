import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-background font-mono text-[14px] text-foreground">
      <h1>404, nothing drifted here.</h1>
      <Link href="/" className="ink-link opacity-60 hover:opacity-100">
        back to the ocean
      </Link>
    </main>
  );
}
