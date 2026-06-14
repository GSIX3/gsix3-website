import dynamic from "next/dynamic";
import ContactCTA from "@/components/home/ContactCTA";
import Testimonials from "@/components/home/Testimonials";
import WhoWeWorkWith from "@/components/home/WhoWeWorkWith";

const Hero = dynamic(() => import("@/components/hero/Hero"), {
  loading: () => <div className="min-h-screen" />,
});

const LatestProject = dynamic(() => import("@/components/home/LatestProject"), {
  loading: () => <div className="min-h-[400px]" />,
});

const ServiceShowcase = dynamic(
  () => import("@/components/services/ServiceShowcase"),
  { loading: () => <div className="min-h-[400px]" /> },
);

export default function HomePage() {
  return (
    <>
      <Hero />
      <LatestProject />
      <ServiceShowcase />
      <Testimonials />
      <WhoWeWorkWith />
      <ContactCTA compact />
    </>
  );
}
