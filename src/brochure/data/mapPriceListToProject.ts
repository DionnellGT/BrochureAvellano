import type { Lot as ApiLot, PriceList } from "@/api/pricesList.types";
import type { Lot, Project } from "@/brochure/data/data";

// Convierte los valores numéricos crudos de la API al formato de texto que
// ya usan los componentes visuales del brochure ("$18.900.000", "5.000 m²").

function formatCLP(value: number): string {
  return `$${value.toLocaleString("es-CL")}`;
}

function formatArea(value: number): string {
  return `${value.toLocaleString("es-CL")} m²`;
}

// "Precio lista" y "Pie + cuotas" son opcionales en la API: cuando el lote
// no los tiene cargados, se muestran como "-" (igual que en los PDF de
// precios para cliente, que solo publican el precio contado).
function mapLot(lot: ApiLot): Lot {
  return {
    numero: String(lot.lot),
    tipologia: lot.typology,
    superficie: formatArea(lot.area),
    precioLista: lot.priceList !== null ? formatCLP(lot.priceList) : "-",
    piePorcentajeCuotas: lot.installmentPrice !== null ? formatCLP(lot.installmentPrice) : "-",
    piePorcentajeCuotas2: lot.installmentPrice2 !== null ? formatCLP(lot.installmentPrice2) : "-",
    precioContado: formatCLP(lot.cashPrice),
  };
}

export function mapPriceListToProject(priceList: PriceList): Project {
  return {
    id: priceList.id,
    nombre: priceList.name,
    subtitulo: priceList.description ?? "",
    tourUrl: priceList.has360Tour ?? undefined,
    ctaVariant: "primary",
    lotes: priceList.lots.map(mapLot),
  };
}
