import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Alert } from "@heroui/alert";
import { useCallback, useMemo } from "react";

import {
  RequestFilterArray,
  RequestFilterTuple,
  RangeFilterType,
} from "@/types/catalog";

interface RangeFilterProps {
  filterData: RangeFilterType;
  filters: RequestFilterArray;
  onFilterChange: (filters: RequestFilterArray) => void;
  onFilterReset: (filters: RequestFilterArray) => void;
}

export default function RangeFilter({
  filterData,
  filters,
  onFilterChange,
  onFilterReset,
}: RangeFilterProps): React.ReactElement {
  const minKey = useMemo(
    () => `min_${filterData.key}` as RequestFilterTuple[0],
    [filterData.key],
  );
  const maxKey = useMemo(
    () => `max_${filterData.key}` as RequestFilterTuple[0],
    [filterData.key],
  );

  const currentMin = useMemo(
    () => filters.find(([key]) => key === minKey)?.[1] as number | undefined,
    [filters, minKey],
  );
  const currentMax = useMemo(
    () => filters.find(([key]) => key === maxKey)?.[1] as number | undefined,
    [filters, maxKey],
  );

  const updateFilter = useCallback(
    (key: RequestFilterTuple[0], value: number | "") => {
      const numericValue = value === "" ? undefined : value;

      // Удаляем существующий фильтр с таким ключом
      const newFilters = filters.filter(([filterKey]) => filterKey !== key);

      // Добавляем новый фильтр, если значение указано
      if (numericValue !== undefined) {
        newFilters.push([key, numericValue]);
      }

      onFilterChange(newFilters);
    },
    [filters, onFilterChange],
  );

  const handleMinChange = useCallback(
    (value: string) => {
      const numValue = value === "" ? "" : Number(value);

      updateFilter(minKey, numValue);
    },
    [updateFilter],
  );

  const handleMaxChange = useCallback(
    (value: string) => {
      const numValue = value === "" ? "" : Number(value);

      updateFilter(maxKey, numValue);
    },
    [updateFilter],
  );

  const handleFilterReset = useCallback(() => {
    const otherFilters = filters.filter(
      ([key]) => key !== minKey && key !== maxKey,
    );

    onFilterReset(otherFilters);
  }, [filters, minKey, maxKey, onFilterReset]);

  const hasActiveFilters = currentMin !== undefined || currentMax !== undefined;

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
      <CardBody className="flex gap-3 flex-col p-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <label
              className="block text-tiny text-default-500 mb-1"
              htmlFor={"min_" + filterData.key}
            >
              От
            </label>
            <Input
              classNames={{
                input: "text-small",
              }}
              id={"min_" + filterData.key}
              max={filterData.maxValue}
              min={filterData.minValue}
              placeholder={String(filterData.minValue)}
              size="sm"
              type="number"
              value={currentMin?.toString() || ""}
              variant="bordered"
              onValueChange={handleMinChange}
            />
          </div>

          <div className="flex-1">
            <label
              className="block text-tiny text-default-500 mb-1"
              htmlFor={"max_" + filterData.key}
            >
              До
            </label>
            <Input
              classNames={{
                input: "text-small",
              }}
              id={"max_" + filterData.key}
              max={filterData.maxValue}
              min={filterData.minValue}
              placeholder={String(filterData.maxValue)}
              size="sm"
              type="number"
              value={currentMax?.toString() || ""}
              variant="bordered"
              onValueChange={handleMaxChange}
            />
          </div>
        </div>
        {/* Валидация */}
        {currentMin !== undefined &&
          currentMax !== undefined &&
          currentMin > currentMax && (
            <Alert className="text-xs" color="danger" variant="flat">
              Минимальное значение не может быть больше максимального
            </Alert>
          )}

        {/* Подсказка диапазона */}
        <div className="text-tiny text-default-400 text-center">
          Диапазон: {filterData.minValue} - {filterData.maxValue}
        </div>
      </CardBody>
    </Card>
  );
}
