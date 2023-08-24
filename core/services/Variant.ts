import { Variant as VariantType } from '@/core/types/Variant';

export class Variant {
  private readonly variant;
  public combinations;

  constructor(variant: VariantType) {
    this.variant = variant;
    this.combinations = this.getCombinations();
  }

  getData = () => this.variant;

  getId = () => this.variant.id;

  getValues = () => this.variant.values;

  getCombinations = () => this.getValues().reduce((acc: { [key: string]: string }, i) => {
    acc[i.option] = i.value;
    return acc;
  }, {});
}
