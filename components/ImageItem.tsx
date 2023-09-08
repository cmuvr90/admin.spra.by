import React, {useMemo} from 'react'
import {ViewMinor, AddImageMajor} from '@shopify/polaris-icons'
import {Icon, Checkbox, Spinner, Text} from '@shopify/polaris'

const ImageItem = ({
                     src = null,
                     alt = '',
                     size = 'medium',
                     selected = false,
                     onSelect,
                     onView,
                     flexible = false,
                     selectable = false,
                     uploading = false,
                   }: Props) => {

  const baseClasses = useMemo(() => {
    const classes = []
    if (size) classes.push(`image-item_size--${size}`)
    if (selected) classes.push(`image-item--selected`)
    if (flexible) classes.push(`image-item--flexible`)
    if (selectable) classes.push(`image-item--selectable`)
    return classes.join(' ')
  }, [size, selected])

  return <div className={`image-item ${baseClasses}`}>
    <div className={'image-item__wrapper'}>
      {
        !!src ? <img src={src} alt={alt}/> :
          <div className={'image-item__no-image-wrapper'}><Icon source={AddImageMajor}/></div>
      }
      {
        (!!src && typeof onView === 'function') &&
        <div className={'image-item__over'} onClick={() => onView(src)}>
          <Icon source={ViewMinor}/>
        </div>
      }
      <div className={'image-item__border'}/>
      {
        (selectable && typeof onSelect === 'function') &&
        <div className={'image-item__selectable'} onClick={() => onSelect(src)}>
          <Checkbox label={''} labelHidden checked={selected}/>
        </div>
      }
      {
        (uploading && typeof onSelect === 'function') &&
        <div className={'image-item__uploading'} onClick={() => onSelect(src)}>
          <div className={'image-item__uploading-body'}>
            <Spinner size={'small'}/>
            <Text as={'span'} color={'subdued'} variant={'bodySm'}>Uploading...</Text>
          </div>
        </div>
      }
    </div>
  </div>
}
export default ImageItem

type Props = {
  src?: string | null,
  alt?: string,
  size?: string,
  selected?: boolean,
  onSelect?: (src: string | null) => void
  onView?: (src: string | null) => void
  flexible?: boolean,
  selectable?: boolean,
  uploading?: boolean,
}