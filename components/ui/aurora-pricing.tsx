"use client";

import Link from "next/link";
import { motion, type Variants } from "motion/react";
import { CheckCircle } from "lucide-react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";
import { cn } from "@/lib/utils";

export type AuroraPricingCardProps = {
  name: string;
  price: string;
  priceSubtext?: string;
  features: string[];
  isFeatured?: boolean;
  href: string;
  ctaLabel?: string;
  index?: number;
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15 + 0.3,
      duration: 0.6,
      ease: "easeInOut",
    },
  }),
};

export function AuroraPricingCard({
  name,
  price,
  priceSubtext = "One-time payment",
  features,
  isFeatured = false,
  href,
  ctaLabel = "Get Started",
  index = 0,
}: AuroraPricingCardProps) {
  const reducedMotion = useHydratedReducedMotion();

  return (
    <motion.article
      custom={index}
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      whileHover={
        reducedMotion
          ? undefined
          : {
              y: -10,
              scale: 1.02,
            }
      }
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 p-8 md:p-10",
        isFeatured
          ? "bg-gray-900/80 shadow-[0_8px_30px_rgba(122,63,145,0.25)]"
          : "bg-gray-950/50 backdrop-blur-sm",
      )}
    >
      <div
        className={cn(
          "aurora-card-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-30",
          isFeatured && "aurora-card-glow-featured",
        )}
        aria-hidden="true"
      />

      {isFeatured && (
        <div className="absolute right-0 top-0 rounded-bl-lg bg-accent px-4 py-1.5 text-xs font-bold text-white">
          Most Popular
        </div>
      )}

      <div className="relative z-10 flex h-full flex-col">
        <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
          {name}
        </h3>

        <div className="mt-6 flex items-baseline">
          <span className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
            {price}
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-400">{priceSubtext}</p>

        <ul className="mt-8 flex-1 space-y-4">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start text-sm leading-relaxed text-slate-300"
            >
              <CheckCircle
                className="mr-3 mt-0.5 h-5 w-5 shrink-0 text-accent-bright"
                aria-hidden="true"
              />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Link
          href={href}
          className={cn(
            "mt-10 inline-flex w-full items-center justify-center rounded-lg py-3 text-sm font-semibold transition-colors",
            isFeatured
              ? "bg-accent text-white hover:bg-accent-bright"
              : "bg-white/10 text-gray-200 hover:bg-white/20",
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </motion.article>
  );
}
