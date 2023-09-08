import {ProductTemplate} from "@/templates/ProductTemplate";
import {Product} from "@/services/Product";

export default async function CrateProductPage() {
  return <ProductTemplate product={Product.DEFAULT}/>
}