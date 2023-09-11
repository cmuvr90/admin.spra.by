import {Image} from "@/services/types/Image";
import {VariantValue} from "@/services/types/VariantValue";
import {Product} from "@/services/types/Product";

export interface VariantBase {
  id: string | null,
  title: string,
  values: VariantValue[],
}

export interface Variant extends VariantBase {
  product: string | Product | null,
  image?: string | Image | null,
}

export interface VariantData {
  id?: string | null,
  title?: string,
  product?: string,
  image?: string | Image | null,
  values?: VariantValue[],
}