"use client";

import { memo, useId } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Newest", value: "newest" },
] as const;

const CATEGORY_LABEL = (cat: string) =>
  cat.charAt(0).toUpperCase() + cat.slice(1);

interface ProductToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  sort: string;
  onSortChange: (value: string) => void;
  categories: string[];
  totalCount: number;
}

export const ProductToolbar = memo(function ProductToolbar({
  search,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  sort,
  onSortChange,
  categories,
  totalCount,
}: ProductToolbarProps) {
  const searchId = useId();
  const categoryId = useId();
  const sortId = useId();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
          <Input
            id={searchId}
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products..."
            className="h-10 rounded-[10px] pl-9 text-sm"
            aria-label="Search products"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
          <Select
            value={selectedCategory}
            onChange={onCategoryChange}
            options={[
              { label: "All Categories", value: "" },
              ...categories.map((cat) => ({
                label: CATEGORY_LABEL(cat),
                value: cat,
              })),
            ]}
            label="Filter by category"
            className="sm:w-44"
          />

          <Select
            value={sort}
            onChange={onSortChange}
            options={[...SORT_OPTIONS]}
            label="Sort by"
            className="sm:w-40"
          />
        </div>
      </div>

      <p className="text-sm text-text-secondary">
        Showing{" "}
        <span className="font-medium text-foreground">{totalCount}</span>{" "}
        product{totalCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
});
