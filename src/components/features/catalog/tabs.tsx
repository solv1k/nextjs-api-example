"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { usePathname } from "next/navigation";

import { catalogConfig } from "@/config/catalog";

export default function CatalogTabs(): React.ReactElement {
  const pathname = usePathname();

  return (
    <div className="flex w-full gap-4 justify-between overflow-x-auto scrollbar-hide mb-4">
      {catalogConfig.categories.map((category) => {
        const isActive = category.key === pathname.split("/").pop();

        return (
          <Button
            key={category.key}
            as={Link}
            className="w-[180px] flex-shrink-0 lg:w-[230px] lg:flex-shrink-1 data-[active=true]:bg-primary data-[active=true]:text-white"
            data-active={isActive}
            href={isActive ? "/catalog" : `/catalog/${category.key}`}
          >
            {category.title}
          </Button>
        );
      })}
    </div>
  );
}
