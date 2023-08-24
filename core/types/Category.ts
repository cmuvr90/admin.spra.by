import { Option } from '@/core/types/Option';

export type Category = {
  id: string;
  name: string;
  handle: string;
  title: string;
  description?: string;
  image: {
    src: string;
  } | null;
  options: Option[];
  createdAt: string;
  updatedAt: string;
};
