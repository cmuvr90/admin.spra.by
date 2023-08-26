import { Collection as CollectionType } from '@/core/types/Collection';
import { Category } from '@/core/services/Category';

export class Collection {
  private collection;
  public categories;

  constructor(collection: CollectionType) {
    this.collection = collection;
    this.categories = collection.categories.map(i => new Category(i));
  }

  public getCategoryIds = () => this.categories.map(i => i.getId());
}
