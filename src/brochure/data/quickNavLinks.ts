
export interface QuickNavLink {
  id: string;
  label: string;
  href: string;
  highlighted?: boolean;
}


export const quickNavLinks: QuickNavLink[] = [
    { id: "quemchi-aucar", label: "Quemchi Aucar", href: "#quemchi-aucar", highlighted: true },
    { id: "paraiso-belben", label: "Paraiso Belben", href: "#paraiso-belben" },
    { id: "choroihue", label: "Choroihue", href: "#choroihue" },
    { id: "fundo-bellavista", label: "Fundo Bellavista", href: "#fundo-bellavista" },
    { id: "hacienda-rio-frio", label: "Hacienda Rio Frio", href: "#hacienda-rio-frio" },
  ]