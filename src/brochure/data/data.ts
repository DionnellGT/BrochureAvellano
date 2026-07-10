
export interface NavLink {
  label: string;
  href: string;
  target?: "_blank";
}

export interface QuickNavLink {
  id: string;
  label: string;
  href: string;
  highlighted?: boolean;
}

export interface HeroContent {
  badge: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string; fileName: string };
  backgroundImage: string;
}

export interface Lot {
  numero: string;
  tipologia: string;
  superficie: string;
  precioLista: string;
  piePorcentajeCuotas: string;
  precioContado: string;
}

export interface Project {
  id: string;
  nombre: string;
  subtitulo: string;
  tourUrl?: string;
  ctaVariant: "primary" | "secondary";
  lotes: Lot[];
}

export interface FeatureCard {
  icon: "trending-up" | "piggy-bank" | "headset" | "wallet";
  title: string;
  description: string;
  size: "large" | "medium" | "small";
}

export interface ValueItem {
  icon: "leaf" | "map-pin" | "shield-check";
  title: string;
  description: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
  size: "large" | "medium" | "wide";
}

export interface FooterLink {
  label: string;
  href: string;
  target?: "_blank";
}

export interface FooterSocial {
  icon: "mail" | "phone";
  href: string;
  target?: "_blank";
}

export interface BrochureData {
  logoUrl: string;
  navLinks: NavLink[];
  quickNavLinks: QuickNavLink[];
  hero: HeroContent;
  projects: Project[];
  featuresSection: {
    eyebrow: string;
    title: string;
    cards: FeatureCard[];
  };
  values: ValueItem[];
  gallerySection: {
    title: string;
    subtitle: string;
    ctaLabel: string;
    images: GalleryImage[];
  };
  footer: {
    logoUrl: string;
    quote: string;
    socials: FooterSocial[];
    corporateSite: { label: string; url: string };
    projectsLinks: FooterLink[];
    infoLinks: FooterLink[];
    copyright: string;
  };
}

const LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBLD2cUjgyi9jdvQ4SKjF3Ruis0Dba5vPxIy90AAnh8QUbjBKWUv3RAlFgIvxkfBxE9IYzT8t7IaAcRKRAcsE50P2nGT6VKIGK5jTje0HFH3-Cnbbo57_cjUDNQZR63i8O36wigsJBTqJLaxDmgjgiceINtZYHUjk9DUPcGIbj7PVWrY1802mTeVU5F_lNCOfaKbH5YInDlgau43sbyW9yLHfOYzQyqfdZce9DHsfAQslp0lfvmt4oBppFPqxQGPHbiAx5CJnMgQkDR";

const LOGO_URL_FOOTER =
  "/logo_remate.webp";

