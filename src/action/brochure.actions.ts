import * as brochureApi from "@/api/brochure.api";
import type { Marca, TipoLista } from "@/api/pricesList.types";

// Sube (o reemplaza) el PDF de brochure de una marca + tipo.
export const uploadBrochureAction = (marca: Marca, tipo: TipoLista, file: File) =>
  brochureApi.uploadBrochure(marca, tipo, file);

// Elimina el PDF de brochure de una marca + tipo.
export const deleteBrochureAction = (marca: Marca, tipo: TipoLista) =>
  brochureApi.deleteBrochure(marca, tipo);
