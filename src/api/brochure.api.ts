import { apiClient } from "./axiosInstance";
import type { BrochureInfo, Marca, TipoLista } from "./pricesList.types";

const BASE_PATH = "/price-list";

export const getBrochureInfo = async (
  marca: Marca,
  tipo: TipoLista,
): Promise<BrochureInfo> => {
  const { data } = await apiClient.get<BrochureInfo>(
    `${BASE_PATH}/brand/${marca}/${tipo}/brochure`,
  );
  return data;
};

// Elimina el PDF de brochure de una marca + tipo (si existe).
export const deleteBrochure = async (
  marca: Marca,
  tipo: TipoLista,
): Promise<BrochureInfo> => {
  const { data } = await apiClient.delete<BrochureInfo>(
    `${BASE_PATH}/brand/${marca}/${tipo}/brochure`,
  );
  return data;
};

// Sube (o reemplaza, si ya había uno) el PDF de brochure de una marca + tipo.
export const uploadBrochure = async (
  marca: Marca,
  tipo: TipoLista,
  file: File,
): Promise<BrochureInfo> => {
  const formData = new FormData();
  formData.append("file", file);

  // No se fuerza el header Content-Type a mano: Axios/el navegador arman el
  // boundary del multipart automáticamente al detectar un FormData.
  const { data } = await apiClient.post<BrochureInfo>(
    `${BASE_PATH}/brand/${marca}/${tipo}/brochure`,
    formData,
  );
  return data;
};
