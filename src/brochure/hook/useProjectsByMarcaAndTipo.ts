import type { Marca, TipoLista } from "@/api/pricesList.types";
import { usePriceListsByMarcaAndTipo } from "@/hook/usePricesList";
import { mapPriceListToProject } from "@/brochure/data/mapPriceListToProject";
import type { Project } from "@/brochure/data/data";

// Trae las listas de precios reales (marca + tipo) desde la Api principal
// y las adapta al formato que usan los componentes visuales del brochure
// público (ProjectsSection / ProjectCard / LotMobileCard).
export function useProjectsByMarcaAndTipo(marca: Marca, tipo: TipoLista) {
  const query = usePriceListsByMarcaAndTipo(marca, tipo);

  const projects: Project[] | undefined = query.data?.map(mapPriceListToProject);

  return {
    projects,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
