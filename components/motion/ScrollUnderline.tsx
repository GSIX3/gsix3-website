"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";

type ScrollUnderlineProps = {
  className?: string;
};

const BAR =
  "h-1 w-full origin-left rounded-full bg-gradient-to-r from-accent to-accent-bright";

// An accent underline that draws itself from left to right as the section
// scrolls into view — its width is linked directly to scroll position, so it
// visibly moves while you scroll. Falls back to a static bar for reduced motion.
export default function ScrollUnderline({ className = "" }: ScrollUnderlineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useHydratedReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.45"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (reducedMotion) {
    return (
      <div className={className}>
        <div className={BAR} />
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ scaleX }} className={BAR} />
    </div>
  );
}
