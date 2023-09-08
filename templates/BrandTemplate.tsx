'use client';

import React, {useEffect, useState} from 'react'
import {Card, FormLayout, Layout, Page, PageActions, TextField} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useMessage, useSaveBar} from "@/hooks";
import {Brand as BrandInterface} from "@/services/types/Brand";
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import {Brand} from "@/services/Brand";
import {createBrand, deleteBrand, updateBrand} from "@/serverActions/brand";
import CardPicker from "@/components/CardPicker";
import {Obj, PICKER_RESOURCE_TYPE} from "@/services/types";
import {User} from "@/services/types/User";
import {Category} from "@/services/types/Category";

export const BrandTemplate = ({brand: brandData}: Props) => {
  const router = useRouter();
  const confirm = useConfirm()
  const saveBar = useSaveBar(
    !!brandData?.id ? onUpdate : onCreate,
    onDiscard,
    {
      primaryContent: !!brandData?.id ? 'Save' : 'Create', secondaryContent: 'Discard'
    }
  );
  const toast = useMessage();

  const [defaultBrand, setDefaultBrand] = useState(brandData);
  const [brand, setBrand] = useState(brandData);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});

  const onChange = (value: Obj) => setBrand((brand: any) => ({...brand, ...value}))

  useEffect(() => {
    const isEqual = saveBar.onChange(Brand.getData(defaultBrand), Brand.getData(brand));
    if (isEqual) setErrors({});
  }, [brand, defaultBrand])

  async function onDiscard() {
    setErrors({});
    setBrand(defaultBrand);
  }

  async function onUpdate() {
    const brandData = Brand.getData(brand);
    const {errors} = Brand.validate(brandData);
    setErrors(errors ?? {});

    if (!errors) {
      setDisabled(true);
      try {
        const data = await updateBrand(brandData);
        setDefaultBrand(brand);
        toast.info('Saved');
      } catch (e) {
        toast.error((e as Error).message || 'error')
      }
      setDisabled(false);
    }
  }

  async function onUpdateUser(user: User | null) {
    setDisabled(true);
    try {
      const brandData = Brand.getData(defaultBrand);
      const data = await updateBrand({...brandData, user: user?.id ?? null});
      if (!data) throw Error('Error');

      setDefaultBrand(data);
      setBrand({...brand, user: data.user});
      toast.info('Updated');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
    setDisabled(false);
  }

  async function onUpdateCategories(categories: Category[]) {
    setDisabled(true);
    try {
      const brandData = Brand.getData(defaultBrand);
      const data = await updateBrand({...brandData, categories: categories.map(i => i.id as string)});
      if (!data) throw Error('Error');

      setDefaultBrand(data);
      setBrand({...brand, categories: data.categories});
      toast.info('Updated');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
    setDisabled(false);
  }

  async function onCreate() {
    const brandData = Brand.getData(brand);
    const {errors} = Brand.validate(brandData);
    setErrors(errors ?? {});

    if (!errors) {
      setDisabled(true);
      try {
        const data = await createBrand(brandData);
        if (data) {
          setDefaultBrand(data);
          setBrand(data);
          router.replace(`/admin/brands/${data.id}`)
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
      const data = await deleteBrand(id);
      toast.info('Deleted');
      router.push(`/admin/brands`);
    } catch (e) {
      toast.error((e as Error).message || 'error')
      setDisabled(false);
    }
  }

  return <Page title={defaultBrand.name}>
    <Layout>
      <Layout.Section>
        <Card>
          <FormLayout>
            <TextField
              autoComplete={'off'}
              label={'Name'}
              value={brand.name}
              multiline
              error={errors?.name}
              onChange={name => onChange({name})}
              disabled={disabled}
            />
            <TextField
              autoComplete={'off'}
              label={'Description'}
              value={brand.description}
              multiline
              error={errors?.description}
              onChange={description => onChange({description})}
              disabled={disabled}
            />
          </FormLayout>
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        <CardPicker
          disabled={!brand?.id || disabled}
          type={PICKER_RESOURCE_TYPE.USER}
          items={brand?.user ? [brand.user] : []}
          onSelect={onUpdateUser}
          onDelete={async () => onUpdateUser(null)}
          selectedItems={brand?.user?.id ? [brand.user.id] : []}
        />
        <CardPicker
          disabled={!brand?.id || disabled}
          type={PICKER_RESOURCE_TYPE.CATEGORIES}
          items={brand?.categories ?? []}
          onSelect={onUpdateCategories}
          onDelete={async c => onUpdateCategories(brand.categories.filter(i => i.id !== c.id))}
          selectedItems={(brand?.categories ?? []).map(c => c.id as string)}
        />
      </Layout.Section>
      {
        !!brand?.id &&
        <Layout.Section>
          <PageActions
            secondaryActions={[{
              content: 'Delete',
              destructive: true,
              disabled: disabled,
              onAction: () => {confirm.open(() => onDelete(brand?.id ?? ''))},
            }]}
          />
        </Layout.Section>
      }
    </Layout>
  </Page>
}

type Props = {
  brand: BrandInterface,
}
