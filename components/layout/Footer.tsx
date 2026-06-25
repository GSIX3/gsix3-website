"use client";

import Link from "next/link";
import { site } from "@/content/site";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQs", href: "#" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "/contact" },
];

const policies = [
  { label: "Cookies Policy", href: "#" },
  { label: "Legal Terms", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socials = [
  {
    label: "X",
    href: "#",
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.16 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <path d="M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2C0 8.07 0 12 0 12s0 3.93.5 5.8a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14c.5-1.87.5-5.8.5-5.8s0-3.93-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
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

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* Brand + links | Let's talk */}
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <p className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              {site.name}
              <span className="text-teal-300">.</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-white/60">{site.tagline}</p>

            <nav className="mt-10 grid max-w-md grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:pl-10 md:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
              Got a project in mind?
            </p>
            <Link
              href="/contact"
              className="mt-3 inline-block font-heading text-5xl font-medium leading-none tracking-tight transition-colors hover:text-teal-300 md:text-6xl"
            >
              Let&apos;s talk
            </Link>
          </div>
        </div>

        {/* Dashed divider */}
        <div className="mt-14 border-t border-dashed border-white/30" />

        {/* Policies + socials */}
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/65">
            {policies.map((policy) => (
              <Link
                key={policy.label}
                href={policy.href}
                className="transition-colors hover:text-white"
              >
                {policy.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white hover:bg-white/10 hover:text-white"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  {social.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Back to top + copyright */}
        <div className="mt-12 flex items-center justify-between">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>

          <p className="text-xs text-white/55">
            © {year} {site.name} · Est. {site.established}
          </p>
        </div>
      </div>
    </footer>
  );
}
