
export interface FeatureCard {
  icon: "trending-up" | "piggy-bank" | "headset" | "wallet";
  title: string;
  description: string;
  size: "large" | "medium" | "small";
}

export interface FeaturesSection {
    eyebrow: string;
    title: string;
    cards: FeatureCard[];
  };

export const featuresSection: FeaturesSection = {
    eyebrow: "Ventaja Competitiva",
    title: "¿Por qué invertir con nosotros?",
    cards: [
      {
        icon: "trending-up",
        title: "Alta Plusvalía Garantizada",
        description:
          "Chiloé se ha consolidado como el destino de inversión más seguro de Chile. El crecimiento del turismo y la infraestructura asegura un retorno sólido y sostenido en el tiempo.",
        size: "large",
      },
      {
        icon: "piggy-bank",
        title: "Bajo Costo de Mantenimiento",
        description:
          "Suelos fértiles que requieren mínima intervención para proyectos de conservación o habitacionales.",
        size: "medium",
      },
      {
        icon: "headset",
        title: "Asesoría Legal",
        description: "Documentación técnica al día para su tranquilidad.",
        size: "small",
      },
      {
        icon: "wallet",
        title: "Financiamiento",
        description: "Hasta 11 cuotas sin interés directamente con nosotros.",
        size: "small",
      },
    ],
  }