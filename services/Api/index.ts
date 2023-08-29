import Fetcher from './Fetcher';
import {FetcherParams, FetchResponseStatus} from "@/services/types/Fetcher";

export default class Api {
  private fetcher;
  public products;
  public users;

  constructor(params: FetcherParams) {
    this.fetcher = new Fetcher(params);
    this.products = {
      list: this.getProducts,
      get: this.getProduct,
    };
    this.users = {
      list: this.getUsers,
    };
  }

  /**
   *
   * @returns
   */
  private getUsers = async (params: any = {}): Promise<{
    data: any[],
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
  private getProducts = async (params: any): Promise<{
    data: any[],
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/products`, params);
    return {data, status, error};
  };

  /**
   *
   * @param id
   */
  private getProduct = async (id: string): Promise<{
    data: any,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/products/${id}`);
    return {data, status, error};
  };
}
