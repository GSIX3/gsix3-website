"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

export default function Navbar() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          open
            ? "border-transparent bg-transparent"
            : scrolled || !isHome
              ? "border-b border-border bg-bg/90 backdrop-blur-xl"
              : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex min-h-[var(--nav-height)] max-w-6xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className="relative z-[60] flex shrink-0 items-center"
            onClick={() => setOpen(false)}
          >
            <Image
              src={`/logo.png?v=${site.logoVersion}`}
              alt={site.name}
              width={120}
              height={40}
              className="h-9 w-auto md:h-10"
              priority
              unoptimized
            />
          </Link>

          <nav className="hidden items-center gap-10 md:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] transition-colors ${
                  isActive(item.href)
                    ? "font-medium text-text underline decoration-text underline-offset-10"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button href="/contact" variant="primary" className="px-5 py-2 text-sm">
              Talk to us
            </Button>
          </nav>

          <button
            type="button"
            className={`relative z-[60] flex h-11 w-11 items-center justify-center rounded-full border transition-colors md:hidden ${
              open
                ? "border-border bg-bg text-text"
                : "border-border bg-bg/80 text-text backdrop-blur-sm"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] block h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] block h-0.5 w-5 bg-current transition-all duration-300 ${
                  open ? "top-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-bg md:hidden"
          >
            <div className="h-[var(--nav-height)] shrink-0" aria-hidden="true" />

            <nav className="flex flex-1 flex-col px-6 pb-8 pt-4">
              <div className="flex flex-1 flex-col justify-center gap-1">
                {site.nav.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: 8 }}
                    transition={{
                      duration: 0.35,
                      delay: reducedMotion ? 0 : index * 0.06,
                      ease: EASE,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`group flex items-center justify-between border-b border-border/70 py-5 transition-colors ${
                        isActive(item.href) ? "text-accent" : "text-text"
                      }`}
                    >
                      <span className="font-heading text-[clamp(1.75rem,7vw,2.25rem)] font-medium leading-none tracking-tight">
                        {item.label}
                      </span>
                      <span
                        className={`text-xl transition-transform duration-300 group-hover:translate-x-1 ${
                          isActive(item.href) ? "text-accent" : "text-text-muted"
                        }`}
                        aria-hidden="true"
                      >
                        →
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35, delay: reducedMotion ? 0 : 0.28, ease: EASE }}
                className="mt-8 space-y-5 border-t border-border pt-8"
              >
                <Button
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="w-full py-3.5 text-base"
                >
                  Talk to us
                </Button>
                <a
                  href={`mailto:${site.email}`}
                  className="block text-center text-sm text-text-muted transition-colors hover:text-accent"
                >
                  {site.email}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
