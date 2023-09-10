import React, {useEffect, useRef, useState} from 'react'
import {LegacyStack, LegacyCard, Button} from '@shopify/polaris'
import {ImagePicker} from "@/components";
import {Image} from "@/services/types/Image";
import {MutableRefObject} from "react";

const ImagesPanel = ({
                       images = [],
                       disabled = false,
                       onDeleteImages,
                       onUploadImages,
                       onView,
                     }: Props) => {

  const input: MutableRefObject<HTMLInputElement | undefined> = useRef()

  const [selected, setSelected] = useState<Image[]>([])
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (input.current) input.current.addEventListener('change', changeInput)

    return () => {
      if (input.current) input.current.removeEventListener('change', changeInput)
    }
  }, [])

  const changeInput = async (e: Event) => {
    const fileList = (e.target as HTMLInputElement).files
    const files = !!fileList ? Array.from(fileList).map(i => ({id: null, file: i, src: URL.createObjectURL(i), description: ''})) : [];
    if (typeof onUploadImages === 'function') await onUploadImages(files);
  }

  const uploadImages = () => {
    if (input.current) input.current.click()
  }

  return <LegacyCard title={'Images'} sectioned>
    <LegacyStack vertical>
      <ImagePicker
        images={images}
        disabled={disabled}
        selectedImages={selected}
        onSelected={setSelected}
        onView={onView}
      />
      <input
        ref={input as MutableRefObject<HTMLInputElement>}
        type='file' accept='image/jpeg, image/png, image/jpg'
        hidden multiple
      />
      <LegacyStack distribution={'trailing'}>
        {
          !!selected?.length &&
          <Button
            disabled={disabled}
            loading={deleting}
            destructive
            onClick={async () => {
              setDeleting(true);
              if (typeof onDeleteImages === 'function') await onDeleteImages(selected)
              setSelected([])
              setDeleting(false);
            }}>
            Delete images
          </Button>
        }
        <Button onClick={uploadImages} disabled={disabled || deleting}>
          Upload Image
        </Button>
      </LegacyStack>
    </LegacyStack>
  </LegacyCard>
}

export default ImagesPanel

type Props = {
  images: Image[],
  disabled?: boolean,
  onDeleteImages?: (images: Image[]) => Promise<void>
  onUploadImages?: (files: Image[]) => Promise<void>,
  onView?: (src: string | null, images: Image[]) => void,
}