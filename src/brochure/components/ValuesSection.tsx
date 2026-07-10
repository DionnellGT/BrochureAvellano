import { Leaf, MapPin, ShieldCheck, type LucideIcon } from "lucide-react";
import type { ValueItem } from "@/brochure/data/data";

interface ValuesSectionProps {
  values: ValueItem[];
}

const ICONS: Record<ValueItem["icon"], LucideIcon> = {
  leaf: Leaf,
  "map-pin": MapPin,
  "shield-check": ShieldCheck,
};

const ROTATIONS = ["rotate-3", "-rotate-3", "rotate-6"];

export function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="py-16 bg-surface-container-high rounded-[2rem] px-10 mb-20 shadow-inner">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center">
        {values.map((value, index) => {
          const Icon = ICONS[value.icon];
          return (
            <div key={value.title} className="flex flex-col items-center">
              <div
                className={`w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 hover:rotate-0 transition-transform ${ROTATIONS[index % ROTATIONS.length]}`}
              >
                <Icon className="size-9 text-primary" />
              </div>
              <h3 className="font-heading text-2xl leading-8 font-semibold text-primary mb-3">
                {value.title}
              </h3>
              <p className="text-muted-foreground max-w-xs">{value.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
