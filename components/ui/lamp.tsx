"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

/**
 * Lamp spotlight effect, adapted from Aceternity UI (https://ui.aceternity.com).
 * Rebuilt for Tailwind v4 with explicit conic-gradients (no bg-gradient-conic
 * utility) and no `cn` helper.
 *
 * Layout: an optional static `topSlot` (e.g. the logo) sits at the top, the
 * animated beam is directly beneath it, and `children` (the text) sit under the
 * beam. The beam grows and the content reveals in place — positions stay fixed.
 */
export function LampContainer({
  children,
  topSlot,
  beamLabel,
  background,
  className = "",
  topSlotClassName = "relative z-50 flex justify-center pt-10 pb-16 sm:pt-20 sm:pb-32 md:pt-28 md:pb-44",
  beamClassName = "relative isolate z-0 flex w-full flex-1 translate-y-6 items-center justify-center scale-x-[0.58] scale-y-[0.78] sm:translate-y-4 sm:scale-x-90 sm:scale-y-[1.125] md:scale-x-100 md:scale-y-125 2xl:scale-x-110 2xl:scale-y-[1.375]",
  contentClassName = "relative z-50 mx-auto flex w-full max-w-[24rem] -translate-y-44 flex-col items-center px-4 text-center sm:max-w-6xl sm:-translate-y-12 sm:px-6 md:-translate-y-20 lg:-translate-y-28 xl:-translate-y-44 2xl:-translate-y-52",
}: {
  children: ReactNode;
  topSlot?: ReactNode;
  beamLabel?: ReactNode;
  background?: ReactNode;
  className?: string;
  topSlotClassName?: string;
  beamClassName?: string;
  contentClassName?: string;
}) {
  return (
    <div
      className={`relative z-0 flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-white sm:min-h-screen ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[110] h-1.5 bg-purple-600" />
      <motion.div
        initial={{ width: "8rem" }}
        animate={{ width: "100vw" }}
        transition={{ delay: 0.2, duration: 1.6, ease: "easeInOut" }}
        className="pointer-events-none absolute bottom-0 left-1/2 z-[120] h-1.5 -translate-x-1/2 bg-purple-500 shadow-[0_0_24px_rgba(168,85,247,0.7)]"
      />

      {/* Background layer (e.g. stars), behind the beam and content */}
      {background ? (
        <div className="pointer-events-none absolute inset-0 z-0">
          {background}
        </div>
      ) : null}

      {/* Static logo slot, anchored above the beam */}
      {topSlot ? (
        <div className={topSlotClassName}>
          {topSlot}
        </div>
      ) : null}

      {/* Animated beam, directly under the logo */}
      <div className={beamClassName}>
        {/* Right-hand conic beam */}
        <motion.div
          initial={{ opacity: 0, width: "4rem" }}
          animate={{ opacity: 0, width: "4rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 110deg at center bottom, #a855f7, transparent, transparent)",
          }}
          className="absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible text-white"
        >
          <div className="absolute top-0 left-0 z-20 h-40 w-full bg-white [mask-image:linear-gradient(to_bottom,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-white [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Left-hand conic beam */}
        <motion.div
          initial={{ opacity: 0, width: "4rem" }}
          animate={{ opacity: 0, width: "4rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(from 250deg at center bottom, transparent, transparent, #a855f7)",
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] text-white"
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-white [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute top-0 right-0 z-20 h-40 w-full bg-white [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        </motion.div>

        {/* Glows and beam line */}
        <div className="absolute top-1/2 h-48 w-full -translate-y-12 scale-x-150 bg-white blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <motion.div
          initial={{ width: "8rem" }}
          animate={{ width: "100vw" }}
          transition={{ delay: 0.55, duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-auto z-50 h-36 w-screen translate-y-1/2 rounded-full bg-purple-500 opacity-40 blur-3xl"
        />
        <motion.div
          initial={{ width: "8rem" }}
          animate={{ width: "100vw" }}
          transition={{ delay: 0.55, duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-auto z-30 h-36 w-screen translate-y-[6rem] rounded-full bg-purple-400/70 blur-2xl"
        />

        {/* Caption, sitting directly on top of the beam line */}
        {beamLabel ? (
          <div className="absolute inset-auto z-50 -translate-y-[7.75rem] scale-y-[0.8] whitespace-nowrap">
            {beamLabel}
          </div>
        ) : null}

        {/* Mask that hides the top half so the beam reads as a lamp */}
        <div className="absolute inset-auto z-40 h-44 w-full translate-y-[12.5rem] bg-white" />
      </div>

      {/* Text content, under the beam */}
      <div className={contentClassName}>
        {children}
      </div>
    </div>
  );
}