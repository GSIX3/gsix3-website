"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import ScrollReveal from "@/components/motion/ScrollReveal";
import { Marquee } from "@/components/ui/3d-testimonials";
import { homeContent } from "@/content/home";

type ReviewItem = (typeof homeContent.testimonials.reviews)[number];

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="size-3.5 fill-amber-400 text-amber-400 sm:size-4"
          aria-hidden
        />
      ))}
    </div>
  );
}

function ReviewCard({ company, quote, logo }: ReviewItem) {
  return (
    <article className="flex w-[16rem] shrink-0 flex-col rounded-xl border border-border bg-white p-4 shadow-sm sm:w-[19rem] sm:p-5 md:w-[22rem]">
      <h3 className="text-sm font-semibold leading-snug text-text sm:text-[0.9375rem]">
        {company}
      </h3>
      <blockquote className="mt-2.5 flex-1 text-[0.8125rem] leading-relaxed text-text/90 sm:mt-3 sm:text-sm">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-4 flex items-end justify-between gap-3">
        <StarRating />
        <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-border bg-bg-elevated sm:size-11">
          <Image
            src={logo}
            alt={`${company} logo`}
            fill
            className="object-contain p-1"
            sizes="44px"
          />
        </div>
      </div>
    </article>
  );
}

function ReviewMarquee({
  reviews,
  reverse = false,
}: {
  reviews: readonly ReviewItem[];
  reverse?: boolean;
}) {
  return (
    <Marquee
      vertical
      reverse={reverse}
      repeat={2}
      className="h-full [--duration:45s] [--gap:1.25rem]"
      ariaLabel="Customer reviews"
    >
      {reviews.map((review) => (
        <ReviewCard key={review.id} {...review} />
      ))}
    </Marquee>
  );
}

const reviewColumns = [
  { key: "col-1", start: 0, end: 4, reverse: false },
  { key: "col-2", start: 4, end: 8, reverse: true },
] as const;

export default function Testimonials() {
  const { testimonials } = homeContent;
  const { reviews } = testimonials;

  return (
    <section className="border-y border-border bg-bg-elevated/30 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <h2 className="font-heading mb-12 text-center text-3xl font-medium tracking-tight text-text md:mb-16 md:text-4xl">
            {testimonials.title}
          </h2>
        </ScrollReveal>

        <div className="relative mx-auto h-[24rem] w-full overflow-hidden sm:h-[28rem] md:h-[32rem]">
          <div className="mx-auto grid h-full w-full max-w-4xl grid-cols-2 items-center justify-items-center gap-x-6 md:gap-x-8">
            {reviewColumns.map((column) => (
              <div key={column.key} className="h-full">
                <ReviewMarquee
                  reviews={reviews.slice(column.start, column.end)}
                  reverse={column.reverse}
                />
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg-elevated/30 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg-elevated/30 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg-elevated/30 to-transparent sm:w-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg-elevated/30 to-transparent sm:w-20" />
        </div>
      </div>
    </section>
  );
}
