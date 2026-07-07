import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

const staticRoutes = [
  { path: "", priority: 1.0 },
  { path: "/products", priority: 0.9 },
  { path: "/about", priority: 0.7 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));
}
