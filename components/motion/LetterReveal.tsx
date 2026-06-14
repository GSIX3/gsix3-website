"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE } from "@/lib/motion";

type LetterRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
  delay?: number;
};

export default function LetterReveal({
  text,
  className = "",
  as: Tag = "span",
  delay = 0,
}: LetterRevealProps) {
  const reducedMotion = useReducedMotion();
  const letters = text.split("");

  if (reducedMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={`inline-block ${className}`} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: EASE,
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
          aria-hidden={char !== " "}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Tag>
  );
}
