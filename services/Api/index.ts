import Fetcher from './Fetcher';
import {FetchResponseStatus} from "@/services/types/Fetcher";
import Config from "@/config";
import {User} from "@/services/types/User";

export default class Api {
  private fetcher;
  public products;
  public users;

  constructor(params: {}) {
    this.fetcher = new Fetcher({
      baseUrl: Config.API_BASE_URL,
      token: Config.API_TOKEN,
      ...params
    });

    this.products = {
      list: this.getProducts,
      get: this.getProduct,
    };
    
    this.users = {
      get: this.getUser,
      list: this.getUsers,
    };
  }

  /**
   *
   * @returns
   */
  private getUsers = async (params: any = {}): Promise<{
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
