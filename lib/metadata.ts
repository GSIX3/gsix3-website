import type { Metadata } from "next";
import { site } from "@/content/site";

const baseUrl = site.url;

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} — Web, AI & Cloud Engineering`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "web development",
    "web app development",
    "artificial intelligence",
    "data science",
    "cloud solutions",
    "mobile development",
    "computer engineering",
    "GSIX3",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: site.name,
    title: `${site.name} — Web, AI & Cloud Engineering`,
    description: site.description,
    images: [{ url: `/logo.png?v=${site.logoVersion}`, width: 512, height: 512, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Web, AI & Cloud Engineering`,
    description: site.description,
    images: [`/logo.png?v=${site.logoVersion}`],
  },
  robots: { index: true, follow: true },
};

export function pageMetadata(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: { title: `${title} | ${site.name}`, description },
    twitter: { title: `${title} | ${site.name}`, description },
  };
}
