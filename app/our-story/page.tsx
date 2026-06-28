import OurStorySection from "@/components/home/OurStorySection";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata = pageMetadata(
  "Our Story",
  "Three engineers, one vision — how GSIX3 started in Sri Lanka and what drives us to build intelligent, connected systems.",
  {
    path: "/our-story",
    keywords: [
      "GSIX3 story",
      "engineering company Sri Lanka",
      "software engineering team",
    ],
  },
);

export default function OurStoryPage() {
  return (
    <div className="pt-20">
      <OurStorySection />
    </div>
  );
}
