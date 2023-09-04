import {CollectionTemplate} from "@/templates/CollectionTemplate";
import {Collection} from "@/services/Collection";

export default async function CrateCollectionPage() {
  return <CollectionTemplate collection={Collection.DEFAULT}/>
}