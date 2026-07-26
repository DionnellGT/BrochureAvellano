// Acciones de escritura sobre listas de precios. Cada acción envuelve una
// llamada de la capa `api` (POST / PATCH / DELETE) y es lo que consumen los
// hooks de mutación en `hook/`.

import * as pricesListApi from "@/api/pricesList.api";
import type {
  AddLotsPayload,
  CreatePriceListPayload,
  Marca,
  TipoLista,
  UpdateLotPayload,
  UpdatePriceListPayload,
} from "@/api/pricesList.types";

// Crear una nueva lista de precios (marca + tipo + datos generales)
export const createPriceListAction = (payload: CreatePriceListPayload) =>
  pricesListApi.createPriceList(payload);

// Agregar uno o más lotes nuevos a una lista existente, sin borrar los actuales
export const addLotsAction = (id: string, payload: AddLotsPayload) =>
  pricesListApi.addLotsToPriceList(id, payload);

// Editar los datos generales de una lista (y, opcionalmente, reemplazar sus lotes)
export const updatePriceListAction = (id: string, payload: UpdatePriceListPayload) =>
  pricesListApi.updatePriceList(id, payload);

// Editar un lote puntual
export const updateLotAction = (lotId: string, payload: UpdateLotPayload) =>
  pricesListApi.updateLot(lotId, payload);

// Eliminar una lista completa según su id
export const deletePriceListAction = (id: string) =>
  pricesListApi.deletePriceList(id);

// Eliminar un lote puntual según su id
export const deleteLotAction = (lotId: string) =>
  pricesListApi.deleteLot(lotId);

// Eliminar todas las listas de una marca y tipo determinados ("Eliminar todo")
export const deleteAllPriceListsAction = (marca: Marca, tipo: TipoLista) =>
  pricesListApi.deleteAllPriceListsByMarcaAndTipo(marca, tipo);
