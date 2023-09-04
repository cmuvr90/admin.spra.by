'use server'

import AuthApi from "@/services/Api/AuthApi";
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {revalidatePath} from "next/cache";
import {Obj} from "@/services/types";
import {Collection as CollectionInterface, CollectionData} from "@/services/types/Collection";

async function getAuthApi() {
  return await AuthApi.api();
}

export async function getCollection(id: string): Promise<CollectionInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.collections.get(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function getCollections(params?: Obj): Promise<CollectionInterface[]> {
  const api = await getAuthApi();
  const {data, status, error} = await api.collections.list(params);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function updateCollection(value: CollectionData): Promise<CollectionInterface | null> {
  if (!value?.id) throw Error('id is required');

  const api = await getAuthApi();
  const {data, status, error} = await api.collections.update(value.id, value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function createCollection(value: CollectionData): Promise<CollectionInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.collections.create(value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function deleteCollection(id: string): Promise<any> {
  const api = await getAuthApi();
  const {data, status, error} = await api.collections.delete(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}
