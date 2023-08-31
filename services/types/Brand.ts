import {Category} from "@/services/types/Category";

export interface Brand {
  id: string,
  user: string,
  name: string,
  description: string,
  createdAt: string,
  updatedAt: string,
  categories: Category[]
}