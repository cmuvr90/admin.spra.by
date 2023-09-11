import React, {useMemo, useState} from 'react'
import {Variant as VariantInterface} from "@/services/types/Variant";
import {Badge, Button, LegacyStack} from "@shopify/polaris";
import ImageItem from "@/components/ImageItem";
import {Variant} from "@/services/Variant";
import {DeleteMajor, EditMajor} from "@shopify/polaris-icons";

const VariantLine = ({variant, onDelete, onEdit, onSelectImage, onViewImage, disabled = false}: Props) => {

  const [deleting, setDeleting] = useState(false);

  const image = useMemo(() => Variant.getImage(variant), [variant]);

  return <LegacyStack alignment={'center'}>
    <LegacyStack.Item>
      <div style={{width: '50px', height: '50px'}}
           onClick={(!image && !disabled && typeof onSelectImage === "function") ? () => onSelectImage(variant) : undefined}>
        <ImageItem
          src={image}
          selectable={false}
          onView={(image && typeof onViewImage === "function") ? onViewImage : undefined}
        />
      </div>
    </LegacyStack.Item>
    <LegacyStack.Item fill>
      <LegacyStack distribution={'equalSpacing'}>
        <LegacyStack>
          {
            (variant?.values ?? []).map(value => {
              return <Badge key={value.value} status={'new'}>{value.value}</Badge>
            })
          }
        </LegacyStack>
        <LegacyStack>
          {
            typeof onEdit === 'function' &&
            <Button
              icon={EditMajor}
              plain
              monochrome
              onClick={() => onEdit(variant)}
              disabled={deleting || disabled}
            />
          }
          {
            typeof onDelete === 'function' &&
            <Button
              icon={DeleteMajor}
              plain
              monochrome
              onClick={() => onDelete(variant)}
              disabled={disabled}
              loading={deleting}
            />
          }
        </LegacyStack>
      </LegacyStack>
    </LegacyStack.Item>
  </LegacyStack>
}

export default VariantLine

type Props = {
  variant: VariantInterface,
  onEdit?: (variant: VariantInterface) => Promise<void>,
  onDelete?: (variant: VariantInterface) => Promise<void>,
  onSelectImage?: (variant: VariantInterface) => Promise<void>,
  onViewImage?: (src: string | null) => void
  disabled?: boolean
}