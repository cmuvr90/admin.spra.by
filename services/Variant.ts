import {Variant as VariantInterface, VariantData} from "@/services/types/Variant";
import Joi from "joi";
import {Validator} from "@/services/Validator";
import {Product} from "@/services/types/Product";
import {Image} from "@/services/types/Image";

export class Variant {

  static DEFAULT = {
    id: null,
    title: '',
    product: null,
    image: null,
    values: [],
  }

  static getImage = (variant: VariantInterface): string | null => {
    return !!variant && typeof variant.image !== 'string' ? (variant.image as Image).src : null;
  }

  static getData(variant: VariantInterface): VariantData {
    return {
      id: variant?.id ?? null,
      title: variant.title,
      product: (variant.product as Product).id as string,
      values: [],
    }
  }

  static validate = (variant: VariantInterface) => {
    return Validator.validate(Variant.getJoiScheme(), variant);
  }

  static getJoiScheme = () => {
    return Validator.createScheme(Joi.object({
      title: Joi.string().min(1).max(50).required(),
    }))
  }
}