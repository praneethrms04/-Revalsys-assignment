"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/shared/quantity-selector";
import { CategoryBadge } from "@/components/shared/category-badge";
import { useCartStore } from "@/stores/cart-store";
import { ROUTES } from "@/lib/constants";
import type { CartItem } from "@/types";

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow = memo(function CartItemRow({ item }: CartItemRowProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const handleQuantityChange = useCallback(
    (q: number) => updateQuantity(item.product.id, q),
    [item.product.id, updateQuantity]
  );
  const handleRemove = useCallback(
    () => {
      removeItem(item.product.id);
      toast.success(`${item.product.title.slice(0, 48)}… removed from cart`);
    },
    [item.product.id, removeItem]
  );

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

        <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <QuantitySelector
              value={item.quantity}
              onChange={handleQuantityChange}
            />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={handleRemove}
              aria-label={`Remove ${item.product.title} from cart`}
              className="text-text-secondary hover:text-destructive"
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
          <p className="ml-auto text-right text-sm font-semibold tabular-nums sm:ml-0">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
});
