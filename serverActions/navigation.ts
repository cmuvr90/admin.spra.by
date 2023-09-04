'use server'

import {Navigation as NavigationInterface} from "@/services/types/Navigation";
import AuthApi from "@/services/Api/AuthApi";
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {revalidatePath} from "next/cache";

async function getAuthApi() {
  return await AuthApi.api();
}

export async function getNavigation(type: string): Promise<NavigationInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.navigations.get(type);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function updateNavigation(value: NavigationInterface): Promise<NavigationInterface | null> {
  if (!value?.id) throw Error('id is required');

  const api = await getAuthApi();
  const {data, status, error} = await api.navigations.update(value.id, value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function createNavigation(value: NavigationInterface): Promise<NavigationInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.navigations.create(value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}