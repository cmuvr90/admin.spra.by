import { Category as CategoryType } from '@/core/types/Category';
import { FilterType } from '@/core/types/Filter';
import { Option } from '@/core/services/Option';

export class Category {
  private category;
  public options;

  constructor(category: CategoryType) {
    this.category = category;
    this.options = category.options.map(i => new Option(i));
  }

  getId = () => this.category.id;

  static getFiltersGroups = (categories: Category[]): FilterType[] => {
    return categories
      // GET UNIQUE OPTIONS FROM CATEGORIES
      .reduce((acc: Option[], category: Category) => {
        category.options.map((option) => {
          if (!acc.find((i) => i.getId() === option.getId())) acc.push(option);
        });
        return acc;
      }, [])

      // GROPE OPTIONS WITH THE SAME KEYS
      .reduce((acc: {
        key: string;
        title: string;
        value: string;
        ids: string[]
      }[], option: Option) => {
        const key = option.generateKey();
        option.getValues().map((value) => {
          const currentValue = acc.find((i) => i.value === value && i.key === key);
          if (currentValue) {
            currentValue.ids = Array.from(new Set([...currentValue.ids, option.getId()]));
          } else {
            acc.push({ key, title: option.getTitle(), value, ids: [option.getId()] });
          }
        });
        return acc;
      }, [])

      // GET FILTER TYPE ITEMS
      .reduce((acc: FilterType[], optionValue: {
        key: string;
        title: string;
        value: string;
        ids: string[]
      }) => {
        const currentOptionValue = acc.find((i) => i.key === optionValue.key);
        if (currentOptionValue) {
          currentOptionValue.values = [...currentOptionValue.values, {
            value: optionValue.value,
            ids: optionValue.ids,
          }];
        } else {
          acc.push({
            key: optionValue.key,
            title: optionValue.title,
            values: [{ value: optionValue.value, ids: optionValue.ids }],
          });
        }
        return acc;
      }, [])

      // SORT BY NAME VALUES
      .map((type) => ({
        ...type,
        values: type.values.sort((a, b) => {
          return a.value.toUpperCase() < b.value.toUpperCase() ? -1 : a.value.toUpperCase() > b.value.toUpperCase() ? 1 : 0;
        }),
      }));
  };
}
