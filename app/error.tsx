"use client";

import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <AlertCircle className="size-12 text-destructive" />
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-center text-sm text-text-secondary">
        {error.message || "An unexpected error occurred. Please try again."}
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={() => reset()} className="gap-1.5">
          <RotateCcw className="size-3.5" />
          Try Again
        </Button>
        <Link href={ROUTES.home}>
          <Button className="gap-1.5">
            <Home className="size-3.5" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
