import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-24">
      <div className="flex size-16 items-center justify-center rounded-full bg-muted">
        {icon}
      </div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="max-w-sm text-center text-sm text-text-secondary">
        {description}
      </p>
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
