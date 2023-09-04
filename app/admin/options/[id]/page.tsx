import {Option as OptionInterface} from "@/services/types/Option";
import {OptionTemplate} from "@/templates/OptionTemplate";
import {getOption} from "@/serverActions/option";

let option: OptionInterface | null = null;

export default async function OptionPage({params: {id}}: Props) {
  try {
    option = await getOption(id);
  } catch (e) {
    console.log('ERROR = ', e);
  }

  return option && <OptionTemplate option={option}/>
}

type Props = {
  params: { id: string }
}