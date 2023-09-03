import {Option} from "@/services/types/Option";

export interface Category {
  id: string | null,
  name: string,
  title: string,
  description: string,
  options: Option[],
  createdAt?: string,
  updatedAt?: string,
}

export type CategoryData = {
  id: string | null,
  name: string,
  title: string,
  description: string,
  options: string[],
}