export const brochureData: BrochureData = {
  logoUrl: LOGO_URL,
  navLinks: [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Plusvalía", href: "#caracteristicas" },
    { label: "Contacto", href: "https://api.whatsapp.com/send/?phone=56949437974&text=Hola%2C+me+gustar%C3%ADa+recibir+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0", target: "_blank" },
  ],
  quickNavLinks: [
    { id: "aguas-aucar", label: "Aguas de Aucar", href: "#aguas-aucar", highlighted: true },
    { id: "quemchi-angus", label: "Quemchi Angus", href: "#quemchi-angus" },
    { id: "quemchi-dorper", label: "Quemchi Dorper", href: "#quemchi-dorper" },
    { id: "brisas-quemchi", label: "Brisas de Quemchi", href: "#brisas-quemchi" },
    { id: "canelos-quemchi", label: "Los Canelos", href: "#canelos-quemchi" },
    { id: "reservas-quemchi", label: "Reservas de Quemchi", href: "#reservas-quemchi" },
  ],
  hero: {
    badge: "Patrimonio Natural del Sur",
    title: "Parcelas en Chiloé",
    description:
      "Invierta en el patrimonio natural del sur del mundo. Terrenos exclusivos diseñados para la conservación, con plusvalía garantizada y seguridad jurídica.",
    primaryCta: { label: "Explorar Lotes", href: "#proyectos" },
    secondaryCta: {
      label: "Descargar Brochure",
      href: "/brochure-remate-terrenos-chiloe.pdf",
      fileName: "Brochure-Remate-de-Terrenos-Chiloe.pdf",
    },
    backgroundImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrMPMGs8wdpD04Nkj4Rult89h92KN_DGZWLOvYicTRVtWD9UapqlZefQC1GFGMVCReE6hw7VzbMV566pRHZSuzOWnv9H0z_RrEPfy5GfIkut_7G_WTq8p4-4QZstbhaVm23gH_OaU5aL5C4hNmGbg24-WXfxTUiC5B73NnUBwgEazigOX6nTcJ-DKtO48XYT1JUBAZuCMdhzX2hAwI_ZEbo7uaKhloSeUw04Rp1Imqqm4fqN4rNMRuc3iE7tYXz6FkTXal7CBf56xQ",
  },
  projects: [
    {
      id: "aguas-aucar",
      nombre: "Aguas de Aucar",
      subtitulo: "Bosque, pradera y orilla de río en el corazón de Quemchi.",
      tourUrl: "https://www.lanube360.com/aguasdeaucar-quemchi/",
      ctaVariant: "primary",
      lotes: [
        {
          numero: "4",
          tipologia: "Bosque - Pradera",
          superficie: "6.260 m²",
          precioLista: "$12.900.000",
          piePorcentajeCuotas: "$9.900.000",
          precioContado: "$7.900.000",
        },
        {
          numero: "24",
          tipologia: "Bosque - Orilla de Río",
          superficie: "8.890 m²",
          precioLista: "$22.900.000",
          piePorcentajeCuotas: "$17.900.000",
          precioContado: "$15.900.000",
        },
        {
          numero: "56",
          tipologia: "Bosque",
          superficie: "5.484 m²",
          precioLista: "$13.900.000",
          piePorcentajeCuotas: "$8.900.000",
          precioContado: "$6.900.000",
        },
        {
          numero: "57",
          tipologia: "Bosque",
          superficie: "5.100 m²",
          precioLista: "$13.900.000",
          piePorcentajeCuotas: "$8.900.000",
          precioContado: "$6.900.000",
        },
        {
          numero: "58",
          tipologia: "Bosque",
          superficie: "7.465 m²",
          precioLista: "$13.900.000",
          piePorcentajeCuotas: "$8.900.000",
          precioContado: "$6.900.000",
        },
        {
          numero: "67",
          tipologia: "Bosque",
          superficie: "7.045 m²",
          precioLista: "$11.900.000",
          piePorcentajeCuotas: "$6.900.000",
          precioContado: "$4.900.000",
        },
      ],
    },
    {
      id: "quemchi-angus",
      nombre: "Quemchi Angus",
      subtitulo: "Bosque y pradera a orilla de carretera.",
      tourUrl: "https://www.lanube360.com/quemchiangus-orilladecarretera/",
      ctaVariant: "primary",
      lotes: [
        {
          numero: "24",
          tipologia: "Bosque - Pradera",
          superficie: "5.000 m²",
          precioLista: "$12.900.000",
          piePorcentajeCuotas: "$9.900.000",
          precioContado: "$7.900.000",
        },
      ],
    },
    {
      id: "quemchi-dorper",
      nombre: "Quemchi Dorper",
      subtitulo: "Pradera, bosque y riachuelo.",
      tourUrl: "https://www.lanube360.com/quemchi-dorper/",
      ctaVariant: "primary",
      lotes: [
        {
          numero: "18",
          tipologia: "Pradera - Bosque - Riachuelo",
          superficie: "5.800 m²",
          precioLista: "$13.900.000",
          piePorcentajeCuotas: "$8.900.000",
          precioContado: "$6.900.000",
        },
        {
          numero: "31",
          tipologia: "Bosque - Riachuelo",
          superficie: "5.129 m²",
          precioLista: "$12.900.000",
          piePorcentajeCuotas: "$9.900.000",
          precioContado: "$7.900.000",
        },
        {
          numero: "35",
          tipologia: "Bosque - Pradera",
          superficie: "7.800 m²",
          precioLista: "$12.900.000",
          piePorcentajeCuotas: "$9.900.000",
          precioContado: "$7.900.000",
        },
      ],
    },
    {
      id: "brisas-quemchi",
      nombre: "Brisas de Quemchi",
      subtitulo: "Bosque y pradera con amplias superficies.",
      tourUrl: "https://www.lanube360.com/brisas-quemchi/",
      ctaVariant: "primary",
      lotes: [
        {
          numero: "20",
          tipologia: "Bosque - Pradera",
          superficie: "6.800 m²",
          precioLista: "-",
          piePorcentajeCuotas: "-",
          precioContado: "$10.900.000",
        },
        {
          numero: "33",
          tipologia: "Bosque",
          superficie: "5.000 m²",
          precioLista: "$11.900.000",
          piePorcentajeCuotas: "$8.900.000",
          precioContado: "$6.900.000",
        },
        {
          numero: "37",
          tipologia: "Bosque",
          superficie: "5.119 m²",
          precioLista: "$11.900.000",
          piePorcentajeCuotas: "$8.900.000",
          precioContado: "$6.900.000",
        },
        {
          numero: "51",
          tipologia: "Bosque",
          superficie: "20.600 m²",
          precioLista: "-",
          piePorcentajeCuotas: "-",
          precioContado: "$15.900.000",
        },
      ],
    },
    {
      id: "canelos-quemchi",
      nombre: "Los Canelos de Quemchi",
      subtitulo: "Bosque junto al Río Medina.",
      tourUrl: "https://www.lanube360.com/loscanelos-quemchi/",
      ctaVariant: "primary",
      lotes: [
        {
          numero: "14",
          tipologia: "Bosque - Río Medina",
          superficie: "15.101 m²",
          precioLista: "$16.900.000",
          piePorcentajeCuotas: "$11.900.000",
          precioContado: "$9.900.000",
        },
        {
          numero: "18",
          tipologia: "Bosque - Río Medina",
          superficie: "10.087 m²",
          precioLista: "$15.900.000",
          piePorcentajeCuotas: "$10.900.000",
          precioContado: "$8.900.000",
        },
        {
          numero: "26",
          tipologia: "Bosque",
          superficie: "10.088 m²",
          precioLista: "$15.900.000",
          piePorcentajeCuotas: "$10.900.000",
          precioContado: "$8.900.000",
        },
        {
          numero: "27",
          tipologia: "Bosque",
          superficie: "10.306 m²",
          precioLista: "$15.900.000",
          piePorcentajeCuotas: "$10.900.000",
          precioContado: "$8.900.000",
        },
      ],
    },
    {
      id: "reservas-quemchi",
      nombre: "Reservas de Quemchi",
      subtitulo: "Vegetación nativa y riachuelos.",
      tourUrl: "https://www.lanube360.com/reservasdequemchi-chiloe/",
      ctaVariant: "primary",
      lotes: [
        {
          numero: "1",
          tipologia: "Vegetación",
          superficie: "20.000 m²",
          precioLista: "$15.900.000",
          piePorcentajeCuotas: "$12.900.000",
          precioContado: "$10.900.000",
        },
        {
          numero: "3",
          tipologia: "Vegetación - Riachuelo",
          superficie: "15.000 m²",
          precioLista: "$13.900.000",
          piePorcentajeCuotas: "$10.900.000",
          precioContado: "$8.900.000",
        },
        {
          numero: "4",
          tipologia: "Vegetación",
          superficie: "20.000 m²",
          precioLista: "$12.900.000",
          piePorcentajeCuotas: "$9.900.000",
          precioContado: "$7.900.000",
        },
        {
          numero: "6",
          tipologia: "Vegetación",
          superficie: "16.540 m²",
          precioLista: "$12.900.000",
          piePorcentajeCuotas: "$9.900.000",
          precioContado: "$7.900.000",
        },
        {
          numero: "11",
          tipologia: "Vegetación",
          superficie: "15.000 m²",
          precioLista: "$12.900.000",
          piePorcentajeCuotas: "$9.900.000",
          precioContado: "$7.900.000",
        },
        {
          numero: "12",
          tipologia: "Vegetación",
          superficie: "15.000 m²",
          precioLista: "$12.900.000",
          piePorcentajeCuotas: "$9.900.000",
          precioContado: "$7.900.000",
        },
        {
          numero: "13",
          tipologia: "Vegetación",
          superficie: "15.000 m²",
          precioLista: "$12.900.000",
          piePorcentajeCuotas: "$9.900.000",
          precioContado: "$7.900.000",
        },
        {
          numero: "22",
          tipologia: "Vegetación",
          superficie: "15.950 m²",
          precioLista: "$12.900.000",
          piePorcentajeCuotas: "$9.900.000",
          precioContado: "$7.900.000",
        },
        {
          numero: "23",
          tipologia: "Vegetación",
          superficie: "21.550 m²",
          precioLista: "$16.900.000",
          piePorcentajeCuotas: "$13.900.000",
          precioContado: "$11.900.000",
        },
      ],
    },
  ],
  featuresSection: {
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
  },
  values: [
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
  ],
  gallerySection: {
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
  },
  footer: {
    logoUrl: LOGO_URL_FOOTER,
    quote:
      '"Nuestra misión es conectar a las personas con la tierra de forma segura, respetando siempre el legado natural de la Patagonia Insular."',
    socials: [
      { icon: "mail", href: "https://mail.google.com/mail/?view=cm&fs=1&to=contacto@rematedeterrenos.cl&su=Consulta&body=Hola,%20me%20interesa...", target: "_blank" },
      { icon: "phone", href: "https://api.whatsapp.com/send/?phone=56949437974&text=Hola%2C+me+gustar%C3%ADa+recibir+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0", target: "_blank" },
    ],
    corporateSite: { label: "Sitio Corporativo", url: "https://rematedeterrenos.cl" },
    projectsLinks: [
      { label: "Aguas de Aucar", href: "#aguas-aucar" },
      { label: "Quemchi Angus", href: "#quemchi-angus" },
      { label: "Quemchi Dorper", href: "#quemchi-dorper" },
      { label: "Brisas de Quemchi", href: "#brisas-quemchi" },
      { label: "Los Canelos", href: "#canelos-quemchi" },
      { label: "Reservas de Quemchi", href: "#reservas-quemchi" },
    ],
    infoLinks: [
      { label: "Términos y Condiciones", href: "#" },
      { label: "Política de Privacidad", href: "#" },
      { label: "Contacto de Ventas", href: "https://api.whatsapp.com/send/?phone=56949437974&text=Hola%2C+me+gustar%C3%ADa+recibir+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0", target: "_blank" },
    ],
    copyright: "© 2024 Remate de Terrenos Chiloé. Todos los derechos reservados.",
  },
};
