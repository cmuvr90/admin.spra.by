import {Category as CategoryInterface} from "@/services/types/Category";
import {getCategory} from "@/serverActions/category";
import {CategoryTemplate} from "@/templates/CategoryTemplate";

let category: CategoryInterface | null = null;

export default async function CategoryPage({params: {id}}: Props) {
  try {
    category = await getCategory(id);
  } catch (e) {
    console.log('ERROR = ', e);
  }

  return category && <CategoryTemplate category={category}/>
}

type Props = {
  params: { id: string }
}