import { Image } from './Image';

export type Brand = {
  id: string
  user: string
  name: string
  description: string | null
  image: Image | null,
  categories: string[],
  createdAt: string,
  updatedAt: string,
}
