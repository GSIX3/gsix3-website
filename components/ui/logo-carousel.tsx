"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

export type Logo = {
  name: string;
  mark: ReactNode;
};

const defaultLogos: Logo[] = [
  {
    name: "AI",
    mark: (
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#d7a17f] text-3xl font-black text-slate-950 md:h-20 md:w-20 md:text-4xl">
        AI
      </span>
    ),
  },
  {
    name: "OpenAI",
    mark: (
      <svg viewBox="0 0 64 64" className="h-16 w-16 md:h-20 md:w-20">
        <path
          d="M31.9 5.8c5.5 0 10.3 3.1 12.7 7.6 5.3.5 10 4.2 11.8 9.4 1.7 5.2.2 10.8-3.6 14.5.9 5.3-1.4 10.8-5.9 14-4.4 3.2-10.3 3.5-14.9.9-4.7 2.6-10.6 2.3-15-.9-4.4-3.2-6.7-8.7-5.8-14-3.9-3.7-5.4-9.3-3.6-14.5 1.7-5.2 6.4-8.9 11.8-9.4 2.3-4.5 7.1-7.6 12.5-7.6Zm0 8.7-9.3 5.4v10.7l9.3 5.4 9.3-5.4V19.9l-9.3-5.4Zm0 7.3 3 1.7v3.5l-3 1.8-3-1.8v-3.5l3-1.7Z"
          fill="#10d6a3"
        />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    mark: (
      <span className="flex h-16 w-16 items-center justify-center rounded-md bg-[#3178c6] text-3xl font-black text-white md:h-20 md:w-20 md:text-4xl">
        TS
      </span>
    ),
  },
  {
    name: "Supabase",
    mark: (
      <svg viewBox="0 0 64 64" className="h-16 w-16 md:h-20 md:w-20">
        <path d="M35 4 12 34h20l-3 26 23-32H33L35 4Z" fill="#3ecf8e" />
      </svg>
    ),
  },
  {
    name: "Vercel",
    mark: (
      <svg viewBox="0 0 64 64" className="h-16 w-16 md:h-20 md:w-20">
        <path d="M32 10 58 54H6L32 10Z" fill="#0a0a0a" />
      </svg>
    ),
  },
  {
    name: "Ally",
    mark: (
      <span className="font-heading text-5xl font-black tracking-tighter text-[#272126] md:text-6xl">
        ally
      </span>
    ),
  },
  {
    name: "Apple",
    mark: (
      <svg viewBox="0 0 64 64" className="h-16 w-16 md:h-20 md:w-20">
        <path
          d="M43.6 33.6c0-6 4.9-8.9 5.1-9-2.8-4.1-7.2-4.7-8.7-4.8-3.7-.4-7.2 2.2-9.1 2.2s-4.8-2.1-7.9-2c-4 .1-7.7 2.3-9.8 5.9-4.2 7.3-1.1 18.2 3 24.1 2 2.9 4.4 6.2 7.6 6.1 3-.1 4.2-2 7.8-2s4.7 2 7.9 1.9c3.3-.1 5.3-3 7.3-5.9 2.3-3.4 3.3-6.7 3.3-6.9-.1 0-6.5-2.5-6.5-9.6ZM37.6 15.9c1.7-2 2.8-4.8 2.5-7.6-2.4.1-5.3 1.6-7 3.6-1.5 1.8-2.9 4.7-2.5 7.4 2.7.2 5.3-1.4 7-3.4Z"
          fill="#0a0a0a"
        />
      </svg>
    ),
  },
  {
    name: "Stripe",
    mark: (
      <span className="font-heading text-4xl font-black tracking-tight text-[#f5b21a] md:text-5xl">
        stripe
      </span>
    ),
  },
  {
    name: "Tailwind",
    mark: (
      <svg viewBox="0 0 96 64" className="h-16 w-24 md:h-20 md:w-28">
        <path
          d="M48 16c-10.7 0-17.3 5.3-20 16 4-5.3 8.7-7.3 14-6 3 .7 5.2 2.8 7.6 5.1C53.5 34.9 58 39 68 39c10.7 0 17.3-5.3 20-16-4 5.3-8.7 7.3-14 6-3-.7-5.2-2.8-7.6-5.1C62.5 20.1 58 16 48 16ZM28 39c-10.7 0-17.3 5.3-20 16 4-5.3 8.7-7.3 14-6 3 .7 5.2 2.8 7.6 5.1C33.5 57.9 38 62 48 62c10.7 0 17.3-5.3 20-16-4 5.3-8.7 7.3-14 6-3-.7-5.2-2.8-7.6-5.1C42.5 43.1 38 39 28 39Z"
          fill="#38bdf8"
        />
      </svg>
    ),
  },
];

type LogoCarouselProps = {
  columnCount?: number;
  logos?: Logo[];
};

export default function LogoCarousel({
  columnCount = 3,
  logos = defaultLogos,
}: LogoCarouselProps) {
  const [logoIndexes, setLogoIndexes] = useState(() =>
    Array.from({ length: columnCount }, (_, index) => index % logos.length),
  );
  const visibleLogos = logoIndexes
    .map((logoIndex) => logos[logoIndex])
    .filter((logo): logo is Logo => Boolean(logo));

  useEffect(() => {
    setLogoIndexes(
      Array.from({ length: columnCount }, (_, index) => index % logos.length),
    );
  }, [columnCount, logos]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setLogoIndexes((currentIndexes) => {
        const changeCount = Math.floor(Math.random() * columnCount) + 1;
        const columnsToUpdate = new Set(
          Array.from({ length: columnCount }, (_, index) => index)
            .sort(() => Math.random() - 0.5)
            .slice(0, changeCount),
        );
        const nextIndexes = [...currentIndexes];

        columnsToUpdate.forEach((columnIndex) => {
          const usedIndexes = new Set(nextIndexes);
          const availableIndexes = logos
            .map((_, index) => index)
            .filter((index) => !usedIndexes.has(index));

          nextIndexes[columnIndex] =
            availableIndexes[
              Math.floor(Math.random() * availableIndexes.length)
            ] ?? (currentIndexes[columnIndex] + 1) % logos.length;
        });

        return nextIndexes;
      });
    }, 1800);

    return () => window.clearInterval(interval);
  }, [columnCount, logos]);

  return (
    <div className="grid w-full max-w-[20rem] grid-cols-3 items-center gap-5 sm:max-w-3xl sm:gap-10 md:gap-16">
      {visibleLogos.map((logo, index) => (
        <div
          className="flex h-20 min-w-0 items-center justify-center overflow-visible sm:h-24 md:h-28"
          key={index}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(8px)" }}
              transition={{ duration: 0.42, ease: "easeOut" }}
              className="flex max-w-full items-center justify-center"
              aria-label={logo.name}
              role="img"
            >
              {logo.mark}
            </motion.div>
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
