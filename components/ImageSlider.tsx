import React, {useEffect, useState} from 'react'
import {Image} from "@/services/types/Image";

const ImageSlider = ({src: defaultSrc, images, onSlide}: Props) => {
  const [src, setSrc] = useState(defaultSrc)

  useEffect(() => {
    if (typeof onSlide === 'function' && !!src) onSlide(src)
  }, [src])

  const slide = (isNext: boolean) => {
    let index = images.findIndex(i => i.src === src)
    if (index < 0) return
    if (isNext) index++
    if (!isNext) index--
    if (images[index]?.src) {
      setSrc(images[index].src)
      return
    }
    setSrc(images[isNext ? 0 : (images.length - 1)].src)
  }

  return <div className={'image-view'}>
    <div className={'image-view__body'}>
      <div className={'image-view__image'}>
        {
          !!src && <img src={src} alt={''}/>
        }
      </div>
      {
        images?.length > 1 &&
        <div className={'image-view__actions'}>
          <div className={'image-view__actions-prev'} onClick={() => slide(false)}>{'<'}</div>
          <div className={'image-view__actions-next'} onClick={() => slide(true)}>{'>'}</div>
        </div>
      }
    </div>
  </div>
}

export default ImageSlider

type Props = {
  src: string | null,
  images: Image[]
  onSlide: (src: string) => void
}