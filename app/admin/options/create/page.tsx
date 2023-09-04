import {OptionTemplate} from "@/templates/OptionTemplate";
import {Option} from "@/services/Option";

export default async function CrateCollectionPage() {
  return <OptionTemplate option={Option.DEFAULT}/>
}