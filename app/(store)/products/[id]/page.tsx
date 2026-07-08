import { getProductById } from "@/services/products";
import { ProductJsonLd } from "@/components/shared/json-ld";
import { ProductDetails } from "@/components/features/product-details";
import { SITE } from "@/lib/constants";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

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
  if (!Number.isFinite(productId)) {
    notFound();
  }

  let initialProduct = undefined;
  try {
    initialProduct = await getProductById(productId);
  } catch {
    // fall through — TanStack Query will fetch on the client
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
      {initialProduct && <ProductJsonLd product={initialProduct} />}
      <ProductDetails productId={productId} initialProduct={initialProduct} />
    </div>
  );
}
