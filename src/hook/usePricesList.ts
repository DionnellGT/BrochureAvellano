import { useQuery } from "@tanstack/react-query";

import { getPriceListsByMarca, getPriceListsByMarcaAndTipo } from "@/api/pricesList.api";
import type { Marca, TipoLista } from "@/api/pricesList.types";

// Clave de query base, compartida con los hooks de mutación para invalidar el cache
export const priceListsQueryKey = (marca: Marca, tipo?: TipoLista) =>
  tipo ? (["price-lists", marca, tipo] as const) : (["price-lists", marca] as const);

// Trae todas las listas de precios de una marca
export function usePriceListsByMarca(marca: Marca) {
  return useQuery({
    queryKey: priceListsQueryKey(marca),
    queryFn: () => getPriceListsByMarca(marca),
  });
}

// Trae las listas de precios de una marca, filtradas por tipo (postventa/cliente)
export function usePriceListsByMarcaAndTipo(marca: Marca, tipo: TipoLista) {
  return useQuery({
    queryKey: priceListsQueryKey(marca, tipo),
    queryFn: () => getPriceListsByMarcaAndTipo(marca, tipo),
  });
}
