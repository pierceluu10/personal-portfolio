"use client";

import { useEffect, useRef } from "react";
import { Neko } from "neko-ts";

export function NekoCat() {
  const nekoRef = useRef<Neko | null>(null);

  useEffect(() => {
    let nekoEl: HTMLElement | null = null;
    let clickHandler: ((e: Event) => void) | null = null;
    let rafId: number | undefined;
    let docClickHandler: ((e: Event) => void) | null = null;
    let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

    const timeoutId = setTimeout(() => {
      const existingNeko = document.querySelector("[data-neko]");
      if (existingNeko) {
        existingNeko.remove();
        clearInterval((window as { nekoInterval?: ReturnType<typeof setInterval> }).nekoInterval);
      }

      nekoRef.current = new Neko({
        speed: 10,
        origin: { x: 100, y: 100 },
      });

      nekoEl = document.querySelector<HTMLElement>("[data-neko]");
      if (!nekoEl) return;

      nekoEl.style.pointerEvents = "none";
      nekoEl.style.zIndex = "9999";

      const hitArea = document.createElement("div");
      hitArea.style.cssText =
        "position:fixed;width:72px;height:72px;pointer-events:auto;cursor:pointer;z-index:10000;";
      hitArea.setAttribute("data-neko-hit", "true");

      const tooltip = document.createElement("div");
      tooltip.textContent = "click to sleep/wake";
      tooltip.style.cssText =
        "position:fixed;padding:3px 6px;font-size:11px;white-space:nowrap;background:#1a1a1a;color:#fff;border-radius:4px;opacity:0;pointer-events:none;transition:opacity 0.12s;z-index:10001;transform:translateX(-50%);";
      tooltip.setAttribute("data-neko-tooltip", "true");
      document.body.appendChild(tooltip);

      nekoEl.parentElement?.appendChild(hitArea);

      const syncHitArea = () => {
        const rect = nekoEl!.getBoundingClientRect();
        hitArea.style.left = `${rect.left - 20}px`;
        hitArea.style.top = `${rect.top - 20}px`;
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.bottom + 2}px`;
        rafId = requestAnimationFrame(syncHitArea);
      };
      rafId = requestAnimationFrame(syncHitArea);

      const showTooltip = () => { tooltip.style.opacity = "1"; };
      const hideTooltip = () => { tooltip.style.opacity = "0"; };

      mouseMoveHandler = (e: MouseEvent) => {
        const rect = nekoEl!.getBoundingClientRect();
        const pad = 24;
        const inBounds =
          e.clientX >= rect.left - pad && e.clientX <= rect.right + pad &&
          e.clientY >= rect.top - pad && e.clientY <= rect.bottom + pad;
        inBounds ? showTooltip() : hideTooltip();
      };
      document.addEventListener("mousemove", mouseMoveHandler);

      clickHandler = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        if (!nekoRef.current) return;
        const neko = nekoRef.current;
        if (neko.isAwake) {
          neko.sleep();
          const n = neko as unknown as {
            nekoPosX: number;
            nekoPosY: number;
            mousePosX: number;
            mousePosY: number;
            idleAnimation: string | null;
            idleAnimationFrame: number;
            setSprite: (name: string, frame: number) => void;
          };
          n.mousePosX = n.nekoPosX;
          n.mousePosY = n.nekoPosY;
          n.idleAnimation = "sleeping";
          n.idleAnimationFrame = 8;
          n.setSprite("sleeping", 0);
        } else {
          neko.wake();
        }
      };

      hitArea.addEventListener("click", clickHandler);
      docClickHandler = (e: Event) => {
        const target = (e as MouseEvent).target as Node;
        if (hitArea.contains(target)) return;
        if (!nekoRef.current || !nekoEl) return;
        const me = e as MouseEvent;
        const rect = nekoEl.getBoundingClientRect();
        const pad = 20;
        if (
          me.clientX >= rect.left - pad && me.clientX <= rect.right + pad &&
          me.clientY >= rect.top - pad && me.clientY <= rect.bottom + pad
        ) {
          clickHandler?.(e);
        }
      };
      document.addEventListener("click", docClickHandler, true);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (mouseMoveHandler) document.removeEventListener("mousemove", mouseMoveHandler);
      if (docClickHandler) document.removeEventListener("click", docClickHandler, true);
      document.querySelector("[data-neko-tooltip]")?.remove();
      const hit = document.querySelector("[data-neko-hit]");
      if (hit && clickHandler) hit.removeEventListener("click", clickHandler);
      hit?.remove();
      if (rafId !== undefined) cancelAnimationFrame(rafId);
      nekoRef.current?.destroy();
      nekoRef.current = null;
      const orphan = document.querySelector("[data-neko]");
      if (orphan) orphan.remove();
      const hitOrphan = document.querySelector("[data-neko-hit]");
      if (hitOrphan) hitOrphan.remove();
      clearInterval((window as { nekoInterval?: ReturnType<typeof setInterval> }).nekoInterval);
    };
  }, []);

  return null;
}
