import Fetcher from './Fetcher';
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {Obj} from "@/services/types";
import {Option as OptionInterface, Option} from "@/services/types/Option";

export default class OptionApi {
  private readonly fetcher;

  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher;
  }

  /**
   *
   * @returns
   */
  public list = async (params?: Obj): Promise<{
    data: Option[],
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/options`, params);
    return {data, status, error};
  };

  /**
   *
   * @returns
   */
  public get = async (id: string): Promise<{
    data: Option | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/options/${id}`);
    return {data, status, error};
  };

  /**
   *
   * @param id
   * @param params
   */
  public update = async (id: string, params: OptionInterface): Promise<{
    data: Option | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.put(`/options/${id}`, params);
    return {data, status, error};
  }

  /**
   *
   * @param params
   */
  public create = async (params: OptionInterface): Promise<{
    data: Option | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.post(`/options`, params);
    return {data, status, error};
  }

  /**
   *
   * @param id
   */
  public delete = async (id: string): Promise<{
    data: any,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.delete(`/options/${id}`);
    return {data, status, error};
  }
}
