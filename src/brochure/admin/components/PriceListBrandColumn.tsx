import { Building2 } from "lucide-react";

import { Marca, TipoLista } from "@/api/pricesList.types";
import { MARCA_LABELS } from "@/brochure/admin/constants";
import { PriceListTypeTabPanel } from "@/brochure/admin/components/PriceListTypeTabPanel";
import { Tabs, TabsIndicator, TabsList, TabsPanel, TabsTab } from "@/components/ui/tabs";

interface PriceListBrandColumnProps {
  marca: Marca;
}

export function PriceListBrandColumn({ marca }: PriceListBrandColumnProps) {
  return (
    <section className="min-w-0 flex-1 space-y-4">
      <div className="flex items-center gap-2">
        <Building2 className="size-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">{MARCA_LABELS[marca]}</h2>
      </div>

      <Tabs defaultValue={TipoLista.POSTVENTA}>
        <TabsList>
          <TabsTab value={TipoLista.POSTVENTA}>Postventa</TabsTab>
          <TabsTab value={TipoLista.CLIENTE}>Cliente</TabsTab>
          <TabsIndicator />
        </TabsList>

        <TabsPanel value={TipoLista.POSTVENTA} className="pt-4">
          <PriceListTypeTabPanel marca={marca} tipo={TipoLista.POSTVENTA} />
        </TabsPanel>

        <TabsPanel value={TipoLista.CLIENTE} className="pt-4">
          <PriceListTypeTabPanel marca={marca} tipo={TipoLista.CLIENTE} />
        </TabsPanel>
      </Tabs>
    </section>
  );
}
