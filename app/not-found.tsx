import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        <span className="text-xl font-bold text-text-secondary">404</span>
      </div>
      <h1 className="text-lg font-semibold">Page not found</h1>
      <p className="max-w-sm text-center text-sm text-text-secondary">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-2">
        <Link href={ROUTES.home}>
          <Button size="lg" className="h-11 gap-2 rounded-[10px] px-6 text-sm">
            <Home className="size-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
