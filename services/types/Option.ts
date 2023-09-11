export interface Option {
  id: string | null,
  name: string,
  type: string, //@todo enum
  title: string,
  description: string,
  values: string[],
}

export interface OptionValueData {
  option: string,
  name: string,
  title: string,
  value: string
}
