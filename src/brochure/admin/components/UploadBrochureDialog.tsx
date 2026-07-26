import { useState, type ChangeEvent } from "react";
import { CheckCircle2, FileUp, Loader2, Trash2, UploadCloud } from "lucide-react";

import type { Marca, TipoLista } from "@/api/pricesList.types";
import { getAssetUrl } from "@/api/axiosInstance";
import { useBrochureInfo, useDeleteBrochure, useUploadBrochure } from "@/hook/useBrochure";
import { cn, getErrorMessage } from "@/lib/utils";
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
import { ConfirmDialog } from "@/brochure/admin/components/ConfirmDialog";

interface UploadBrochureDialogProps {
  marca: Marca;
  tipo: TipoLista;
}

// Botón + diálogo para subir (o reemplazar/eliminar) el PDF de brochure de
// una marca + tipo. Es el mismo PDF que descarga el botón "Descargar
// Brochure" del sitio público (Hero.tsx), para esa marca y ese tipo de página.
export function UploadBrochureDialog({ marca, tipo }: UploadBrochureDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const { data: brochure, isLoading } = useBrochureInfo(marca, tipo);
  const uploadBrochure = useUploadBrochure(marca, tipo);
  const deleteBrochure = useDeleteBrochure(marca, tipo);

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setSelectedFile(null);
      uploadBrochure.reset();
      deleteBrochure.reset();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files?.[0] ?? null);
    uploadBrochure.reset();
  };

  const handleUpload = () => {
    if (!selectedFile) return;
    uploadBrochure.mutate(selectedFile, { onSuccess: () => setSelectedFile(null) });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}>
          <FileUp className="size-4" /> Brochure PDF
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Brochure PDF</DialogTitle>
            <DialogDescription>
              Es el PDF que se descarga desde el botón "Descargar Brochure" del sitio público
              para esta marca y tipo. Subir uno nuevo reemplaza al anterior. Máximo 30MB.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {isLoading && <p className="text-sm text-muted-foreground">Consultando...</p>}

            {!isLoading && brochure?.exists && (
              <div className="flex items-center justify-between gap-3 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm">
                <span className="flex items-center gap-1.5 text-foreground">
                  <CheckCircle2 className="size-4 text-primary shrink-0" /> Ya hay un PDF cargado
                </span>
                <div className="flex shrink-0 items-center gap-3">
                  {brochure.url && (
                    <a
                      href={getAssetUrl(brochure.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      Ver actual
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={() => setDeleteOpen(true)}
                    className="flex items-center gap-1 font-medium text-destructive hover:underline"
                  >
                    <Trash2 className="size-3.5" /> Eliminar
                  </button>
                </div>
              </div>
            )}

            {!isLoading && brochure && !brochure.exists && (
              <p className="text-sm text-muted-foreground">
                Todavía no hay ningún PDF cargado para esta marca y tipo.
              </p>
            )}

            <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground transition-colors hover:bg-muted/40">
              <UploadCloud className="size-7" />
              <span>{selectedFile ? selectedFile.name : "Haz clic para elegir un archivo .pdf"}</span>
              <input type="file" accept="application/pdf,.pdf" className="hidden" onChange={handleFileChange} />
            </label>

            {uploadBrochure.isError && (
              <p className="text-sm text-destructive">
                {getErrorMessage(
                  uploadBrochure.error,
                  "No se pudo subir el archivo. Verifica que sea un PDF válido e intenta de nuevo.",
                )}
              </p>
            )}
            {uploadBrochure.isSuccess && (
              <p className="text-sm text-primary">PDF actualizado correctamente.</p>
            )}

            {deleteBrochure.isError && (
              <p className="text-sm text-destructive">
                {getErrorMessage(deleteBrochure.error, "No se pudo eliminar el PDF. Intenta de nuevo.")}
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>Cerrar</DialogClose>
            <Button
              type="button"
              onClick={handleUpload}
              disabled={!selectedFile || uploadBrochure.isPending}
              className="gap-1.5"
            >
              {uploadBrochure.isPending && <Loader2 className="size-4 animate-spin" />}
              {brochure?.exists ? "Reemplazar PDF" : "Subir PDF"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmación para eliminar el PDF (también del servidor) — hermano
          de <Dialog>, no anidado adentro, para no mezclar dos modales. */}
      <ConfirmDialog
        open={isDeleteOpen}
        onOpenChange={setDeleteOpen}
        title="¿Eliminar el PDF de brochure?"
        description='Se eliminará del servidor y dejará de estar disponible en el botón "Descargar Brochure" del sitio público para esta marca y tipo. Podrás subir uno nuevo cuando quieras.'
        confirmLabel="Eliminar PDF"
        isLoading={deleteBrochure.isPending}
        onConfirm={() => deleteBrochure.mutate(undefined, { onSuccess: () => setDeleteOpen(false) })}
      />
    </>
  );
}
