'use client';

import React, {useEffect, useState} from 'react'
import {Card, FormLayout, Layout, LegacyStack, Page, PageActions, TextField} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useMessage, useSaveBar} from "@/hooks";
import {Product as ProductInterface} from "@/services/types/Product";
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import {Product} from "@/services/Product";
import {createProduct, deleteProduct, updateProduct} from "@/serverActions/product";
import {Obj, PICKER_RESOURCE_TYPE} from "@/services/types";
import CardPicker from "@/components/CardPicker";
import {Category} from "@/services/types/Category";

export const ProductTemplate = ({product: productData}: Props) => {
  const router = useRouter();
  const confirm = useConfirm()
  const saveBar = useSaveBar(
    !!productData?.id ? onUpdate : onCreate,
    onDiscard,
    {
      primaryContent: !!productData?.id ? 'Save' : 'Create', secondaryContent: 'Discard'
    }
  );
  const toast = useMessage();

  const [defaultProduct, setDefaultProduct] = useState(productData);
  const [product, setProduct] = useState(productData);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});

  const onChange = (value: Obj) => setProduct((product: any) => ({...product, ...value}))

  useEffect(() => {
    const isEqual = saveBar.onChange(Product.getData(defaultProduct), Product.getData(product));
    if (isEqual) setErrors({});
  }, [product, defaultProduct])

  async function onDiscard() {
    setErrors({});
    setProduct(defaultProduct);
  }

  async function onUpdate() {
    const productData = Product.getData(product);
    const {errors} = Product.validate(productData);
    setErrors(errors ?? {});

    if (!errors) {
      setDisabled(true);
      try {
        const data = await updateProduct(productData);
        setDefaultProduct(product);
        toast.info('Saved');
      } catch (e) {
        toast.error((e as Error).message || 'error')
      }
      setDisabled(false);
    }
  }

  async function onUpdateCategory(category: Category | null) {
    setDisabled(true);
    try {
      const productData = Product.getData(defaultProduct);
      const data = await updateProduct({...productData, category: category?.id ?? null});
      if (!data) throw Error('Error');

      setDefaultProduct(data);
      setProduct({...product, category: data.category});
      toast.info('Updated');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
    setDisabled(false);
  }

  async function onCreate() {
    const productData = Product.getData(product);
    const {errors} = Product.validate(productData);
    setErrors(errors ?? {});

    if (!errors) {
      setDisabled(true);
      try {
        const data = await createProduct(productData);
        if (data) {
          setDefaultProduct(data);
          setProduct(data);
          router.replace(`/admin/products/${data.id}`)
        }
        toast.info('Created');
      } catch (e) {
        toast.error((e as Error).message || 'error')
      }
      setDisabled(false);
    }
  }

  async function onDelete(id: string) {
    try {
      setDisabled(true);
      const data = await deleteProduct(id);
      toast.info('Deleted');
      router.push(`/admin/products`);
    } catch (e) {
      toast.error((e as Error).message || 'error')
      setDisabled(false);
    }
  }

  return <Page title={defaultProduct.title}>
    <Layout>
      <Layout.Section secondary>
        <LegacyStack vertical>
          <Card>
            IMAGE
          </Card>
          <CardPicker
            disabled={!product?.id || disabled}
            type={PICKER_RESOURCE_TYPE.CATEGORY}
            items={product?.category?.id ? [product.category as Category] : []}
            onSelect={onUpdateCategory}
            onDelete={async () => onUpdateCategory(null)}
            selectedItems={product?.category?.id ? [product.category.id] : []}
          />
        </LegacyStack>
      </Layout.Section>
      <Layout.Section>
        <Card>
          <FormLayout>
            <TextField
              autoComplete={'off'}
              label={'Name'}
              value={product.title}
              multiline
              error={errors?.title}
              onChange={title => onChange({title})}
              disabled={disabled}
            />
            <TextField
              autoComplete={'off'}
              label={'Description'}
              value={product.description}
              multiline
              error={errors?.description}
              onChange={description => onChange({description})}
              disabled={disabled}
            />
          </FormLayout>
        </Card>
      </Layout.Section>
      {
        !!product?.id &&
        <Layout.Section>
          <PageActions
            secondaryActions={[{
              content: 'Delete',
              destructive: true,
              disabled: disabled,
              onAction: () => {confirm.open(() => onDelete(product?.id ?? ''))},
            }]}
          />
        </Layout.Section>
      }
    </Layout>
  </Page>
}

type Props = {
  product: ProductInterface,
}
