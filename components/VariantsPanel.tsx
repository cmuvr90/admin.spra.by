import React from 'react'
import {Variant as VariantInterface} from "@/services/types/Variant";
import VariantLine from "@/components/VariantLine";
import {Button, LegacyCard, LegacyStack} from "@shopify/polaris";
import {Product} from "@/services/types/Product";
import {useViewImageModal} from "@/hooks";

const VariantsPanel = ({product}: Props) => {

  const viewImageModal = useViewImageModal()

  const onCreateVariant = async () => {

  }

  const onEditVariant = async (variant: VariantInterface) => {

  }

  const onDeleteVariant = async (variant: VariantInterface) => {

  }

  const onSelectImage = async (variant: VariantInterface) => {

  }

  return <LegacyCard title={'Variants'}>
    {
      product.variants.map((variant: VariantInterface, index: React.Key) => {
        return <LegacyCard.Section key={index}>
          <VariantLine
            variant={variant}
            onViewImage={viewImageModal.open}
            onEdit={onEditVariant}
            onDelete={onDeleteVariant}
            onSelectImage={onSelectImage}
          />
        </LegacyCard.Section>
      })
    }
    <LegacyCard.Section>
      <LegacyStack distribution={'trailing'}>
        <Button disabled={!product.category} onClick={onCreateVariant}>
          Add variant
        </Button>
      </LegacyStack>
    </LegacyCard.Section>
  </LegacyCard>
}

export default VariantsPanel

type Props = {
  product: Product
  onViewImage?: (src: string | null) => void
}