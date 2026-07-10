import { Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LotMobileCard } from "@/brochure/components/LotMobileCard";
import type { Project } from "@/brochure/data/data";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article
      id={project.id}
      className="bg-white rounded-2xl shadow-lg border border-mist-border p-6 max-sm:px-3 md:p-10 transition-shadow hover:shadow-xl relative overflow-hidden"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
        <div className="space-y-2">
          <h2 className="font-heading text-2xl md:text-3xl leading-tight font-semibold tracking-tight text-primary flex items-center gap-3">
            {project.nombre}
            <span className="w-12 h-1 bg-moss-container rounded-full hidden md:block" />
          </h2>
          <p className="text-secondary font-medium">{project.subtitulo}</p>
        </div>

        <Button
          render={project.tourUrl ? <a href={project.tourUrl} target="_blank" rel="noreferrer" /> : undefined}
          className={`flex items-center gap-2 px-6 py-3 h-auto rounded-xl font-bold hover:scale-105 transition-all shadow-md active:scale-95 group ${
            project.ctaVariant === "secondary"
              ? "bg-secondary text-secondary-foreground hover:bg-secondary/90"
              : ""
          }`}
        >
          <Box className="size-5 group-hover:rotate-12 transition-transform" />
          Ver recorrido 360°
        </Button>
      </div>

      {/* Tabla completa — solo desktop/tablet */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-mist-border shadow-inner bg-surface-container-low">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-secondary text-white text-sm font-bold uppercase tracking-wider divide-x divide-white/20">
              <th className="py-5 px-6 text-left">N° Lote</th>
              <th className="py-5 px-6 text-left">Tipología</th>
              <th className="py-5 px-6 text-left">Superficie M2</th>
              <th className="py-5 px-6 text-left">Precio Lista</th>
              <th className="py-5 px-6 text-left">Pie 50% + 11 Cuotas</th>
              <th className="py-5 px-6 text-left bg-tertiary">Precio Contado</th>
            </tr>
          </thead>
          <tbody className="text-sm text-foreground">
            {project.lotes.map((lote) => (
              <tr
                key={lote.numero}
                className="border-b border-mist-border divide-x divide-mist-border hover:bg-primary/5 transition-colors"
              >
                <td className="py-5 px-6 font-bold">{lote.numero}</td>
                <td className="py-5 px-6">{lote.tipologia}</td>
                <td className="py-5 px-6 font-medium">{lote.superficie}</td>
                <td className="py-5 px-6 text-muted-foreground">{lote.precioLista}</td>
                <td className="py-5 px-6 font-semibold">{lote.piePorcentajeCuotas}</td>
                <td className="py-5 px-6 bg-tertiary-fixed font-bold text-tertiary text-lg">
                  {lote.precioContado}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Lista de tarjetas desplegables — solo móvil */}
      <div className="md:hidden space-y-3">
        {project.lotes.map((lote) => (
          <LotMobileCard key={lote.numero} lote={lote} />
        ))}
      </div>
    </article>
  );
}
