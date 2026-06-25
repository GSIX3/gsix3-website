"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

type GridItemProps = {
  area: string;
  number: string;
  title: ReactNode;
  description: ReactNode;
};

function GridItem({ area, number, title, description }: GridItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const item = itemRef.current;
    if (!item) return;

    const rect = item.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const distances = {
      top: y,
      right: rect.width - x,
      bottom: rect.height - y,
      left: x,
    };
    const closestEdge = Object.entries(distances).sort(
      (first, second) => first[1] - second[1],
    )[0][0];

    item.style.setProperty("--glow-x", `${x}px`);
    item.style.setProperty("--glow-y", `${y}px`);
    item.style.setProperty("--glow-top", closestEdge === "top" ? "1" : "0");
    item.style.setProperty("--glow-right", closestEdge === "right" ? "1" : "0");
    item.style.setProperty(
      "--glow-bottom",
      closestEdge === "bottom" ? "1" : "0",
    );
    item.style.setProperty("--glow-left", closestEdge === "left" ? "1" : "0");
  };

  const handlePointerLeave = () => {
    const item = itemRef.current;
    if (!item) return;

    item.style.setProperty("--glow-top", "0");
    item.style.setProperty("--glow-right", "0");
    item.style.setProperty("--glow-bottom", "0");
    item.style.setProperty("--glow-left", "0");
  };

  return (
    <li className={`min-h-[23rem] list-none ${area}`}>
      <div
        ref={itemRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="group relative h-full rounded-2xl border border-slate-200/80 bg-white p-2 shadow-[0_18px_60px_rgba(15,23,42,0.08)] md:rounded-3xl md:p-3"
      >
        <GlowingEffect
          spread={190}
          glow
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-xl bg-white p-6 md:p-8">
          <div className="relative flex flex-1 flex-col justify-between gap-8">
            <div>
              <span className="font-sans text-5xl font-semibold tracking-tight text-purple-300 md:text-6xl">
                {number}
              </span>
            </div>
            <div className="space-y-5">
              <h3 className="pt-0.5 font-sans text-3xl/[2.3rem] font-semibold tracking-tight text-balance text-slate-950 md:text-[2rem]/[2.35rem]">
                {title}
              </h3>
              <p className="font-sans text-base/[1.65rem] font-medium text-slate-500 md:text-base/[1.65rem]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function GlowingEffectDemo() {
  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-40 left-1/2 h-[34rem] w-[48rem] -translate-x-1/2 rounded-full bg-purple-200/60 blur-3xl" />
        <div className="absolute top-1/3 -left-28 h-80 w-80 rounded-full bg-sky-100/80 blur-3xl" />
        <div className="absolute -right-28 bottom-0 h-96 w-96 rounded-full bg-indigo-100/80 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_76%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgba(255,255,255,0.92)_72%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <h2 className="mb-16 text-center font-sans text-4xl font-semibold tracking-tight text-slate-950 md:mb-24 md:text-6xl">
          How GSIX3 Can
          <br />
          Help You Grow
        </h2>

        <ul className="grid grid-cols-1 grid-rows-none gap-6 md:grid-cols-12 md:grid-rows-3 md:gap-7 xl:grid-rows-2 xl:gap-8">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            number="01"
            title={
              <>
                Web
                <br />
                Applications
              </>
            }
            description="We design and develop secure, scalable web apps that deliver performance and polish across all devices."
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:1/5/2/9]"
            number="02"
            title={
              <>
                Artificial
                <br />
                Intelligence
              </>
            }
            description="We create custom AI models and intelligent systems that automate, predict, and optimize business outcomes."
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/9/2/13]"
            number="03"
            title={
              <>
                Data
                <br />
                Science
              </>
            }
            description="We extract actionable insights from your data using advanced analytics, ML models, and custom dashboards."
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:2/1/3/5]"
            number="04"
            title={
              <>
                Database
                <br />
                Solutions
              </>
            }
            description="Designing and optimizing reliable, high-performance databases tailored for speed, scale, and security."
          />

          <GridItem
            area="md:[grid-area:3/1/4/7] xl:[grid-area:2/5/3/9]"
            number="05"
            title={
              <>
                Cloud
                <br />
                Solutions
              </>
            }
            description="From cloud-native apps to infrastructure automation, we help you scale fast and securely in the cloud."
          />

          <GridItem
            area="md:[grid-area:3/7/4/13] xl:[grid-area:2/9/3/13]"
            number="06"
            title={
              <>
                Mobile
                <br />
                Applications
              </>
            }
            description="From MVPs to full-scale platforms, we build mobile apps that are intuitive, powerful, and ready for millions."
          />
        </ul>
      </div>
    </section>
  );
}
