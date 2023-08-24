import { Image } from './Image';

export type Variant = {
  id: string,
  title: string | null,
  values: {
    option: string,
    value: string,
    title: string
  }[],
  image: Image
}
