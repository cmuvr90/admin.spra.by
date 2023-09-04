import Joi from "joi";
import {Validator} from "@/services/Validator";
import {Option as OptionInterface} from "@/services/types/Option";

export class Option {

  static DEFAULT = {
    id: null,
    name: '',
    type: 'text',
    title: '',
    description: '',
    values: [],
  }

  static getData(option: OptionInterface): OptionInterface {
    return {
      id: option?.id ?? null,
      name: option.name,
      type: option.type,
      title: option.title,
      description: option.description,
      values: option.values,
    }
  }

  static validate = (category: OptionInterface) => {
    return Validator.validate(Option.getJoiScheme(), category);
  }

  static getJoiScheme = () => {
    return Validator.createScheme(Joi.object({
      name: Joi.string().min(1).max(30).required(),
      title: Joi.string().min(1).max(50).required(),
      description: Joi.string().min(1).max(2000).required(),
    }))
  }
}