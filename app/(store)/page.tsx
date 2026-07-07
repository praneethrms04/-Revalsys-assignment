import dynamic from "next/dynamic";
import { HeroSection } from "@/components/shared/hero-section";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

const FeaturedProducts = dynamic(
  () => import("@/components/features/featured-products").then((m) => ({ default: m.FeaturedProducts })),
  {
    ssr: true,
    loading: () => (
      <section className="bg-background pb-16 sm:pb-20 lg:pb-28">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
          <div className="mb-10">
            <div className="h-8 w-48 rounded-lg bg-muted" />
            <div className="mt-2 h-4 w-64 rounded-lg bg-muted" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="aspect-[4/3] rounded-[10px] bg-muted" />
            ))}
          </div>
        </div>
      </section>
    ),
  }
);

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
