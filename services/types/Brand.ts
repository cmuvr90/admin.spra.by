import {Category} from "@/services/types/Category";
import {User} from "@/services/types/User";

export interface Brand {
  id: string | null,
  user: User | null,
  name: string,
  description: string,
  categories: Category[]
  createdAt?: string,
  updatedAt?: string,
}

export type BrandData = {
  id: string | null,
  user: string | null,
  name: string,
  description: string,
  categories: string[]
  createdAt?: string,
  updatedAt?: string,
}