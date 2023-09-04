import {Category} from "@/services/types/Category";

export interface CollectionBase {
  id: string | null,
  name: string,
  handle: string,
  title: string,
  description: string,
}

export interface Collection extends CollectionBase {
  categories: Category[],
  createdAt?: string,
  updatedAt?: string,
}

export interface CollectionData extends CollectionBase {
  categories: string[],
}