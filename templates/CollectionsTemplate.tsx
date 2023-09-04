'use client';

import React, {useEffect, useState} from 'react'
import {Button, Card, IndexTable, Page} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import {useMessage} from "@/hooks";
import {DeleteMajor} from "@shopify/polaris-icons";
import {Collection} from "@/services/types/Collection";
import {deleteCollection, getCollections} from "@/serverActions/collection";

export const CollectionsTemplate = () => {
  const router = useRouter();
  const confirm = useConfirm();
  const toast = useMessage();

  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCollectionsData().finally();
  }, [])

  const getCollectionsData = async () => {
    try {
      setLoading(true)
      const collectionsData = await getCollections();
      setCollections(collectionsData);
      setLoading(false)
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error');
    }
  }

  async function onDelete(id: string) {
    try {
      const data = await deleteCollection(id);
      toast.info('Deleted');
      await getCollectionsData();
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
  }

  return <Page
    title={'Collections'}
    primaryAction={{
      content: 'Create',
      onAction: () => router.replace('/admin/collections/create')
    }}>
    <Card padding={'0'}>
      <IndexTable
        loading={loading}
        itemCount={collections.length}
        selectable={false}
        headings={[
          {title: 'Name'},
          {title: 'Action'},
        ]}
      >
        {
          collections.map(({id, name}, index) => (
            <IndexTable.Row id={`${index}`} key={index} position={index}>
              <IndexTable.Cell>
                <Button monochrome plain url={`/admin/collections/${id}`}>{name}</Button>
              </IndexTable.Cell>
              <IndexTable.Cell>
                <Button icon={DeleteMajor} monochrome plain onClick={() => confirm.open(() => onDelete(id ?? ''))}/>
              </IndexTable.Cell>
            </IndexTable.Row>
          ))
        }
      </IndexTable>
    </Card>
  </Page>
}
