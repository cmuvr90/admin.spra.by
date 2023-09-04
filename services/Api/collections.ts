import Fetcher from './Fetcher';
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {Obj} from "@/services/types";
import {Collection, CollectionData} from "@/services/types/Collection";

export default class CollectionApi {
  private readonly fetcher;

  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher;
  }

  /**
   *
   * @returns
   */
  public list = async (params?: Obj): Promise<{
    data: Collection[],
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/collections`, params);
    return {data, status, error};
  };

  /**
   *
   * @returns
   */
  public get = async (id: string): Promise<{
    data: Collection | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/collections/${id}`);
    return {data, status, error};
  };

  /**
   *
   * @param id
   * @param params
   */
  public update = async (id: string, params: CollectionData): Promise<{
    data: Collection | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.put(`/collections/${id}`, params);
    return {data, status, error};
  }

  /**
   *
   * @param params
   */
  public create = async (params: CollectionData): Promise<{
    data: Collection | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.post(`/collections`, params);
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
    const {data, status, error} = await this.fetcher.delete(`/collections/${id}`);
    return {data, status, error};
  }
}
