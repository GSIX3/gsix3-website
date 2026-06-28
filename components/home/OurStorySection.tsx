import Image from "next/image";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { site } from "@/content/site";

const officePhotoSrc = "/assets/office.jpeg";

export default function OurStorySection() {
  return (
    <section id="about" className="border-y border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-14 xl:gap-16">
            <div className="order-2 mr-auto w-full max-w-md sm:max-w-lg lg:sticky lg:top-28 lg:order-1 lg:-ml-6 lg:max-w-none lg:self-start xl:-ml-8 max-lg:mx-auto max-lg:ml-0">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-bg-elevated lg:aspect-[6/6]">
                <Image
                  src={officePhotoSrc}
                  alt="GSIX3 office"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 512px, 560px"
                  unoptimized
                />
              </div>
            </div>

            <div className="order-1 space-y-16 md:space-y-20 lg:order-2">
              <div>
                <h2 className="font-heading text-4xl font-semibold tracking-tight text-text md:text-5xl lg:text-[3.25rem]">
                  Our Story
                </h2>
                <p className="mt-4 text-lg font-medium text-accent md:text-xl">
                  Three Engineers. One Vision.
                </p>
                <p className="mt-6 text-justify text-base leading-relaxed text-text md:text-lg">
                  Founded in {site.established} in Sri Lanka, {site.name} was
                  built by three engineers across Mechatronics, Software and
                  Computer Engineering, who believed the future of software was
                  about building intelligent, connected systems, not just
                  writing code.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-semibold text-text md:text-3xl">
                  Why We Started
                </h3>
                <p className="mt-6 text-justify text-base leading-relaxed text-text md:text-lg">
                  Most software companies build applications. We set out to
                  bridge the gap between intelligent automation and software
                  delivery bringing deep, cross-discipline engineering to real
                  business problems and owning the outcomes.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-semibold text-text md:text-3xl">
                  Where We Are Today
                </h3>
                <p className="mt-6 text-justify text-base leading-relaxed text-text md:text-lg">
                  Since {site.established}, we&apos;ve delivered web platforms,
                  AI-powered systems and operational tools for businesses across
                  Sri Lanka. Every project reinforces what we started with the
                  best software isn&apos;t just functional it&apos;s engineered.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-2xl font-semibold text-text md:text-3xl">
                  What Drives Us
                </h3>
                <blockquote className="mt-6 border-l-4 border-accent pl-6 font-heading text-xl font-semibold leading-snug text-text md:text-2xl">
                  Innovation with power. Engineered with quality.
                </blockquote>
                <p className="mt-6 text-justify text-base leading-relaxed text-text md:text-lg">
                  Not a tagline. A standard. We don&apos;t cut corners, we
                  don&apos;t hand off work we wouldn&apos;t stand behind, and we
                  don&apos;t call a project done until the system is stable,
                  scalable and genuinely useful.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
