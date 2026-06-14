import type { Service } from "@/content/services";
import ScrollReveal from "@/components/motion/ScrollReveal";

type ServiceCardProps = {
  service: Service;
  index: number;
  compact?: boolean;
};

export default function ServiceCard({
  service,
  index,
  compact = false,
}: ServiceCardProps) {
  return (
    <ScrollReveal delay={index * 0.08}>
      <article className="group rounded-2xl border border-border bg-bg-elevated/50 p-8 transition-colors hover:border-accent/30 md:p-10">
        <p className="font-heading text-4xl font-medium text-accent/50 md:text-5xl">
          {String(index + 1).padStart(2, "0")}
        </p>

        <h3 className="font-heading mt-6 text-2xl font-medium leading-tight text-text md:text-3xl">
          {service.title}
          {service.titleLine2 && (
            <>
              <br />
              {service.titleLine2}
            </>
          )}
          {!service.titleLine2 && !compact && (
            <span className="block text-lg font-normal text-accent-bright md:text-xl">
              {service.headline}
            </span>
          )}
        </h3>

        <p className="mt-6 leading-relaxed text-text-muted">{service.description}</p>

        {!compact && (
          <>
            <ul className="mt-6 space-y-2">
              {service.points.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2 text-sm text-text-muted"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border px-3 py-1 text-xs text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </article>
    </ScrollReveal>
  );
}
