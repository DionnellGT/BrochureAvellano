import { useState } from "react";
import { Trash2 } from "lucide-react";

import type { Marca, TipoLista } from "@/api/pricesList.types";
import { usePriceListsByMarcaAndTipo } from "@/hook/usePricesList";
import { useDeleteAllPriceLists } from "@/hook/usePricesListMutations";
import { MARCA_LABELS, TIPO_LABELS } from "@/brochure/admin/constants";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/brochure/admin/components/ConfirmDialog";
import { CreatePriceListDialog } from "@/brochure/admin/components/CreatePriceListDialog";
import { ImportPriceListDialog } from "@/brochure/admin/components/ImportPriceListDialog";
import { UploadBrochureDialog } from "@/brochure/admin/components/UploadBrochureDialog";
import { PriceListCard } from "@/brochure/admin/components/PriceListCard";

interface PriceListTypeTabPanelProps {
  marca: Marca;
  tipo: TipoLista;
}

export function PriceListTypeTabPanel({ marca, tipo }: PriceListTypeTabPanelProps) {
  const { data: priceLists, isLoading, isError } = usePriceListsByMarcaAndTipo(marca, tipo);
  const deleteAll = useDeleteAllPriceLists(marca, tipo);
  const [isDeleteAllOpen, setDeleteAllOpen] = useState(false);

  const hasLists = Boolean(priceLists?.length);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          {hasLists ? `${priceLists!.length} lista(s)` : "Sin listas todavía"}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          <CreatePriceListDialog marca={marca} tipo={tipo} />
          <ImportPriceListDialog marca={marca} tipo={tipo} existingLists={priceLists} />
          <UploadBrochureDialog marca={marca} tipo={tipo} />
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-destructive hover:bg-destructive/10 hover:text-destructive"
            disabled={!hasLists}
            onClick={() => setDeleteAllOpen(true)}
          >
            <Trash2 className="size-4" /> Eliminar todo
          </Button>
        </div>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Cargando listas…</p>}

      {isError && (
        <p className="text-sm text-destructive">
          No se pudo cargar la información. Intenta nuevamente.
        </p>
      )}

      {!isLoading && !isError && !hasLists && (
        <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          Aún no hay listas para {TIPO_LABELS[tipo]}. Crea la primera con el botón de arriba.
        </div>
      )}

      <div className="space-y-3">
        {priceLists?.map((priceList) => (
          <PriceListCard key={priceList.id} priceList={priceList} marca={marca} tipo={tipo} />
        ))}
      </div>

      <ConfirmDialog
        open={isDeleteAllOpen}
        onOpenChange={setDeleteAllOpen}
        title="¿Eliminar todas las listas?"
        description={`Se eliminarán las ${priceLists?.length ?? 0} lista(s) de precios de ${MARCA_LABELS[marca]} · ${TIPO_LABELS[tipo]}, junto con todos sus lotes. Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar todo"
        isLoading={deleteAll.isPending}
        onConfirm={() => deleteAll.mutate(undefined, { onSuccess: () => setDeleteAllOpen(false) })}
      />
    </div>
  );
}
