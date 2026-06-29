"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { cn, handleSectionNavClick } from "@/lib/utils";

const footerLinks = [
  { label: "Services", href: "/#services" },
  { label: "Websites", href: "/pricing" },
  { label: "Products", href: "/#portfolio" },
  { label: "About", href: "/#about" },
];

const policies = [
  { label: "Cookies Policy", href: "#" },
  { label: "Legal Terms", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1Fo6j5tSxR/?mibextid=wwXIfr",
    hoverColor: "group-hover:text-blue-700",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/gsix3/",
    hoverColor: "group-hover:text-blue-600",
    icon: (
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/gsix.3?igsh=bWNoOGRpdmRsMGly",
    hoverColor: "group-hover:text-pink-500",
    icon: (
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32Zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z" />
    ),
  },
  {
    label: "TikTok",
    href: "https://vt.tiktok.com/ZSCyLupd9/",
    hoverColor: "group-hover:text-[#fe2c55]",
    icon: (
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    ),
  },
];

export default function Footer() {
  const pathname = usePathname();
  const isLight = pathname === "/pricing";
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      className={cn(
        "relative",
        isLight ? "bg-white text-text" : "bg-slate-950 text-white",
      )}
    >
      {!isLight && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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
      )}

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-20">
        {/* Brand + links | Let's talk */}
        <div className="flex flex-col gap-14 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <p className="font-heading text-4xl font-bold tracking-tight md:text-5xl">
              {site.name}
              <span className={isLight ? "text-accent" : "text-teal-300"}>
                .
              </span>
            </p>
            <p
              className={cn(
                "mt-3 max-w-xs text-sm",
                isLight ? "text-text-muted" : "text-white/60",
              )}
            >
              {site.tagline}
            </p>

            <nav className="mt-10 grid max-w-md grid-cols-2 gap-x-10 gap-y-3 text-sm sm:grid-cols-3">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(event) =>
                    handleSectionNavClick(event, link.href, pathname)
                  }
                  className={cn(
                    "transition-colors",
                    isLight
                      ? "text-text-muted hover:text-accent"
                      : "text-white/75 hover:text-white",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:pl-10 md:text-right">
            <p
              className={cn(
                "text-[11px] font-semibold uppercase tracking-[0.22em]",
                isLight ? "text-text-muted" : "text-white/55",
              )}
            >
              Got a project in mind?
            </p>
            <Link
              href="/contact"
              className={cn(
                "mt-3 inline-block font-heading text-5xl font-medium leading-none tracking-tight transition-colors md:text-6xl",
                isLight
                  ? "text-accent hover:text-accent-bright"
                  : "hover:text-teal-300",
              )}
            >
              Let&apos;s talk
            </Link>
            <div className="mt-6 flex flex-col items-start gap-3 text-left text-sm md:ml-auto">
              <a
                href={`mailto:${site.email}`}
                className={cn(
                  "inline-flex items-center gap-2.5 transition-colors",
                  isLight ? "text-text-muted hover:text-accent" : "text-white/65 hover:text-white",
                )}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <path d="m22 6-10 7L2 6" />
                  </svg>
                </span>
                {site.email}
              </a>
              <div
                className={cn(
                  "inline-flex items-center gap-2.5",
                  isLight ? "text-text-muted" : "text-white/65",
                )}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div className="inline-flex items-center gap-3">
                  {site.phones.map((phone, index) => (
                    <span key={phone} className="inline-flex items-center gap-3">
                      {index > 0 ? (
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-3.5 w-px shrink-0",
                            isLight ? "bg-border" : "bg-white/30",
                          )}
                        />
                      ) : null}
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className={cn(
                          "whitespace-nowrap transition-colors",
                          isLight ? "hover:text-accent" : "hover:text-white",
                        )}
                      >
                        {phone}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashed divider */}
        <div
          className={cn(
            "mt-14 border-t border-dashed",
            isLight ? "border-border" : "border-white/30",
          )}
        />

        {/* Policies + socials */}
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div
            className={cn(
              "flex flex-wrap gap-x-6 gap-y-2 text-xs",
              isLight ? "text-text-muted" : "text-white/65",
            )}
          >
            {policies.map((policy) => (
              <Link
                key={policy.label}
                href={policy.href}
                className={cn(
                  "transition-colors",
                  isLight ? "hover:text-accent" : "hover:text-white",
                )}
              >
                {policy.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="group relative mx-1 flex transform cursor-pointer flex-col items-center justify-center transition-transform duration-300 ease-in-out hover:scale-110"
              >
                <div
                  className={cn(
                    "absolute -top-16 z-10 hidden whitespace-nowrap rounded-2xl px-4 py-2 text-sm font-medium shadow-lg transition-all duration-300 ease-out group-hover:block",
                    isLight
                      ? "bg-white text-black"
                      : "bg-black text-white",
                  )}
                >
                  {social.label}
                  <span
                    className={cn(
                      "absolute bottom-[-6px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45",
                      isLight ? "bg-white" : "bg-black",
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full shadow-xl transition-all duration-300 ease-out md:h-14 md:w-14",
                    isLight ? "bg-white text-black" : "bg-black text-white",
                  )}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className={cn(
                      "h-6 w-6 transition-colors duration-300 md:h-7 md:w-7",
                      isLight ? "text-black" : "text-white",
                      social.hoverColor,
                    )}
                  >
                    {social.icon}
                  </svg>
                </span>
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
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full transition-colors",
              isLight
                ? "border border-border bg-bg-elevated text-text hover:border-accent hover:text-accent"
                : "bg-white/10 text-white hover:bg-white/20",
            )}
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

          <p
            className={cn(
              "text-xs",
              isLight ? "text-text-muted" : "text-white/55",
            )}
          >
            © {year} {site.name} · Est. {site.established}
          </p>
        </div>
      </div>
    </footer>
  );
}
