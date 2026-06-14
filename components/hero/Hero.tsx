"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";
import { homeContent } from "@/content/home";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import ParticleField from "@/components/motion/ParticleField";
import TypewriterText from "@/components/motion/TypewriterText";
import { EASE } from "@/lib/motion";

export default function Hero() {
  const reducedMotion = useHydratedReducedMotion();
  const { hero } = homeContent;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <ParticleField />

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 py-20 text-center">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-8 md:mb-10"
        >
          <Image
            src={`/logo.png?v=${site.logoVersion}`}
            alt={site.name}
            width={180}
            height={60}
            className="mx-auto h-12 w-auto md:h-14"
            priority
            unoptimized
          />
        </motion.div>

        <h1 className="font-heading mx-auto min-h-[2.6em] max-w-3xl text-[clamp(1.75rem,4.75vw,3.25rem)] font-semibold leading-[1.2] tracking-tight text-text">
          <TypewriterText text={hero.headline} speed={85} />
        </h1>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mx-auto mt-8 max-w-2xl text-base leading-[1.75] text-text-muted md:text-lg"
        >
          {hero.subtext}
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
          className="mt-10"
        >
          <Button href="/contact">{hero.cta}</Button>
        </motion.div>
      </div>
    </section>
  );
}
