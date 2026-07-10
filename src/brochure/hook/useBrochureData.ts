import { useQuery } from "@tanstack/react-query";
import { brochureData, type BrochureData } from "@/brochure/data/data";

/**
 * Simula la obtención de la data del brochure de forma asíncrona.
 * En el futuro este archivo es el único punto a modificar si la
 * información pasa a venir de una API o un CMS.
 */
async function fetchBrochureData(): Promise<BrochureData> {
  // Se mantiene async para dejar el hook listo ante un futuro fetch real.
  return Promise.resolve(brochureData);
}

export const BROCHURE_QUERY_KEY = ["brochure-data"] as const;

/**
 * Hook que gestiona y expone la data del brochure usando React Query.
 * Centraliza el estado de carga/error para todos los componentes que
 * consuman información del proyecto.
 */
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
