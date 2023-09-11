import Fetcher from './Fetcher';
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {Obj} from "@/services/types";
import {Product, ProductData} from "@/services/types/Product";
import {OptionValueData} from "@/services/types/Option";
import {VariantData} from "@/services/types/Variant";

export default class ProductApi {
  private readonly fetcher;

  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher;
  }

  /**
   *
   * @returns
   */
  public list = async (params?: Obj): Promise<{
    data: Product[],
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/products`, params);
    return {data, status, error};
  };

  /**
   *
   * @returns
   */
  public get = async (id: string): Promise<{
    data: Product | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/products/${id}`);
    return {data, status, error};
  };

  /**
   *
   * @param id
   * @param params
   */
  public update = async (id: string, params: ProductData): Promise<{
    data: Product | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.put(`/products/${id}`, params);
    return {data, status, error};
  }

  /**
   *
   * @param params
   */
  public create = async (params: ProductData): Promise<{
    data: Product | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.post(`/products`, params);
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
    const {data, status, error} = await this.fetcher.delete(`/products/${id}`);
    return {data, status, error};
  }

  /**
   *
   * @param productId
   * @param imageId
   */
  public setMainImage = async (productId: string, imageId: string): Promise<{
    data: Product | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.put(`/products/${productId}/images/${imageId}/main`);
    return {data, status, error};
  }

  /**
   *
   * @param productId
   * @param params
   */
  public createImages = async (productId: string, params: FormData): Promise<{
    data: Product | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.post(`/products/${productId}/images`, params);
    return {data, status, error};
  }

  /**
   *
   * @param productId
   * @param params
   */
  public deleteImages = async (productId: string, params: { ids: string[] }): Promise<{
    data: Product | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.delete(`/products/${productId}/images`, params);
    return {data, status, error};
  }

  /**
   *
   * @param productId
   * @param params
   */
  public createVariant = async (productId: string, params: OptionValueData): Promise<{
    data: Product | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.post(`/products/${productId}/variants`, params);
    return {data, status, error};
  }

  /**
   *
   * @param productId
   * @param variantId
   * @param params
   */
  public updateVariant = async (productId: string, variantId: string, params: VariantData): Promise<{
    data: Product | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.put(`/products/${productId}/variants/${variantId}`, params);
    return {data, status, error};
  }
}
