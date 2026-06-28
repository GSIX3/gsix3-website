import dynamic from "next/dynamic";
import AnimatedTestimonialsDemo from "@/components/home/AnimatedTestimonialsDemo";
import ContactCTA from "@/components/home/ContactCTA";
import Gsix3Saying from "@/components/home/Gsix3Saying";
import GlowingEffectDemo from "@/components/home/GlowingEffectDemo";
import LogoCarouselDemo from "@/components/home/LogoCarouselDemo";
import Testimonials from "@/components/home/Testimonials";
import WhoWeWorkWith from "@/components/home/WhoWeWorkWith";
import OurStorySection from "@/components/home/OurStorySection";
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
      <OurStorySection />
      <WhyGsix3 />
      <LogoCarouselDemo />
      <AnimatedTestimonialsDemo />
      <GlowingEffectDemo />

      
    
      <Gsix3Saying />
    

      {/* <LatestProject /> */}
      
      {/* <ServiceShowcase /> */}

      <Testimonials />
      {/* <WhoWeWorkWith /> */}
      {/* <ContactCTA compact /> */}
    </>
  );
}
