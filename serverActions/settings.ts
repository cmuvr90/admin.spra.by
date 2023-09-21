'use server'

import AuthApi from "@/services/Api/AuthApi";
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {Settings} from "@/services/types/Settings";

async function getAuthApi() {
  return await AuthApi.api();
}

export async function getSettings(): Promise<Settings | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.settings.get();
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}

export async function updateInformation(information: string): Promise<{ information: string } | null> {
  const api = await getAuthApi();
  const {data, status, error} = await api.settings.updateInformation(information);
  if (status === FetchResponseStatus.ERROR) throw Error(error || 'Error');
  return data;
}