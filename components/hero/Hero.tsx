"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { homeContent } from "@/content/home";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import { EncryptedText } from "@/components/ui/encrypted-text";

function useIsMobileHero() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

type Anchor = { cx: number; cy: number; h: number };

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const lerp = (from: number, to: number, t: number) => from + (to - from) * t;

export default function Hero() {
  const { hero } = homeContent;
  const isMobile = useIsMobileHero();
  const reducedMotion = usePrefersReducedMotion();

  const headlineLines = isMobile
    ? ["Enterprise software", "engineering", "built for scale."]
    : ["Enterprise software", "engineering built", "for scale."];
  const lineRevealDelayMs = isMobile ? 68 : 54;
  const lineStartDelayMs = isMobile ? 720 : 980;

  const capabilities = [
    "Web Platforms",
    "AI Systems",
    "Data Infrastructure",
    "Cloud",
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const heroLogoRef = useRef<HTMLDivElement>(null);
  const morphRef = useRef<HTMLDivElement>(null);

  // Measured start (hero) and end (header) positions for the morphing logo.
  const anchorsRef = useRef<{ start: Anchor; end: Anchor } | null>(null);
  const [ready, setReady] = useState(false);

  const measure = useCallback(() => {
    const startEl = heroLogoRef.current;
    const endEl = document.getElementById("site-header-logo-img");
    if (!startEl || !endEl) return;

    const a = startEl.getBoundingClientRect();
    const b = endEl.getBoundingClientRect();
    if (a.height === 0 || b.height === 0) return;

    anchorsRef.current = {
      start: { cx: a.left + a.width / 2, cy: a.top + a.height / 2, h: a.height },
      end: { cx: b.left + b.width / 2, cy: b.top + b.height / 2, h: b.height },
    };
    setReady(true);
  }, []);

  // The portion of the pinned scroll over which the logo finishes its journey.
  const completeAtRef = useRef(1);
  // Dead-zone at the top (mobile) so the logo "stays" before it starts moving.
  const startOffsetRef = useRef(0);
  // Last viewport width — used to ignore mobile URL-bar (height-only) resizes.
  const lastWidthRef = useRef(0);
  // Target progress (from scroll) vs. rendered progress (eased toward target).
  const targetPRef = useRef(0);
  const currentPRef = useRef(0);
  const loopingRef = useRef(false);

  // Paint the morph logo for a given progress 0..1.
  const renderTransform = useCallback((p: number) => {
    const anchors = anchorsRef.current;
    const morph = morphRef.current;
    if (!anchors || !morph) return;

    const { start, end } = anchors;
    const cx = lerp(start.cx, end.cx, p);
    const cy = lerp(start.cy, end.cy, p);
    const scale = lerp(1, end.h / start.h, p);

    morph.style.transform = `translate(calc(${cx}px - 50%), calc(${cy}px - 50%)) scale(${scale})`;
  }, []);

  // Map the current scroll position to a target progress, with a top dead-zone.
  const computeTargetP = useCallback(() => {
    const denom = Math.max(1, completeAtRef.current - startOffsetRef.current);
    return clamp((window.scrollY - startOffsetRef.current) / denom, 0, 1);
  }, []);

  // Recompute anchors on mount / orientation / breakpoint change. Crucially,
  // we skip height-only resizes (the mobile URL bar showing/hiding) which would
  // otherwise re-anchor the logo mid-scroll and make it jump.
  useLayoutEffect(() => {
    if (isMobile === null || reducedMotion) return;

    let raf = 0;
    const remeasure = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const width = window.innerWidth;
        const firstRun = lastWidthRef.current === 0;
        if (!firstRun && width === lastWidthRef.current) return;
        lastWidthRef.current = width;

        completeAtRef.current = Math.max(1, window.innerHeight * 0.7);
        startOffsetRef.current = isMobile
          ? Math.min(72, window.innerHeight * 0.09)
          : 0;
        measure();

        // Snap (no easing) to the correct spot when geometry actually changes.
        const p = computeTargetP();
        targetPRef.current = p;
        currentPRef.current = p;
        renderTransform(p);
      });
    };

    remeasure();
    window.addEventListener("resize", remeasure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", remeasure);
    };
  }, [isMobile, reducedMotion, measure, computeTargetP, renderTransform]);

  // Drive the morph from scroll, easing toward the target so mobile's sparse
  // scroll events (and momentum scrolling) render smoothly. Desktop stays 1:1.
  useEffect(() => {
    if (isMobile === null || reducedMotion || !ready) return;

    const ease = isMobile ? 0.22 : 1;
    let raf = 0;

    const tick = () => {
      const target = targetPRef.current;
      const next = currentPRef.current + (target - currentPRef.current) * ease;
      const done = Math.abs(target - next) < 0.0006;
      currentPRef.current = done ? target : next;
      renderTransform(currentPRef.current);
      if (done) {
        loopingRef.current = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const ensureLoop = () => {
      if (loopingRef.current) return;
      loopingRef.current = true;
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      targetPRef.current = computeTargetP();
      ensureLoop();
    };

    // Sync immediately on (re)mount.
    targetPRef.current = computeTargetP();
    currentPRef.current = targetPRef.current;
    renderTransform(currentPRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      loopingRef.current = false;
      window.removeEventListener("scroll", onScroll);
    };
  }, [isMobile, reducedMotion, ready, computeTargetP, renderTransform]);

  const heroContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      className="flex w-full max-w-xl flex-col items-center text-center lg:items-start lg:text-left"
    >
      <h1 className="font-heading text-[clamp(2rem,8vw,2.75rem)] font-semibold leading-[1.12] tracking-tight text-slate-950 md:text-[clamp(2.25rem,3.6vw,3.5rem)]">
        <span className="sr-only">{hero.headline}</span>
        <span aria-hidden="true">
          {headlineLines.map((line, index) => (
            <span className="block" key={line}>
              <EncryptedText
                text={line}
                encryptedClassName="text-purple-300/60"
                revealedClassName="text-slate-950"
                revealDelayMs={lineRevealDelayMs}
                startDelayMs={index * lineStartDelayMs}
              />
            </span>
          ))}
        </span>
      </h1>

      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-muted md:mt-6 md:text-base">
        {hero.subtext}
      </p>

      <div className="mt-8">
        <Button href="/contact">{hero.cta}</Button>
      </div>

      <div className="mt-8 flex w-full flex-wrap justify-center gap-2 lg:w-auto lg:justify-start">
        {capabilities.map((c) => (
          <span
            key={c}
            className="rounded-full border border-border bg-bg-elevated/60 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-text-muted"
          >
            {c}
          </span>
        ))}
      </div>
    </motion.div>
  );

  if (isMobile === null) {
    return <div className="min-h-dvh bg-white md:min-h-screen" />;
  }

  const lampLogo = (
    <div
      ref={heroLogoRef}
      className={
        isMobile
          ? "h-16 w-auto"
          : "h-24 w-auto lg:h-28 2xl:h-36"
      }
      // Anchor: visible until the morph logo is measured and takes over, so
      // there's no flash; it keeps layout for measurement either way.
      style={{ visibility: reducedMotion || !ready ? "visible" : "hidden" }}
      aria-hidden={!reducedMotion}
    >
      <Image
        src={`/logo.png?v=${site.logoVersion}`}
        alt={site.name}
        width={2261}
        height={625}
        className="h-full w-auto"
        priority
        unoptimized
      />
    </div>
  );

  const heroStage = (
    <div className="relative flex min-h-svh w-full items-center bg-white">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-28 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:py-24 xl:gap-28 2xl:gap-36 2xl:px-12">
        {/* Left: logo + content */}
        <div className="flex flex-col items-center lg:items-start">
          <div className="mb-7 md:mb-9">{lampLogo}</div>
          {heroContent}
        </div>

        {/* Right: gradient visual panel (desktop only) */}
        <div className="relative hidden w-full lg:block">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-purple-500/10 ring-1 ring-black/5 lg:aspect-[4/5] lg:max-h-[calc(100dvh_-_12rem)]">
            <div className="hero-gradient-panel absolute inset-0" />
            <div className="absolute inset-0 bg-[radial-gradient(130%_120%_at_25%_15%,rgba(255,255,255,0.28),transparent_55%)]" />
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/15" />
          </div>
        </div>
      </div>
    </div>
  );

  // Reduced motion: no pinning / morph — render the hero statically.
  if (reducedMotion) {
    return heroStage;
  }

  return (
    <section ref={sectionRef} className="relative h-[170svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {heroStage}
      </div>

      {/* Fixed logo that physically travels from the hero into the header. */}
      <div
        ref={morphRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[70] will-change-transform"
        style={{ opacity: ready ? 1 : 0 }}
      >
        <div className={isMobile ? "h-16 w-auto" : "h-24 w-auto lg:h-28 2xl:h-36"}>
          <Image
            src={`/logo.png?v=${site.logoVersion}`}
            alt={site.name}
            width={2261}
            height={625}
            className="h-full w-auto"
            priority
            unoptimized
          />
        </div>
      </div>
    </section>
  );
}
