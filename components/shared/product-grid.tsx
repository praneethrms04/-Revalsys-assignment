"use client";

import { memo } from "react";
import { ProductCard } from "@/components/shared/product-card";
import { SkeletonCard } from "@/components/shared/skeleton-card";
import type { Product } from "@/types";

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid = memo(function ProductGrid({
  products,
}: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
