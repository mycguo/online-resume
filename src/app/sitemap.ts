import type { MetadataRoute } from "next";
import { projects } from "@/data/portfolio";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  if (!siteUrl) return [];
  return [
    { url: siteUrl.href, changeFrequency: "monthly", priority: 1 },
    ...projects.map((project) => ({
      url: new URL(`/projects/${project.slug}`, siteUrl).href,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
