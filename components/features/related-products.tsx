"use client";

import { memo } from "react";
import { useProductsByCategory } from "@/hooks/use-products";
import { ProductGrid, ProductGridSkeleton } from "@/components/shared/product-grid";

interface RelatedProductsProps {
  category: string;
  currentProductId: number;
}

export const RelatedProducts = memo(function RelatedProducts({
  category,
  currentProductId,
}: RelatedProductsProps) {
  const { data: products, isLoading } = useProductsByCategory(category);

  if (isLoading) {
    return <ProductGridSkeleton count={4} />;
  }

  if (!products || products.length === 0) {
    return null;
  }

  const related = products
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return <ProductGrid products={related} />;
});
