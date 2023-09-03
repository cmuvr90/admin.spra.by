'use client';

import React, {useEffect, useState} from 'react'
import {Button, Card, IndexTable, Page} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import {useMessage} from "@/hooks";
import {Category} from "@/services/types/Category";
import {DeleteMajor} from "@shopify/polaris-icons";
import {getCategories, deleteCategory} from "@/serverActions/category";

export const CategoriesTemplate = () => {
  const router = useRouter();
  const confirm = useConfirm();
  const toast = useMessage();

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategoriesData().finally();
  }, [])

  const getCategoriesData = async () => {
    try {
      setLoading(true)
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      setLoading(false)
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error');
    }
  }

  async function onDelete(id: string) {
    try {
      const data = await deleteCategory(id);
      toast.info('Deleted');
      await getCategoriesData();
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
  }

  return <Page
    title={'Categories'}
    primaryAction={{
      content: 'Create',
      onAction: () => router.replace('/admin/categories/create')
    }}>
    <Card padding={'0'}>
      <IndexTable
        loading={loading}
        itemCount={categories.length}
        selectable={false}
        headings={[
          {title: 'Name'},
          {title: 'Action'},
        ]}
      >
        {
          categories.map(({id, name}, index) => (
            <IndexTable.Row id={`${index}`} key={index} position={index}>
              <IndexTable.Cell>
                <Button monochrome plain url={`/admin/categories/${id}`}>{name}</Button>
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
