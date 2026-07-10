
export interface ValueItem {
  icon: "leaf" | "map-pin" | "shield-check";
  title: string;
  description: string;
}

export const values: ValueItem[] = [
    {
      icon: "leaf",
      title: "Eco Sustentable",
      description:
        "Nuestros proyectos respetan la biodiversidad local y promueven la conservación activa del bosque nativo.",
    },
    {
      icon: "map-pin",
      title: "Ubicación Estratégica",
      description:
        "A minutos de Quemchi y atractivos turísticos, conectando paz absoluta con servicios esenciales.",
    },
    {
      icon: "shield-check",
      title: "Seguridad Jurídica",
      description:
        "Más de 10 años entregando títulos de dominio vigentes y transparencia absoluta en cada proceso.",
    },
  ]