import LatestProjectCard from "@/components/home/LatestProjectCard";
import LatestProjectIntro from "@/components/home/LatestProjectIntro";
import { getLatestPortfolioProject } from "@/content/portfolio";

export default function LatestProject() {
  const project = getLatestPortfolioProject();

  return (
    <section className="border-b border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <LatestProjectIntro project={project} />
        <LatestProjectCard project={project} />
      </div>
    </section>
  );
}
