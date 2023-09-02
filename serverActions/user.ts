'use server'

import {User as UserInterface} from "@/services/types/User";
import AuthApi from "@/services/Api/AuthApi";
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {revalidatePath} from "next/cache";

async function getAuthApi() {
  return await AuthApi.api();
}

export async function getUser(id: string): Promise<UserInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.users.get(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function getUsers(): Promise<UserInterface[]> {
  const api = await getAuthApi();
  const {data, status, error} = await api.users.list();
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function updateUser(value: UserInterface): Promise<UserInterface | null> {
  if (!value?.id) throw Error('id is required');
  const api = await getAuthApi();
  const {data, status, error} = await api.users.update(value.id, value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function createUser(value: UserInterface): Promise<UserInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.users.create(value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function deleteUser(id: string): Promise<any> {
  const api = await getAuthApi();
  const {data, status, error} = await api.users.delete(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}
