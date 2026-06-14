import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getLatestPortfolioProject } from "@/content/portfolio";

export default function LatestProject() {
  const project = getLatestPortfolioProject();
  const coverFit = project.coverImageFit ?? "cover";

  return (
    <section className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                Latest project
              </p>
              <h2 className="font-heading text-3xl font-medium tracking-tight text-text md:text-5xl">
                Built for real shop operations
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">
                Our most recent delivery for {project.client} — fingerprint
                attendance, employee management, and KPI tracking in one platform.
              </p>
            </div>
            <Button href={`/portfolio/${project.slug}`} variant="secondary">
              View case study
            </Button>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.08}>
          <Link
            href={`/portfolio/${project.slug}`}
            className="group grid items-center gap-10 overflow-hidden rounded-[1.75rem] border border-border bg-bg-elevated/40 p-6 transition-colors hover:border-accent/30 md:grid-cols-2 md:gap-14 md:p-10"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-950">
              <Image
                src={project.coverImage}
                alt={`${project.client} fingerprint and employee management platform`}
                fill
                className={`${coverFit === "contain" ? "object-contain p-2" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.01]`}
                sizes="(max-width: 768px) 100vw, 520px"
                unoptimized
              />
            </div>

            <div className="flex flex-col justify-center">
              <p className="font-heading text-lg font-bold uppercase tracking-[0.12em] text-text md:text-xl">
                {project.clientLabel}
              </p>

              <h3 className="font-heading mt-5 text-[1.625rem] font-semibold leading-[1.25] tracking-tight text-text md:text-[2rem]">
                {project.title}
              </h3>

              <p className="mt-4 text-[0.9375rem] leading-[1.7] text-text-muted md:text-base">
                {project.excerpt}
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Biometric fingerprint check-in for staff",
                  "Employee profiles, roles, and management",
                  "Automated shop KPI calculations and reporting",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-text-muted md:text-[0.9375rem]"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs text-text-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="mt-8 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-text transition-colors group-hover:text-accent md:text-base">
                Read the full case study
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
