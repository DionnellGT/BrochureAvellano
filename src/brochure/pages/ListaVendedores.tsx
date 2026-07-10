import { ProjectsSection } from "../components/ProjectsSection"
import { useBrochureData } from "../hook/useBrochureData";


export const ListaVendedores = () => {

  const { data, isLoading, isError } = useBrochureData();
  
    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
          Cargando brochure...
        </div>
      );
    }
  
    if (isError || !data) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-destructive">
          No fue posible cargar la información del brochure.
        </div>
      );
    }
  
  return (
    <ProjectsSection projects={data.projects} />
  )
}
