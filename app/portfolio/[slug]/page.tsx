import Image from "next/image";
import { notFound } from "next/navigation";
import Button from "@/components/ui/Button";
import {
  getPortfolioProject,
  portfolioProjects,
} from "@/content/portfolio";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);
  if (!project) return {};

  return pageMetadata(project.title, project.excerpt, {
    path: `/portfolio/${slug}`,
    keywords: project.tags,
    ogImage: project.coverImage,
    ogImageAlt: `${project.client} — ${project.title}`,
  });
}

export default async function PortfolioCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getPortfolioProject(slug);

  if (!project) notFound();

  return (
    <article className="pt-20">
      <div className="relative aspect-[21/9] w-full overflow-hidden bg-bg-elevated md:aspect-[2.4/1]">
        <Image
          src={project.coverImage}
          alt={project.client}
          fill
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
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
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
            {project.client}
          </p>
        )}
        <h1 className="font-heading mt-4 text-3xl font-medium leading-tight text-text md:text-4xl lg:text-5xl">
          {project.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-text-muted">
          {project.excerpt}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border px-3 py-1 text-xs text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        <section className="mt-16 border-t border-border pt-16">
          <h2 className="font-heading text-2xl font-medium text-text md:text-3xl">
            About
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">
            {project.about}
          </p>
        </section>

        <section className="mt-16 border-t border-border pt-16">
          <h2 className="font-heading text-2xl font-medium text-text md:text-3xl">
            Objectives
          </h2>
          <ul className="mt-6 space-y-4">
            {project.objectives.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-base leading-relaxed text-text-muted md:text-lg"
              >
                <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 border-t border-border pt-16">
          <h2 className="font-heading text-2xl font-medium text-text md:text-3xl">
            Solution
          </h2>
          <p className="mt-6 text-base leading-relaxed text-text-muted md:text-lg">
            {project.solution}
          </p>
        </section>

        <div className="relative mt-16 overflow-hidden rounded-2xl border border-border bg-bg-elevated">
          <div className="relative aspect-[16/10]">
            <Image
              src={project.coverImage}
              alt={`${project.client} platform`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-4 border-t border-border pt-16">
          <Button href="/portfolio" variant="secondary">
            Back to portfolio
          </Button>
          <Button href="/contact">Start a project</Button>
        </div>
      </div>
    </article>
  );
}
