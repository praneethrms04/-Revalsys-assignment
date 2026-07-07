interface PriceTagProps {
  price: number;
}

export function PriceTag({ price }: PriceTagProps) {
  return (
    <span className="text-base font-semibold">
      ${price.toFixed(2)}
    </span>
  );
}
