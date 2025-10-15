import { Checkbox } from "@heroui/checkbox";

import {
  BooleanFilterType,
  RequestFilterArray,
  RequestFilterTuple,
} from "@/types/catalog";

interface BooleanFilterProps {
  filterData: BooleanFilterType;
  filters: RequestFilterArray;
  onFilterChange: (filters: RequestFilterArray) => void;
}

export default function BooleanFilter({
  filterData,
  filters,
  onFilterChange,
}: BooleanFilterProps): React.ReactElement {
  return (
    <label className="flex items-center gap-2">
      <Checkbox
        isSelected={filters.some(([key]) => key === filterData.key)}
        size="sm"
        onChange={(e) => {
          if (e.target.checked) {
            onFilterChange([
              ...filters,
              [filterData.key as RequestFilterTuple[0], 1],
            ]);
          } else {
            onFilterChange(
              filters.filter(([key]) => !(key === filterData.key)),
            );
          }
        }}
      >
        {filterData.label}
      </Checkbox>
    </label>
  );
}
