"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * Animated text that flips through a list of words, adapted from Aceternity UI
 * (https://ui.aceternity.com). Rebuilt for this repo: `motion/react`, no `cn`
 * helper, and a light-theme accent pill by default.
 */
export function LayoutTextFlip({
  text,
  words,
  duration = 2800,
  className = "",
  textClassName = "",
  wordClassName = "",
}: {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
  textClassName?: string;
  wordClassName?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span className={`inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 ${className}`}>
      <motion.span
        layoutId="layout-text-flip-static"
        className={`font-heading font-semibold tracking-tight text-text ${textClassName}`}
      >
        {text}
      </motion.span>

      <motion.span
        layout
        className={`relative inline-flex overflow-hidden rounded-2xl bg-gradient-to-br from-accent to-accent-bright px-3 py-1 font-heading font-semibold tracking-tight text-white shadow-sm ring-1 ring-accent/20 ${wordClassName}`}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={index}
            initial={{ y: -42, filter: "blur(10px)", opacity: 0 }}
            animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
            exit={{ y: 42, filter: "blur(10px)", opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="inline-block whitespace-nowrap"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}
