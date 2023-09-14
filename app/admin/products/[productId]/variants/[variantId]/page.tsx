import {Product as ProductInterface} from "@/services/types/Product";
import {getProduct} from "@/serverActions/product";
import {Variant as VariantInterface} from "@/services/types/Variant";
import {VariantTemplate} from "@/templates/VariantTemplate";

let product: ProductInterface | null = null;
let variant: VariantInterface | null = null;

export default async function ProductPage({params: {variantId, productId}}: Props) {
  try {
    product = await getProduct(productId);
    if (product) variant = product?.variants.find(v => v.id === variantId) ?? null;
  } catch (e) {
    console.log('ERROR = ', e);
  }

  return (product && variant) && <VariantTemplate product={product} variant={variant}/>
}

type Props = {
  params: { variantId: string, productId: string }
}