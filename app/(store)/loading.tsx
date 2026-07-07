export default function StoreLoading() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-24 sm:px-6">
      <div className="animate-pulse space-y-6">
        <div className="h-10 w-72 rounded-lg bg-muted" />
        <div className="h-4 w-96 rounded-lg bg-muted" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] rounded-[10px] bg-muted" />
          ))}
        </div>
      </div>
    </div>
  );
}
