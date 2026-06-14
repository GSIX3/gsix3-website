import Image from "next/image";
import { homeContent } from "@/content/home";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function WhoWeWorkWith() {
  const { partners } = homeContent;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="font-heading mb-12 text-center text-3xl font-medium tracking-tight text-text md:text-4xl">
            {partners.title}
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {partners.items.map((partner) => (
              <div
                key={partner.name}
                className="flex h-20 min-w-[180px] items-center justify-center rounded-xl border border-border bg-bg-elevated/40 px-10 md:h-24 md:min-w-[220px] md:px-12"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={160}
                  height={48}
                  className="h-8 w-auto max-w-[140px] object-contain md:h-9 md:max-w-[160px]"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
