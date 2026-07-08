import { apiClient } from "./axios-instance";
import { API } from "@/lib/constants";
import type { Product } from "@/types";

export async function getAllProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>(API.endpoints.products);
  return data;
}

export async function getProductById(id: number): Promise<Product> {
  const { data } = await apiClient.get<Product>(API.endpoints.product(id));
  s;
  return data;
}

export async function getCategories(): Promise<string[]> {
  const { data } = await apiClient.get<string[]>(API.endpoints.categories);
  return data;
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const { data } = await apiClient.get<Product[]>(
    `${API.endpoints.products}/category/${encodeURIComponent(category)}`,
  );
  return data;
}
