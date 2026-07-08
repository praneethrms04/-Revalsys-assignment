"use client";

import { useMemo } from "react";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useShallow } from "zustand/react/shallow";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart-store";

const TAX_RATE = 0.1;
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 9.99;

export function CartSummary() {
  const { totalItems, subtotal } = useCartStore(
    useShallow((state) => ({
      totalItems: state.items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    })),
  );

  const { shipping, tax, total } = useMemo(() => {
    const shipping =
      subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : SHIPPING_COST;
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
              <span className="font-medium text-emerald-700 ">Free</span>
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
        onClick={() => toast.success("Proceeding to checkout...")}
      >
        <ShoppingBag className="size-4" />
        Checkout
      </Button>
    </div>
  );
}
