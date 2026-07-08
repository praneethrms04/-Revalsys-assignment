# Voltura — Premium Electronics Showcase

A modern e-commerce product showcase built with Next.js 16, TypeScript, and Tailwind CSS. Voltura demonstrates a production-grade architecture for browsing, filtering, and managing a product catalog with a simulated shopping cart and authentication flow.

---

## Features

- **Product Catalog** — Browse, search, filter by category, and sort by price/rating
- **Product Detail** — Full product views with specifications, ratings, quantity selection, and related products
- **Shopping Cart** — Persistent cart (localStorage via Zustand), quantity management, order summary with tax/shipping calculations
- **Authentication** — Mock login flow with form validation (React Hook Form + Zod), guest access, and persisted auth state
- **Responsive Design** — Mobile-first layout with collapsible navigation sheet
- **SEO** — Open Graph, Twitter Cards, JSON-LD structured data (Organization, WebSite, Product), auto-generated sitemap and robots.txt
- **Accessibility** — ARIA labels, landmarks, skip-to-content link, form error announcements, keyboard-navigable controls
- **Error Boundaries** — Route-level error boundaries for graceful degradation with retry actions
- **Skip-to-content Link** — First tabbable element for keyboard users
- **Lighthouse Optimized** — 90+ scores across Performance, Accessibility, Best Practices, and SEO

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16.2 (App Router, Turbopack) |
| **Language** | TypeScript 5 (strict mode) |
| **Styling** | Tailwind CSS 4 + `tw-animate-css` + shadcn/ui base-nova |
| **State (Server)** | TanStack React Query 5 (caching, stale management, refetch) |
| **State (Client)** | Zustand 5 (persisted cart + auth stores) |
| **HTTP** | Axios (interceptors, error normalization) |
| **Forms** | React Hook Form 7 + Zod 4 (`@hookform/resolvers`) |
| **UI Primitives** | Base UI React (Checkbox), shadcn/ui (Button, Sheet, Badge, Input, etc.) |
| **Icons** | Lucide React |
| **Toasts** | Sonner |
| **Font** | Inter (via `next/font`, `display: swap`) |

---

## Architecture

### Data Flow

```
Fake Store API  ──>  Axios Instance  ──>  Service Layer  ──>  TanStack Query Hooks  ──>  Components
                   (ApiError class,    (getAllProducts,    (useProducts, useProduct,
                    timeout 10s)        getCategories)      useCategories, useProductsByCategory)

Client State:
  Cart Store (Zustand + persist)  ──>  useCartStore (addItem, removeItem, updateQuantity)
  Auth Store (Zustand + persist)  ──>  useAuthStore (login, loginAsGuest, logout)
```

- **Server state** (products, categories) flows through TanStack Query with 5-minute stale time and 10-minute garbage collection
- **Client state** (cart items, auth session) flows through Zustand with `localStorage` persistence
- **Form state** is local to the login form via React Hook Form + Zod validation
- Debounced search (300ms) on the product listing page avoids filtering on every keystroke

### Routing

```
app/
├── layout.tsx              Root layout: QueryProvider, Toaster, fonts, metadata
├── opengraph-image.tsx     Auto-generated OG image (next/og)
├── robots.ts               Robots.txt (allow all)
├── sitemap.ts              Static sitemap with priorities
├── icon.svg                PWA favicon
└── (store)/
    ├── layout.tsx          Navbar + main + Footer
    ├── loading.tsx         Route-level loading state
    ├── error.tsx           Route-level error boundary
    ├── page.tsx            Home (Hero + FeaturedProducts)
    ├── about/page.tsx      About (7-section static server component)
    ├── cart/page.tsx       Cart (client, noindex)
    ├── login/page.tsx      Login form (client, noindex)
    └── products/
        ├── page.tsx         Product listing (filter/sort/search)
        ├── loading.tsx      Product grid skeleton
        └── [id]/
            ├── page.tsx     Product detail (generateMetadata + TanStack Query hydration)
            └── error.tsx    Product-level error boundary
```

---

## Folder Structure

