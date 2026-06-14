import Image from "next/image";
import Link from "next/link";
import type { PortfolioProject } from "@/content/portfolio";

type PortfolioCardProps = {
  project: PortfolioProject;
  isLast?: boolean;
};

export default function PortfolioCard({ project, isLast = false }: PortfolioCardProps) {
  const coverFit = project.coverImageFit ?? "cover";

  return (
    <article
      className={
        isLast
          ? ""
          : "mb-14 border-b border-border pb-14 md:mb-20 md:pb-20"
      }
    >
      <Link
        href={`/portfolio/${project.slug}`}
        className="group grid items-start gap-10 md:grid-cols-2 md:gap-14 lg:gap-20"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-zinc-100">
          <Image
            src={project.coverImage}
            alt={project.client}
            fill
            className={`${coverFit === "contain" ? "object-contain bg-zinc-950 p-2" : "object-cover"} transition-transform duration-700 group-hover:scale-[1.02]`}
            sizes="(max-width: 768px) 100vw, 520px"
            unoptimized
          />
        </div>

        <div className="flex flex-col justify-center md:pr-2">
          {project.clientLogo ? (
            <Image
              src={project.clientLogo}
              alt={project.client}
              width={140}
              height={32}
              className="h-7 w-auto object-contain object-left md:h-8"
              unoptimized
            />
          ) : (
            <p className="font-heading text-lg font-bold uppercase tracking-[0.12em] text-text md:text-xl">
              {project.clientLabel}
            </p>
          )}

          <h2 className="font-heading mt-5 text-[1.625rem] font-semibold leading-[1.25] tracking-tight text-text md:mt-7 md:text-[2rem] lg:text-[2.125rem]">
            {project.title}
          </h2>

          <p className="mt-4 max-w-lg text-[0.9375rem] leading-[1.7] text-text-muted md:mt-5 md:text-base">
            {project.excerpt}
          </p>

          <span className="mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-text transition-colors group-hover:text-accent md:mt-9 md:text-base">
            Read More
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
