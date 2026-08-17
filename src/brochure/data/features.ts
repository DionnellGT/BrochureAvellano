
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
          "Region de Los Lagos: una inversión segura, con alta proyección y rentabilidad a largo plazo.",
        size: "small",
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
        description: "Hasta 24 cuotas sin interés directamente con nosotros.",
        size: "small",
      },
    ],
  }