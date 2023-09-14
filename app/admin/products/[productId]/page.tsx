import {Product as ProductInterface} from "@/services/types/Product";
import {getProduct} from "@/serverActions/product";
import {ProductTemplate} from "@/templates/ProductTemplate";

let product: ProductInterface | null = null;

export default async function ProductPage({params: {productId}}: Props) {
  try {
    product = await getProduct(productId);
  } catch (e) {
    console.log('ERROR = ', e);
  }

  return product && <ProductTemplate product={product}/>
}

type Props = {
  params: { productId: string }
}