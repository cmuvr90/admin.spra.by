import {Brand as BrandInterface, BrandData} from "@/services/types/Brand";
import Joi from "joi";
import {Validator} from "@/services/Validator";

export class Brand {

  static DEFAULT = {
    id: null,
    name: '',
    description: '',
    user: null,
    categories: []
  }

  static getData(brand: BrandInterface): BrandData {
    return {
      id: brand?.id ?? null,
      name: brand.name,
      user: brand.user?.id ?? null,
      description: brand.description,
      categories: (brand.categories ?? []).reduce((acc: string[], i) => {
        if (i.id) acc.push(i.id)
        return acc;
      }, []),
    }
  }

  static validate = (brand: BrandData) => {
    return Validator.validate(Brand.getJoiScheme(), brand);
  }

  static getJoiScheme = () => {
    return Validator.createScheme(Joi.object({
      name: Joi.string().min(1).max(30).required(),
      description: Joi.string().min(1).max(2000).required(),
    }))
  }
}