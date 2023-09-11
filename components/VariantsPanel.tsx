import React from 'react'
import {Variant as VariantInterface} from "@/services/types/Variant";
import VariantLine from "@/components/VariantLine";
import {Button, LegacyCard, LegacyStack} from "@shopify/polaris";
import {Product} from "@/services/types/Product";
import {useCreateVariantModal, useMessage, useViewImageModal} from "@/hooks";
import {createVariant, updateVariant} from "@/serverActions/product";
import {OptionValueData} from "@/services/types/Option";
import {Image} from "@/services/types/Image";
import {useImagePickerModal} from "@/hooks/useImagePickerModal";

const VariantsPanel = ({product, onUpdate}: Props) => {
  const createVariantModal = useCreateVariantModal();
  const imagePickerModal = useImagePickerModal({multiselect: false})
  const viewImageModal = useViewImageModal();
  const toast = useMessage();

  const onCreateVariant = async (params: OptionValueData) => {
    try {
      const data = await createVariant(product.id as string, params);
      if (!data) throw Error('Error created variant');

      if (typeof onUpdate === 'function') onUpdate(data);
      toast.info('Updated');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
  }

  const onEditVariant = async (variant: VariantInterface) => {

  }

  const onDeleteVariant = async (variant: VariantInterface) => {

  }

  const onSelectImage = async (variantId: string, images: Image[]) => {
    try {
      const image = images?.length ? images[0] : null
      if (image) {
        const data = await updateVariant(product.id as string, variantId, {image: image.id})
        if (!data) throw Error('Error update variant image');

        if (typeof onUpdate === 'function') onUpdate(data);
        toast.info('Updated');
      }
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
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
            onSelectImage={async () => {
              imagePickerModal.open(product.images as Image[], async (images: Image[]) => onSelectImage(variant.id as string, images))
            }}
          />
        </LegacyCard.Section>
      })
    }
    <LegacyCard.Section>
      <LegacyStack distribution={'trailing'}>
        <Button disabled={!product.category || !product.options?.length}
                onClick={() => createVariantModal.open(product.options, onCreateVariant)}>
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
  onUpdate?: (product: Product) => void
}