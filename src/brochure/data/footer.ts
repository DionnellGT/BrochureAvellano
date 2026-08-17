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

export interface FooterData {
    logoUrl: string;
    quote: string;
    socials: FooterSocial[];
    corporateSite: { label: string; url: string };
    infoLinks: FooterLink[];
    copyright: string;
}

const LOGO_URL_FOOTER = "/logo1.png";

export const footer: FooterData = {
    logoUrl: LOGO_URL_FOOTER,
    quote:
      '"Nuestra misión es conectar a las personas con la tierra de forma segura, respetando siempre el legado natural de la Región de Los Lagos."',
    socials: [
      { icon: "mail", href: "https://mail.google.com/mail/?view=cm&fs=1&to=contacto@rematedeterrenos.cl&su=Consulta&body=Hola,%20me%20interesa...", target: "_blank" },
      { icon: "phone", href: "https://api.whatsapp.com/send/?phone=56949437974&text=Hola%2C+me+gustar%C3%ADa+recibir+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0", target: "_blank" },
    ],
    corporateSite: { label: "Sitio Corporativo", url: "https://www.elavellano.cl" },
    
    infoLinks: [
      { label: "Términos y Condiciones", href: "https://www.elavellano.cl/terminos-y-condiciones", target: "_blank" },
      { label: "Política de Privacidad", href: "https://www.elavellano.cl/politica-de-privacidad", target: "_blank" },
    ],
    copyright: "© 2024 El Avellano. Todos los derechos reservados.",
}