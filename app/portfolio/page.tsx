import PortfolioCard from "@/components/portfolio/PortfolioCard";
import { portfolioProjects } from "@/content/portfolio";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata = pageMetadata(
  "Portfolio",
  "Case studies and client projects — web applications, data platforms, and engineering solutions by GSIX3.",
  {
    path: "/portfolio",
    keywords: ["GSIX3 portfolio", "case studies", "client projects", "engineering work"],
  },
);

export default function PortfolioPage() {
  return (
    <div className="pb-24 pt-[var(--page-top)]">
      <div className="mx-auto max-w-6xl px-6">
        {portfolioProjects.map((project, index) => (
          <PortfolioCard
            key={project.slug}
            project={project}
            isLast={index === portfolioProjects.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
