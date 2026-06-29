"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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

function assetPath(folder: string, file: string) {
  return `/assets/${folder}/${encodeURIComponent(file)}`;
}

// width/height must match each image's real aspect ratio, otherwise next/image
// warns "width or height modified, but not the other". The logos are square
// (2295×2295) by default; pass real dims for any that aren't (e.g. JGP1 is 4:1).
function carouselLogo(
  src: string,
  name: string,
  width = 2295,
  height = 2295,
) {
  return (
    <Image
      src={src}
      alt={name}
      width={width}
      height={height}
      className="h-14 w-auto max-w-full object-contain sm:h-24 sm:max-w-[220px] md:h-28 md:max-w-[260px]"
      unoptimized
    />
  );
}

const technologyLogos: Logo[] = [
  {
    name: "Python",
    mark: carouselLogo(assetPath("technologies", "python logo.png"), "Python"),
  },
  {
    name: "React",
    mark: carouselLogo(assetPath("technologies", "react logo.png"), "React"),
  },
  {
    name: "Next.js",
    mark: carouselLogo(assetPath("technologies", "nextjs logo.png"), "Next.js"),
  },
  {
    name: "PostgreSQL",
    mark: carouselLogo(
      assetPath("technologies", "postgresql.png"),
      "PostgreSQL",
    ),
  },
  {
    name: "Arduino",
    mark: carouselLogo(
      assetPath("technologies", "arduino logo.png"),
      "Arduino",
    ),
  },
  {
    name: "Raspberry Pi",
    mark: carouselLogo(
      assetPath("technologies", "raspberrypi logo.png"),
      "Raspberry Pi",
    ),
  },
  {
    name: "Dotnet",
    mark: carouselLogo(assetPath("technologies", "dotnet.png"), "dotnet"),
  },
];

const customerLogos: Logo[] = [
  {
    name: "Bowatte Ayurveda",
    mark: carouselLogo(
      assetPath("customers", "Bowatte1.png"),
      "Bowatte Ayurveda",
    ),
  },
  {
    name: "Jansiri Motor Stores",
    mark: carouselLogo(
      assetPath("customers", "JMS1.png"),
      "Jansiri Motor Stores",
    ),
  },
  {
    name: "JGP Marketing",
    mark: carouselLogo(
      assetPath("customers", "JGP1.png"),
      "JGP Marketing",
      2772,
      693,
    ),
  },
  {
    name: "GSIX",
    mark: carouselLogo(assetPath("customers", "GSIX1.png"), "GSIX"),
  },
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
  const custOpacity = useTransform(smoothProgress, [0.28, 0.46, 1], [0, 1, 1]);
  const techBlur = useTransform(smoothProgress, [0.22, 0.4], [0, 8]);
  const custBlur = useTransform(smoothProgress, [0.28, 0.46], [8, 0]);
  const techY = useTransform(smoothProgress, [0.2, 0.4], [0, -18]);
  const custY = useTransform(smoothProgress, [0.28, 0.46], [18, 0]);
  const techFilter = useMotionTemplate`blur(${techBlur}px)`;
  const custFilter = useMotionTemplate`blur(${custBlur}px)`;

  return (
    <section
      ref={sectionRef}
      className="relative h-[170vh] bg-white md:h-[220vh]"
    >
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
            <LogoCarousel
              columnCount={3}
              logos={technologyLogos}
              size="large"
            />
          </motion.div>

          {/* State 2 — customers */}
          <motion.div
            style={{ opacity: custOpacity, filter: custFilter, y: custY }}
            className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-8 px-4 sm:px-6 md:gap-10"
          >
            <HeadingBlock customers />
            <LogoCarousel columnCount={3} logos={customerLogos} size="large" />
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
