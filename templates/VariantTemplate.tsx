'use client';

import React, {useState} from 'react'
import {Button, Layout, LegacyCard, LegacyStack, Listbox, Page, PageActions, Text} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {Product as ProductInterface} from "@/services/types/Product";
import {Variant as VariantInterface} from "@/services/types/Variant";
import {useConfirm} from "@/hooks/useConfirm";
import {useRouter} from "next/navigation";
import {ImageItem} from "@/components";
import {useViewImageModal, useImagePickerModal, useMessage} from "@/hooks";
import {Variant} from "@/services/Variant";
import {Image} from "@/services/types/Image";
import {deleteVariant, updateVariant} from "@/serverActions/product";

export const VariantTemplate = ({product, variant: variantData}: Props) => {
  const router = useRouter();
  const toast = useMessage();
  const confirm = useConfirm();
  const viewImageModal = useViewImageModal();
  const imagePickerModal = useImagePickerModal({multiselect: false});
  const [variant, setVariant] = useState(variantData);
  const [disabled, setDisabled] = useState(false);

  const onSelectImage = async (variantId: string, image: Image | null = null) => {
    try {
      const data = await updateVariant(product.id as string, variantId, {image: image?.id ?? null})
      if (!data) throw Error('Error update variant image');
      setVariant(v => {
        const variant = data.variants.find(i => i.id === variantId);
        if (variant) v.image = variant.image;
        return v;
      });
      toast.info('Updated');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
  }

  const onRemoveImage = async () => {
    await onSelectImage(variant.id as string);
  }

  const onDelete = async (variantId: string) => {
    try {
      const data = await deleteVariant(product.id as string, variant.id as string);
      if (!data) throw Error('Error delete variant');
      router.replace(`/admin/products/${product.id}?refresh=true`)
      toast.info('Deleted');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
  }

  return <Page
    title={variant.values.map(i => i.value).join(' / ')}
    backAction={{content: 'Product', url: `/admin/products/${product.id}`}}
  >
    <Layout>
      <Layout.Section oneThird>
        <Layout>
          <Layout.Section>
            <LegacyCard sectioned>
              <LegacyStack spacing={'extraTight'}>
                <LegacyStack.Item fill>
                  <div
                    onClick={
                      !Variant.getImage(variant) ?
                        () => imagePickerModal.open(product.images as Image[], async (images: Image[]) => {
                          if (images?.length) await onSelectImage(variant.id as string, images[0])
                        }) : undefined
                    }>
                    <ImageItem
                      src={Variant.getImage(variant)}
                      selectable={false}
                      onView={viewImageModal.open}
                    />
                  </div>
                </LegacyStack.Item>
                {
                  !!Variant.getImage(variant) &&
                  <LegacyStack.Item fill>
                    <LegacyStack distribution={'trailing'}>
                      <Button plain onClick={() => confirm.open(onRemoveImage)}>remove</Button>
                    </LegacyStack>
                  </LegacyStack.Item>
                }
              </LegacyStack>
            </LegacyCard>
          </Layout.Section>
          <Layout.Section>
            <LegacyCard>
              <LegacyCard.Header title={'Variants'}/>
              <LegacyCard.Section fullWidth>
                <Listbox
                  onSelect={variantId => router.push(`/admin/products/${product.id}/variants/${variantId}`)}>
                  {
                    product.variants.map((v, index) => {
                      const title = v.values.map(i => i.value).join(' / ')
                      return <Listbox.Option
                        key={index}
                        value={v.id as string}
                        selected={v.id === variant.id}
                      >{title}
                      </Listbox.Option>
                    })
                  }
                </Listbox>
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Layout.Section>

      <Layout.Section>
        <Layout>
          <Layout.Section>
            <LegacyCard>
              <LegacyCard.Header title={'Options'}/>
              <LegacyCard.Section>
                {
                  variant.values.map((i, index) => {
                    return <LegacyStack key={index}>
                      <Text as={'span'} fontWeight={'bold'}>{i.title}:</Text>
                      <Text as={'span'}>{i.value}</Text>
                    </LegacyStack>
                  })
                }
              </LegacyCard.Section>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Layout.Section>
      {
        <Layout.Section>
          <PageActions
            secondaryActions={[{
              content: 'Delete',
              destructive: true,
              disabled: disabled,
              onAction: () => {confirm.open(() => onDelete(variant.id as string))},
            }]}
          />
        </Layout.Section>
      }
    </Layout>
  </Page>
}

type Props = {
  variant: VariantInterface,
  product: ProductInterface,
}
