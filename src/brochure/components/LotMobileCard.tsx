import { ChevronDown } from "lucide-react";
import type { Lot } from "@/brochure/data/data";

interface LotMobileCardProps {
  lote: Lot;
}

/**
 * Tarjeta compacta para un lote, pensada para pantallas móviles.
 * Muestra siempre N° Lote, Tipología y Precio Contado (los 3 datos
 * clave) y despliega el resto de la información (Superficie, Precio
 * Lista y Pie + Cuotas) al tocar la tarjeta.
 */
export function LotMobileCard({ lote }: LotMobileCardProps) {
  return (
    <details className="group rounded-xl border border-mist-border bg-white overflow-hidden">
      <summary className="flex items-center justify-between gap-3 p-4 cursor-pointer list-none marker:content-none [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <p className="font-bold text-foreground">Lote {lote.numero}</p>
          <p className="text-xs text-muted-foreground truncate">{lote.tipologia}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">
              Precio Contado
            </p>
            <p className="font-bold text-tertiary">{lote.precioContado}</p>
          </div>
          <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
        </div>
      </summary>

      <div className="border-t border-mist-border bg-surface-container-low px-4 py-3 space-y-2 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Superficie M2</span>
          <span className="font-medium text-right">{lote.superficie}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Precio Lista</span>
          <span className="text-right">{lote.precioLista}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-muted-foreground">Pie 50% + 11 Cuotas</span>
          <span className="font-semibold text-right">{lote.piePorcentajeCuotas}</span>
        </div>
      </div>
    </details>
  );
}
