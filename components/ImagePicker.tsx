import React, {useMemo} from 'react'
import {useViewImageModal} from "@/hooks";
import ImageItem from "@/components/ImageItem";
import {Image} from "@/services/types/Image";

const ImagePicker = ({
                       images = [],
                       selectedImages = [],
                       onSelected,
                       onView,
                       multiselect = true
                     }: Props) => {

  const viewImageModal = useViewImageModal()

  const onSelectImageItem = (src: string | null) => {
    const selectedImage = images.find(i => i.src === src)
    if (selectedImage && typeof onSelected === 'function') {
      onSelected((images: Image[]) => {
        if (images.find(i => i.src === selectedImage.src)) {
          return images.filter(i => i.src !== selectedImage.src)
        } else {
          return multiselect ? [...images, selectedImage] : [selectedImage]
        }
      })
    }
  }

  const baseClasses = useMemo(() => {
    const classes = []
    if (selectedImages?.length) classes.push(`image-picker--selectable`)
    return classes.join(' ')
  }, [selectedImages, images])

  return <div className={`image-picker ${baseClasses}`}>
    {
      images.map(image => {
        return <ImageItem
          flexible={true}
          key={image.src}
          src={image.src}
          alt={image.description}
          onSelect={onSelectImageItem}
          selected={!!selectedImages.find(i => i.src === image.src)}
          onView={src => typeof onView === 'function' ? onView(src, images) : viewImageModal.open(src, images)}
          uploading={!!image?.file}
          selectable={true}
        />
      })
    }
  </div>
}

export default ImagePicker

type Props = {
  images: Image[],
  selectedImages: Image[],
  onSelected?: (callback: (image: Image[]) => Image[]) => void,
  onView: (src: string | null, images: Image[]) => void,
  multiselect: boolean,
}