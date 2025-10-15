"use client";

import { useParams } from "next/navigation";

import CatalogTabs from "@/components/features/catalog/tabs";
import CatalogPage from "@/components/features/catalog/page";
import { catalogConfig } from "@/config/catalog";

export default function CatalogCategory(): React.ReactElement | null {
  const params = useParams<{ category: string }>();
  const config = catalogConfig.categories.find(
    (category) => category.key === params.category,
  );

  if (!config) return null;

  return (
    <>
      <CatalogTabs />
      <CatalogPage
        filters={[...catalogConfig.commonFilters, ...config.filters]}
        title={config.title}
        types={config.types}
      />
    </>
  );
}
