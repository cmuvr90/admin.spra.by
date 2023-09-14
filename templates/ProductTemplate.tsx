'use client';

import React, {useEffect, useState} from 'react'
import {Card, FormLayout, Layout, LegacyStack, Page, PageActions, TextField} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useMessage, useSaveBar, useViewImageModal} from "@/hooks";
import {Product as ProductInterface} from "@/services/types/Product";
import {useRouter, useSearchParams} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import {Product} from "@/services/Product";
import {
  createImages,
  createProduct,
  deleteImages,
  deleteProduct, getProduct,
  setProductMainImage,
  updateProduct
} from "@/serverActions/product";
import {Obj, PICKER_RESOURCE_TYPE} from "@/services/types";
import CardPicker from "@/components/CardPicker";
import {Category} from "@/services/types/Category";
import ImageItem from "@/components/ImageItem";
import {Image as ImageInterface} from "@/services/types/Image";
import {Image} from "@/services/Image";
import ImagesPanel from "../components/ImagesPanel";
import VariantsPanel from "@/components/VariantsPanel";

export const ProductTemplate = ({product: productData}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const confirm = useConfirm()
  const saveBar = useSaveBar(
    !!productData?.id ? onUpdate : onCreate,
    onDiscard,
    {
      primaryContent: !!productData?.id ? 'Save' : 'Create', secondaryContent: 'Discard'
    }
  );
  const toast = useMessage();
  const viewImageModal = useViewImageModal();

  const [defaultProduct, setDefaultProduct] = useState(productData);
  const [product, setProduct] = useState(productData);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<Obj>({});

  const onChange = (value: Obj) => setProduct((product: ProductInterface) => ({...product, ...value}));

  const onChangeProductImages = (images: ImageInterface[]) => setProduct((product: ProductInterface) => ({
    ...product,
    images: [...(product.images as ImageInterface[]), ...(images as ImageInterface[])],
  }))

  useEffect(() => {
    if (searchParams) {
      if (searchParams.get('refresh')) {
        setDisabled(true);
        setTimeout(() => getProduct(product.id as string).then(data => {
          if (data) {
            setDefaultProduct(data);
            setProduct(data);
            router.push(`/admin/products/${product.id}`)
          }
        }).finally(() => {setDisabled(false)}), 500)
      }
    }
  }, [searchParams]);

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
        setProduct(product);
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
      setProduct({...product, category: data.category, options: data.options});
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
    setDisabled(true);
    try {
      const data = await deleteProduct(id);
      toast.info('Deleted');
      router.push(`/admin/products`);
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
    setDisabled(false);
  }

  async function onSetProductMainImage(src: string) {
    setDisabled(true);
    try {
      const image = (product.images as ImageInterface[]).find(i => i.src === src);
      if (!image) throw Error('Error change image');

      const data = await setProductMainImage(product.id as string, image?.id as string);
      if (!data) throw Error('Error change image');

      setDefaultProduct(data);
      setProduct({...product, images: data.images});
      toast.info('Changed');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
    setDisabled(false);
  }

  async function onCreateImages(images: ImageInterface[]) {
    setDisabled(true);
    try {
      const formData = Image.getFormData(images.filter(i => !!i.file).map(i => i.file as File));
      onChangeProductImages(images);

      const data = await createImages(product.id as string, formData);
      if (!data) throw Error('Error uploading images');

      setDefaultProduct(data);
      setProduct({...product, images: data.images});
      toast.info('Uploaded');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
    setDisabled(false);
  }

  async function onDeleteImages(images: ImageInterface[]) {
    setDisabled(true);
    try {
      const ids = images.filter(i => !!i.id).map(i => i.id as string);
      const data = await deleteImages(product.id as string, {ids});
      if (!data) throw Error('Error deleting images');

      setDefaultProduct(data);
      setProduct({...product, images: data.images, variants: data.variants});
      toast.info('Deleted');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
    setDisabled(false);
  }

  const onViewImage = (src: string | null) => {
    viewImageModal.open(src, product.images as ImageInterface[], [{
      content: 'Choose as the main',
      onAction: async v => v ? onSetProductMainImage(v) : null,
    }])
  }

  return <Page title={defaultProduct.title}>
    <Layout>
      <Layout.Section secondary>
        <LegacyStack vertical>
          <Card>
            <ImageItem
              src={Product.getMainImage(product)}
              selectable={false}
              onView={onViewImage}
            />
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
        <LegacyStack vertical>
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
          <ImagesPanel
            images={product.images as ImageInterface[]}
            disabled={!product?.id || disabled}
            onUploadImages={onCreateImages}
            onDeleteImages={onDeleteImages}
            onView={onViewImage}
          />
          <VariantsPanel
            disabled={!product?.id || disabled}
            product={product}
            onUpdate={product => {
              setProduct(v => ({...v, variants: product.variants}));
              setDefaultProduct(v => ({...v, variants: product.variants}));
            }}
          />
        </LegacyStack>
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
