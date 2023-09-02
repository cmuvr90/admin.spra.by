import Fetcher from './Fetcher';
import {FetchResponseStatus} from "@/services/types/Fetcher";
import Config from "@/config";
import {User} from "@/services/types/User";

export default class Api {
  private fetcher;
  public products;
  public users;

  constructor(headers?: { [key: string]: string } | null) {
    this.fetcher = new Fetcher({baseUrl: Config.API_BASE_URL, headers});

    this.products = {
      list: this.getProducts,
      get: this.getProduct,
    };

    this.users = {
      get: this.getUser,
      list: this.getUsers,
      create: this.createUser,
      update: this.updateUser,
      delete: this.deleteUser,
    };
  }

  /**
   *
   * @returns
   */
  private getUsers = async (params: any = null): Promise<{
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
  private getUser = async (id: string): Promise<{
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
  private updateUser = async (id: string, params: User): Promise<{
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
  private createUser = async (params: User): Promise<{
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
  private deleteUser = async (id: string): Promise<{
    data: any,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.delete(`/users/${id}`);
    return {data, status, error};
  }

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
