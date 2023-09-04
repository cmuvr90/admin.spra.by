import Fetcher from './Fetcher';
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {User} from "@/services/types/User";
import {Obj} from "@/services/types";

export default class UserApi {
  private readonly fetcher;

  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher;
  }

  /**
   *
   * @returns
   */
  public list = async (params?: Obj): Promise<{
    data: User[],
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/users`, params);
    return {data, status, error};
  };

  /**
   *
   * @returns
   */
  public get = async (id: string): Promise<{
    data: User | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/users/${id}`);
    return {data, status, error};
  };

  /**
   *
   * @param id
   * @param params
   */
  public update = async (id: string, params: User): Promise<{
    data: User | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.put(`/users/${id}`, params);
    return {data, status, error};
  }

  /**
   *
   * @param params
   */
  public create = async (params: User): Promise<{
    data: User | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.post(`/users`, params);
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
    const {data, status, error} = await this.fetcher.delete(`/users/${id}`);
    return {data, status, error};
  }
}
