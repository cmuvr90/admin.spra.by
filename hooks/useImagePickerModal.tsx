import {useModal} from './index'
import {Modal} from '@shopify/polaris'
import React, {useEffect, useState} from 'react'
import ImagePicker from "@/components/ImagePicker";
import {Image} from "@/services/types/Image";

export function useImagePickerModal({multiselect = true}: Props) {
  const modal = useModal()

  const [selectedImages, setSelectedImage] = useState<Image[] | null>(null)

  const open = (images: Image[], onSave: (images: Image[]) => Promise<void>) => {
    const data = {
      open: true,
      title: `Choose image`,
      content: <Modal.Section>
        <ModalContent images={images} onChange={setSelectedImage} modal={modal} multiselect={multiselect}/>
      </Modal.Section>,
      primaryAction: {
        content: 'Save',
        disabled: true,
        onAction: () => {
          modal.primary.loading()
          setSelectedImage(value => {
            if (value) onSave(value).finally(() => {modal.close()});
            return value
          })
        },
      },
    }
    modal.change(data)
  }

  return {
    open,
  }
}

const ModalContent = ({images, onChange, modal, multiselect}: {
  images: Image[],
  onChange: (value: Image[]) => void,
  modal: any
  multiselect: boolean
}) => {
  const [selected, setSelected] = useState<Image[]>([])

  useEffect(() => {
    modal.primary.disable(!selected?.length)
    onChange(selected)
  }, [selected])

  return <ImagePicker
    images={images}
    onSelected={setSelected}
    selectedImages={selected}
    multiselect={multiselect}
  />
}

type Props = {
  multiselect: boolean
}
