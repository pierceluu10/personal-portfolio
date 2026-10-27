"use client";

import { useEffect, useState } from "react";
import { FrontPage } from "@/components/FrontPage";
import { Ocean } from "@/components/ocean/Ocean";
import type { OceanStats } from "@/components/ocean/engine";
import { TopNav } from "@/components/TopNav";

export default function HomePage() {
  const [stats, setStats] = useState<OceanStats>({ jellies: 0, pulses: 0 });

  // The home page is a single screen: no scrolling and no overscroll bounce. Restored when leaving the page.
  useEffect(() => {
    const root = document.documentElement;
    const previous = { overflow: root.style.overflow, overscroll: root.style.overscrollBehavior };
    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    return () => {
      root.style.overflow = previous.overflow;
      root.style.overscrollBehavior = previous.overscroll;
    };
  }, []);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden bg-background transition-colors duration-300">
      <Ocean onStats={setStats} className="absolute inset-0" />
      <TopNav />
      <main className="relative z-20 flex h-full flex-col">
        <FrontPage stats={stats} />
      </main>
    </div>
  );
}
