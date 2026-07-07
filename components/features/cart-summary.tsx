"use client";

import { useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore, selectCartCount, selectCartSubtotal } from "@/stores/cart-store";

const TAX_RATE = 0.1;
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 9.99;

export function CartSummary() {
  const totalItems = useCartStore(selectCartCount);
  const subtotal = useCartStore(selectCartSubtotal);

  const { shipping, tax, total } = useMemo(() => {
    const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
    const tax = subtotal * TAX_RATE;
    const total = subtotal + shipping + tax;
    return { shipping, tax, total };
  }, [subtotal]);

  return (
    <div className="rounded-xl border border-border bg-surface p-6">
      <h2 className="mb-4 text-base font-semibold">Order Summary</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-text-secondary">Items</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Subtotal</span>
          <span className="tabular-nums">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Shipping</span>
          <span className="tabular-nums">
            {shipping === 0 ? (
              <span className="text-success">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-text-secondary">Tax (est.)</span>
          <span className="tabular-nums">${tax.toFixed(2)}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex justify-between text-base font-semibold">
        <span>Total</span>
        <span className="tabular-nums">${total.toFixed(2)}</span>
      </div>

      <Button
        size="lg"
        className="mt-6 h-11 w-full gap-2 rounded-[10px] text-sm"
        disabled={totalItems === 0}
      >
        <ShoppingBag className="size-4" />
        Checkout
      </Button>
    </div>
  );
}
