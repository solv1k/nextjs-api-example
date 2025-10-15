import CatalogAdverts from "@/components/features/catalog/adverts";
import CatalogTabs from "@/components/features/catalog/tabs";

export default function Catalog(): React.ReactElement {
  return (
    <>
      <CatalogTabs />
      <CatalogAdverts />
    </>
  );
}
