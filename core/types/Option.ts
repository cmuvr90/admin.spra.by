export type Option = {
  id: string;
  name: string;
  type: string; //@todo fix
  key: string; //@todo remove
  title: string;
  description: string | null;
  values: string[];
  createdAt: string;
  updatedAt: string;
};

export type OptionData = {
  id: string,
  label: string,
  options: {
    label: string,
    value: string
  }[]
}
