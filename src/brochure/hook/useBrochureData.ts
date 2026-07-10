import { useQuery } from "@tanstack/react-query";
import { brochureData, type BrochureData } from "@/brochure/data/data";

async function fetchBrochureData(): Promise<BrochureData> {
  return Promise.resolve(brochureData);
}

export const BROCHURE_QUERY_KEY = ["brochure-data"] as const;

export function useBrochureData() {
  const query = useQuery({
    queryKey: BROCHURE_QUERY_KEY,
    queryFn: fetchBrochureData,
    staleTime: Infinity,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}
