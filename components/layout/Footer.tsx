import Link from "next/link";
import { site } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-elevated">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-heading text-xl font-semibold text-text">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-muted">
            {site.tagline}
          </p>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            Navigation
          </p>
          <ul className="space-y-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-text-muted transition-colors hover:text-text"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-text-muted">
            Contact
          </p>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-text-muted transition-colors hover:text-accent"
          >
            {site.email}
          </a>
          <p className="mt-4 text-xs text-text-muted">
            Est. {site.established}
          </p>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6">
        <p className="mx-auto max-w-6xl text-center text-xs text-text-muted">
          © {year} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
