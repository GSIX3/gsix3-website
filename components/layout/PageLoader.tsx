"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

/**
 * Full-screen branded preloader.
 *
 * It renders on the very first paint (SSR markup) and stays until the page is
 * actually ready — fonts loaded, DOM parsed, and a short minimum on screen for
 * polish — then fades away to reveal the fully laid-out page. This masks the
 * brief hydration transient (e.g. the hero pin resolving from its placeholder
 * height) so the user only ever sees the finished layout.
 */
export default function PageLoader() {
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  // Decide when the page is ready, then start the fade.
  useEffect(() => {
    let cancelled = false;
    const MIN_VISIBLE_MS = 1000; // minimum on-screen time for a polished feel
    const MAX_VISIBLE_MS = 4500; // hard fallback so we never get stuck

    const reveal = () => {
      if (!cancelled) setFading(true);
    };

    const minDelay = new Promise<void>((resolve) =>
      window.setTimeout(resolve, MIN_VISIBLE_MS),
    );
    const fontsReady = document.fonts
      ? document.fonts.ready
      : Promise.resolve();
    const domReady =
      document.readyState === "loading"
        ? new Promise<void>((resolve) =>
            document.addEventListener("DOMContentLoaded", () => resolve(), {
              once: true,
            }),
          )
        : Promise.resolve();

    Promise.all([minDelay, fontsReady, domReady]).then(reveal);
    const maxTimer = window.setTimeout(reveal, MAX_VISIBLE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(maxTimer);
    };
  }, []);

  // Freeze page scroll while the loader is covering the screen.
  useEffect(() => {
    if (removed) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [removed]);

  // Unmount after the fade-out finishes so it never blocks interaction.
  useEffect(() => {
    if (!fading) return;
    const timer = window.setTimeout(() => setRemoved(true), 750);
    return () => window.clearTimeout(timer);
  }, [fading]);

  if (removed) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center gap-6 bg-white px-6 text-center transition-opacity duration-700 ease-out sm:gap-8 ${
        fading ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Image
        src={`/logo.png?v=${site.logoVersion}`}
        alt={site.name}
        width={2261}
        height={625}
        className="h-16 w-auto max-w-[82vw] animate-loader-rise sm:h-20 md:h-24"
        priority
        unoptimized
      />

      <p className="animate-loader-rise max-w-[90vw] text-balance font-heading text-base font-medium leading-relaxed tracking-tight text-slate-600 sm:text-lg md:text-xl">
        <span className="block">
          Innovation with <span className="text-accent">power</span>.
        </span>
        <span className="block">
          Engineered with <span className="text-accent">quality</span>.
        </span>
      </p>

      <div className="relative mt-1 h-[3px] w-40 overflow-hidden rounded-full bg-slate-200/80 sm:mt-2 sm:w-48">
        <div className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-accent to-accent-bright animate-loader-sweep" />
      </div>
    </div>
  );
}
