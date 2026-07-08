import { useQuery } from "@tanstack/react-query";
import { productKeys } from "@/lib/constants";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "@/services";
import type { Product } from "@/types";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: productKeys.all,
    queryFn: getAllProducts,
  });
}

export function useProduct(id: number, initialData?: Product) {
  return useQuery<Product>({
    queryKey: productKeys.detail(id),
    queryFn: () => getProductById(id),
    enabled: Boolean(id),
    staleTime: initialData ? 5 * 60 * 1000 : 0,
    initialData: initialData ? () => initialData : undefined,
  });
}

export function useProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: productKeys.category(category),
    queryFn: () => getProductsByCategory(category),
    enabled: Boolean(category),
  });
}
