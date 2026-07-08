import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { HeroSection } from "@/components/shared/hero-section";
import { FeaturedProducts } from "@/components/features/featured-products";
import { getAllProducts } from "@/services/products";
import { productKeys, SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: `${SITE.name} — ${SITE.tagline}`,
  },
  description:
    "Discover premium electronics at Voltura. Curated gadgets, audio, wearables, and smart home devices — power meets precision.",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Discover premium electronics at Voltura. Curated gadgets, audio, wearables, and smart home devices.",
    url: SITE.url,
  },
  twitter: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      "Discover premium electronics at Voltura. Curated gadgets, audio, wearables, and smart home devices.",
  },
};

export default async function HomePage() {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: productKeys.all,
      queryFn: getAllProducts,
    });
  } catch {
    // Prefetch failed — client will fetch on its own via useProducts()
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeroSection />
      <FeaturedProducts />
    </HydrationBoundary>
  );
}
