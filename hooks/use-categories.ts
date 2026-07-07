import { useQuery } from "@tanstack/react-query";
import { categoryKeys } from "@/lib/constants";
import { getCategories } from "@/services";

export function useCategories() {
  return useQuery<string[]>({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30,
  });
}
