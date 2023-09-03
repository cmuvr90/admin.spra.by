import {ResourceListSelectedItems} from "@shopify/polaris/build/ts/src/utilities/resource-list";
import React from "react";

export type Obj = {
  [key: string | number | symbol]: any
}

export type Paginator = {
  prev: boolean,
  next: boolean,
  page: number
}

export type ResourcesPickerProps = {
  apiMethod: (params: Obj) => Promise<any>
  onSelect: (value: Obj[] | Obj | null) => void
  multiselect: boolean,
  onRenderItem?: ((item: Obj, selected?: ResourceListSelectedItems) => React.JSX.Element) | null,
  selectedItems: ResourceListSelectedItems
}

export enum PICKER_RESOURCE_TYPE {
  USER = 'user',
  USERS = 'users',
  CATEGORY = 'category',
  CATEGORIES = 'categories',
  OPTION = 'option',
  OPTIONS = 'options'
}