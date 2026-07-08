import { Star } from "lucide-react";

interface RatingStarsProps {
  rate: number;
  count: number;
}

export function RatingStars({ rate, count }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="flex"
        role="img"
        aria-label={`${rate} out of 5 stars`}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            aria-hidden="true"
            className={`size-3.5 ${
              star <= Math.round(rate)
                ? "fill-rating text-rating"
                : "fill-none text-border"
            }`}
          />
        ))}
      </div>

      <span
        className="text-xs text-text-secondary"
        aria-label={`${count} reviews`}
      >
        ({count})
      </span>
    </div>
  );
}