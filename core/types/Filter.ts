export type FilterType = {
  key: string;
  title: string;
  values: FilterValueType[]
}

export type FilterValueType = {
  value: string;
  ids: string[]
}

export type FilterCommonValueType = {
  key: string,
  values: string[];
  ids: string[]
}
