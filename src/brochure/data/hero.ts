
export interface HeroContent {
  badge: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; };
  backgroundImage: string;
}

export const hero: HeroContent = {
    badge: "Patrimonio Natural del Sur",
    title: "Parcelas en Chiloé",
    description:
      "Invierta en el patrimonio natural del sur del mundo. Terrenos exclusivos diseñados para la conservación, con plusvalía garantizada y seguridad jurídica.",
    primaryCta: { label: "Explorar Lotes", href: "#proyectos" },
    secondaryCta: {
      label: "Descargar Brochure",
    },
    backgroundImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrMPMGs8wdpD04Nkj4Rult89h92KN_DGZWLOvYicTRVtWD9UapqlZefQC1GFGMVCReE6hw7VzbMV566pRHZSuzOWnv9H0z_RrEPfy5GfIkut_7G_WTq8p4-4QZstbhaVm23gH_OaU5aL5C4hNmGbg24-WXfxTUiC5B73NnUBwgEazigOX6nTcJ-DKtO48XYT1JUBAZuCMdhzX2hAwI_ZEbo7uaKhloSeUw04Rp1Imqqm4fqN4rNMRuc3iE7tYXz6FkTXal7CBf56xQ",
  }