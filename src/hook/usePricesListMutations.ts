import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  addLotsAction,
  createPriceListAction,
  deleteAllPriceListsAction,
  deleteLotAction,
  deletePriceListAction,
  updateLotAction,
  updatePriceListAction,
} from "@/action/pricesList.actions";
import type {
  AddLotsPayload,
  CreatePriceListPayload,
  Marca,
  TipoLista,
  UpdateLotPayload,
  UpdatePriceListPayload,
} from "@/api/pricesList.types";
import { priceListsQueryKey } from "./usePricesList";

// Todos los hooks reciben (marca, tipo) para saber qué query de la lista
// invalidar/refrescar en el cache de TanStack Query luego de cada mutación.

export function useCreatePriceList(marca: Marca, tipo: TipoLista) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Omit<CreatePriceListPayload, "marca" | "tipo">) =>
      createPriceListAction({ ...payload, marca, tipo }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: priceListsQueryKey(marca, tipo) });
    },
  });
}

export function useAddLots(marca: Marca, tipo: TipoLista) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AddLotsPayload }) =>
      addLotsAction(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: priceListsQueryKey(marca, tipo) });
    },
  });
}

export function useUpdatePriceList(marca: Marca, tipo: TipoLista) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdatePriceListPayload }) =>
      updatePriceListAction(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: priceListsQueryKey(marca, tipo) });
    },
  });
}

export function useUpdateLot(marca: Marca, tipo: TipoLista) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lotId, payload }: { lotId: string; payload: UpdateLotPayload }) =>
      updateLotAction(lotId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: priceListsQueryKey(marca, tipo) });
    },
  });
}

export function useDeletePriceList(marca: Marca, tipo: TipoLista) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePriceListAction(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: priceListsQueryKey(marca, tipo) });
    },
  });
}

export function useDeleteLot(marca: Marca, tipo: TipoLista) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (lotId: string) => deleteLotAction(lotId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: priceListsQueryKey(marca, tipo) });
    },
  });
}

// "Eliminar todo": borra todas las listas (y sus lotes) de una marca + tipo
export function useDeleteAllPriceLists(marca: Marca, tipo: TipoLista) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteAllPriceListsAction(marca, tipo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: priceListsQueryKey(marca, tipo) });
    },
  });
}
