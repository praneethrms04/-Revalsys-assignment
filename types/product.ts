export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export type ProductCategory =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing";

export interface ProductFilters {
  search: string;
  category: ProductCategory | "";
}
