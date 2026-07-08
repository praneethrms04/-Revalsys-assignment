export const SITE = {
  name: "Voltura",
  tagline: "Power meets precision",
  description: "Discover premium electronics at Voltura.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://voltura-eight.vercel.app"),
} as const;

export const ROUTES = {
  home: "/",
  products: "/products",
  productDetail: (id: number) => `/products/${id}`,
  cart: "/cart",
  login: "/login",
  about: "/about",
} as const;

export const NAV_LINKS = [
  { label: "Products", href: ROUTES.products,  },
  { label: "About", href: ROUTES.about },
] as const;

export const productKeys = {
  all: ["products"] as const,
  detail: (id: number) => ["products", id] as const,
  category: (category: string) => ["products", "category", category] as const,
};

export const categoryKeys = {
  all: ["categories"] as const,
};

export const API = {
  baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://fakestoreapi.com",
  endpoints: {
    products: "/products",
    categories: "/products/categories",
  },
} as const;

export const PAGINATION = {
  defaultLimit: 8,
  featuredLimit: 4,
} as const;

export const STORAGE_KEYS = {
  cart: "voltura-cart",
  user: "voltura-user",
  guest: "voltura-guest",
} as const;

export const CATEGORIES = [
  { label: "Electronics", value: "electronics" },
  { label: "Jewelery", value: "jewelery" },
  { label: "Men's Clothing", value: "men's clothing" },
  { label: "Women's Clothing", value: "women's clothing" },
] as const;
