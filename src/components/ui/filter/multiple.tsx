import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Checkbox } from "@heroui/checkbox";
import { useCallback, useMemo } from "react";

import {
  AvailableFilterRequestValueDataType,
  RequestFilterArray,
  RequestFilterTuple,
  MultipleFilterType,
} from "@/types/catalog";

interface MultipleFilterProps {
  filterData: MultipleFilterType;
  filters: RequestFilterArray;
  onFilterChange: (filters: RequestFilterArray) => void;
  onFilterReset: (filters: RequestFilterArray) => void;
}

export default function MultipleFilter({
  filterData,
  filters,
  onFilterChange,
  onFilterReset,
}: MultipleFilterProps): React.ReactElement {
  const currentFilterValues = useMemo((): string[] => {
    return filters
      .filter(([filterKey]) => filterKey === filterData.key)
      .flatMap(([, value]) => value) as string[];
  }, [filters, filterData.key]);

  const handleFilterChange = useCallback(
    (optionKey: AvailableFilterRequestValueDataType, isChecked: boolean) => {
      let newFilterValues: string[] = [];

      if (isChecked) {
        newFilterValues = [...currentFilterValues, optionKey.toString()];
      } else {
        newFilterValues = currentFilterValues.filter(
          (value) => value !== optionKey,
        );
      }

      const otherFilters = filters.filter(
        ([filterKey]) => filterKey !== filterData.key,
      );

      if (newFilterValues.length > 0) {
        onFilterChange([
          ...otherFilters,
          [filterData.key as RequestFilterTuple[0], newFilterValues],
        ]);
      } else {
        onFilterChange(otherFilters);
      }
    },
    [currentFilterValues, filters, filterData.key, onFilterChange],
  );

  const handleFilterReset = useCallback(() => {
    const otherFilters = filters.filter(([key]) => key !== filterData.key);

    onFilterReset(otherFilters);
  }, [filters, filterData.key, onFilterReset]);

  const hasActiveFilters = currentFilterValues.length > 0;

  return (
    <Card shadow="sm">
      <CardHeader className="flex justify-between items-center pb-0">
        <label className="text-small font-medium text-foreground">
          {filterData.label}
        </label>
        {hasActiveFilters && (
          <Button
            className="h-auto min-w-0 p-0 text-small"
            color="primary"
            size="sm"
            variant="light"
            onPress={handleFilterReset}
          >
            Сбросить
          </Button>
        )}
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        {filterData.options.map((option) => (
          <Checkbox
            key={`${filterData.key}-${option.key}`}
            aria-label={option.label}
            isSelected={currentFilterValues.includes(option.key)}
            size="sm"
            onChange={(e) => handleFilterChange(option.key, e.target.checked)}
          >
            {option.label}
          </Checkbox>
        ))}
      </CardBody>
    </Card>
  );
}
