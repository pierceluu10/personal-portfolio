import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#f7f4ed] dark:bg-[#28282B]">
      <h1 className="text-6xl font-bold text-slate-900 dark:text-white">404</h1>
      <p className="mt-2 text-slate-600 dark:text-white">
        this page could not be found.
      </p>
      <Link
        href="/"
        className="mt-6 text-sm text-slate-600 underline dark:text-white"
      >
        go home
      </Link>
    </main>
  );
}

