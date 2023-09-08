import {Category} from "@/services/types/Category";
import {Variant} from "@/services/types/Variant";
import {Image} from "@/services/types/Image";

export interface Product {
  id: string | null,
  title: string,
  description: string,
  category: null | Category,
  variants: Variant[],
  images: string[] | Image[],
}

export interface ProductData {
  id: string | null,
  title: string,
  description: string,
}