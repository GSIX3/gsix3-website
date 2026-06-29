import type { Metadata } from "next";
import { site } from "@/content/site";

const baseUrl = site.url;
const defaultOgImage = `/logo.png?v=${site.logoVersion}`;

const defaultKeywords = [
  "web development",
  "web app development",
  "artificial intelligence",
  "data science",
  "cloud solutions",
  "mobile development",
  "computer engineering",
  "GSIX3",
];

type PageMetadataOptions = {
  path?: string;
  keywords?: string[];
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
};

function buildPageUrl(path?: string) {
  if (!path || path === "/") return baseUrl;
  return `${baseUrl}${path}`;
}

function buildOpenGraphImage(imageUrl: string, alt: string) {
  return [{ url: imageUrl, width: 1200, height: 630, alt }];
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${site.name} — GSIX3 — Innovation with Power. Engineered with Quality.`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: defaultKeywords,
  applicationName: site.name,
  authors: [{ name: site.name, url: baseUrl }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: site.name,
    title: `${site.name} — GSIX3 — Innovation with Power. Engineered with Quality.`,
    description: site.description,
    images: buildOpenGraphImage(defaultOgImage, site.name),
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — GSIX3 — Innovation with Power. Engineered with Quality.`,
    description: site.description,
    images: [defaultOgImage],
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: baseUrl,
  },
};

export function homeMetadata(): Metadata {
  return {
    alternates: { canonical: baseUrl },
    openGraph: {
      url: baseUrl,
      title: `${site.name} — GSIX3 — Innovation with Power. Engineered with Quality.`,
      description: site.description,
      images: buildOpenGraphImage(defaultOgImage, site.name),
    },
    twitter: {
      title: `${site.name} — GSIX3 — Innovation with Power. Engineered with Quality.`,
      description: site.description,
      images: [defaultOgImage],
    },
  };
}

export function pageMetadata(
  title: string,
  description: string,
  options: PageMetadataOptions = {},
): Metadata {
  const { path, keywords, ogImage, ogImageAlt, noIndex = false } = options;
  const pageUrl = buildPageUrl(path);
  const ogTitle = `${title} | ${site.name}`;
  const imageUrl = ogImage ?? defaultOgImage;
  const imageAlt = ogImageAlt ?? `${title} — ${site.name}`;

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      siteName: site.name,
      title: ogTitle,
      description,
      images: buildOpenGraphImage(imageUrl, imageAlt),
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
