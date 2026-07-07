import { ProductListing } from "@/components/features/product-listing";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our curated collection of premium electronics. Find the perfect device for your needs.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
      <div className="py-8 sm:py-12">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          All Products
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Explore our full catalog of premium electronics
        </p>
      </div>
      <ProductListing />
    </div>
  );
}
