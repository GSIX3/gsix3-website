"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { homeContent } from "@/content/home";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import { EncryptedText } from "@/components/ui/encrypted-text";
import HeroSlideshow, { type HeroSlide } from "@/components/home/HeroSlideshow";

// Hero showcase images live in /public/assets/hero.
const heroSlides: HeroSlide[] = [
  {
    src: "/assets/hero/atlacarte-showcase.png",
    alt: "Atlacarte messaging-first CX platform",
  },
  {
    src: "/assets/hero/vida-showcase.jpg",
    alt: "VIDA Edgewater pricing intelligence platform",
  },
  {
    src: "/assets/hero/partnership-showcase.png",
    alt: "A GSIX3 client partnership",
  },
];

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

  // Split into segments so "Invent" and "Simplify" can be highlighted (dark
  // purple + underline) while keeping the per-character reveal animation.
  const headlineLines: { text: string; highlight?: boolean }[][] = [
    [{ text: "Built to " }, { text: "Invent", highlight: true }, { text: "." }],
    [{ text: "Engineered to" }],
    [{ text: "Simplify", highlight: true }, { text: "." }],
  ];
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
  // Whether the hero (start) anchor was measured while in the pinned range, where
  // it sits at its true on-screen spot. If the page loads scrolled past the pin,
  // the first measurement is off-screen and must be redone on the way back up.
  const pinMeasuredRef = useRef(false);

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
        // Only trust the start anchor if we measured it inside the pinned range.
        pinMeasuredRef.current = window.scrollY <= completeAtRef.current;

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
      // Re-measure the hero anchor the first time we scroll back into the pinned
      // range, in case the page loaded scrolled past it (stale off-screen spot).
      if (!pinMeasuredRef.current && window.scrollY <= completeAtRef.current) {
        measure();
        pinMeasuredRef.current = true;
      }
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
  }, [isMobile, reducedMotion, ready, measure, computeTargetP, renderTransform]);

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
          {headlineLines.map((segments, lineIndex) => {
            let charsBefore = 0;
            return (
              <span className="block whitespace-nowrap" key={lineIndex}>
                {segments.map((seg, segIndex) => {
                  const startDelayMs =
                    lineIndex * lineStartDelayMs +
                    charsBefore * lineRevealDelayMs;
                  charsBefore += seg.text.length;
                  return (
                    <EncryptedText
                      key={segIndex}
                      text={seg.text}
                      encryptedClassName="text-purple-300/60"
                      revealedClassName={
                        seg.highlight ? "text-accent" : "text-slate-950"
                      }
                      revealDelayMs={lineRevealDelayMs}
                      startDelayMs={startDelayMs}
                    />
                  );
                })}
              </span>
            );
          })}
        </span>
      </h1>

      <p className="mt-5 max-w-md text-[15px] leading-relaxed text-text-muted md:mt-6 md:text-base">
        {hero.subtext}
      </p>
    </motion.div>
  );

  // CTA button. On mobile it sits below the inline image; on desktop, under the copy.
  const ctaGroup = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
      className="flex w-full max-w-xl flex-col items-center text-center lg:mt-8 lg:items-start lg:text-left"
    >
      <div>
        <Button href="/contact">{hero.cta}</Button>
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
      style={{ visibility: reducedMotion || !ready ? "visible" : "hidden" }}
    >
      <Link
        href="/"
        className="inline-block h-full"
        aria-label={`${site.name} home`}
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
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
      </Link>
    </div>
  );

  const heroStage = (
    <div className="relative flex min-h-svh w-full items-center bg-white">
      <div className="mx-auto grid w-full max-w-[94rem] grid-cols-1 items-center gap-12 px-4 pt-8 pb-6 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:items-start lg:gap-20 lg:px-12 lg:py-24 xl:grid-cols-[1fr_1.55fr] xl:px-16 2xl:grid-cols-[1fr_2fr] 2xl:px-12">
        {/* Left: logo + content */}
        <div className="flex flex-col items-center lg:-mt-6 lg:items-start">
          {/* The logo PNG has ~5% transparent padding on its left, so at the
              large 2xl size its visible icon sits indented from the heading's
              left edge. Pull it back by that amount on big screens only. */}
          <div className="mb-10 md:mb-12 2xl:-ml-6 2xl:mb-16">{lampLogo}</div>
          {heroContent}

          {/* Inline product visual — phones/tablets only; centered between copy and
              CTA. Width is capped by the leftover viewport height so the whole hero
              (logo → copy → image → CTA) fits in one screen and the pin never clips. */}
          <div className="my-4 w-full max-w-xl lg:hidden">
            <div className="relative mx-auto aspect-[7/5] w-[min(100%,calc((100svh_-_30rem)*1.4))] overflow-hidden rounded-[2rem] shadow-xl shadow-slate-900/10 ring-1 ring-black/5">
              <HeroSlideshow slides={heroSlides} interval={5000} />
            </div>
          </div>

          {ctaGroup}
        </div>

        {/* Right: gradient visual panel (desktop only) */}
        <div className="relative hidden w-full lg:mt-10 lg:block lg:translate-x-8">
          <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-xl shadow-slate-900/10 ring-1 ring-black/5 lg:aspect-[7/5] lg:w-[min(100%,calc((100svh_-_15rem)*1.4))]">
            <HeroSlideshow slides={heroSlides} interval={5000} />
          </div>
        </div>
      </div>
    </div>
  );

  // Reduced motion: no morph — render the hero statically (image inline).
  if (reducedMotion) {
    return heroStage;
  }

  // Fixed logo that physically travels from the hero into the header. The morph
  // works in natural scroll too, so we render it on mobile and desktop alike.
  const morphLogo = (
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
  );

  // Pin the hero (all sizes) so the copy/image stay put while the logo flies up
  // into the header; the page only scrolls once the morph completes.
  return (
    <section ref={sectionRef} className="relative h-[170svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        {heroStage}
      </div>
      {morphLogo}
    </section>
  );
}
