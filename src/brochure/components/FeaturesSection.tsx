import { Headset, PiggyBank, TrendingUp, Wallet, type LucideIcon } from "lucide-react";
import type { FeatureCard } from "@/brochure/data/data";

interface FeaturesSectionProps {
  eyebrow: string;
  title: string;
  cards: FeatureCard[];
}

const ICONS: Record<FeatureCard["icon"], LucideIcon> = {
  "trending-up": TrendingUp,
  "piggy-bank": PiggyBank,
  headset: Headset,
  wallet: Wallet,
};

export function FeaturesSection({ eyebrow, title, cards }: FeaturesSectionProps) {
  const large = cards.find((c) => c.size === "large");
  const medium = cards.find((c) => c.size === "medium");
  const smalls = cards.filter((c) => c.size === "small");

  return (
    <section id="caracteristicas" className="py-20">
      <div className="text-center mb-12">
        <div className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-2">
          {eyebrow}
        </div>
        <h2 className="font-heading text-[32px] leading-10 font-semibold tracking-tight text-primary">
          {title}
        </h2>
        <div className="w-24 h-1 bg-clay-accent mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-auto md:h-[600px]">
        {large && <LargeCard card={large} />}
        {medium && <MediumCard card={medium} />}
        {smalls.map((card) => (
          <SmallCard key={card.title} card={card} />
        ))}
      </div>
    </section>
  );
}

function LargeCard({ card }: { card: FeatureCard }) {
  const Icon = ICONS[card.icon];
  return (
    <div className="md:col-span-2 md:row-span-2 bg-forest-deep text-white p-10 rounded-2xl relative overflow-hidden group shadow-xl">
      <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon className="size-[200px]" />
      </div>
      <div className="relative z-10 h-full flex flex-col justify-end">
        <Icon className="size-12 text-accent mb-6" />
        <h3 className="font-heading text-2xl leading-8 font-semibold mb-4 text-accent">
          {card.title}
        </h3>
        <p className="leading-relaxed text-white/80">{card.description}</p>
      </div>
    </div>
  );
}

function MediumCard({ card }: { card: FeatureCard }) {
  const Icon = ICONS[card.icon];
  return (
    <div className="md:col-span-2 bg-primary-container text-on-primary-container p-8 rounded-2xl flex flex-col justify-between hover:shadow-lg transition-shadow border border-mist-border relative overflow-hidden shadow-lg">
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Icon className="size-16" />
      </div>
      <div className="relative z-10">
        <Icon className="size-10 mb-4" />
        <h3 className="font-heading text-2xl leading-8 font-semibold mb-2">{card.title}</h3>
        <p className="opacity-90">{card.description}</p>
      </div>
    </div>
  );
}

function SmallCard({ card }: { card: FeatureCard }) {
  const Icon = ICONS[card.icon];
  return (
    <div className="bg-white border border-mist-border p-8 rounded-2xl hover:-translate-y-1 transition-all flex flex-col items-center text-center shadow-md">
      <Icon className="size-10 text-primary mb-4" />
      <h4 className="font-bold text-primary mb-2">{card.title}</h4>
      <p className="text-muted-foreground">{card.description}</p>
    </div>
  );
}
