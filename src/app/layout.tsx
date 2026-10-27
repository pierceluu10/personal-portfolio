import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { THEME_SCRIPT } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "pierce luu",
  description: "personal portfolio",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // The theme script sets the class on <html> before React hydrates, which React would otherwise flag.
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className={`${GeistMono.variable} overflow-x-clip bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
