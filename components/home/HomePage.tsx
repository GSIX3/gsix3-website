import dynamic from "next/dynamic";
import ContactCTA from "@/components/home/ContactCTA";
import Gsix3Saying from "@/components/home/Gsix3Saying";
import Testimonials from "@/components/home/Testimonials";
import WhoWeWorkWith from "@/components/home/WhoWeWorkWith";
import WhyGsix3 from "@/components/home/WhyGsix3";

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
      <WhyGsix3 />
      <Gsix3Saying />
      <LatestProject />
      <ServiceShowcase />
      <Testimonials />
      <WhoWeWorkWith />
      <ContactCTA compact />
    </>
  );
}
