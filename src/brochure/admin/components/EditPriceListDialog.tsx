import { useState, type FormEvent } from "react";
import { Loader2 } from "lucide-react";

import type { PriceList, UpdatePriceListPayload } from "@/api/pricesList.types";
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
import { Textarea } from "@/components/ui/textarea";

interface EditPriceListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  priceList: PriceList;
  isSubmitting?: boolean;
  onSubmit: (payload: UpdatePriceListPayload) => void;
}

// Diálogo controlado (sin trigger propio): se abre/cierra desde PriceListCard,
// que ya conoce la lista sobre la que se está trabajando.
export function EditPriceListDialog({
  open,
  onOpenChange,
  priceList,
  isSubmitting,
  onSubmit,
}: EditPriceListDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar lista</DialogTitle>
          <DialogDescription>
            Actualiza los datos generales de &quot;{priceList.name}&quot;.
          </DialogDescription>
        </DialogHeader>

        {/* Se monta solo mientras el diálogo está abierto: al montar toma un
            key propio de la lista, así el estado inicial siempre arranca
            sincronizado con "priceList" sin necesitar un useEffect. */}
        {open && (
          <EditPriceListForm
            key={priceList.id}
            priceList={priceList}
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

interface EditPriceListFormProps {
  priceList: PriceList;
  isSubmitting?: boolean;
  onSubmit: (payload: UpdatePriceListPayload) => void;
}

function EditPriceListForm({ priceList, isSubmitting, onSubmit }: EditPriceListFormProps) {
  const [form, setForm] = useState(() => ({
    name: priceList.name,
    description: priceList.description ?? "",
    has360Tour: priceList.has360Tour ?? "",
  }));

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({
      name: form.name.trim(),
      description: form.description.trim() || undefined,
      has360Tour: form.has360Tour.trim() || undefined,
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <Label htmlFor="edit-name">Nombre</Label>
        <Input
          id="edit-name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="edit-description">Descripción</Label>
        <Textarea
          id="edit-description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="edit-tour">Link tour 360°</Label>
        <Input
          id="edit-tour"
          value={form.has360Tour}
          onChange={(e) => setForm((f) => ({ ...f, has360Tour: e.target.value }))}
          placeholder="https://..."
        />
      </div>

      <DialogFooter>
        <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
          Cancelar
        </DialogClose>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Guardar cambios
        </Button>
      </DialogFooter>
    </form>
  );
}
