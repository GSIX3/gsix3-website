"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { AnimatedUnderline } from "@/components/ui/animated-underline";
import { GradientHeading } from "@/components/ui/gradient-heading";
import LogoCarousel, { type Logo } from "@/components/ui/logo-carousel";

const customerLogoMarks = {
  bowatta: (
    <span className="font-heading text-lg font-black uppercase tracking-[0.08em] text-emerald-700 sm:text-3xl sm:tracking-[0.14em] md:text-4xl">
      Bowatta
    </span>
  ),
  vida: (
    <span className="font-heading text-xl font-black uppercase tracking-[0.12em] text-slate-950 sm:text-4xl sm:tracking-[0.2em] md:text-5xl">
      VIDA
    </span>
  ),
  atlacarte: (
    <span className="font-heading text-lg font-black tracking-tight text-orange-500 sm:text-3xl md:text-5xl">
      Atlacarte
    </span>
  ),
  gsix3: (
    <span className="font-heading text-xl font-black tracking-tight text-purple-700 sm:text-4xl md:text-5xl">
      GSIX3
    </span>
  ),
  vidaData: (
    <span className="rounded-xl bg-slate-950 px-3 py-2 font-heading text-lg font-black uppercase tracking-[0.12em] text-white sm:rounded-2xl sm:px-5 sm:py-3 sm:text-2xl sm:tracking-[0.16em] md:text-3xl">
      VIDA
    </span>
  ),
  retail: (
    <span className="rounded-xl bg-emerald-100 px-3 py-2 font-heading text-lg font-black uppercase tracking-[0.08em] text-emerald-800 sm:rounded-2xl sm:px-5 sm:py-3 sm:text-2xl sm:tracking-[0.12em] md:text-3xl">
      Retail
    </span>
  ),
};

const customerLogos: Logo[] = [
  { name: "Bowatta", mark: customerLogoMarks.bowatta },
  { name: "VIDA Edgewater", mark: customerLogoMarks.vida },
  { name: "Atlacarte", mark: customerLogoMarks.atlacarte },
  { name: "GSIX3", mark: customerLogoMarks.gsix3 },
  { name: "VIDA Data", mark: customerLogoMarks.vidaData },
  { name: "Bowatta Retail", mark: customerLogoMarks.retail },
];

function HeadingBlock({ customers }: { customers: boolean }) {
  return (
    <div className="max-w-[22rem] space-y-1 text-center sm:max-w-3xl md:max-w-5xl">
      <GradientHeading variant="secondary" size="lg">
        {customers ? "Our customers" : "We use the best and"}
      </GradientHeading>
      <GradientHeading size="hero">
        {customers ? "Who " : "latest "}
        <AnimatedUnderline className="bg-gradient-to-r from-slate-950 via-slate-800 to-slate-950 bg-clip-text text-transparent">
          {customers ? "Work With Us" : "technologies"}
        </AnimatedUnderline>
      </GradientHeading>
    </div>
  );
}

export default function LogoCarouselDemo() {
  const sectionRef = useRef<HTMLElement>(null);
  // Progress 0 -> 1 while the (taller-than-viewport) section is pinned.
  // Computed from the section rect so it is strictly monotonic.
  const progress = useMotionValue(0);
  const smoothProgress = useSpring(progress, {
    stiffness: 45,
    damping: 22,
    mass: 0.9,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const range = rect.height - window.innerHeight;
      const next = range > 0 ? -rect.top / range : 0;
      progress.set(Math.min(1, Math.max(0, next)));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progress]);

  // Aligned opacity crossfade with a blur dissolve, so the overlap reads as a
  // soft morph rather than two texts ghosting over each other.
  const techOpacity = useTransform(smoothProgress, [0, 0.2, 0.4], [1, 1, 0]);
  const custOpacity = useTransform(
    smoothProgress,
    [0.28, 0.46, 1],
    [0, 1, 1],
  );
  const techBlur = useTransform(smoothProgress, [0.22, 0.4], [0, 8]);
  const custBlur = useTransform(
    smoothProgress,
    [0.28, 0.46],
    [8, 0],
  );
  const techY = useTransform(smoothProgress, [0.2, 0.4], [0, -18]);
  const custY = useTransform(
    smoothProgress,
    [0.28, 0.46],
    [18, 0],
  );
  const techFilter = useMotionTemplate`blur(${techBlur}px)`;
  const custFilter = useMotionTemplate`blur(${custBlur}px)`;

  return (
    <section ref={sectionRef} className="relative h-[170vh] bg-white md:h-[220vh]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(168,85,247,0.16),transparent_32%),radial-gradient(circle_at_18%_62%,rgba(126,34,206,0.08),transparent_30%),radial-gradient(circle_at_82%_62%,rgba(192,132,252,0.1),transparent_30%)]" />
      {/* Pins to the viewport while the page scrolls through the section */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative mx-auto h-full w-full max-w-screen-lg">
          {/* State 1 — technologies */}
          <motion.div
            style={{ opacity: techOpacity, filter: techFilter, y: techY }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-4 sm:px-6 md:gap-10"
          >
            <HeadingBlock customers={false} />
            <LogoCarousel columnCount={3} />
          </motion.div>

          {/* State 2 — customers */}
          <motion.div
            style={{ opacity: custOpacity, filter: custFilter, y: custY }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-8 px-4 sm:px-6 md:gap-10"
          >
            <HeadingBlock customers />
            <LogoCarousel columnCount={3} logos={customerLogos} />
          </motion.div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center px-4">
          <span className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-slate-500 shadow-sm backdrop-blur-md">
            ESTD 2025
          </span>
        </div>
      </div>
    </section>
  );
}
