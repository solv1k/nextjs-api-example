import { Button } from "@heroui/button";
import { useCallback, useState } from "react";

import BooleanFilterType from "@/components/ui/filter/boolean";
import MultipleFilter from "@/components/ui/filter/multiple";
import RadioFilter from "@/components/ui/filter/radio";
import RangeFilter from "@/components/ui/filter/range";
import { AvailableFilter, RequestFilterArray } from "@/types/catalog";

interface CatalogFiltersProps {
  filters: RequestFilterArray;
  onFiltersChange: (filters: RequestFilterArray) => void;
  filtersMap: AvailableFilter[];
  className?: string;
}

export default function CatalogFilters({
  filters,
  onFiltersChange,
  filtersMap,
  className,
}: CatalogFiltersProps): React.ReactElement {
  const [draftFilters, setDraftFilters] = useState<RequestFilterArray>(filters);
  const [isChanged, setIsChanged] = useState(false);
  const [isApplied, setIsApplied] = useState(false);

  const areFiltersEqual = useCallback(
    (a: RequestFilterArray, b: RequestFilterArray): boolean => {
      if (a.length !== b.length) return false;

      const aSorted = [...a].sort(([keyA], [keyB]) => keyA.localeCompare(keyB));
      const bSorted = [...b].sort(([keyA], [keyB]) => keyA.localeCompare(keyB));

      return aSorted.every((filterA, index) => {
        const filterB = bSorted[index];

        return filterA[0] === filterB[0] && filterA[1] === filterB[1];
      });
    },
    [],
  );

  const handleFiltersChange = useCallback(
    (f: RequestFilterArray) => {
      setDraftFilters(f);
      setIsChanged(!areFiltersEqual(f, filters));
    },
    [filters, areFiltersEqual],
  );

  const handleFiltersReset = useCallback(
    (f: RequestFilterArray) => {
      setDraftFilters(f);
      setIsChanged(!areFiltersEqual(f, filters));
      if (isApplied) {
        setIsChanged(false);
        onFiltersChange(f);
        window?.scrollTo(0, 0);
      }
    },
    [filters, isApplied, onFiltersChange],
  );

  const handleFiltersApply = useCallback(
    (f: RequestFilterArray) => {
      setDraftFilters(f);
      setIsChanged(false);
      onFiltersChange(f);
      setIsApplied(false);
    },
    [filters, onFiltersChange],
  );

  const handleApply = useCallback(() => {
    setIsChanged(false);
    onFiltersChange(draftFilters);
    setIsApplied(draftFilters.length > 0);
    window?.scrollTo(0, 0);
  }, [draftFilters, onFiltersChange]);

  const handleReset = useCallback(() => {
    setIsChanged(false);
    setDraftFilters([]);
    if (filters.length > 0) {
      onFiltersChange([]);
      setIsApplied(false);
      window?.scrollTo(0, 0);
    }
  }, [filters, onFiltersChange]);

  return (
    <div className={["flex flex-col gap-6", className].join(" ")}>
      {/* Контейнер для фильтров с прокруткой */}
      <div className="flex-1 flex flex-col gap-4">
        {filtersMap.map((filter) => {
          switch (filter.type) {
            case "boolean":
              return (
                <BooleanFilterType
                  key={filter.key}
                  filterData={filter}
                  filters={draftFilters}
                  onFilterChange={handleFiltersApply}
                />
              );
            case "range":
              return (
                <RangeFilter
                  key={filter.key}
                  filterData={filter}
                  filters={draftFilters}
                  onFilterChange={handleFiltersChange}
                  onFilterReset={handleFiltersReset}
                />
              );
            case "multiple":
              return (
                <MultipleFilter
                  key={filter.key}
                  filterData={filter}
                  filters={draftFilters}
                  onFilterChange={handleFiltersChange}
                  onFilterReset={handleFiltersReset}
                />
              );
            case "radio":
              return (
                <RadioFilter
                  key={filter.key}
                  filterData={filter}
                  filters={draftFilters}
                  onFilterChange={handleFiltersChange}
                  onFilterReset={handleFiltersReset}
                />
              );
            default:
              return null;
          }
        })}
      </div>

      {/* Кнопки закреплены снизу */}
      {(isChanged || draftFilters.length > 0) && (
        <div className="sticky bottom-0 bg-background py-4 z-10">
          <div className="flex flex-col gap-2">
            {isChanged && (
              <Button fullWidth color="primary" size="sm" onPress={handleApply}>
                Применить
              </Button>
            )}
            {draftFilters.length > 0 && (
              <Button fullWidth size="sm" variant="light" onPress={handleReset}>
                Сбросить все
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
