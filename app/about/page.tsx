import AboutStrip from "@/components/home/AboutStrip";
import Process from "@/components/home/Process";
import Section from "@/components/ui/Section";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata = pageMetadata(
  "About",
  `Learn about ${site.name} — a computer engineering company focused on web, AI, data, cloud, and mobile solutions.`,
);

export default function AboutPage() {
  return (
    <div className="pt-20">
      <Section
        eyebrow="About"
        title={`About ${site.name}`}
        description={site.description}
      />
      <AboutStrip />
      <Process />
    </div>
  );
}
