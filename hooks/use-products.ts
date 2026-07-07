import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
} from "@/services";
import type { Product } from "@/types";

export function useProducts() {
  return useQuery<Product[]>({
    queryKey: [QUERY_KEYS.products],
    queryFn: getAllProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: [QUERY_KEYS.product, id],
    queryFn: () => getProductById(id),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: Boolean(id),
  });
}

export function useProductsByCategory(category: string) {
  return useQuery<Product[]>({
    queryKey: [QUERY_KEYS.products, "category", category],
    queryFn: () => getProductsByCategory(category),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: Boolean(category),
  });
}
