import CatalogAdverts from "@/components/features/catalog/adverts";

export default function Catalog(): React.ReactElement {
    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="text-center">
                <h1 className="text-3xl mb-4">Каталог</h1>
                <CatalogAdverts />
            </div>
        </section>
    );
}