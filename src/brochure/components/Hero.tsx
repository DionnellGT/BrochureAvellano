import { ArrowDown, Download } from "lucide-react";
import type { HeroContent } from "@/brochure/data/data";

interface HeroProps {
  hero: HeroContent;
}

export function Hero({ hero }: HeroProps) {
  return (
    <header className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={hero.backgroundImage}
          alt="Chiloé Landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-deep/40 via-forest-deep/20 to-background/80" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
        <div className="inline-block bg-primary/20 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-bold mb-6 tracking-widest uppercase">
          {hero.badge}
        </div>

        <h1 className="font-heading text-4xl md:text-5xl leading-tight md:leading-[1.15] font-bold tracking-tight text-white mb-4 drop-shadow-2xl">
          {hero.title}
        </h1>

        <p className="text-lg leading-7 text-white/90 mb-8 max-w-2xl mx-auto font-medium drop-shadow-lg">
          {hero.description}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href={hero.primaryCta.href}
            className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-moss-container transition-all transform hover:-translate-y-1 flex items-center gap-2"
          >
            {hero.primaryCta.label} <ArrowDown className="size-5" />
          </a>
          <a
            href={hero.secondaryCta.href}
            download={hero.secondaryCta.fileName}
            className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/30 hover:bg-white/20 transition-all flex items-center gap-2"
          >
            {hero.secondaryCta.label} <Download className="size-5" />
          </a>
        </div>
      </div>
    </header>
  );
}
