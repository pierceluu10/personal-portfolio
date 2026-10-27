"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useIsLight } from "@/lib/theme";
import { OceanEngine, type OceanStats } from "./engine";

type OceanProps = { className?: string; onStats?: (stats: OceanStats) => void };

export function Ocean({ className, onStats }: OceanProps) {
  const isLight = useIsLight();
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<OceanEngine | null>(null);
  // Read through a ref, so a new callback doesn't tear down the engine.
  const onStatsRef = useRef(onStats);
  onStatsRef.current = onStats;

  useEffect(() => {
    if (!hostRef.current || !canvasRef.current) return;
    const engine = new OceanEngine(hostRef.current, canvasRef.current, (stats) => onStatsRef.current?.(stats));
    engineRef.current = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // Also sets the first theme: it runs right after the engine is created.
  useEffect(() => {
    engineRef.current?.setLight(isLight);
  }, [isLight]);

  return (
    <div ref={hostRef} aria-hidden="true" className={cn("pointer-events-none", className)}>
      <canvas ref={canvasRef} className="block h-full w-full font-mono" />
    </div>
  );
}
