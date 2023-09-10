'use server'

import {Product as ProductInterface, ProductData} from "@/services/types/Product";
import AuthApi from "@/services/Api/AuthApi";
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {revalidatePath} from "next/cache";

async function getAuthApi() {
  return await AuthApi.api();
}

export async function getProduct(id: string): Promise<ProductInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.products.get(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function getProducts(): Promise<ProductInterface[]> {
  const api = await getAuthApi();
  const {data, status, error} = await api.products.list();
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function updateProduct(value: ProductData): Promise<ProductInterface | null> {
  if (!value?.id) throw Error('id is required');

  const api = await getAuthApi();
  const {data, status, error} = await api.products.update(value.id, value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function createProduct(value: ProductData): Promise<ProductInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.products.create(value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function deleteProduct(id: string): Promise<any> {
  const api = await getAuthApi();
  const {data, status, error} = await api.products.delete(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function setProductMainImage(productId: string, imageId: string): Promise<ProductInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.products.setMainImage(productId, imageId);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function createImages(productId: string, params: FormData): Promise<ProductInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.products.createImages(productId, params);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function deleteImages(productId: string, params: { ids: string[] }): Promise<ProductInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.products.deleteImages(productId, params);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}