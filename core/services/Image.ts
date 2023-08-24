import { Image as ImageType } from '@/core/types/Image';

export class Image {
  private image;

  constructor(image: ImageType) {
    this.image = image;
  }

  getId = () => this.image.id;

  getSrc = () => this.image.src;
}
