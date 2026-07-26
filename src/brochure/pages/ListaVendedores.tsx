import { ProjectsSection } from "../components/ProjectsSection"
import { useProjectsByMarcaAndTipo } from "../hook/useProjectsByMarcaAndTipo";
import { Marca, TipoLista } from "@/api/pricesList.types";

export const ListaVendedores = () => {
  const { projects, isLoading, isError } = useProjectsByMarcaAndTipo(
    Marca.ELAVELLANO,
    TipoLista.POSTVENTA,
  );

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-muted-foreground">
        Cargando listas de precios...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-destructive text-center px-6">
        No fue posible cargar la información. Intenta nuevamente más tarde.
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-muted-foreground text-center px-6">
        Aún no hay listas de precios postventa publicadas.
      </div>
    );
  }

  return (
    <ProjectsSection projects={projects} />
  )
}
