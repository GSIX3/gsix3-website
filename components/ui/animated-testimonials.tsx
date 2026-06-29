"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

type ProductShowcaseItem = {
  title: string;
  description: string;
  src: string;
  customers: string[];
};

type AnimatedTestimonialsProps = {
  testimonials: ProductShowcaseItem[];
};

export function AnimatedTestimonials({
  testimonials,
}: AnimatedTestimonialsProps) {
  const [active, setActive] = useState(0);
  const product = testimonials[active];

  const next = () => {
    setActive((current) => (current + 1) % testimonials.length);
  };

  const previous = () => {
    setActive(
      (current) => (current - 1 + testimonials.length) % testimonials.length,
    );
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActive((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="portfolio" className="relative overflow-hidden bg-slate-950 py-16 sm:py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 z-0">
        <ShootingStars
          starColor="#7dd3fc"
          trailColor="#38bdf8"
          starWidth={26}
          starHeight={3}
          minSpeed={14}
          maxSpeed={34}
          minDelay={500}
          maxDelay={1800}
          className="[filter:drop-shadow(0_0_6px_rgba(56,189,248,0.9))]"
        />
        <StarsBackground />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
        <h2 className="mx-auto max-w-3xl font-heading text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Products Built For Real Customers
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
          Explore the platforms, AI systems, and operational tools we build for
          teams that need reliable products in production.
        </p>
      </div>

      <div className="relative z-10 mx-auto mt-14 grid max-w-6xl items-center gap-12 px-6 sm:mt-16 sm:gap-14 md:grid-cols-[1.05fr_0.95fr] md:gap-16 lg:gap-24">
        <div className="relative mx-auto aspect-[6/5] w-full max-w-[22rem] sm:max-w-lg md:max-w-xl">
          <AnimatePresence mode="wait">
            <motion.img
              key={product.src}
              src={product.src}
              alt={product.title}
              initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.96, rotate: 3 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="h-full w-full rounded-3xl object-cover shadow-2xl shadow-sky-950/40 ring-1 ring-white/10"
            />
          </AnimatePresence>
        </div>

        <div className="mx-auto max-w-xl text-center md:mx-0 md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={product.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-300">
                  Featured product
                </p>
                <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  {product.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-slate-300 md:text-lg">
                  {product.description}
                </p>
              </div>

              <div className="mt-8">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-400">
                  Purchased by
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
                  {product.customers.map((customer) => (
                    <span
                      key={customer}
                      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur-md"
                    >
                      {customer}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex justify-center gap-3 md:justify-start">
            <button
              type="button"
              onClick={previous}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-sm backdrop-blur-md transition hover:border-sky-300/40 hover:bg-white/15"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-sm backdrop-blur-md transition hover:border-sky-300/40 hover:bg-white/15"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
