import {Collection as CollectionInterface} from "@/services/types/Collection";
import {CollectionTemplate} from "@/templates/CollectionTemplate";
import {getCollection} from "@/serverActions/collection";

let collection: CollectionInterface | null = null;

export default async function CollectionPage({params: {id}}: Props) {
  try {
    collection = await getCollection(id);
  } catch (e) {
    console.log('ERROR = ', e);
  }

  return collection && <CollectionTemplate collection={collection}/>
}

type Props = {
  params: { id: string }
}