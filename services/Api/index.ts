import Fetcher from './Fetcher';
import Config from "@/config";
import UserApi from "@/services/Api/users";
import BrandApi from "@/services/Api/brands";
import CategoryApi from "@/services/Api/categories";
import OptionApi from "@/services/Api/options";
import ProductApi from "@/services/Api/products";
import CollectionApi from "@/services/Api/collections";
import NavigationApi from "@/services/Api/navigations";
import SettingsApi from "@/services/Api/settings";

export default class Api {
  public readonly users;
  public readonly brands;
  public readonly categories;
  public readonly options;
  public readonly products;
  public readonly collections;
  public readonly navigations;
  public readonly settings;

  constructor(headers?: { [key: string]: string } | null) {
    const fetcher = new Fetcher({baseUrl: Config.API_BASE_URL, headers});
    this.users = new UserApi(fetcher);
    this.brands = new BrandApi(fetcher);
    this.categories = new CategoryApi(fetcher);
    this.options = new OptionApi(fetcher);
    this.products = new ProductApi(fetcher);
    this.collections = new CollectionApi(fetcher);
    this.navigations = new NavigationApi(fetcher);
    this.settings = new SettingsApi(fetcher);
  }
}
