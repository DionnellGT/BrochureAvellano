import { useState } from "react";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";

import type { Lot, Marca, PriceList, TipoLista } from "@/api/pricesList.types";
import {
  useAddLots,
  useDeleteLot,
  useDeletePriceList,
  useUpdateLot,
  useUpdatePriceList,
} from "@/hook/usePricesListMutations";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConfirmDialog } from "@/brochure/admin/components/ConfirmDialog";
import { EditPriceListDialog } from "@/brochure/admin/components/EditPriceListDialog";
import { LotFormDialog } from "@/brochure/admin/components/LotFormDialog";

interface PriceListCardProps {
  priceList: PriceList;
  marca: Marca;
  tipo: TipoLista;
}

type LotDialogState = { mode: "create" | "edit"; lot?: Lot };

export function PriceListCard({ priceList, marca, tipo }: PriceListCardProps) {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [lotDialog, setLotDialog] = useState<LotDialogState | null>(null);
  const [lotToDelete, setLotToDelete] = useState<Lot | null>(null);

  const updatePriceList = useUpdatePriceList(marca, tipo);
  const deletePriceList = useDeletePriceList(marca, tipo);
  const addLots = useAddLots(marca, tipo);
  const updateLot = useUpdateLot(marca, tipo);
  const deleteLot = useDeleteLot(marca, tipo);

  return (
    <div className="space-y-3 rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-card-foreground">{priceList.name}</h3>
          {priceList.description && (
            <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
              {priceList.description}
            </p>
          )}
          {priceList.has360Tour && (
            <a
              href={priceList.has360Tour}
              target="_blank"
              rel="noreferrer"
              className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
            >
              <ExternalLink className="size-3" /> Tour 360°
            </a>
          )}
        </div>

        {/* Editar / eliminar la lista — a la derecha */}
        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Editar lista"
            onClick={() => setEditOpen(true)}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Eliminar lista"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-1.5">
        {priceList.lots.length === 0 && (
          <p className="text-xs text-muted-foreground italic">Sin lotes cargados todavía.</p>
        )}

        {priceList.lots.map((lot) => (
          <div
            key={lot.id}
            className="flex items-center justify-between gap-2 rounded-lg bg-muted/60 px-3 py-2"
          >
            <div className="min-w-0 text-sm">
              <span className="font-semibold text-foreground">Lote {lot.lot}</span>
              <span className="text-muted-foreground"> · {lot.typology} · {lot.area} m²</span>
              <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                {lot.priceList !== null && (
                  <span>
                    Precio lista: <span className="font-medium text-foreground">{formatCurrency(lot.priceList)}</span>
                  </span>
                )}
                {lot.installmentPrice !== null && (
                  <span>
                    Pie + cuota: <span className="font-medium text-foreground">{formatCurrency(lot.installmentPrice)}</span>
                  </span>
                )}
                <span>
                  Contado: <span className="font-medium text-foreground">{formatCurrency(lot.cashPrice)}</span>
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-0.5">
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Editar lote"
                onClick={() => setLotDialog({ mode: "edit", lot })}
              >
                <Pencil className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-xs"
                aria-label="Eliminar lote"
                className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={() => setLotToDelete(lot)}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="outline"
          size="sm"
          className="w-full gap-1.5"
          onClick={() => setLotDialog({ mode: "create" })}
        >
          <Plus className="size-3.5" /> Agregar lote
        </Button>
      </div>

      {/* Editar lista */}
      <EditPriceListDialog
        open={isEditOpen}
        onOpenChange={setEditOpen}
        priceList={priceList}
        isSubmitting={updatePriceList.isPending}
        onSubmit={(payload) =>
          updatePriceList.mutate(
            { id: priceList.id, payload },
            { onSuccess: () => setEditOpen(false) },
          )
        }
      />

      {/* Eliminar lista */}
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setDeleteOpen}
        title="¿Eliminar esta lista?"
        description={`Se eliminará "${priceList.name}" junto con sus ${priceList.lots.length} lote(s). Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar lista"
        isLoading={deletePriceList.isPending}
        onConfirm={() =>
          deletePriceList.mutate(priceList.id, { onSuccess: () => setDeleteOpen(false) })
        }
      />

      {/* Crear / editar lote */}
      <LotFormDialog
        open={lotDialog !== null}
        onOpenChange={(nextOpen) => !nextOpen && setLotDialog(null)}
        mode={lotDialog?.mode ?? "create"}
        defaultValues={lotDialog?.lot}
        isSubmitting={addLots.isPending || updateLot.isPending}
        onSubmit={(values) => {
          if (lotDialog?.mode === "edit" && lotDialog.lot) {
            updateLot.mutate(
              { lotId: lotDialog.lot.id, payload: values },
              { onSuccess: () => setLotDialog(null) },
            );
          } else {
            addLots.mutate(
              { id: priceList.id, payload: { lots: [values] } },
              { onSuccess: () => setLotDialog(null) },
            );
          }
        }}
      />

      {/* Eliminar lote */}
      <ConfirmDialog
        open={lotToDelete !== null}
        onOpenChange={(nextOpen) => !nextOpen && setLotToDelete(null)}
        title="¿Eliminar este lote?"
        description={
          lotToDelete
            ? `Se eliminará el lote ${lotToDelete.lot} (${lotToDelete.typology}).`
            : ""
        }
        confirmLabel="Eliminar lote"
        isLoading={deleteLot.isPending}
        onConfirm={() =>
          lotToDelete &&
          deleteLot.mutate(lotToDelete.id, { onSuccess: () => setLotToDelete(null) })
        }
      />
    </div>
  );
}
