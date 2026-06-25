"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";
import { CanvasText } from "@/components/ui/canvas-text";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const blueTheme = {
  backgroundClassName: "bg-blue-600",
  colors: [
    "rgba(37, 99, 235, 1)",
    "rgba(14, 165, 233, 1)",
    "rgba(56, 189, 248, 0.95)",
    "rgba(29, 78, 216, 1)",
    "rgba(125, 211, 252, 0.9)",
    "rgba(30, 64, 175, 1)",
  ],
} as const;

const purpleTheme = {
  backgroundClassName: "bg-purple-600",
  colors: [
    "rgba(126, 34, 206, 1)",
    "rgba(168, 85, 247, 1)",
    "rgba(217, 70, 239, 0.95)",
    "rgba(107, 33, 168, 1)",
    "rgba(196, 181, 253, 0.9)",
    "rgba(88, 28, 135, 1)",
  ],
} as const;

export default function Gsix3Saying() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-6 pb-8 sm:pt-10 sm:pb-16 md:pt-16 md:pb-28">
      <div className="pointer-events-none absolute inset-0 z-0">
        <ShootingStars
          starColor="#7dd3fc"
          trailColor="#38bdf8"
          starWidth={26}
          starHeight={3}
          minSpeed={14}
          maxSpeed={34}
          minDelay={500}
          maxDelay={1800}
          className="[filter:drop-shadow(0_0_6px_rgba(56,189,248,0.9))]"
        />
        <StarsBackground />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <ScrollReveal>
          <div className="flex min-h-40 items-center justify-center px-0 sm:min-h-64 md:min-h-80 md:px-8">
            <h2 className="font-heading group relative mx-auto w-full max-w-none text-center text-[clamp(1.35rem,5.9vw,1.65rem)] font-bold leading-[1.15] tracking-tight text-white sm:max-w-2xl sm:text-5xl md:max-w-4xl md:text-6xl md:leading-tight xl:text-7xl">
              <span className="block whitespace-nowrap">
                Innovation{" "}
                <CanvasText
                  text="with power"
                  backgroundClassName={blueTheme.backgroundClassName}
                  colors={[...blueTheme.colors]}
                  lineGap={4}
                  animationDuration={8}
                />
                .
              </span>
              <span className="mt-2 block whitespace-nowrap sm:mt-4">
                <CanvasText
                  text="Engineered"
                  backgroundClassName={purpleTheme.backgroundClassName}
                  colors={[...purpleTheme.colors]}
                  lineGap={4}
                  animationDuration={8}
                />{" "}
                with quality.
              </span>
            </h2>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
