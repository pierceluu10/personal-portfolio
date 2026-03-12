import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your Name Here | Portfolio",
  description: "Personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=t==='dark'||(t===null&&d);document.documentElement.classList.toggle('dark',dark);})();`,
          }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen bg-white text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
