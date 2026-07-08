import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";
import { getAllProducts } from "@/services/products";

const staticRoutes: { path: string; priority: number }[] = [
  { path: "", priority: 1.0 },
  { path: "/products", priority: 0.9 },
  { path: "/about", priority: 0.7 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE.url}${route.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));

  try {
    const products = await getAllProducts();
    const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
      url: `${SITE.url}/products/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

    return [...staticEntries, ...productEntries];
  } catch {
    return staticEntries;
  }
}
