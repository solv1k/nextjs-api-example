import { useState } from "react";

import CatalogFilters from "./filters";
import CatalogAdverts from "./adverts";

import {
  AvailableFilter,
  CatalogAdvertType,
  RequestFilterArray,
} from "@/types/catalog";

interface CatalogPageProps {
  title: string;
  types: CatalogAdvertType[];
  filters: AvailableFilter[];
}

export default function CatalogPage({
  title,
  types,
  filters,
}: CatalogPageProps): React.ReactElement {
  const [pageFilters, setPageFilters] = useState<RequestFilterArray>([]);

  return (
    <section aria-label={title} className="flex gap-4 w-full">
      <div className="filters hidden md:block w-1/5">
        <h3 className="text-base mb-6 font-bold">Фильтры</h3>

        <CatalogFilters
          filters={pageFilters}
          filtersMap={filters}
          onFiltersChange={setPageFilters}
        />
      </div>

      <CatalogAdverts
        className="flex-1"
        filters={pageFilters}
        sort={["-created_at"]}
        types={types}
        width="with-filters"
      />
    </section>
  );
}
