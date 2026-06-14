import { site } from "@/content/site";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function AboutStrip() {
  return (
    <section className="border-y border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                About
              </p>
              <h2 className="font-heading text-3xl font-medium tracking-tight text-text md:text-4xl">
                {site.tagline}
              </h2>
            </div>
            <p className="text-lg leading-relaxed text-text-muted">
              {site.name} is a computer engineering company focused on shipping
              reliable software and connected systems. We combine clean architecture,
              thoughtful UX, and long-term support — so your product doesn&apos;t just
              launch, it lasts.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
