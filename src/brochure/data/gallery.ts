
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
    title: "Inspiración Chiloé",
    subtitle: "Explore la magia y el misticismo de nuestro entorno austral",
    ctaLabel: "Ver Galería Completa",
    images: [
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAeoN9RBX_w_p7X1NtPJvzWDwEKvBLDm46yXmZOCc9rgA2QuNTTUuZscyzwlkFPDofoReCVFdL9GkAalpC0_MWg9kFqWHP8XNNXmL3uHA-Ch7mProdHaOw2gXR7URZdwVTru7GusSlLVC-dLgLOanAvojUkVmg0q5TlyWBH5rkS-PkpTOukn7Gyd6Vqd8jB6G4YsK7YcHQysGMUy3gUBf0lB1WVOKeZfRLFXP3Q1OgDLLtvypqPz-P_W9Lx0Fm4KrxzzXlO1LWlEizY",
        alt: "Palafitos Chiloé",
        caption: "Tradición y Arquitectura",
        size: "large",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgojIxwO_5Z1y_G0b4uKq11hHD086ce51sXBi6idDd17d1C155O1ExAoj86Uj6wj_-AibmmjhqjV_eXCxMzHABP7zh_hiGDNbS79uCogZw5F3XtbVdJd8293ERrpD4CLCYwT9_vC1XT1l2ePcHqWD3YNDTb_6ElgtTwXEJUmRZxSQZE_34WCEaJbWZB7FiHc8yh7CsBPnr7HLXd8J0uLeJoUcjU_hpmYQFTf-KpevyxYHLesR6jjTVHc6OlI4K4tZY3SxP4ua2nEZj",
        alt: "Bosque Chilote",
        size: "medium",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuAxcURp8rYr7LwAZ3oxEVsDBxfzCTgrBGp5iTk2YBDdraLFiVN9buAayWwo9MZl5V7nDm3j27oGc2apKqIv09nXV39kyyzu_-DrV6M1Obz4RHzJtOolSe01AB70OD-m1zyNtcPF0lh1hY-hDZ4V8ZrSkr9977KaYb0bojsHhNcdosc8EZfcRS7iVeFAapeazureMrEfHlOoMe9IK_UU0JLKmKun3_rRZGLVFR-f44SE-Q71K_s4Ep6gfm1CckgEA_3nL-hLOccopEzi",
        alt: "Paisaje Chiloé",
        size: "medium",
      },
      {
        src: "https://lh3.googleusercontent.com/aida-public/AB6AXuA05yuGgIaksLIp9bJwYWV9pd-7Bq6uhiUhdCUbfp3pxYD0qzC7DWqXzIL5qiRdmTsSPQ0sYdLpMypb4_KMwX6qDnmWomBb7MoYiudG4XBm1qWUZVwj9tsNz_4Gs8icLCG70xEC0a2508kcEW68CtSehLeDrRhztX5FinW4AxAiWwgn_cPHx6HOZr227VMnHAnQ2H58ifhBatHvtzgyx45bxCZz3QK-MRDmAGIM-qVGxYZVr0EYnHtixt61OFnS99pMrpehDy9wDCQs",
        alt: "Iglesia Chiloé",
        caption: "Patrimonio de la Humanidad",
        size: "wide",
      },
    ],
  }