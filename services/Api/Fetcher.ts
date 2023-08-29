import {FetcherMethods, FetcherParams, FetchResponseStatus, FetchResponseType} from "@/services/types/Fetcher";

const qs = require('qs');

export default class Fetcher {
  private readonly baseUrl;
  private readonly token;
  private readonly userId;

  constructor({baseUrl, token, userId}: FetcherParams) {
    this.baseUrl = baseUrl;
    this.token = token;
    this.userId = userId;
  }

  /**
   *
   * @param url
   * @param params
   */
  public get = async (url: string, params = {}): Promise<FetchResponseType> => {
    return await this.query(url + '?' + qs.stringify(params), params, FetcherMethods.GET);
  };

  /**
   *
   * @param url
   * @param params
   */
  public post = async (url: string, params = {}) => {
    return await this.query(url, params, FetcherMethods.POST);
  }

  /**
   *
   * @param url
   * @param params
   */
  public put = async (url: string, params = {}) => {
    return await this.query(url, params, FetcherMethods.PUT);
  }

  /**
   *
   * @param url
   * @param params
   */
  public delete = async (url: string, params = {}) => {
    return await this.query(url + '?' + qs.stringify(params), params, FetcherMethods.DELETE);
  }

  /**
   *
   * @param url
   * @param data
   * @param method
   */
  private query = async (url: string, data: any, method: FetcherMethods,): Promise<FetchResponseType> => {
    try {

      const headers: {[key: string]: string} = {};
      if (this.token) headers['token'] = this.token;
      if (this.userId) headers['userId'] = this.userId;

      const response = await fetch(`${this.baseUrl}${url}`, {
        headers,
        next: {
          revalidate: 3000,
        },
      });

      const responseData = await response.json();

      if (response.ok) {
        return {data: responseData?.data ?? null, status: responseData?.status ?? FetchResponseStatus.SUCCESS, error: null};
      } else {
        throw new Error(responseData?.message || 'Error');
      }

    } catch (e: any) {
      return {data: null, error: `${e?.message || e}`, status: FetchResponseStatus.ERROR};
    }
  };
}
