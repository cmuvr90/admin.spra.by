import {FetcherMethods, FetcherParams, FetchResponseStatus, FetchResponseType} from "@/services/types/Fetcher";
import {Obj} from "@/services/types";

const qs = require('qs');

export default class Fetcher {
  private readonly baseUrl;
  private headers;

  constructor({baseUrl, headers}: FetcherParams) {
    this.baseUrl = baseUrl;
    this.headers = headers ?? {};
  }

  /**
   *
   * @param value
   */
  public setHeaders = (value: { [key: string]: string }) => {
    this.headers = {...this.headers, ...value};
  }

  /**
   *
   * @param url
   * @param params
   */
  public get = async (url: string, params?: Obj): Promise<FetchResponseType> => {
    const queryData = !!params ? '?' + qs.stringify(params) : '';
    return await this.query(url + queryData, null, FetcherMethods.GET);
  };

  /**
   *
   * @param url
   * @param params
   */
  public post = async (url: string, params?: Obj) => {
    return await this.query(url, params ?? null, FetcherMethods.POST);
  }

  /**
   *
   * @param url
   * @param params
   */
  public put = async (url: string, params?: Obj) => {
    return await this.query(url, params ?? null, FetcherMethods.PUT);
  }

  /**
   *
   * @param url
   * @param params
   */
  public delete = async (url: string, params?: Obj) => {
    const queryData = params ? '?' + qs.stringify(params) : '';
    return await this.query(url + queryData, null, FetcherMethods.DELETE);
  }

  /**
   *
   * @param url
   * @param data
   * @param method
   */
  private query = async (url: string, data: any, method: FetcherMethods,): Promise<FetchResponseType> => {
    try {

      const headers: { [key: string]: string } = {
        "Content-Type": "application/json",
        ...this.headers
      };

      const queryData: { [key: string]: any } = {
        method,
        headers,
        next: {
          // cache: 'no-store',
          revalidate: 3,
        },
      }

      if (data) queryData.body = JSON.stringify(data)
      const response = await fetch(`${this.baseUrl}${url}`, queryData);
      const responseData = await response.json();

      if (response.ok) {
        return {
          data: responseData?.data ?? null,
          status: responseData?.status ?? FetchResponseStatus.SUCCESS,
          error: null
        };
      } else {
        throw new Error(responseData?.message || 'Error');
      }

    } catch (e: any) {
      return {data: null, error: `${e?.message || e}`, status: FetchResponseStatus.ERROR};
    }
  };
}
