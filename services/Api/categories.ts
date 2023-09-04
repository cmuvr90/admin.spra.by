import Fetcher from './Fetcher';
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {Obj} from "@/services/types";
import {Category, CategoryData} from "@/services/types/Category";

export default class CategoryApi {
  private readonly fetcher;

  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher;
  }

  /**
   *
   * @returns
   */
  public list = async (params?: Obj): Promise<{
    data: Category[],
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/categories`, params);
    return {data, status, error};
  };

  /**
   *
   * @returns
   */
  public get = async (id: string): Promise<{
    data: Category | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/categories/${id}`);
    return {data, status, error};
  };

  /**
   *
   * @param id
   * @param params
   */
  public update = async (id: string, params: CategoryData): Promise<{
    data: Category | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.put(`/categories/${id}`, params);
    return {data, status, error};
  }

  /**
   *
   * @param params
   */
  public create = async (params: CategoryData): Promise<{
    data: Category | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.post(`/categories`, params);
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
    const {data, status, error} = await this.fetcher.delete(`/categories/${id}`);
    return {data, status, error};
  }
}
