export interface Navigation {
  id?: string | null,
  type: string, //main
  body: MenuItem[]
}

export type MenuItem = {
  url: string,
  title: string
  children?: MenuItem[]
}