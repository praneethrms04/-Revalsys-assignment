"use client";

import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItemRow } from "@/components/shared/cart-item-row";
import { CartSummary } from "@/components/features/cart-summary";
import { EmptyState } from "@/components/shared/empty-state";
import { useCartStore, selectCartItems } from "@/stores/cart-store";
import { ROUTES } from "@/lib/constants";

export function CartContent() {
  const items = useCartStore(selectCartItems);
  const clearCart = useCartStore((state) => state.clearCart);

  if (items.length === 0) {
    return (
      <EmptyState
        icon={<ShoppingBag className="size-7 text-text-secondary" />}
        title="Your cart is empty"
        description="Looks like you haven't added anything to your cart yet. Browse our collection and find something you love."
        action={
          <Link href={ROUTES.products}>
            <Button size="lg" className="h-11 rounded-[10px] px-6 text-sm">
              Browse Products
            </Button>
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Cart
          </h1>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-text-secondary"
            onClick={clearCart}
          >
            <Trash2 className="size-3.5" />
            Clear Cart
          </Button>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <CartItemRow key={item.product.id} item={item} />
          ))}
        </div>

        <div className="mt-6">
          <Link href={ROUTES.products}>
            <Button variant="outline" size="sm" className="gap-1.5">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>

      <div className="lg:sticky lg:top-20 lg:self-start">
        <CartSummary />
      </div>
    </div>
  );
}
