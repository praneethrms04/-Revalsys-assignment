"use client";

import { useMemo, useState, useCallback } from "react";
import { AlertCircle, Package, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductGrid, ProductGridSkeleton } from "@/components/shared/product-grid";
import { ProductToolbar } from "@/components/features/product-toolbar";
import { useProducts } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";
import { useDebounce } from "@/hooks/use-debounce";
import type { Product } from "@/types";

type SortValue = "featured" | "price-asc" | "price-desc" | "rating" | "newest";

function sortProducts(products: Product[], sort: SortValue): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "rating":
      return sorted.sort((a, b) => b.rating.rate - a.rating.rate);
    case "featured":
    case "newest":
    default:
      return sorted;
  }
}

export function ProductListing() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sort, setSort] = useState<SortValue>("featured");

  const debouncedSearch = useDebounce(search, 300);

  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useProducts();
  const { data: categories } = useCategories();

  const filtered = useMemo(() => {
    if (!products) return [];
    let result = products;

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(query));
    }

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    result = sortProducts(result, sort);
    return result;
  }, [products, debouncedSearch, selectedCategory, sort]);

  const hasFilters = debouncedSearch || selectedCategory;

  const clearFilters = useCallback(() => {
    setSearch("");
    setSelectedCategory("");
    setSort("featured");
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSort(value as SortValue);
  }, []);

  if (isLoading) {
    return (
      <section className="py-8 sm:py-12">
        <ProductGridSkeleton count={8} />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-8 sm:py-12">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface py-16">
          <AlertCircle className="size-8 text-text-secondary" />
          <p className="text-sm text-text-secondary">
            {error instanceof Error
              ? error.message
              : "Failed to load products"}
          </p>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 sm:py-12">
      <ProductToolbar
        search={search}
        onSearchChange={setSearch}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sort={sort}
        onSortChange={handleSortChange}
        categories={categories ?? []}
        totalCount={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="mt-8 flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-surface py-16">
          <Package className="size-8 text-text-secondary" />
          <p className="text-sm font-medium text-foreground">
            No products found
          </p>
          <p className="text-sm text-text-secondary">
            Try adjusting your search or filter
          </p>
          {hasFilters && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2 gap-1.5"
              onClick={clearFilters}
            >
              <RotateCcw className="size-3.5" />
              Clear Filters
            </Button>
          )}
        </div>
      ) : (
        <div className="mt-6">
          <ProductGrid products={filtered} />
        </div>
      )}
    </section>
  );
}
