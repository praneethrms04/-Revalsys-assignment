import { ProductGridSkeleton } from "@/components/shared/product-grid";

export default function ProductsLoading() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
      <div className="animate-pulse py-8 sm:py-12">
        <div className="h-8 w-48 rounded-lg bg-muted" />
        <div className="mt-1 h-4 w-72 rounded-lg bg-muted" />
      </div>
      <section className="pb-8 sm:pb-12">
        <ProductGridSkeleton count={8} />
      </section>
    </div>
  );
}
