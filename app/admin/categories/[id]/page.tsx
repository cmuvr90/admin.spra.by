import {Brand as BrandInterface} from "@/services/types/Brand";
import {getBrand} from "@/serverActions/brand";
import {BrandTemplate} from "@/templates/BrandTemplate";

let brand: BrandInterface | null = null;

export default async function BrandPage({params: {id}}: Props) {
  try {
    brand = await getBrand(id);
  } catch (e) {
    console.log('ERROR = ', e);
  }

  return brand && <BrandTemplate brand={brand}/>
}

type Props = {
  params: { id: string }
}