import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { NekoCat } from "@/components/NekoCat";

export const metadata: Metadata = {
  title: "pierce luu | portfolio",
  description: "personal portfolio",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.className} bg-[#f7f4ed] dark:bg-[#28282B]`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=t==='dark'||(t===null&&d);document.documentElement.classList.toggle('dark',dark);})();`,
          }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden bg-[#f7f4ed] text-slate-900 text-sm antialiased dark:bg-[#28282B] dark:text-slate-100">
        {children}
        <NekoCat />
      </body>
    </html>
  );
}
