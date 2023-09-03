import Joi from "joi";
import {Validator} from "@/services/Validator";
import {CategoryData, Category as CategoryInterface} from "@/services/types/Category";

export class Category {

  static DEFAULT = {
    id: null,
    name: '',
    title: '',
    description: '',
    options: [],
  }

  static getData(category: CategoryInterface): CategoryData {
    return {
      id: category?.id ?? null,
      name: category.name,
      title: category.title,
      description: category.description,
      options: category.options.map(i => i.id),
    }
  }

  static validate = (category: CategoryData) => {
    return Validator.validate(Category.getJoiScheme(), category);
  }

  static getJoiScheme = () => {
    return Validator.createScheme(Joi.object({
      name: Joi.string().min(1).max(30).required(),
      title: Joi.string().min(1).max(50).required(),
      description: Joi.string().min(1).max(2000).required(),
    }))
  }
}