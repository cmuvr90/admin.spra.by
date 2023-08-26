import { Product as ProductType } from '@/core/types/Product';
import { Image } from '@/core/services/Image';
import { Option } from '@/core/services/Option';
import { Variant } from '@/core/services/Variant';
import { OptionData } from '@/core/types/Option';

export class Product {
  private readonly product;
  public images;
  public options;
  public variants;
  public optionsData;

  constructor(product: ProductType) {
    this.product = product;
    this.images = product.images.map(i => new Image(i));
    this.options = product.options.map(i => new Option(i));
    this.variants = product.variants.map(i => new Variant(i));
    this.optionsData = this.getOptionsData();
  }

  getData = () => this.product;

  getId = () => this.product.id;

  getImagesSrc = () => this.images.map(i => i.getSrc());

  getTitle = () => this.product.title;

  getOptionsData = (): OptionData[] => {
    const data: { [key: string]: OptionData } = {};

    for (const variant of this.variants) {
      for (const variantValue of variant.getValues()) {
        const option = this.options.find(i => i.getId() === variantValue.option);
        if (option && option.getValues().includes(variantValue.value)) {
          if (!data.hasOwnProperty(variantValue.option)) data[option.getId()] = {
            id: option.getId(),
            label: option.getTitle(),
            options: [],
          };
          if (!data[option.getId()].options.find(i => i.value === variantValue.value)) {
            data[option.getId()].options.push({ label: variantValue.value, value: variantValue.value });
          }
        }
      }
    }
    return Object.values(data);
  };


  /**
   *
   */
  getDefaultVariant = (): Variant | undefined => {
    return this.variants.find(variant => {
      let countSuitable = 0;

      return this.optionsData.find(optionData => {
        variant.getValues().map(variantValue => {
          if (!!optionData.options.find(i => `${i.value}` === `${variantValue.value}`)) countSuitable++;
        });
        return variant.getValues().length === countSuitable;
      });
    });
  };

  getVariant = (combination: { [key: string]: string }) => {
    return this.variants.find(variant => {
      let countSuitable = 0;

      return Object.entries(combination).map(([id, value]) => ({id, value})).find(i => {
        variant.getValues().map(variantValue => {
          if (`${i.value}` === `${variantValue.value}`) countSuitable++;
        });
        return variant.getValues().length === countSuitable;
      });
    });
  };
}
