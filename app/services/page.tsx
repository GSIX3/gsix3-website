import ServiceCard from "@/components/services/ServiceCard";
import Section from "@/components/ui/Section";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata = pageMetadata(
  "Services",
  "Web applications, AI, data science, database, cloud, and mobile development — GSIX3 engineering services.",
);

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <Section
        eyebrow="Services"
        title="Engineering services built for scale"
        description="From web and mobile apps to AI, data science, databases, and cloud — we cover the full technology stack."
      />
      <div className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-8 lg:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
