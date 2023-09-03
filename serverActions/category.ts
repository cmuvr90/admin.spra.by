'use server'

import {Category as CategoryInterface} from "@/services/types/Category";
import AuthApi from "@/services/Api/AuthApi";
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {revalidatePath} from "next/cache";
import {Obj} from "@/services/types";

async function getAuthApi() {
  return await AuthApi.api();
}

export async function getCategory(id: string): Promise<CategoryInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.categories.get(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function getCategories(params?: Obj): Promise<CategoryInterface[]> {
  const api = await getAuthApi();
  const {data, status, error} = await api.categories.list(params);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function updateCategory(value: CategoryInterface): Promise<CategoryInterface | null> {
  if (!value?.id) throw Error('id is required');

  const api = await getAuthApi();
  const {data, status, error} = await api.categories.update(value.id, value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function createCategory(value: CategoryInterface): Promise<CategoryInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.categories.create(value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function deleteCategory(id: string): Promise<any> {
  const api = await getAuthApi();
  const {data, status, error} = await api.categories.delete(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}
