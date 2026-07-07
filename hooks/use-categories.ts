import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants";
import { getCategories } from "@/services";

export function useCategories() {
  return useQuery<string[]>({
    queryKey: [QUERY_KEYS.categories],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
