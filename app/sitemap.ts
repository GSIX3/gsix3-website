import type { MetadataRoute } from "next";
import { portfolioProjects } from "@/content/portfolio";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["",  "/about", "/services", "/pricing", "/portfolio", "/contact"];
  const portfolioRoutes = portfolioProjects.map(
    (project) => `/portfolio/${project.slug}`,
  );

  return [...routes, ...portfolioRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
