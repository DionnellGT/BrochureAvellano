// Los valores de esta lista ahora se arman dinámicamente en BrochureLayout
// a partir de las listas de precios reales (ver useProjectsByMarcaAndTipo),
// según la marca y el tipo (cliente/postventa) de la página actual. Este
// archivo solo deja el tipo, reutilizado por QuickNav.

export interface QuickNavLink {
  id: string;
  label: string;
  href: string;
  highlighted?: boolean;
}
