import { Marca, TipoLista } from "@/api/pricesList.types";

export const MARCA_LABELS: Record<Marca, string> = {
  [Marca.ELAVELLANO]: "El Avellano",
  [Marca.GLOBALTERRENOS]: "Global Terrenos",
  [Marca.REMATEDETERRENOS]: "Remate de Terrenos",
};

export const TIPO_LABELS: Record<TipoLista, string> = {
  [TipoLista.POSTVENTA]: "Postventa",
  [TipoLista.CLIENTE]: "Cliente",
};
