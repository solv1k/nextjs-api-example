export default function CatalogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="flex flex-col gap-6">{children}</section>;
}
