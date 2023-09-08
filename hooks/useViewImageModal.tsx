import {useModal} from './index'
import React, {useState} from 'react'
import ImageSlider from "@/components/ImageSlider";
import {Image} from "@/services/types/Image";
import {Obj} from "@/services/types";

export function useViewImageModal() {
  const modal = useModal()

  const [data, setData] = useState<Obj>({})

  const open = (src: string | null, images: Image[] = [], actions: { content: string, onAction: (src: string | null) => Promise<any> }[] = []) => {

    const secondaryActions = actions.map(({content, onAction}) => ({
      content,
      onAction: async () => {
        modal.secondary.loading()
        setData(v => {
          onAction(v?.src ?? null).finally(() => {
            modal.secondary.unloading()
            modal.close()
          })
          return v
        })
      },
    }))

    modal.change({
      large: true,
      title: 'Image view',
      open: true,
      content: <ImageSlider
        images={images}
        src={src}
        onSlide={src => setData(v => ({...v, src}))}
      />,
      hideSection: true,
      primaryAction: {
        content: 'Close',
        onAction: () => modal.close(),
      },
      secondaryActions,
    })
  }

  return {
    open,
  }
}
