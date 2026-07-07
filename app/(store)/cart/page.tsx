import type { Metadata } from "next";
import { CartContent } from "./cart-content";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review your items and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
      <CartContent />
    </div>
  );
}
