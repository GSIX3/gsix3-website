import Link from "next/link";
import { workItems } from "@/content/work";
import ScrollReveal from "@/components/motion/ScrollReveal";
import Button from "@/components/ui/Button";

export default function FeaturedWork() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Work
            </p>
            <h2 className="font-heading text-3xl font-medium tracking-tight text-text md:text-5xl">
              Selected projects
            </h2>
          </div>
          <Button href="/work" variant="secondary">
            View all work
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {workItems.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.08}>
              <Link
                href="/work"
                className="group block rounded-2xl border border-border bg-bg-elevated/40 p-6 transition-colors hover:border-accent/30"
              >
                <p className="text-xs uppercase tracking-[0.15em] text-accent">
                  {item.category}
                </p>
                <h3 className="font-heading mt-3 text-xl font-medium text-text group-hover:text-accent-bright">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {item.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
