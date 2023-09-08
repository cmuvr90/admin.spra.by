import {Option} from "@/services/types/Option";

export interface VariantValue {
  id: string | null,
  option: string | Option | null,
  value: string,
  title: string
}