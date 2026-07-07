interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.08em] text-text-secondary">
      {category}
    </span>
  );
}
