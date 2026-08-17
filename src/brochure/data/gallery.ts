
export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  size: "large" | "medium" | "wide";
}

export interface GallerySection {
    title: string;
    subtitle: string;
    ctaLabel: string;
    images: GalleryImage[];
  };

export const gallerySection: GallerySection = {
    title: "Inspiración en la Región de Los Lagos",
    subtitle: "Explore la magia y el misticismo de nuestro entorno austral",
    ctaLabel: "Ver Galería Completa",
    images: [
      {
        src: "/aeropuerto-el-tepual-continente.webp",
        alt: "aeropuerto-el-tepual-continente",
        caption: "Aeropuerto el tepual",
        size: "large",
      },
      {
        src: "centro-ancud-chiloe.webp",
        alt: "centro-ancud-chiloe",
        caption: "Centro ancud",
        size: "medium",
      },
      {
        src: "aeropuerto-castro-chiloe.webp",
        alt: "aeropuerto castro",
        caption: "Aeropuerto castro",
        size: "medium",
      },
      {
        src: "centro-los-muermos-continente.webp",
        alt: "centro los muermos",
        caption: "Centro los muermos",
        size: "wide",
      },
    ],
  }