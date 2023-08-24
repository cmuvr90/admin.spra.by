import Fetcher from './Fetcher';
import { FetchResponseStatus } from '@/core/types/Fetcher';
import { MainMenu } from '@/core/types/Navigation';
import { Product } from '@/core/types/Product';
import { Collection } from '@/core/types/Collection';

export default class Api {
  private fetcher;
  public navigation;
  public products;
  public collections;

  constructor({ baseUrl }: {
    baseUrl: string
  }) {
    this.fetcher = new Fetcher({ baseUrl });
    this.navigation = {
      main: this.navigationMainMenu,
    };
    this.products = {
      list: this.getProducts,
      get: this.getProduct,
    };
    this.collections = {
      get: this.getCollection,
    };
  }

  /**
   *
   * @returns
   */
  private navigationMainMenu = async (): Promise<{
    data: MainMenu[],
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const { data, status, error } = await this.fetcher.get('/navigations/main');
    return { data, status, error };
  };

  /**
   *
   * @param handle
   * @returns
   */
  private getCollection = async (handle: string): Promise<{
    data: Collection | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const { data, status, error } = await this.fetcher.get(`/collections/${handle}`);
    return { data, status, error };
  };

  /**
   *
   * @returns
   */
  private getProducts = async (params: any): Promise<{
    data: Product[],
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const { data, status, error } = await this.fetcher.get(`/products`, params);
    return { data, status, error };
  };

  /**
   *
   * @param id
   */
  private getProduct = async (id: string): Promise<{
    data: Product,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const { data, status, error } = await this.fetcher.get(`/products/${id}`);
    return { data, status, error };
  };
}
