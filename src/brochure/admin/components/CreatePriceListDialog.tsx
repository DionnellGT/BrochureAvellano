import { useState, type FormEvent } from "react";
import { Loader2, Plus } from "lucide-react";

import type { Marca, TipoLista } from "@/api/pricesList.types";
import { useCreatePriceList } from "@/hook/usePricesListMutations";
import { MARCA_LABELS, TIPO_LABELS } from "@/brochure/admin/constants";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CreatePriceListDialogProps {
  marca: Marca;
  tipo: TipoLista;
}

const EMPTY_FORM = { name: "", description: "", has360Tour: "" };

export function CreatePriceListDialog({ marca, tipo }: CreatePriceListDialogProps) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const createPriceList = useCreatePriceList(marca, tipo);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setForm(EMPTY_FORM);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    createPriceList.mutate(
      {
        name: form.name.trim(),
        description: form.description.trim() || undefined,
        has360Tour: form.has360Tour.trim() || undefined,
      },
      { onSuccess: () => handleOpenChange(false) },
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className={cn(buttonVariants({ size: "sm" }), "gap-1.5")}>
        <Plus className="size-4" /> Crear lista
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nueva lista de precios</DialogTitle>
          <DialogDescription>
            Se creará para {MARCA_LABELS[marca]} · {TIPO_LABELS[tipo]}. Podrás agregar los
            lotes después de crearla.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label htmlFor="create-name">Nombre</Label>
            <Input
              id="create-name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Ej: Choroihue"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="create-description">Descripción</Label>
            <Textarea
              id="create-description"
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              placeholder="Ej: La combinación perfecta entre pradera y bosque."
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="create-tour">Link tour 360°</Label>
            <Input
              id="create-tour"
              value={form.has360Tour}
              onChange={(e) => setForm((f) => ({ ...f, has360Tour: e.target.value }))}
              placeholder="https://..."
            />
          </div>

          <DialogFooter>
            <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
              Cancelar
            </DialogClose>
            <Button type="submit" disabled={createPriceList.isPending}>
              {createPriceList.isPending && <Loader2 className="size-4 animate-spin" />}
              Crear lista
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
