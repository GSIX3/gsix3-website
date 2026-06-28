import { AuroraPricingCard } from "@/components/ui/aurora-pricing";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { cn } from "@/lib/utils";

type PricingTier = {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
};

const tiers: PricingTier[] = [
  {
    id: "normal",
    name: "Normal",
    price: 75000,
    features: [
      "Responsive design (mobile + desktop)",
      "Contact form",
      "Basic SEO setup",
      "1 round of revisions",
      "Delivery in 3-5days",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    price: 150000,
    recommended: true,
    features: [
      "Responsive design",
      "Contact form + WhatsApp integration",
      "SEO optimization",
      "CMS integration (manage content yourself)",
      "3 rounds of revisions",
      "Delivery in 1–2 weeks",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 225000,
    features: [
      "Custom UI/UX design",
      "Advanced integrations (payment gateway, booking system, etc.)",
      "Full SEO + performance optimization",
      "Admin dashboard",
      "1 month post-launch support",
      "10 rounds revisions",
      "Delivery in 2–3 weeks",
    ],
  },
];

type PricingPackagesProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  contactHref?: string;
  className?: string;
};

function formatPrice(amount: number) {
  return `LKR ${amount.toLocaleString("en-LK")}`;
}

export default function PricingPackages({
  id = "pricing",
  eyebrow,
  title = "Ready to Launch Your Website?",
  description = "Choose a package and let's get started.",
  contactHref = "/contact",
  className = "",
}: PricingPackagesProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden bg-slate-950 py-24 md:py-32",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <ShootingStars
          starColor="#7dd3fc"
          trailColor="#38bdf8"
          starWidth={26}
          starHeight={3}
          minSpeed={14}
          maxSpeed={34}
          minDelay={500}
          maxDelay={1800}
          className="[filter:drop-shadow(0_0_6px_rgba(56,189,248,0.9))]"
        />
        <StarsBackground />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <div className="mb-16 max-w-3xl text-center md:mx-auto">
            {eyebrow && (
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            )}
            <h2 className="font-heading text-3xl font-medium tracking-tight text-white md:text-5xl">
              {title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-300">
              {description}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-stretch">
          {tiers.map((tier, index) => (
            <AuroraPricingCard
              key={tier.id}
              name={tier.name}
              price={formatPrice(tier.price)}
              features={tier.features}
              isFeatured={tier.recommended}
              href={contactHref}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
