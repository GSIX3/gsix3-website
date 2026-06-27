"use client";

import React, { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  ariaLabel?: string;
  ariaLive?: "off" | "polite" | "assertive";
  ariaRole?: string;
}

export function Marquee({
  className,
  reverse = false,
  children,
  vertical = false,
  repeat = 2,
  ariaLabel,
  ariaLive = "off",
  ariaRole = "marquee",
  ...props
}: MarqueeProps) {
  const copyCount = Math.max(2, repeat);

  const trackClassName = cn(
    "flex transform-gpu backface-hidden will-change-transform",
    vertical
      ? reverse
        ? "animate-marquee-vertical-reverse flex-col"
        : "animate-marquee-vertical flex-col"
      : reverse
        ? "animate-marquee-reverse flex-row"
        : "animate-marquee flex-row",
  );

  const copyClassName = cn(
    "flex shrink-0 justify-start",
    vertical
      ? "flex-col [gap:var(--gap)] pb-[var(--gap)]"
      : "flex-row [gap:var(--gap)] pe-[var(--gap)]",
  );

  return (
    <div
      {...props}
      data-slot="marquee"
      className={cn(
        "overflow-hidden [--duration:40s] [--gap:1rem]",
        className,
      )}
      aria-label={ariaLabel}
      aria-live={ariaLive}
      role={ariaRole}
    >
      <div className={trackClassName}>
        {Array.from({ length: copyCount }).map((_, index) => (
          <div
            key={index}
            className={copyClassName}
            aria-hidden={index > 0 ? true : undefined}
          >
            {children}
          </div>
        ))}
      </div>
    </div>
  );
}
