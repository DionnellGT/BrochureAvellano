import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getBrochureInfo } from "@/api/brochure.api";
import { deleteBrochureAction, uploadBrochureAction } from "@/action/brochure.actions";
import type { Marca, TipoLista } from "@/api/pricesList.types";

export const brochureQueryKey = (marca: Marca, tipo: TipoLista) =>
  ["brochure", marca, tipo] as const;

// Info del PDF de brochure vigente (si existe) para una marca + tipo.
export function useBrochureInfo(marca: Marca, tipo: TipoLista) {
  return useQuery({
    queryKey: brochureQueryKey(marca, tipo),
    queryFn: () => getBrochureInfo(marca, tipo),
  });
}

// Sube (o reemplaza) el PDF de brochure de una marca + tipo.
export function useUploadBrochure(marca: Marca, tipo: TipoLista) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadBrochureAction(marca, tipo, file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brochureQueryKey(marca, tipo) });
    },
  });
}

// Elimina el PDF de brochure de una marca + tipo.
export function useDeleteBrochure(marca: Marca, tipo: TipoLista) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteBrochureAction(marca, tipo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: brochureQueryKey(marca, tipo) });
    },
  });
}
