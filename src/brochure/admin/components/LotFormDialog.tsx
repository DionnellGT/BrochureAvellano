import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import type { Lot, LotPayload } from "@/api/pricesList.types";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LotFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  defaultValues?: Lot;
  isSubmitting?: boolean;
  onSubmit: (values: LotPayload) => void;
}

// Diálogo controlado y compartido por todos los lotes de una lista: se
// reutiliza tanto para "agregar lote" (defaultValues = undefined) como para
// "editar lote" (defaultValues = el lote seleccionado).
export function LotFormDialog({
  open,
  onOpenChange,
  mode,
  defaultValues,
  isSubmitting,
  onSubmit,
}: LotFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? `Editar lote ${defaultValues?.lot ?? ""}` : "Agregar lote"}
          </DialogTitle>
          <DialogDescription>
            Completa el número de lote, tipología, superficie y el precio contado. Precio
            lista y pie + cuotas son opcionales.
          </DialogDescription>
        </DialogHeader>

        {/* Se monta solo mientras el diálogo está abierto, con key propio del
            lote (o "create"): el estado inicial siempre arranca sincronizado
            sin necesitar un useEffect. */}
        {open && (
          <LotForm
            key={defaultValues?.id ?? "create"}
            mode={mode}
            defaultValues={defaultValues}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

const EMPTY_FORM = {
  lot: "",
  typology: "",
  area: "",
  priceList: "",
  installmentPrice: "",
  installmentPrice2: "",
  cashPrice: "",
};

type FormState = typeof EMPTY_FORM;

function toFormState(lot?: Lot): FormState {
  if (!lot) return EMPTY_FORM;
  return {
    lot: String(lot.lot),
    typology: lot.typology,
    area: String(lot.area),
    priceList: lot.priceList !== null ? String(lot.priceList) : "",
    installmentPrice: lot.installmentPrice !== null ? String(lot.installmentPrice) : "",
    installmentPrice2: lot.installmentPrice2 !== null ? String(lot.installmentPrice2) : "",
    cashPrice: String(lot.cashPrice),
  };
}

interface LotFormProps {
  mode: "create" | "edit";
  defaultValues?: Lot;
  isSubmitting?: boolean;
  onSubmit: (values: LotPayload) => void;
}

function LotForm({ mode, defaultValues, isSubmitting, onSubmit }: LotFormProps) {
  const [form, setForm] = useState<FormState>(() => toFormState(defaultValues));

  const handleChange =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => ({ ...f, [field]: event.target.value }));
    };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({
      lot: Number(form.lot),
      typology: form.typology.trim(),
      area: Number(form.area),
      priceList: form.priceList.trim() === "" ? undefined : Number(form.priceList),
      installmentPrice: form.installmentPrice.trim() === "" ? undefined : Number(form.installmentPrice),
      installmentPrice2: form.installmentPrice2.trim() === "" ? undefined : Number(form.installmentPrice2),
      cashPrice: Number(form.cashPrice),
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="lot-number">N° Lote</Label>
          <Input
            id="lot-number"
            type="number"
            value={form.lot}
            onChange={handleChange("lot")}
            required
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lot-area">Superficie (m²)</Label>
          <Input
            id="lot-area"
            type="number"
            min={0}
            value={form.area}
            onChange={handleChange("area")}
            required
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="lot-typology">Tipología</Label>
        <Input
          id="lot-typology"
          value={form.typology}
          onChange={handleChange("typology")}
          placeholder="Ej: Bosque - Pradera"
          required
        />
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="lot-price-list">
            Precio lista <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <Input
            id="lot-price-list"
            type="number"
            min={0}
            value={form.priceList}
            onChange={handleChange("priceList")}
            placeholder="—"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lot-installment">
            Pie + 11 cuotas <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <Input
            id="lot-installment"
            type="number"
            min={0}
            value={form.installmentPrice}
            onChange={handleChange("installmentPrice")}
            placeholder="—"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lot-installment">
            Pie + 24 cuotas <span className="font-normal text-muted-foreground">(opcional)</span>
          </Label>
          <Input
            id="lot-installment"
            type="number"
            min={0}
            value={form.installmentPrice2}
            onChange={handleChange("installmentPrice2")}
            placeholder="—"
          />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="lot-cash">Contado</Label>
          <Input
            id="lot-cash"
            type="number"
            min={0}
            value={form.cashPrice}
            onChange={handleChange("cashPrice")}
            required
          />
        </div>
      </div>

      <DialogFooter>
        <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
          Cancelar
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          {mode === "edit" ? "Guardar cambios" : "Agregar lote"}
        </Button>
      </DialogFooter>
    </form>
  );
}
