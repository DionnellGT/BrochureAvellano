
export interface NavLink {
  label: string;
  href: string;
  target?: "_blank";
}


export const navLinks: NavLink[] = [
    { label: "Proyectos", href: "#proyectos" },
    { label: "Plusvalía", href: "#caracteristicas" },
    { label: "Contacto", href: "https://api.whatsapp.com/send/?phone=56949437974&text=Hola%2C+me+gustar%C3%ADa+recibir+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0", target: "_blank" },
]