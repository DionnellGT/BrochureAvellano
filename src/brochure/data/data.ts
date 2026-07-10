
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
  lotesClientes?: Lot[];
  lotesVendedores?: Lot[];
}


export interface BrochureData {
  projects: Project[];
}


export const brochureData: BrochureData = {
  projects: [
    {
      id: "quemchi-aucar",
      nombre: "Quemchi Aucar",
      subtitulo: "Bosque, pradera y orilla de río en el corazón de Quemchi.",
      tourUrl: "https://www.lanube360.com/quemchi360/",
      ctaVariant: "primary",
      lotesClientes: [
        {
          numero: "254",
          tipologia: "Bosque - Orilla de río",
          superficie: "5.000 m²",
          precioLista: "$18.900.000",
          piePorcentajeCuotas: "$12.900.000",
          precioContado: "$10.900.000",
        }
      ],
      lotesVendedores: [
        {
          numero: "254",
          tipologia: "Bosque - Orilla de río",
          superficie: "6.000 m²",
          precioLista: "-",
          piePorcentajeCuotas: "-",
          precioContado: "$18.900.000",
        }
      ]
    },
    {
      id: "paraiso-belben",
      nombre: "Paraiso Belben",
      subtitulo: "Hermoso terreno con bosque, perfecto para vivir o descansar en un entorno natural.",
      tourUrl: "https://www.lanube360.com/paraiso-belben/",
      ctaVariant: "primary",
      lotesClientes: [
        {
          numero: "26",
          tipologia: "Bosque",
          superficie: "5.000 m²",
          precioLista: "$18.900.000",
          piePorcentajeCuotas: "$10.900.000",
          precioContado: "$8.900.000",
        },
        {
          numero: "27",
          tipologia: "Bosque",
          superficie: "5.000 m²",
          precioLista: "$18.900.000",
          piePorcentajeCuotas: "$10.900.000",
          precioContado: "$8.900.000",
        }
      ],
      lotesVendedores: [
        {
          numero: "26",
          tipologia: "Bosque",
          superficie: "5.000 m²",
          precioLista: "-",
          piePorcentajeCuotas: "-",
          precioContado: "$18.900.000",
        },
        {
          numero: "27",
          tipologia: "Bosque",
          superficie: "5.000 m²",
          precioLista: "-",
          piePorcentajeCuotas: "-",
          precioContado: "$18.900.000",
        }
      ]
    },
    {
      id: "choroihue",
      nombre: "Choroihue",
      subtitulo: "La combinación perfecta entre pradera y bosque.",
      tourUrl: "https://www.lanube360.com/ancud2-sector-choroihue/",
      ctaVariant: "primary",
      lotesClientes: [
        {
          numero: "17",
          tipologia: "Pradera - Bosque",
          superficie: "5.062 m²",
          precioLista: "$12.500.000",
          piePorcentajeCuotas: "$9.500.000",
          precioContado: "$7.500.000",
        }
      ],
      lotesVendedores: [
        {
          numero: "17",
          tipologia: "Pradera - Bosque",
          superficie: "5.062 m²",
          precioLista: "-",
          piePorcentajeCuotas: "-",
          precioContado: "$12.500.000",
        }
      ]
    },
    {
      id: "fundo-bellavista",
      nombre: "Fundo Bellavista",
      subtitulo: "Bosque y pradera con amplias superficies.",
      tourUrl: "https://www.lanube360.com/fundo-bellavista-b/",
      ctaVariant: "primary",
      lotesClientes: [
        {
          numero: "99",
          tipologia: "Postacion - Pozo",
          superficie: "5.000 m²",
          precioLista: "$26.900.000",
          piePorcentajeCuotas: "$20.900.000",
          precioContado: "$18.900.000",
        },
        {
          numero: "134",
          tipologia: "Postacion - Pozo",
          superficie: "5.000 m²",
          precioLista: "$21.900.000",
          piePorcentajeCuotas: "$16.900.000",
          precioContado: "$14.900.000",
        },
        {
          numero: "174",
          tipologia: "Soterrado - Plana",
          superficie: "5.000 m²",
          precioLista: "$21.900.000",
          piePorcentajeCuotas: "$16.900.000",
          precioContado: "$14.900.000",
        }
      ],
      lotesVendedores: [
        {
          numero: "99",
          tipologia: "Postacion - Pozo",
          superficie: "5.000 m²",
          precioLista: "-",
          piePorcentajeCuotas: "-",
          precioContado: "$26.900.000",
        },
        {
          numero: "134",
          tipologia: "Postacion - Pozo",
          superficie: "5.000 m²",
          precioLista: "-",
          piePorcentajeCuotas: "-",
          precioContado: "$21.900.000",
        },
        {
          numero: "174",
          tipologia: "Soterrado - Plana",
          superficie: "5.000 m²",
          precioLista: "-",
          piePorcentajeCuotas: "-",
          precioContado: "$21.900.000",
        }
      ]
    },
    {
      id: "hacienda-rio-frio",
      nombre: "Hacienda Río Frío",
      subtitulo: "Acceso por camino y rodeado de bosque.",
      tourUrl: "https://www.lanube360.com/haciendariofrio-losmuermos/",
      ctaVariant: "primary",
      lotesClientes: [
        {
          numero: "34",
          tipologia: "Orilla de Camino - Plana",
          superficie: "5.000 m²",
          precioLista: "$18.900.000",
          piePorcentajeCuotas: "$16.900.000",
          precioContado: "$14.900.000",
        },
        {
          numero: "45",
          tipologia: "Bosque - Pendiente",
          superficie: "5.000 m²",
          precioLista: "$15.900.000",
          piePorcentajeCuotas: "$12.900.000",
          precioContado: "$10.900.000",
        }
      ],
      lotesVendedores: [
        {
          numero: "34",
          tipologia: "Orilla de Camino - Plana",
          superficie: "5.000 m²",
          precioLista: "-",
          piePorcentajeCuotas: "-",
          precioContado: "$18.900.000",
        },
        {
          numero: "45",
          tipologia: "Bosque - Pendiente",
          superficie: "5.000 m²",
          precioLista: "-",
          piePorcentajeCuotas: "-",
          precioContado: "$15.900.000",
        }
      ]
    }
  ]
};
