export type CatalogAdvertType =
  | "website"
  | "domain"
  | "sn"
  | "bot"
  | "script"
  | "game"
  | "marketplace";
export type FilterKey =
  | "type"
  | "price"
  | "is_ai"
  | "is_profitable"
  | "transfer_days_count"
  | "website_subtype"
  | "sn_type";
export type AvailableSort =
  | "-created_at"
  | "created_at"
  | "-price"
  | "price"
  | "-views_count"
  | "views_count";
export type AvailableFilterRequestKey =
  | "type"
  | "min_price"
  | "max_price"
  | "is_ai";
export type AvailableFilterRequestValueDataType =
  | string
  | number
  | string[]
  | number[];
export type RequestFilterTuple = [
  AvailableFilterRequestKey,
  AvailableFilterRequestValueDataType,
];
export type RequestFilterArray = RequestFilterTuple[];
export type RequestFilterInput =
  | RequestFilterArray
  | Record<AvailableFilterRequestKey, AvailableFilterRequestValueDataType>
  | null;

type DefaultFilter = {
  key: FilterKey;
  label: string;
};

export type BooleanFilterType = DefaultFilter & {
  type: "boolean";
};

export type StringFilterType = DefaultFilter & {
  type: "string";
  maxLength?: number;
};

export type RangeFilterType = DefaultFilter & {
  type: "range";
  minValue: number;
  maxValue: number;
};

export type MultipleFilterType = DefaultFilter & {
  type: "multiple";
  options: {
    key: string;
    label: string;
  }[];
};

export type RadioFilterType = DefaultFilter & {
  type: "radio";
  options: {
    key: string;
    label: string;
  }[];
};

export type AvailableFilter =
  | BooleanFilterType
  | StringFilterType
  | RangeFilterType
  | MultipleFilterType
  | RadioFilterType;
