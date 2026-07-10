import { ArrowRight } from "lucide-react";
import type { GalleryImage } from "@/brochure/data/data";

interface GallerySectionProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  images: GalleryImage[];
}

const SIZE_CLASSES: Record<GalleryImage["size"], string> = {
  large: "row-span-2 col-span-2",
  medium: "",
  wide: "col-span-2",
};

export function GallerySection({ title, subtitle, ctaLabel, images }: GallerySectionProps) {
  return (
    <section className="py-20">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="font-heading text-[32px] leading-10 font-semibold tracking-tight text-primary mb-2">
            {title}
          </h2>
          <p className="text-secondary font-medium">{subtitle}</p>
        </div>
        <button className="text-primary font-bold flex items-center gap-2 hover:opacity-70 group">
          {ctaLabel} <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[250px]">
        {images.map((image) => (
          <div
            key={image.src}
            className={`rounded-3xl overflow-hidden relative group shadow-md ${SIZE_CLASSES[image.size]} ${
              image.size === "large" || image.size === "wide" ? "shadow-lg" : ""
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            {image.caption && (
              <div
                className={`absolute inset-0 bg-gradient-to-t flex items-end ${
                  image.size === "large"
                    ? "from-black/80 via-black/20 to-transparent p-8"
                    : "from-black/70 to-transparent p-6"
                }`}
              >
                <span
                  className={`text-white font-bold drop-shadow-md ${
                    image.size === "large" ? "text-xl" : "text-lg"
                  }`}
                >
                  {image.caption}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
