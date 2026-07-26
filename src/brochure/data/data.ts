// Tipos de presentación del brochure público. Los valores ya vienen
// formateados como strings (con "$", separador de miles y "m²") porque
// esta es la forma en la que los componentes visuales (ProjectCard,
// LotMobileCard) siempre esperaron los datos. El mapeo desde la data real
// de la API ("@/api/pricesList.types") vive en "mapPriceListToProject.ts".

export interface Lot {
  numero: string;
  tipologia: string;
  superficie: string;
  precioLista: string;
  piePorcentajeCuotas: string;
  precioContado: string;
}

export interface Project {
  id: string;
  nombre: string;
  subtitulo: string;
  tourUrl?: string;
  ctaVariant: "primary" | "secondary";
  lotes: Lot[];
}
