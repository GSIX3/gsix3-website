import ContactCTA from "@/components/home/ContactCTA";
import { pageMetadata } from "@/lib/metadata";

export const dynamic = "force-static";

export const metadata = pageMetadata(
  "Contact",
  "Get in touch with GSIX3 for web development, AI, data science, cloud, or mobile projects.",
);

export default function ContactPage() {
  return (
    <div className="pt-20">
      <ContactCTA />
    </div>
  );
}
