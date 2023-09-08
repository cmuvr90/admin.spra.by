import {Product as ProductInterface, ProductData} from "@/services/types/Product";
import Joi from "joi";
import {Validator} from "@/services/Validator";

export class Product {

  static DEFAULT = {
    id: null,
    title: '',
    description: '',
    category: null,
    variants: [],
    images: [],
  }

  /**
   *
   * @param product
   */
  static getData(product: ProductInterface): ProductData {
    return {
      id: product?.id ?? null,
      title: product.title,
      description: product.description
    }
  }

  static validate = (product: ProductData) => {
    return Validator.validate(Product.getJoiScheme(), product);
  }

  static getJoiScheme = () => {
    return Validator.createScheme(Joi.object({
      title: Joi.string().min(1).max(50).required(),
      description: Joi.string().min(1).max(4000).required(),
    }))
  }
}