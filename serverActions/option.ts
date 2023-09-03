'use server'

import {Option as OptionInterface} from "@/services/types/Option";
import AuthApi from "@/services/Api/AuthApi";
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {revalidatePath} from "next/cache";
import {Obj} from "@/services/types";

async function getAuthApi() {
  return await AuthApi.api();
}

export async function getOption(id: string): Promise<OptionInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.options.get(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function getOptions(params?: Obj): Promise<OptionInterface[]> {
  const api = await getAuthApi();
  const {data, status, error} = await api.options.list(params);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function updateOption(value: OptionInterface): Promise<OptionInterface | null> {
  if (!value?.id) throw Error('id is required');

  const api = await getAuthApi();
  const {data, status, error} = await api.options.update(value.id, value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function createOption(value: OptionInterface): Promise<OptionInterface | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.options.create(value);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}

export async function deleteOption(id: string): Promise<any> {
  const api = await getAuthApi();
  const {data, status, error} = await api.options.delete(id);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  revalidatePath(`/`)
  return data;
}
