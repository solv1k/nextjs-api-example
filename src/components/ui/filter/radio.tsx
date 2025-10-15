import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { useCallback, useEffect, useState } from "react";
import { Checkbox } from "@heroui/checkbox";

import {
  AvailableFilterRequestValueDataType,
  RequestFilterArray,
  RequestFilterTuple,
  RadioFilterType,
} from "@/types/catalog";

interface RadioFilterProps {
  filterData: RadioFilterType;
  filters: RequestFilterArray;
  onFilterChange: (filters: RequestFilterArray) => void;
  onFilterReset: (filters: RequestFilterArray) => void;
}

export default function RadioFilter({
  filterData,
  filters,
  onFilterChange,
  onFilterReset,
}: RadioFilterProps): React.ReactElement {
  const [currentFilterValue, setCurrentFilterValue] =
    useState<AvailableFilterRequestValueDataType | null>(null);

  const updateCurrentFilterValue =
    useCallback((): AvailableFilterRequestValueDataType | null => {
      const currentFilter = filters.filter(
        ([filterKey]) => filterKey === filterData.key,
      );

      return currentFilter.length > 0
        ? (currentFilter[0][1] as AvailableFilterRequestValueDataType)
        : null;
    }, [filters, filterData.key]);

  useEffect(() => {
    setCurrentFilterValue(updateCurrentFilterValue());
  }, [updateCurrentFilterValue]);

  const handleFilterChange = useCallback(
    (optionKey: AvailableFilterRequestValueDataType, isChecked: boolean) => {
      const otherFilters = filters.filter(
        ([filterKey]) => filterKey !== filterData.key,
      );

      if (isChecked) {
        onFilterChange([
          ...otherFilters,
          [filterData.key as RequestFilterTuple[0], optionKey],
        ]);
      } else {
        onFilterChange(otherFilters);
      }
    },
    [filters, filterData.key, onFilterChange, updateCurrentFilterValue],
  );

  const handleFilterReset = useCallback(() => {
    const otherFilters = filters.filter(([key]) => key !== filterData.key);

    onFilterReset(otherFilters);
  }, [filters, filterData.key, onFilterReset]);

  const hasActiveFilter = currentFilterValue !== null;

  return (
    <Card shadow="sm">
      <CardHeader className="flex justify-between items-center pb-0">
        <label className="text-small font-medium text-foreground">
          {filterData.label}
        </label>
        {hasActiveFilter && (
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
            isSelected={currentFilterValue === option.key}
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
