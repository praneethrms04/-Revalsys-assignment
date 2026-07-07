export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-[10px] border border-border bg-background">
      <div className="aspect-[4/3] rounded-t-[10px] bg-muted" />
      <div className="space-y-3 p-4">
        <div className="h-2.5 w-16 rounded-full bg-muted" />
        <div className="h-4 w-3/4 rounded-full bg-muted" />
        <div className="h-3 w-1/3 rounded-full bg-muted" />
        <div className="h-3 w-1/4 rounded-full bg-muted" />
        <div className="h-8 w-full rounded-lg bg-muted" />
      </div>
    </div>
  );
}
