"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Heart,
  Zap,
  Truck,
  ShieldCheck,
  Package,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/shared/category-badge";
import { PriceTag } from "@/components/shared/price-tag";
import { RatingStars } from "@/components/shared/rating-stars";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { ProductGridSkeleton } from "@/components/shared/product-grid";
import { RelatedProducts } from "@/components/features/related-products";
import { useProduct } from "@/hooks/use-products";
import { useCartStore } from "@/stores/cart-store";
import { ROUTES } from "@/lib/constants";
import { capitalize } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductDetailsProps {
  productId: number;
  initialProduct?: Product;
}

const MOCK_SPECS: Record<string, Record<string, string>> = {
  electronics: {
    Model: "2024 Edition",
    Connectivity: "Bluetooth 5.3, Wi-Fi 6E",
    Battery: "Up to 12 hours",
    Weight: "1.2 lbs",
    Dimensions: "9.8 x 6.8 x 0.3 in",
    "What's Included": "Device, Charging Cable, Manual",
  },
};

function getSpecs(category: string, id: number) {
  const base = MOCK_SPECS[category];
  if (base) return base;
  const skuNum = ((id * 9301 + 49297) % 10000).toString().padStart(4, "0");
  return {
    Model: "Standard Edition",
    SKU: `VL-${skuNum}`,
    Weight: "1.5 lbs",
    Material: "Premium build",
    Warranty: "2 years",
  };
}

function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="aspect-square rounded-2xl bg-muted" />
        <div className="space-y-4">
          <div className="h-3 w-20 rounded-full bg-muted" />
          <div className="h-8 w-3/4 rounded-lg bg-muted" />
          <div className="h-4 w-32 rounded-full bg-muted" />
          <div className="h-6 w-24 rounded-lg bg-muted" />
          <div className="space-y-2 pt-4">
            <div className="h-3 w-full rounded-full bg-muted" />
            <div className="h-3 w-5/6 rounded-full bg-muted" />
            <div className="h-3 w-4/6 rounded-full bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductDetails({ productId, initialProduct }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const { data: product, isLoading, isError, error, refetch } = useProduct(productId, initialProduct);
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return (
      <div className="py-8 sm:py-12">
        <ProductDetailSkeleton />
        <div className="mt-16">
          <h2 className="mb-6 text-xl font-semibold">Related Products</h2>
          <ProductGridSkeleton count={4} />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24">
        <AlertCircle className="size-8 text-text-secondary" />
        <p className="text-sm text-text-secondary">
          {error instanceof Error ? error.message : "Failed to load product"}
        </p>
        <div className="flex gap-3">
          <Link href={ROUTES.products}>
            <Button variant="outline" size="sm">
              <RotateCcw className="mr-1.5 size-3.5" />
              Back to Products
            </Button>
          </Link>
          <Button variant="outline" size="sm" onClick={() => refetch()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const specs = useMemo(() => getSpecs(product.category, product.id), [product.category, product.id]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem(product, quantity);
  }, [product, quantity, addItem]);

  return (
    <div className="py-8 sm:py-12">
      <Breadcrumb
        segments={[
          { label: "Home", href: ROUTES.home },
          { label: "Products", href: ROUTES.products },
          { label: capitalize(product.category), href: `${ROUTES.products}?category=${product.category}` },
          { label: product.title },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-8"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <CategoryBadge category={product.category} />

          <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {product.title}
          </h1>

          <RatingStars rate={product.rating.rate} count={product.rating.count} />

          <PriceTag price={product.price} />

          <p className="text-sm leading-relaxed text-text-secondary">
            {product.description}
          </p>

          <div className="flex flex-wrap gap-3 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <Package className="size-3.5 text-success" />
              In Stock
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="size-3.5 text-text-secondary" />
              Free delivery on orders over $100
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-text-secondary" />
              2 Year Warranty
            </span>
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="mb-2 text-sm font-semibold">Specifications</h3>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              {Object.entries(specs).map(([key, value]) => (
                <div key={key} className="contents">
                  <dt className="text-text-secondary">{key}</dt>
                  <dd className="text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <Button
              size="lg"
              className="h-11 gap-2 rounded-[10px] px-6 text-sm"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="size-4" />
              Add to Cart — ${(product.price * quantity).toFixed(2)}
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 gap-2 rounded-[10px] text-sm"
              onClick={() => toast.success("Proceeding to checkout...")}
            >
              <Zap className="size-4" />
              Buy Now
            </Button>
            <Button
              variant="outline"
              size="icon-lg"
              className="rounded-[10px]"
              aria-label="Add to wishlist"
              onClick={() => toast.success("Added to wishlist!")}
            >
              <Heart className="size-4" />
            </Button>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="mb-6 text-xl font-semibold tracking-tight">
          Related Products
        </h2>
        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />
      </section>
    </div>
  );
}


