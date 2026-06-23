import ScrollReveal from "@/components/motion/ScrollReveal";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";

const reasons = [
  {
    title: "Senior engineers only",
    description:
      "Every line is shipped by experienced engineers — no juniors learning on your budget, no hand-offs to offshore teams.",
  },
  {
    title: "Production-grade by default",
    description:
      "We architect for reliability, security, and scale from day one — not as an afterthought once things break.",
  },
  {
    title: "AI-native systems",
    description:
      "From RAG pipelines to agentic workflows, we build intelligent systems that actually make it to production.",
  },
  {
    title: "A real partnership",
    description:
      "We embed with your team, move at startup speed, and own outcomes — not just close tickets.",
  },
];

export default function WhyGsix3() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 md:py-32">
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

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <ScrollReveal className="flex flex-col items-center text-center">
          {/* <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Why GSIX3
          </p> */}

          <h2 className="font-heading text-3xl font-medium leading-tight tracking-tight text-white md:text-5xl">
            <LayoutTextFlip
              text="WHY GSIX3"
              words={[
                "enterprise-grade",
                "AI-native",
                "production-ready",
                "built to scale",
              ]}
              textClassName="text-3xl text-white md:text-5xl"
              wordClassName="text-2xl md:text-4xl"
            />
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            We&apos;re a focused engineering team that enterprises and
            growth-stage startups trust to build the systems their business
            runs on. Here&apos;s what sets us apart.
          </p>
        </ScrollReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.title} delay={index * 0.08}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-accent/40 md:p-7">
                <span className="font-heading text-sm font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-heading mt-4 text-lg font-medium tracking-tight text-white">
                  {reason.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-300">
                  {reason.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
