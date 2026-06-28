"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useHydratedReducedMotion } from "@/hooks/useHydratedReducedMotion";
import { site } from "@/content/site";
import Button from "@/components/ui/Button";
import { EASE } from "@/lib/motion";

export default function Navbar() {
  const pathname = usePathname();
  const reducedMotion = useHydratedReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const isHome = pathname === "/";

  useEffect(() => {
    // On the home page the hero is pinned while the logo travels into the
    // header, so keep the bar fully transparent until that handoff is done
    // (~the pin release point); elsewhere react as soon as the user scrolls.
    const onScroll = () => {
      const threshold = isHome ? window.innerHeight * 0.72 : 24;
      setScrolled(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

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
        className={`fixed inset-x-0 top-0 ${open ? "z-[90]" : "z-50"} border-b transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 ease-out ${
          open
            ? "border-transparent bg-transparent"
            : scrolled || !isHome
              ? "border-black/[0.06] bg-white/70 shadow-[0_8px_30px_-16px_rgba(15,15,25,0.25)] backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex min-h-[var(--nav-height)] max-w-6xl items-center justify-between px-6 py-3">
          <Link
            href="/"
            className={`relative z-[60] flex shrink-0 items-center transition-opacity duration-200 ${
              isHome && !open
                ? "pointer-events-none opacity-0"
                : "opacity-100"
            }`}
            onClick={() => setOpen(false)}
            aria-hidden={isHome && !open}
            tabIndex={isHome && !open ? -1 : undefined}
          >
            <Image
              id="site-header-logo-img"
              src={`/logo.png?v=${site.logoVersion}`}
              alt={site.name}
              width={120}
              height={40}
              className="h-9 w-auto md:h-10"
              priority
              unoptimized
            />
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative text-[14px] font-medium tracking-tight transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-text"
                    : "text-text-muted hover:text-text"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-1.5 left-0 h-px w-full origin-left rounded-full bg-accent transition-transform duration-300 ease-out ${
                    isActive(item.href)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </Link>
            ))}
            <Button
              href="/contact"
              variant="primary"
              className="rounded-full px-5 py-2 text-sm shadow-sm transition-transform duration-200 hover:-translate-y-0.5"
            >
              Talk to us
            </Button>
          </nav>

          <button
            type="button"
            className={`relative z-[60] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors md:hidden ${
              open
                ? "border-border bg-bg text-text"
                : "border-border bg-bg/80 text-text backdrop-blur-sm"
            }`}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="relative flex size-5 items-center justify-center">
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "rotate-45" : "-translate-y-[6px]"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "scale-x-0 opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${
                  open ? "-rotate-45" : "translate-y-[6px]"
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
            className="fixed inset-0 z-[80] flex flex-col bg-bg md:hidden"
          >
            <div className="h-[var(--nav-height)] shrink-0" aria-hidden="true" />

            <nav className="flex min-h-0 flex-1 flex-col px-6 pb-8 pt-8">
              <div className="flex flex-col">
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
                className="mt-auto space-y-5 border-t border-border pt-8"
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
