import Fetcher from './Fetcher';
import {FetchResponseStatus} from "@/services/types/Fetcher";
import Config from "@/config";
import {User} from "@/services/types/User";
import {Brand, BrandData} from "@/services/types/Brand";
import {Obj} from "@/services/types";
import {Category, CategoryData} from "@/services/types/Category";
import {Option as OptionInterface, Option} from "@/services/types/Option";

export default class Api {
  private readonly fetcher;
  public readonly products;
  public readonly users;
  public readonly brands;
  public readonly categories;
  public readonly options;

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

    this.brands = {
      get: this.getBrand,
      list: this.getBrands,
      create: this.createBrand,
      update: this.updateBrand,
      delete: this.deleteBrand,
    };

    this.categories = {
      get: this.getCategory,
      list: this.getCategories,
      create: this.createCategory,
      update: this.updateCategory,
      delete: this.deleteCategory,
    };

    this.options = {
      get: this.getOption,
      list: this.getOptions,
      create: this.createOption,
      update: this.updateOption,
      delete: this.deleteOption,
    };
  }

  /**
   *
   * @returns
   */
  private getUsers = async (params?: Obj): Promise<{
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
  private getBrands = async (params?: Obj): Promise<{
    data: Brand[],
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/brands`, params);
    return {data, status, error};
  };

  /**
   *
   * @returns
   */
  private getBrand = async (id: string): Promise<{
    data: Brand | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/brands/${id}`);
    return {data, status, error};
  };

  /**
   *
   * @param id
   * @param params
   */
  private updateBrand = async (id: string, params: BrandData): Promise<{
    data: Brand | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.put(`/brands/${id}`, params);
    return {data, status, error};
  }

  /**
   *
   * @param params
   */
  private createBrand = async (params: BrandData): Promise<{
    data: Brand | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.post(`/brands`, params);
    return {data, status, error};
  }

  /**
   *
   * @param id
   */
  private deleteBrand = async (id: string): Promise<{
    data: any,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.delete(`/brands/${id}`);
    return {data, status, error};
  }

  /**
   *
   * @returns
   */
  private getCategories = async (params?: Obj): Promise<{
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
  private getCategory = async (id: string): Promise<{
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
  private updateCategory = async (id: string, params: CategoryData): Promise<{
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
  private createCategory = async (params: CategoryData): Promise<{
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
  private deleteCategory = async (id: string): Promise<{
    data: any,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.delete(`/categories/${id}`);
    return {data, status, error};
  }

  /**
   *
   * @returns
   */
  private getOptions = async (params?: Obj): Promise<{
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
  private getOption = async (id: string): Promise<{
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
  private updateOption = async (id: string, params: OptionInterface): Promise<{
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
  private createOption = async (params: OptionInterface): Promise<{
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
  private deleteOption = async (id: string): Promise<{
    data: any,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.delete(`/options/${id}`);
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
