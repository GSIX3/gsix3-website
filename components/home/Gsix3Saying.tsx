"use client";

import ScrollReveal from "@/components/motion/ScrollReveal";
import { CanvasText } from "@/components/ui/canvas-text";

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
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="flex min-h-80 items-center justify-center px-2 md:px-8">
            <h2 className="font-heading group relative mx-auto max-w-4xl text-center text-4xl font-bold leading-tight tracking-tight text-balance text-slate-950 sm:text-5xl md:text-6xl xl:text-7xl">
              <span className="block">
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
              <span className="mt-4 block">
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