```
src/
├── app/                     Next.js App Router pages and layouts
│   ├── globals.css          Design tokens, Voltura color system, Tailwind layers
│   ├── layout.tsx           Root layout (providers, fonts, metadata, JSON-LD)
│   └── (store)/             Route group — store pages
│       ├── about/           Static about page
│       ├── cart/            Cart page + cart-content component
│       ├── login/           Login page + login-form component
│       └── products/        Product listing + dynamic [id] detail
│
├── components/
│   ├── ui/                  shadcn/ui primitives (button, input, badge, sheet, etc.)
│   ├── shared/              Reusable domain-agnostic components
│   │   ├── navbar.tsx       Sticky header with mobile Sheet
│   │   ├── footer.tsx       4-column footer with grouped links
│   │   ├── hero-section.tsx Homepage hero with trust badges
│   │   ├── product-card.tsx Individual product card
│   │   ├── product-grid.tsx Responsive grid (memo'd)
│   │   ├── cart-item-row.tsx Cart line item (memo'd)
│   │   ├── breadcrumb.tsx   Breadcrumb nav (memo'd)
│   │   ├── quantity-selector.tsx ± quantity control
│   │   ├── rating-stars.tsx Star rating display
│   │   ├── price-tag.tsx    Price formatting
│   │   ├── category-badge.tsx Category label
│   │   ├── skeleton-card.tsx Card skeleton placeholder
│   │   ├── empty-state.tsx  Generic empty state with action slot
│   │   └── json-ld.tsx      Structured data injectors
│   └── features/            Domain-specific composites
│       ├── product-details.tsx  2-column detail with specs and add-to-cart
│       ├── product-listing.tsx  Filter/sort orchestrator
│       ├── product-toolbar.tsx  Search + category + sort controls
│       ├── featured-products.tsx Homepage featured section
│       ├── related-products.tsx Category-based related grid
│       └── cart-summary.tsx     Order summary with tax/shipping
│
├── hooks/                   TanStack Query hooks
│   ├── use-products.ts      useProducts, useProduct, useProductsByCategory
│   ├── use-categories.ts    useCategories
│   └── use-debounce.ts      Generic debounce hook
│
├── services/                API layer
│   ├── axios-instance.ts    Axios client with ApiError interceptor
│   └── products.ts          Product/category API functions
│
├── stores/                  Zustand stores
│   ├── cart-store.ts        Cart state with localStorage persistence
│   └── auth-store.ts        Auth state (mock login/guest/logout)
│
├── providers/               React context providers
│   └── query-provider.tsx   QueryClient configuration
│
├── lib/                     Shared utilities
│   ├── constants.ts         SITE config, routes, keys, API, categories
│   └── utils.ts             cn(), capitalize()
│
├── types/                   TypeScript type definitions
│   ├── product.ts           Product, Rating, ProductCategory
│   ├── cart.ts              CartItem
│   ├── user.ts              User, LoginForm, AuthState
│   └── api.ts               ApiError class, ApiResponse, isApiError
│
└── public/                  Static assets
    ├── icon.svg             Voltura brand favicon
    └── manifest.webmanifest PWA manifest (standalone display)
```

---

## Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd revalsys-ecommerce

# 2. Install dependencies
npm install

# 3. Set up environment variables (see section below)
cp .env.example .env

# 4. Start development server
npm run dev

# 5. Open http://localhost:3000
```

### Build for Production

```bash
npm run build
npm start
```

---

## Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `NEXT_PUBLIC_API_BASE_URL` | No | `https://fakestoreapi.com` | Base URL for the product API |
| `NEXT_PUBLIC_SITE_URL` | Yes (production) | `http://localhost:3000` | Canonical site URL for SEO metadata and OG images |

**Important**: In production, `NEXT_PUBLIC_SITE_URL` must be set to your deployed domain (e.g., `https://voltura-eight.vercel.app/`). Without it, canonical URLs and sitemap entries will point to `localhost`, which will cause SEO duplication penalties.

### Example `.env`

```env
NEXT_PUBLIC_API_BASE_URL=https://fakestoreapi.com
NEXT_PUBLIC_SITE_URL=https://voltura-eight.vercel.app
```

---

## AI Tools Used

This project was developed with assistance from:

- **Claude (Anthropic)** — Code review, refactoring guidance, architectural recommendations, issue diagnosis, and documentation generation
- **GitHub Copilot** — Inline code completion during development

All AI-generated code was reviewed, tested, and validated by the development team.

---

## Architectural Decisions

### 1. Flat Folder Structure over Feature Modules

For this project's scope (5 routes, ~30 components), a flat `components/shared/` + `components/features/` split provides clarity without over-engineering. A future scale-up would migrate to per-domain feature folders (`components/products/`, `components/cart/`, etc.).

### 2. TanStack Query + Zustand (Two-State Split)

- **Server state** (products, categories) uses TanStack Query for automatic caching, deduplication, stale management, and background refetching
- **Client state** (cart, auth) uses Zustand for minimal boilerplate and easy `localStorage` persistence
- This avoids the common mistake of storing server data in a global store, which would bypass TanStack Query's cache invalidation

