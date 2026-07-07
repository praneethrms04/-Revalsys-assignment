"use client";

import Link from "next/link";
import { ArrowRight, AlertCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid, ProductGridSkeleton } from "@/components/shared/product-grid";
import { useProducts } from "@/hooks/use-products";
import { PAGINATION, ROUTES } from "@/lib/constants";

export function FeaturedProducts() {
  const { data: products, isLoading, isError, error, refetch } = useProducts();

  if (isLoading) {
    return (
      <SectionShell>
        <ProductGridSkeleton count={PAGINATION.featuredLimit} />
      </SectionShell>
    );
  }

  if (isError) {
    return (
      <SectionShell>
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface py-16">
          <AlertCircle className="size-8 text-text-secondary" />
          <p className="text-sm text-text-secondary">
            {error instanceof Error ? error.message : "Failed to load products"}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </SectionShell>
    );
  }

  if (!products || products.length === 0) {
    return (
      <SectionShell>
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface py-16">
          <Package className="size-8 text-text-secondary" />
          <p className="text-sm text-text-secondary">
            No products available right now.
          </p>
        </div>
      </SectionShell>
    );
  }

  const featured = products.slice(0, PAGINATION.featuredLimit);

  return (
    <SectionShell>
      <ProductGrid products={featured} />
    </SectionShell>
  );
}

function SectionShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="bg-background pb-16 sm:pb-20 lg:pb-28">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Featured Products
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Handpicked favorites from our latest collection
            </p>
          </div>
          <Link href={ROUTES.products}>
            <Button
              variant="ghost"
              size="sm"
              className="hidden gap-1.5 text-sm sm:flex"
            >
              View All
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
        {children}
        <div className="mt-8 text-center sm:hidden">
          <Link href={ROUTES.products}>
            <Button variant="outline" size="sm" className="gap-1.5">
              View All Products
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
