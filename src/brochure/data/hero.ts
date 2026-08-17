
export interface HeroContent {
  badge: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; };
  backgroundImage: string;
}

export const hero: HeroContent = {
    badge: "Patrimonio Natural en el Sur de Chile",
    title: "Parcelas en Chiloé",
    description:
      "Descubre la oportunidad perfecta para hacer crecer tu capital en la Décima Región de Los Lagos: terrenos exclusivos de alta plusvalía en el sur de Chile, respaldo legal para que inviertas hoy con total tranquilidad y retorno asegurado.",
    primaryCta: { label: "Explorar Lotes", href: "#proyectos" },
    secondaryCta: {
      label: "Descargar Brochure",
    },
    backgroundImage:
      "/Banner.jpeg",
  }