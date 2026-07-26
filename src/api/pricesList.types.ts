// Tipos que espejan el módulo `pricesList` de la API principal (GlobalApi).
// Nota: este proyecto compila con `erasableSyntaxOnly`, que no permite el
// `enum` real de TypeScript. Se usa el patrón `const as const` + tipo
// derivado, que se usa exactamente igual (`Marca.ELAVELLANO`, `marca: Marca`)
// pero es puramente "erasable".

export const Marca = {
  ELAVELLANO: "elavellano",
  GLOBALTERRENOS: "globalterrenos",
  REMATEDETERRENOS: "rematedeterrenos",
} as const;
export type Marca = (typeof Marca)[keyof typeof Marca];

export const TipoLista = {
  POSTVENTA: "postventa",
  CLIENTE: "cliente",
} as const;
export type TipoLista = (typeof TipoLista)[keyof typeof TipoLista];

export interface Lot {
  id: string;
  lot: number;
  typology: string;
  area: number;
  priceList: number | null;
  installmentPrice: number | null;
  cashPrice: number;
}

export interface PriceList {
  id: string;
  marca: Marca;
  tipo: TipoLista;
  name: string;
  description: string | null;
  has360Tour: string | null;
  lots: Lot[];
}

// ---- Payloads (bodies) ----

export interface LotPayload {
  lot: number;
  typology: string;
  area: number;
  priceList?: number;
  installmentPrice?: number;
  cashPrice: number;
}

export interface CreatePriceListPayload {
  marca: Marca;
  tipo: TipoLista;
  name: string;
  description?: string;
  has360Tour?: string;
  lots?: LotPayload[];
}

export type UpdatePriceListPayload = Partial<CreatePriceListPayload>;

export type UpdateLotPayload = Partial<LotPayload>;

export interface AddLotsPayload {
  lots: LotPayload[];
}

export interface DeleteResult {
  id: string;
  message: string;
}

export interface BulkDeleteResult {
  marca: Marca;
  tipo: TipoLista;
  deleted: number;
  message: string;
}

export interface BrochureInfo {
  marca: Marca;
  tipo: TipoLista;
  exists: boolean;
  url: string | null;
  updatedAt: string | null;
}
