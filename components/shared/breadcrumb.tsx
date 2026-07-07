import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbSegment {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  segments: BreadcrumbSegment[];
}

export function Breadcrumb({ segments }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-1.5 text-sm text-text-secondary">
        {segments.map((segment, i) => {
          const isLast = i === segments.length - 1;
          return (
              <li key={`${i}-${segment.label}`} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="size-3.5 text-text-tertiary" />}
              {segment.href && !isLast ? (
                <Link
                  href={segment.href}
                  className="transition-colors hover:text-foreground"
                >
                  {segment.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-foreground font-medium" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {segment.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
