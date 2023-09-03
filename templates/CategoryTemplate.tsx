'use client';

import React, {useEffect, useState} from 'react'
import {Card, FormLayout, Layout, Page, PageActions, TextField} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useMessage, useSaveBar} from "@/hooks";
import {Category as CategoryInterface} from "@/services/types/Category";
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import {Category} from "@/services/Category";
import {createCategory, deleteCategory, updateCategory} from "@/serverActions/category";
import CardPicker from "@/components/CardPicker";
import {Obj, PICKER_RESOURCE_TYPE} from "@/services/types";
import {Option} from "@/services/types/Option";

export const CategoryTemplate = ({category: categoryData}: Props) => {
  const router = useRouter();
  const confirm = useConfirm()
  const saveBar = useSaveBar(
    !!categoryData?.id ? onUpdate : onCreate,
    onDiscard,
    {
      primaryContent: !!categoryData?.id ? 'Save' : 'Create', secondaryContent: 'Discard'
    }
  );
  const toast = useMessage();

  const [defaultCategory, setDefaultCategory] = useState(categoryData);
  const [category, setCategory] = useState(categoryData);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});

  const onChange = (value: Obj) => setCategory((category: CategoryInterface) => ({...category, ...value}))

  useEffect(() => {
    const isEqual = saveBar.onChange(Category.getData(defaultCategory), Category.getData(category));
    if (isEqual) setErrors({});
  }, [category, defaultCategory])

  async function onDiscard() {
    setErrors({});
    setCategory(defaultCategory);
  }

  async function onUpdate() {
    const categoryData = Category.getData(category);
    const {errors} = Category.validate(categoryData);
    setErrors(errors ?? {});

    if (!errors) {
      setDisabled(true);
      try {
        const data = await updateCategory(categoryData);
        if (!data) throw Error('Error');

        setDefaultCategory(data);
        toast.info('Saved');
      } catch (e) {
        toast.error((e as Error).message || 'error')
      }
      setDisabled(false);
    }
  }

  async function onUpdateOptions(options: Option[]) {
    setDisabled(true);
    try {
      const categoryData = Category.getData(defaultCategory);
      const data = await updateCategory({...categoryData, options: options.map(i => i.id)});
      if (!data) throw Error('Error');

      setDefaultCategory(data);
      setCategory({...category, options: data.options});
      toast.info('Updated');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
    setDisabled(false);
  }


  async function onCreate() {
    const categoryData = Category.getData(category);
    const {errors} = Category.validate(categoryData);
    setErrors(errors ?? {});

    if (!errors) {
      setDisabled(true);
      try {
        const data = await createCategory(categoryData);
        if (data) {
          setDefaultCategory(data);
          setCategory(data);
          router.replace(`/admin/categories/${data.id}`)
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
      const data = await deleteCategory(id);
      toast.info('Deleted');
      router.push(`/admin/categories`);
    } catch (e) {
      toast.error((e as Error).message || 'error')
      setDisabled(false);
    }
  }

  return <Page title={defaultCategory.name}>
    <Layout>
      <Layout.Section>
        <Card>
          <FormLayout>
            <TextField
              autoComplete={'off'}
              label={'Name'}
              value={category.name}
              multiline
              error={errors?.name}
              onChange={name => onChange({name})}
              disabled={disabled}
            />
            <TextField
              autoComplete={'off'}
              label={'Title'}
              value={category.title}
              multiline
              error={errors?.title}
              onChange={title => onChange({title})}
              disabled={disabled}
            />
            <TextField
              autoComplete={'off'}
              label={'Description'}
              value={category.description}
              multiline
              error={errors?.description}
              onChange={description => onChange({description})}
              disabled={disabled}
            />
          </FormLayout>
        </Card>
      </Layout.Section>
      <Layout.Section oneThird>
        {
          <CardPicker
            disabled={!category?.id || disabled}
            type={PICKER_RESOURCE_TYPE.OPTIONS}
            items={category.options}
            onSelect={onUpdateOptions}
            onDelete={async o => onUpdateOptions(category.options.filter(i => i.id !== o.id))}
            selectedItems={category.options.map(i => i.id)}
          />
        }
      </Layout.Section>
      {
        !!category?.id &&
        <Layout.Section>
          <PageActions
            secondaryActions={[{
              content: 'Delete',
              destructive: true,
              disabled: disabled,
              onAction: () => {confirm.open(() => onDelete(category?.id ?? ''))},
            }]}
          />
        </Layout.Section>
      }
    </Layout>
  </Page>
}

type Props = {
  category: CategoryInterface,
}
