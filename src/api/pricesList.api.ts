import axios from "axios";

import { apiClient } from "./axiosInstance";
import type {
  AddLotsPayload,
  BulkDeleteResult,
  CreatePriceListPayload,
  DeleteResult,
  Lot,
  Marca,
  PriceList,
  TipoLista,
  UpdateLotPayload,
  UpdatePriceListPayload,
} from "./pricesList.types";

const BASE_PATH = "/price-list";

// El backend responde 404 cuando una marca/tipo aún no tiene listas creadas.
// Para el panel de administración eso es un estado normal ("todavía no hay
// listas"), no un error, así que se traduce a un arreglo vacío.
const isNotFound = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 404;

// ---- Lecturas (GET) ----

export const getPriceListsByMarca = async (marca: Marca): Promise<PriceList[]> => {
  try {
    const { data } = await apiClient.get<PriceList[]>(`${BASE_PATH}/brand/${marca}`);
    return data;
  } catch (error) {
    if (isNotFound(error)) return [];
    throw error;
  }
};

export const getPriceListsByMarcaAndTipo = async (
  marca: Marca,
  tipo: TipoLista,
): Promise<PriceList[]> => {
  try {
    const { data } = await apiClient.get<PriceList[]>(`${BASE_PATH}/brand/${marca}/${tipo}`);
    return data;
  } catch (error) {
    if (isNotFound(error)) return [];
    throw error;
  }
};

export const getPriceListById = async (id: string): Promise<PriceList> => {
  const { data } = await apiClient.get<PriceList>(`${BASE_PATH}/${id}`);
  return data;
};

// ---- Escrituras (POST / PATCH / DELETE) ----

export const createPriceList = async (
  payload: CreatePriceListPayload,
): Promise<PriceList> => {
  const { data } = await apiClient.post<PriceList>(BASE_PATH, payload);
  return data;
};

export const addLotsToPriceList = async (
  id: string,
  payload: AddLotsPayload,
): Promise<PriceList> => {
  const { data } = await apiClient.post<PriceList>(`${BASE_PATH}/${id}/lot`, payload);
  return data;
};

export const updatePriceList = async (
  id: string,
  payload: UpdatePriceListPayload,
): Promise<PriceList> => {
  const { data } = await apiClient.patch<PriceList>(`${BASE_PATH}/${id}`, payload);
  return data;
};

export const updateLot = async (
  lotId: string,
  payload: UpdateLotPayload,
): Promise<Lot> => {
  const { data } = await apiClient.patch<Lot>(`${BASE_PATH}/lot/${lotId}`, payload);
  return data;
};

export const deletePriceList = async (id: string): Promise<DeleteResult> => {
  const { data } = await apiClient.delete<DeleteResult>(`${BASE_PATH}/${id}`);
  return data;
};

export const deleteLot = async (lotId: string): Promise<DeleteResult> => {
  const { data } = await apiClient.delete<DeleteResult>(`${BASE_PATH}/lot/${lotId}`);
  return data;
};

export const deleteAllPriceListsByMarcaAndTipo = async (
  marca: Marca,
  tipo: TipoLista,
): Promise<BulkDeleteResult> => {
  const { data } = await apiClient.delete<BulkDeleteResult>(
    `${BASE_PATH}/brand/${marca}/${tipo}`,
  );
  return data;
};
