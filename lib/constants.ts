export const SITE = {
  name: "Voltura",
  tagline: "Power meets precision",
  description: "Discover premium electronics at Voltura.",
  url: "https://voltura.com",
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
  { label: "Products", href: ROUTES.products },
  { label: "About", href: ROUTES.about },
] as const;

export const QUERY_KEYS = {
  products: "products",
  product: "product",
  categories: "categories",
} as const;

export const API = {
  baseUrl: "https://fakestoreapi.com",
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
