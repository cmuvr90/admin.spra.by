import {Image} from "@/services/types/Image";
import {VariantValue} from "@/services/types/VariantValue";
import {Product} from "@/services/types/Product";

export interface Variant {
  id: string | null,
  title: string,
  product: string | Product | null,
  image: string | Image | null,
  values: VariantValue[],
}