'use server'

import {Brand as BrandInterface} from "@/services/types/Brand";
import AuthApi from "@/services/Api/AuthApi";
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {revalidatePath} from "next/cache";

async function getAuthApi() {
  return await AuthApi.api();
}

export async function getBrand(id: string): Promise<BrandInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.brands.get(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function getBrands(): Promise<BrandInterface[]> {
  const api = await getAuthApi();
  const {data, status, error} = await api.brands.list();
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function updateBrand(value: BrandInterface): Promise<BrandInterface | null> {
  if (!value?.id) throw Error('id is required');

  const api = await getAuthApi();
  const {data, status, error} = await api.brands.update(value.id, value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function createBrand(value: BrandInterface): Promise<BrandInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.brands.create(value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function deleteBrand(id: string): Promise<any> {
  const api = await getAuthApi();
  const {data, status, error} = await api.brands.delete(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}
