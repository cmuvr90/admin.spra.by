import Fetcher from './Fetcher';
import {FetchResponseStatus} from "@/services/types/Fetcher";
import {Settings} from "@/services/types/Settings";

export default class NavigationApi {
  private readonly fetcher;

  constructor(fetcher: Fetcher) {
    this.fetcher = fetcher;
  }

  /**
   *
   * @returns
   */
  public get = async (): Promise<{
    data: Settings | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.get(`/settings`);
    return {data, status, error};
  };

  /**
   *
   * @param information
   */
  public updateInformation = async (information: string): Promise<{
    data: {information: string} | null,
    status: FetchResponseStatus,
    error: string | null
  }> => {
    const {data, status, error} = await this.fetcher.put(`/settings/information`, {information});
    return {data, status, error};
  }
}
