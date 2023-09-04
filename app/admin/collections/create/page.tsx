import {CategoryTemplate} from "@/templates/CategoryTemplate";
import {Category} from "@/services/Category";

export default async function CrateBrandPage() {
  return <CategoryTemplate category={Category.DEFAULT}/>
}