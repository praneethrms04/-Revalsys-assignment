import dynamic from "next/dynamic";
import { getProductById } from "@/services/products";
import { ProductJsonLd } from "@/components/shared/json-ld";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";

const ProductDetails = dynamic(
  () => import("@/components/features/product-details").then((m) => ({ default: m.ProductDetails })),
  {
    ssr: true,
    loading: () => (
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square max-w-md rounded-2xl bg-muted" />
          <div className="h-4 w-48 rounded-lg bg-muted" />
          <div className="h-6 w-72 rounded-lg bg-muted" />
          <div className="h-4 w-full max-w-96 rounded-lg bg-muted" />
        </div>
        <div className="space-y-4">
          <div className="h-8 w-64 rounded-lg bg-muted" />
          <div className="h-24 w-full rounded-lg bg-muted" />
          <div className="h-12 w-full rounded-lg bg-muted" />
        </div>
      </div>
    ),
  }
);

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const productId = Number(id);

  if (!Number.isFinite(productId)) {
    return { title: "Product Not Found" };
  }

  try {
    const product = await getProductById(productId);
    const url = `${SITE.url}/products/${id}`;
    const productTitle =
      product.title.length > 60
        ? `${product.title.slice(0, 57)}...`
        : product.title;

    return {
      title: productTitle,
      description: product.description.slice(0, 160),
      alternates: { canonical: url },
      openGraph: {
        title: product.title,
        description: product.description.slice(0, 160),
        images: [{ url: product.image }],
        url,
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description: product.description.slice(0, 160),
        images: [product.image],
      },
    };
  } catch {
    return { title: "Product Not Found", robots: { index: false } };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const productId = Number(id);

  let initialProduct = undefined;
  if (Number.isFinite(productId)) {
    try {
      initialProduct = await getProductById(productId);
    } catch {
      // fall through — TanStack Query will fetch on the client
    }
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
      {initialProduct && <ProductJsonLd product={initialProduct} />}
      <ProductDetails productId={productId} initialProduct={initialProduct} />
    </div>
  );
}
