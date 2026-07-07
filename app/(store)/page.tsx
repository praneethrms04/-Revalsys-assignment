import { HeroSection } from "@/components/shared/hero-section";
import { FeaturedProducts } from "@/components/features/featured-products";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
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

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
    </>
  );
}
