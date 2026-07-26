import { useState, type ChangeEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  CircleAlert,
  CircleCheck,
  Download,
  FileSpreadsheet,
  Loader2,
  UploadCloud,
} from "lucide-react";

import type { Marca, PriceList, TipoLista } from "@/api/pricesList.types";
import { addLotsAction, createPriceListAction } from "@/action/pricesList.actions";
import { priceListsQueryKey } from "@/hook/usePricesList";
import {
  downloadImportTemplate,
  groupRowsIntoPriceLists,
  parsePriceListFile,
  type ImportGroup,
} from "@/lib/priceListImport";
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

interface ImportPriceListDialogProps {
  marca: Marca;
  tipo: TipoLista;
  existingLists: PriceList[] | undefined;
}

type Step = "select" | "preview" | "importing" | "done";

const sameName = (a: string, b: string) => a.trim().toLowerCase() === b.trim().toLowerCase();

export function ImportPriceListDialog({ marca, tipo, existingLists }: ImportPriceListDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("select");
  const [fileName, setFileName] = useState("");
  const [groups, setGroups] = useState<ImportGroup[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [summary, setSummary] = useState<{ created: number; updated: number; failed: number } | null>(null);
  const queryClient = useQueryClient();

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setStep("select");
      setFileName("");
      setGroups([]);
      setErrors([]);
      setProgress(0);
      setSummary(null);
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = ""; // permite volver a elegir el mismo archivo si se corrige

    if (!file) return;
    setFileName(file.name);

    try {
      const rows = await parsePriceListFile(file);
      const { groups: parsedGroups, errors: rowErrors } = groupRowsIntoPriceLists(rows);
      setGroups(parsedGroups);
      setErrors(rowErrors);
    } catch (error) {
      setGroups([]);
      setErrors([error instanceof Error ? error.message : "No se pudo leer el archivo."]);
    } finally {
      setStep("preview");
    }
  };

  const handleImport = async () => {
    setStep("importing");
    setProgress(0);

    let created = 0;
    let updated = 0;
    let failed = 0;

    for (const group of groups) {
      const existing = existingLists?.find((list) => sameName(list.name, group.name));

      try {
        if (existing) {
          await addLotsAction(existing.id, { lots: group.lots });
          updated++;
        } else {
          await createPriceListAction({
            marca,
            tipo,
            name: group.name,
            description: group.description,
            has360Tour: group.has360Tour,
            lots: group.lots,
          });
          created++;
        }
      } catch {
        failed++;
      }

      setProgress((p) => p + 1);
    }

    await queryClient.invalidateQueries({ queryKey: priceListsQueryKey(marca, tipo) });
    setSummary({ created, updated, failed });
    setStep("done");
  };

  const totalLots = groups.reduce((acc, group) => acc + group.lots.length, 0);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "gap-1.5")}>
        <FileSpreadsheet className="size-4" /> Importar CSV/Excel
      </DialogTrigger>

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Importar listas y lotes</DialogTitle>
          <DialogDescription>
            Sube un .csv o .xlsx con una fila por lote. Si el nombre de la lista ya existe se
            le agregan los lotes nuevos; si no existe, se crea.
          </DialogDescription>
        </DialogHeader>

        <button
          type="button"
          onClick={downloadImportTemplate}
          className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <Download className="size-3.5" /> Descargar plantilla de ejemplo
        </button>

        {step === "select" && (
          <label className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground transition-colors hover:bg-muted/40">
            <UploadCloud className="size-8" />
            <span>Haz clic para elegir un archivo .csv o .xlsx</span>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}

        {step === "preview" && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Archivo: <span className="font-medium text-foreground">{fileName}</span>
            </p>

            {errors.length > 0 && (
              <div className="max-h-32 space-y-1 overflow-y-auto rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {errors.map((error) => (
                  <div key={error} className="flex items-start gap-1.5">
                    <CircleAlert className="mt-0.5 size-3.5 shrink-0" />
                    {error}
                  </div>
                ))}
              </div>
            )}

            {groups.length > 0 && (
              <>
                <p className="text-sm font-medium text-foreground">
                  Se detectaron {groups.length} lista(s) con {totalLots} lote(s) en total:
                </p>
                <div className="max-h-56 space-y-1.5 overflow-y-auto rounded-lg border border-border p-2">
                  {groups.map((group) => {
                    const existing = existingLists?.find((list) => sameName(list.name, group.name));
                    return (
                      <div
                        key={group.name}
                        className="flex items-center justify-between gap-2 rounded-md bg-muted/50 px-2.5 py-1.5 text-sm"
                      >
                        <span className="truncate font-medium">{group.name}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">
                          {group.lots.length} lote(s) ·{" "}
                          {existing ? "se agregan a lista existente" : "lista nueva"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {groups.length === 0 && errors.length === 0 && (
              <p className="text-sm text-muted-foreground">No se encontraron filas para importar.</p>
            )}
          </div>
        )}

        {step === "importing" && (
          <div className="flex flex-col items-center gap-3 py-6 text-sm text-muted-foreground">
            <Loader2 className="size-6 animate-spin text-primary" />
            Importando {progress} de {groups.length} lista(s)…
          </div>
        )}

        {step === "done" && summary && (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 p-6 text-center text-sm">
            <CircleCheck className="size-8 text-primary" />
            <p className="font-medium text-foreground">Importación completada</p>
            <p className="text-muted-foreground">
              {summary.created} lista(s) nueva(s) creada(s), {summary.updated} lista(s)
              existente(s) actualizada(s) con lotes nuevos
              {summary.failed > 0 && `, ${summary.failed} lista(s) fallaron`}.
            </p>
          </div>
        )}

        <DialogFooter>
          {step !== "importing" && (
            <DialogClose className={cn(buttonVariants({ variant: "outline" }))}>
              {step === "done" ? "Cerrar" : "Cancelar"}
            </DialogClose>
          )}
          {step === "preview" && groups.length > 0 && (
            <Button onClick={handleImport}>Importar {groups.length} lista(s)</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
