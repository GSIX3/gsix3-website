"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Wraps inline text with a light-neon-purple underline that draws itself from
 * left to right whenever it scrolls into view — and replays every time
 * (scrolling down to it or back up), because the viewport trigger is not
 * `once`.
 *
 * The underline is a real `text-decoration` on an invisible copy of the word,
 * so it neatly skips letter descenders (e.g. the "g"). We reveal it with an
 * animated clip-path rather than scaling a solid bar, keeping that ink-skip.
 *
 * Pass the text's own gradient/colour classes via `className` so the visible
 * word still renders correctly inside a `background-clip: text` heading.
 */
export function AnimatedUnderline({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className="relative inline-block">
      {/* Visible word (keeps its gradient / colour) */}
      <span className={className}>{children}</span>

      {/* Invisible copy carrying only the neon underline, drawn L→R */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 text-transparent underline decoration-[#c77dff] decoration-[0.07em] underline-offset-[0.18em]"
        style={{ textDecorationSkipInk: "auto", transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {children}
      </motion.span>
    </span>
  );
}
