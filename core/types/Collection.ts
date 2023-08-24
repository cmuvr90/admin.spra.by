import { Category } from '@/core/types/Category';

export type Collection = {
  name: string
  handle: string
  title: string
  description?: string
  image?: {
    src: string
  } | null,
  categories: Category[]
}
