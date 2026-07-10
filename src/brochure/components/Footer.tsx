import { Mail, Phone, Share2, ExternalLink, type LucideIcon } from "lucide-react";
import type { BrochureData } from "@/brochure/data/data";

interface FooterProps {
  footer: BrochureData["footer"];
}

const SOCIAL_ICONS: Record<"share" | "mail" | "phone", LucideIcon> = {
  share: Share2,
  mail: Mail,
  phone: Phone,
};

export function Footer({ footer }: FooterProps) {
  return (
    <footer className="bg-forest-deep text-white w-full py-20 border-t border-mist-border">
      <div className="flex flex-col md:flex-row justify-between items-start px-6 max-w-[1200px] mx-auto gap-8">
        <div className="max-w-md">
          <img
            src={footer.logoUrl}
            alt="Logo Footer"
            className="h-16 w-auto object-contain mb-8 filter brightness-0 invert opacity-90"
          />
          <p className="text-white/70 text-lg leading-7 mb-8 italic font-light">
            {footer.quote}
          </p>
          <div className="flex gap-6 mb-8">
            {footer.socials.map((social, index) => {
              const Icon = SOCIAL_ICONS[social.icon];
              return (
                <a
                  key={index}
                  href={social.href}
                  target={social.target}
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-clay-accent hover:border-clay-accent transition-all duration-300"
                >
                  <Icon className="size-5" />
                </a>
              );
            })}
          </div>
          <div className="mt-8">
            <p className="text-xs font-bold text-accent uppercase tracking-[0.2em] mb-4">
              {footer.corporateSite.label}
            </p>
            <a
              href={footer.corporateSite.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-moss-container transition-all shadow-lg group"
            >
              Visitar {footer.corporateSite.url.replace("https://", "")}
              <ExternalLink className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-12 gap-y-6">
          <h4 className="col-span-2 font-bold text-accent uppercase tracking-[0.2em] text-sm">
            Nuestros Proyectos
          </h4>
          {footer.projectsLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="font-bold text-accent uppercase tracking-[0.2em] text-sm">
            Información
          </h4>
          {footer.infoLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
        <p className="text-white/40 text-xs">{footer.copyright}</p>
      </div>
    </footer>
  );
}
