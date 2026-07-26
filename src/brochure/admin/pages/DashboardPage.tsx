import { Marca } from "@/api/pricesList.types";
import { PriceListBrandColumn } from "@/brochure/admin/components/PriceListBrandColumn";

// Layout dividido en 2: El Avellano a la izquierda, Remate de Terrenos a la
// derecha. Cada mitad tiene sus propios Tabs (Postventa / Cliente).
export const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 gap-10 divide-border lg:grid-cols-2 lg:divide-x">
      <div className="min-w-0 lg:pr-10">
        <PriceListBrandColumn marca={Marca.ELAVELLANO} />
      </div>
      <div className="min-w-0 lg:pl-10">
        <PriceListBrandColumn marca={Marca.REMATEDETERRENOS} />
      </div>
    </div>
  );
};
