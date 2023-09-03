import {BrandTemplate} from "@/templates/BrandTemplate";
import {Brand} from "@/services/Brand";

export default async function CrateBrandPage() {
  return <BrandTemplate brand={Brand.DEFAULT}/>
}