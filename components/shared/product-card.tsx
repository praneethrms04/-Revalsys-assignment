"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryBadge } from "@/components/shared/category-badge";
import { PriceTag } from "@/components/shared/price-tag";
import { RatingStars } from "@/components/shared/rating-stars";
import { useCartStore } from "@/stores/cart-store";
import { ROUTES } from "@/lib/constants";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <article className="group flex flex-col overflow-hidden rounded-[10px] border border-border bg-background transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <Link
        href={ROUTES.productDetail(product.id)}
        className="relative aspect-[4/3] overflow-hidden bg-surface"
      >
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <CategoryBadge category={product.category} />

        <h1 className="text-sm font-medium leading-snug text-foreground line-clamp-2">
          <Link href={ROUTES.productDetail(product.id)}>
            {product.title}
          </Link>
        </h1>

        <RatingStars rate={product.rating.rate} count={product.rating.count} />

        <div className="mt-auto flex items-center justify-between pt-2">
          <PriceTag price={product.price} />
          <Button
            size="sm"
            className="h-8 gap-1.5 rounded-lg text-xs"
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="size-3.5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
