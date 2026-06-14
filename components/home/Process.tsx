import { processSteps } from "@/content/work";
import ScrollReveal from "@/components/motion/ScrollReveal";

export default function Process() {
  return (
    <section className="border-y border-border bg-bg-elevated/30 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 max-w-3xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
            Process
          </p>
          <h2 className="font-heading text-3xl font-medium tracking-tight text-text md:text-5xl">
            How we work
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <ScrollReveal key={step.step} delay={index * 0.08}>
              <div className="relative">
                <p className="font-heading text-4xl font-medium text-accent/40">
                  {step.step}
                </p>
                <h3 className="font-heading mt-4 text-xl font-medium text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
