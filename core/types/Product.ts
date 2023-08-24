import { Option } from './Option';
import { Image } from './Image';
import { Variant } from './Variant';

export type Product = {
  id: string,
  title: string
  description: string
  price: string | null
  discountPrice: string | null
  handle: string
  options: Option[]
  images: Image[]
  variants: Variant[]
}
