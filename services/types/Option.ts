export interface Option {
  id: string,
  name: string,
  type: string, //@todo enum
  title: string,
  description: string,
  values: string[],
}
