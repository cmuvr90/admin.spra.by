'use client';

import React, {useEffect, useState} from 'react'
import {Card, FormLayout, Layout, Page, PageActions, TextField} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useMessage, useSaveBar} from "@/hooks";
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import CardPicker from "@/components/CardPicker";
import {Obj, PICKER_RESOURCE_TYPE} from "@/services/types";
import {Collection as CollectionInterface} from "@/services/types/Collection";
import {Collection} from "@/services/Collection";
import {createCollection, deleteCollection, updateCollection} from "@/serverActions/collection";
import {Category} from "@/services/types/Category";

export const CollectionTemplate = ({collection: collectionData}: Props) => {
  const router = useRouter();
  const confirm = useConfirm()
  const saveBar = useSaveBar(
    !!collectionData?.id ? onUpdate : onCreate,
    onDiscard,
    {
      primaryContent: !!collectionData?.id ? 'Save' : 'Create', secondaryContent: 'Discard'
    }
  );
  const toast = useMessage();

  const [defaultCollection, setDefaultCollection] = useState(collectionData);
  const [collection, setCollection] = useState(collectionData);
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});

  const onChange = (value: Obj) => setCollection((collection: CollectionInterface) => ({...collection, ...value}))

  useEffect(() => {
    const isEqual = saveBar.onChange(Collection.getData(defaultCollection), Collection.getData(collection));
    if (isEqual) setErrors({});
  }, [collection, defaultCollection])

  async function onDiscard() {
    setErrors({});
    setCollection(defaultCollection);
  }

  async function onUpdate() {
    const collectionData = Collection.getData(collection);
    const {errors} = Collection.validate(collectionData);
    setErrors(errors ?? {});

    if (!errors) {
      setDisabled(true);
      try {
        const data = await updateCollection(collectionData);
        if (!data) throw Error('Error');

        setDefaultCollection(data);
        toast.info('Saved');
      } catch (e) {
        toast.error((e as Error).message || 'error')
      }
      setDisabled(false);
    }
  }

  async function onUpdateCategories(categories: Category[]) {
    setDisabled(true);
    try {
      const collectionData = Collection.getData(defaultCollection);
      const data = await updateCollection({...collectionData, categories: categories.map(i => i.id as string)});
      if (!data) throw Error('Error');

      setDefaultCollection(data);
      setCollection({...collection, categories: data.categories});
      toast.info('Updated');
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
    setDisabled(false);
  }

  async function onCreate() {
    const collectionData = Collection.getData(collection);
    const {errors} = Collection.validate(collectionData);
    setErrors(errors ?? {});

    if (!errors) {
      setDisabled(true);
      try {
        const data = await createCollection(collectionData);
        if (data) {
          setDefaultCollection(data);
          setCollection(data);
          router.replace(`/admin/collections/${data.id}`)
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
      const data = await deleteCollection(id);
      toast.info('Deleted');
      router.push(`/admin/collections`);
    } catch (e) {
      toast.error((e as Error).message || 'error')
      setDisabled(false);
    }
  }

  return <Page title={defaultCollection.name}>
    <Layout>
      <Layout.Section>
        <Card>
          <FormLayout>
            <TextField
              autoComplete={'off'}
              label={'Name'}
              value={collection.name}
              multiline
              error={errors?.name}
              onChange={name => onChange({name})}
              disabled={disabled}
            />
            <TextField
              autoComplete={'off'}
              label={'Title'}
              value={collection.title}
              multiline
              error={errors?.title}
              onChange={title => onChange({title})}
              disabled={disabled}
            />
            <TextField
              autoComplete={'off'}
              label={'Description'}
              value={collection.description}
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
            disabled={!collection?.id || disabled}
            type={PICKER_RESOURCE_TYPE.CATEGORIES}
            items={collection.categories}
            onSelect={onUpdateCategories}
            onDelete={async o => onUpdateCategories(collection.categories.filter(i => i.id !== o.id))}
            selectedItems={(collection.categories ?? []).map(i => i.id as string)}
          />
        }
      </Layout.Section>
      {
        !!collection?.id &&
        <Layout.Section>
          <PageActions
            secondaryActions={[{
              content: 'Delete',
              destructive: true,
              disabled: disabled,
              onAction: () => {confirm.open(() => onDelete(collection?.id ?? ''))},
            }]}
          />
        </Layout.Section>
      }
    </Layout>
  </Page>
}

type Props = {
  collection: CollectionInterface,
}
