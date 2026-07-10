import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import type { NavLink } from "@/brochure/data/data";

interface NavbarProps {
  logoUrl: string;
  links: NavLink[];
}

export function Navbar({ logoUrl, links }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md flex justify-between items-center px-6 max-w-full mx-auto transition-all ${
        scrolled ? "shadow-md py-3" : "py-4"
      }`}
    >
      <div className="flex items-center">
        <img
          src={logoUrl}
          alt="Remate de Terrenos Chiloé"
          className="h-10 md:h-12 w-auto object-contain"
        />
      </div>

      <div className="hidden md:flex items-center gap-8 text-base">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.target}
            className="text-muted-foreground hover:text-primary font-semibold transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
        <a
          href="https://www.rematedeterrenos.cl/#proyectos"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full px-6 py-2.5 h-auto font-semibold text-muted-foreground hover:text-primary shadow-sm bg-on-primary-container hover:bg-moss-container active:scale-95"
        >
          Ver Catálogo
        </a>
      </div>

      <button className="md:hidden text-primary p-2" aria-label="Abrir menú">
        <Menu className="size-7" />
      </button>
    </nav>
  );
}
