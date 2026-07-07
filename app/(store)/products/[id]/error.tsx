"use client";

import Link from "next/link";
import { AlertCircle, RotateCcw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <AlertCircle className="size-10 text-destructive" />
      <h1 className="text-xl font-semibold">Failed to load product</h1>
      <p className="max-w-md text-center text-sm text-text-secondary">
        {error.message || "An unexpected error occurred while loading this product."}
      </p>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={() => reset()} className="gap-1.5">
          <RotateCcw className="size-3.5" />
          Try Again
        </Button>
        <Link href={ROUTES.products}>
          <Button size="sm" className="gap-1.5">
            <ArrowLeft className="size-3.5" />
            Back to Products
          </Button>
        </Link>
      </div>
    </div>
  );
}
