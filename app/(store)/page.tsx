import { HeroSection } from "@/components/shared/hero-section";
import { FeaturedProducts } from "@/components/features/featured-products";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
    </>
  );
}
