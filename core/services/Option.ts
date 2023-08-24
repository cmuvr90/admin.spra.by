import { Option as OptionType } from '@/core/types/Option';
import { transliterate as tr } from 'transliteration';

export class Option {
  private option;

  constructor(option: OptionType) {
    this.option = option;
  }

  public getId = () => this.option.id;

  public getTitle = () => this.option.title;

  public getValues = () => this.option.values;

  public generateKey = () => tr(this.getTitle()).toLowerCase().replaceAll(' ', '_');
}
