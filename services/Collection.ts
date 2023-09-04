import Joi from "joi";
import {Validator} from "@/services/Validator";
import {CollectionData, Collection as CollectionInterface} from "@/services/types/Collection";

export class Collection {

  static DEFAULT = {
    id: null,
    name: '',
    title: '',
    description: '',
    categories: [],
  }

  static getData(collection: CollectionInterface): CollectionData {
    return {
      id: collection?.id ?? null,
      name: collection.name,
      title: collection.title,
      description: collection.description,
      categories: (collection.categories ?? []).filter(i => !!i.id).map(i => i.id as string),
    }
  }

  static validate = (category: CollectionData) => {
    return Validator.validate(Collection.getJoiScheme(), category);
  }

  static getJoiScheme = () => {
    return Validator.createScheme(Joi.object({
      name: Joi.string().min(1).max(30).required(),
      title: Joi.string().min(1).max(50).required(),
      description: Joi.string().min(1).max(2000).required(),
    }))
  }
}