const qs = require('qs');
import { FetchResponseStatus, FetchResponseType } from '@/core/types/Fetcher';

export default class Fetcher {
  private readonly baseUrl;

  constructor({ baseUrl }: { baseUrl: string }) {
    this.baseUrl = baseUrl;
  }

  /**
   *
   * @param url
   * @param params
   * @returns
   */
  public get = async (url: string, params = {}): Promise<FetchResponseType> => {
    return await this.query(url + '?' + qs.stringify(params));
  };

  /**
   *
   * @param url
   * @param data
   * @returns
   */
  private query = async (url: string, data?: any): Promise<FetchResponseType> => {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        next: {
          revalidate: 3000,
        },
      });

      if (!response.ok) throw new Error('post not found');

      const responseData = await response.json();

      if (responseData?.error) throw new Error(responseData.error);

      return { data: responseData?.data ?? null, status: responseData?.status ?? FetchResponseStatus.SUCCESS, error: null };
    } catch (e: any) {
      return { data: null, error: `${e?.message || e}`, status: FetchResponseStatus.ERROR };
    }
  };
}
