export interface FooterLink {
  label: string;
  href: string;
  target?: "_blank";
}

export interface FooterData {
    logoUrl: string;
    quote: string;
    corporateSite: { label: string; url: string };
    infoLinks: FooterLink[];
    copyright: string;
}

const LOGO_URL_FOOTER = "/logo1.png";

export const footer: FooterData = {
    logoUrl: LOGO_URL_FOOTER,
    quote:
      '"Nuestra misión es conectar a las personas con la tierra de forma segura, respetando siempre el legado natural de la Región de Los Lagos."',
    corporateSite: { label: "Sitio Corporativo", url: "https://www.elavellano.cl" },
    
    infoLinks: [
      { label: "Términos y Condiciones", href: "https://www.elavellano.cl/terminos-y-condiciones", target: "_blank" },
      { label: "Política de Privacidad", href: "https://www.elavellano.cl/politica-de-privacidad", target: "_blank" },
    ],
    copyright: "© 2024 El Avellano. Todos los derechos reservados.",
}