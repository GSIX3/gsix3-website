import PricingPackages from "@/components/pricing/PricingPackages";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata = pageMetadata(
  "Pricing",
  "Website creation packages from GSIX3 — transparent one-time pricing for Normal, Advanced, and Premium tiers.",
  {
    path: "/pricing",
    keywords: [
      "website pricing Sri Lanka",
      "web development packages",
      "GSIX3 pricing",
      "website creation cost",
    ],
  },
);

export default function PricingPage() {
  return (
    <div className="bg-slate-950 pt-20">
      <PricingPackages />
    </div>
  );
}