import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { type PortfolioProject } from "@/content/portfolio";

type LatestProjectIntroProps = {
  project: PortfolioProject;
};

export default function LatestProjectIntro({
  project,
}: LatestProjectIntroProps) {
  return (
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
  );
}
