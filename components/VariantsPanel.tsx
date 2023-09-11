import React from 'react'
import {Variant as VariantInterface} from "@/services/types/Variant";
import VariantLine from "@/components/VariantLine";
import {Button, LegacyCard, LegacyStack} from "@shopify/polaris";
import {Product} from "@/services/types/Product";
import {useCreateVariantModal, useMessage, useViewImageModal} from "@/hooks";
import {createVariant, deleteVariant, updateVariant} from "@/serverActions/product";
import {OptionValueData} from "@/services/types/Option";
import {Image} from "@/services/types/Image";
import {useImagePickerModal} from "@/hooks/useImagePickerModal";
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";

const VariantsPanel = ({product, onUpdate, disabled = false}: Props) => {
  const router = useRouter();
  const createVariantModal = useCreateVariantModal();
  const confirm = useConfirm();
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
    router.push(`/admin/product/${product.id}/variants/${variant.id}`)
  }

  const onDeleteVariant = async (variant: VariantInterface) => {
    try {
      const data = await deleteVariant(product.id as string, variant.id as string);
      if (!data) throw Error('Error delete variant');

      if (typeof onUpdate === 'function') onUpdate(data);
      toast.info('Deleted');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
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
            disabled={disabled}
            variant={variant}
            onViewImage={viewImageModal.open}
            onEdit={onEditVariant}
            onDelete={async () => confirm.open(async () => onDeleteVariant(variant))}
            onSelectImage={async () => {
              imagePickerModal.open(product.images as Image[], async (images: Image[]) => onSelectImage(variant.id as string, images))
            }}
          />
        </LegacyCard.Section>
      })
    }
    <LegacyCard.Section>
      <LegacyStack distribution={'trailing'}>
        <Button
          disabled={!product.category || !product.options?.length || disabled}
          onClick={() => createVariantModal.open(product.options, onCreateVariant)}>
          Add variant
        </Button>
      </LegacyStack>
    </LegacyCard.Section>
  </LegacyCard>
}

export default VariantsPanel

type Props = {
  product: Product,
  disabled?: boolean,
  onUpdate?: (product: Product) => void
}