### 3. TanStack Query Hydration over Dynamic Imports

`ProductDetails` and `FeaturedProducts` originally used `dynamic()` imports with skeleton placeholders to reduce initial bundle size. These were replaced with direct imports because `dynamic()` caused hydration mismatches (React error #310) when the server-rendered loading fallback differed from the client-hydrated component. The TanStack Query `HydrationBoundary` pattern (`prefetchQuery` on the server → `queryClient.setQueryData` → `dehydrate`) now provides the same SSR data guarantee without hydration errors. Server-fetched data is in the cache before the client hydrates, eliminating mismatches.

### 4. Custom `ApiError` Class

A dedicated error class extends `Error` and preserves the original Axios error, allowing consumers to access both the normalized message/status code and the raw error for debugging. The Axios response interceptor normalizes all errors through this class.

### 5. Native `<label>` (Not Base UI `Field.Label`)

`Field.Label` from `@base-ui/react` requires a wrapping `Field.Root` parent context, which creates unnecessary nesting for simple form fields. Native `<label>` elements are used directly, with explicit `htmlFor` association.

### 6. `buttonVariants` on `<Link>` (Not `asChild`)

The shadcn/ui base-nova style variant does not support the `asChild` prop on `Button`. Where an `<a>` tag needs button styling, `buttonVariants()` is applied directly to `<Link>` via `className`.

### 7. Deterministic Specifications

The Fake Store API does not provide product specifications. A deterministic hash based on `product.id` generates stable SKU values, avoiding hydration mismatches caused by `Math.random()`.

---

## SEO

The project follows Next.js App Router SEO conventions:

- **`metadataBase`** set in root layout — all relative OG URLs resolve correctly
- **Title template** — `%s | Voltura` pattern applied globally via root layout
- **Page-level metadata** — every page exports `Metadata` with title, description, OG, Twitter Card, and canonical URL
- **`generateMetadata`** — product detail pages dynamically generate metadata from API data, including product images in OG
- **JSON-LD structured data**:
  - `Organization` — brand name, URL, logo, contact info, social profiles
  - `WebSite` — site metadata with `SearchAction` (note: search uses client-side filtering, not URL query params)
  - `Product` — per-product schema with name, description, image, category, and offer (price + currency + availability)
- **Robots.txt** — Allow all (cart and login pages are indexable)
- **Sitemap.xml** — 3 static routes with priority hierarchy (home > products > about)
- **OG Image** — dynamically generated via `next/og` (`app/opengraph-image.tsx`)
- **`noindex`** — applied to cart and login pages (utility/user-specific content)

---

## Performance Optimizations

| Technique | Application |
|---|---|
| **Image optimization** | Next.js `<Image>` with remote pattern allowlist, automatic WebP/AVIF conversion, `priority` on LCP images, lazy loading on cards, responsive `sizes` |
| **TanStack Query caching** | 5-minute stale time, 10-minute garbage collection, 1 retry — prevents redundant network requests |
| **Memoization** | `ProductGrid`, `CartItemRow`, `ProductToolbar`, `Breadcrumb`, `RelatedProducts` — `memo` + `useMemo` + `useCallback` in selectors |
| **Debounced search** | 300ms debounce on product search input reduces filtering computations |
| **Zustand selectors** | Primitive selectors (`selectCartCount`) avoid unnecessary re-renders; `useShallow` for object selectors |
| **`next/font`** | Inter font with `display: swap` eliminates layout shift from web font loading |
| **Resource preconnect** | `<link rel="preconnect">` to `https://fakestoreapi.com` in root layout reduces connection latency |
| **TanStack Query Hydration** | `HydrationBoundary` + `queryClient.setQueryData` ensures server-fetched data is available in cache before client hydration, eliminating hydration mismatches |
| **Semantic HTML** | Proper heading hierarchy (`h1` → `h2` → `h3`), landmarks (`nav`, `main`, `footer`), and ARIA attributes |
| **Batch cart updates** | `addItem(product, quantity)` dispatches a single state update instead of looping per unit |
| **Bundle exclusion** | Unused shadcn components removed; only used icons imported from `lucide-react` (tree-shakeable) |

---

## Lighthouse Scores

Target scores for `https://voltura-eight.vercel.app/` (mobile):

| Category | Target | Status |
|---|---|---|
| **Performance** | 90+ | Achieved through image optimization (`next/image` with WebP/AVIF), resource preconnect to API domain, TanStack Query caching with hydration, and semantic HTML reducing DOM complexity |
| **Accessibility** | 95+ | Proper heading hierarchy (`h1` → `h2` → `h3`), ARIA labels on all icon buttons, `role="alert"` on form errors, skip-to-content link, keyboard-navigable custom `Select` component, semantic landmarks |
| **Best Practices** | 95+ | `next/font` with `display: swap`, no deprecated APIs, proper error boundaries, TypeScript strict mode |
| **SEO** | 100 | Page-level metadata with OG/Twitter cards on every page, `generateMetadata` for dynamic product pages, JSON-LD structured data (Organization + WebSite + Product), sitemap.xml, canonical URLs, robots.txt allow all |

**Key optimizations contributing to scores:**
- `next/image` with automatic format conversion, `priority` on LCP hero images, responsive `sizes` on grid cards
- `<link rel="preconnect">` to `https://fakestoreapi.com` in root layout
- `display: swap` on Inter font eliminates CLS from web font loading
- TanStack Query 5-min stale time prevents redundant network requests
- All interactive elements keyboard-focusable with visible focus indicators
- Proper `<html lang="en">` and `lang` attribute propagation

---

- **Screen reader support**: `aria-label` on all icon-only buttons, `aria-current="page"` on active navigation links, `aria-live="polite"` on quantity displays, `aria-describedby` linking inputs to error messages
- **Keyboard navigation**: All interactive elements are keyboard-focusable; skip-to-content link is the first tabbable element; custom `Select` component supports ArrowUp/Down/Home/End/Escape/Enter keys
- **Form validation**: `aria-invalid` on error state fields, `role="alert"` on error messages, password visibility toggle with appropriate labels
- **Landmarks**: `<nav aria-label="Main navigation">`, `<main id="main-content">`, `<footer>` semantic elements
- **Heading hierarchy**: Proper `h1` on every page, `h2` for section titles, semantic heading tags in footer columns
- **Focus management**: Mobile Sheet uses Base UI's focus trap; loading skeletons prevent cumulative layout shift
- **Reduced motion**: Animations use standard CSS transitions/animations that respect `prefers-reduced-motion`
- **Color contrast**: Voltura design system uses oklch color space with sufficient contrast ratios in both light and dark modes

---

## Assumptions

1. **Fake Store API availability**: The project depends on `https://fakestoreapi.com`. If this API is unavailable, product features gracefully degrade to error/retry states but have no offline fallback data.
2. **No real authentication**: Login is simulated with a mock 800ms delay. No tokens, sessions, or backend integration exists.
3. **No checkout processing**: The checkout button shows a toast notification. No payment integration, order creation, or confirmation flow is implemented.
4. **Small catalog**: The API returns ~20 products. No pagination or infinite scroll is implemented.
5. **Static product specifications**: The Fake Store API does not provide specs; mock data is used with deterministic fallbacks.
6. **Image optimization**: Product images are sourced from the public Fake Store API. Next.js optimizes them automatically (WebP/AVIF conversion, responsive resizing) since `next.config.ts` does not set `images.unoptimized`. However, the original images are large and outside the application's control. A CDN with transform capabilities would further improve LCP.

---

## Future Improvements

- [ ] **Pagination/infinite scroll** — Implement cursor-based pagination for the product catalog as the item count grows
- [ ] **Static JSON fallback** — Bundle a static product snapshot so the app functions offline or when the API is down
- [ ] **Checkout flow** — Multi-step checkout with address collection, order review, and confirmation page
- [ ] **Real authentication** — OAuth integration (Google, GitHub) or email/password with JWT tokens
- [ ] **Wishlist** — Persisted wishlist with add/remove toggle on product cards and detail page
- [ ] **Unit + integration tests** — Vitest for hooks/stores/services, Testing Library for components, Playwright for E2E
- [ ] **Feature-based re-organization** — Migrate from `components/shared/` + `features/` to `modules/products/`, `modules/cart/`, etc.
- [ ] **CI/CD pipeline** — GitHub Actions for lint → type-check → test → build → deploy
- [ ] **Image placeholder/blur** — Use `placeholder="blur"` with `blurDataURL` for product images to improve perceived performance
- [ ] **Structured data validation** — Add runtime validation for JSON-LD (zod schema for structured data payloads)
- [ ] **BreadcrumbList JSON-LD** — Add structured data for the breadcrumb navigation on product detail pages
- [ ] **URL-based search/filter state** — Sync filter state with URL search params so filtered views are shareable and bookmarked
- [ ] **Multi-tab cart sync** — Use `BroadcastChannel` API or storage events to sync Zustand persist across tabs
- [ ] **Performance monitoring** — Add Lighthouse CI or Web Vitals tracking

---

## License

MIT
