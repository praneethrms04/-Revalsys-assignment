"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { CategoryBadge } from "@/components/shared/category-badge";
import { useCartStore } from "@/stores/cart-store";
import { ROUTES } from "@/lib/constants";
import type { CartItem } from "@/types";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex gap-4 border-b border-border pb-4 sm:gap-6">
      <Link
        href={ROUTES.productDetail(item.product.id)}
        className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-surface sm:size-24"
      >
        <Image
          src={item.product.image}
          alt={item.product.title}
          fill
          sizes="96px"
          className="object-contain p-2"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0 space-y-1">
          <Link
            href={ROUTES.productDetail(item.product.id)}
            className="text-sm font-medium leading-snug text-foreground transition-colors hover:text-text-secondary line-clamp-1"
          >
            {item.product.title}
          </Link>
          <CategoryBadge category={item.product.category} />
          <p className="text-sm text-text-secondary">
            ${item.product.price.toFixed(2)} each
          </p>
        </div>

        <div className="flex items-center gap-3 sm:flex-col sm:items-end">
          <QuantitySelector
            value={item.quantity}
            onChange={(q) => updateQuantity(item.product.id, q)}
          />
          <p className="min-w-[72px] text-right text-sm font-semibold tabular-nums">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => removeItem(item.product.id)}
            aria-label={`Remove ${item.product.title} from cart`}
            className="text-text-secondary hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
