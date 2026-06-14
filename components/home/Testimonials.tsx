import Image from "next/image";
import { homeContent } from "@/content/home";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function Testimonials() {
  const { testimonials } = homeContent;

  return (
    <section className="border-y border-border bg-bg-elevated/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="font-heading mb-16 text-center text-3xl font-medium tracking-tight text-text md:text-4xl">
            {testimonials.title}
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.items.map((item, index) => (
            <ScrollReveal key={item.id} delay={index * 0.1}>
              <blockquote className="rounded-2xl border border-border bg-bg p-8 md:p-10">
                <p className="text-lg leading-relaxed text-text-muted">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-bg-elevated">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                  <div>
                    <p className="font-heading font-medium text-text">{item.name}</p>
                    <p className="mt-1 text-sm text-text-muted">
                      {item.role}
                      {item.company ? ` · ${item.company}` : ""}
                    </p>
                  </div>
                </footer>
              </blockquote>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
