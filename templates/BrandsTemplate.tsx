'use client';

import React, {useEffect, useState} from 'react'
import {Button, Card, IndexTable, Page} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import {useMessage} from "@/hooks";
import {Brand} from "@/services/types/Brand";
import {DeleteMajor} from "@shopify/polaris-icons";
import {deleteBrand, getBrands} from "@/serverActions/brand";

export const BrandsTemplate = () => {
  const router = useRouter();
  const confirm = useConfirm();
  const toast = useMessage();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBrandsData().finally();
  }, [])

  const getBrandsData = async () => {
    try {
      setLoading(true)
      const brandsData = await getBrands();
      setBrands(brandsData);
      setLoading(false)
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error');
    }
  }

  async function onDelete(id: string) {
    try {
      const data = await deleteBrand(id);
      toast.info('Deleted');
      await getBrandsData();
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
  }

  return <Page
    title={'Brands'}
    primaryAction={{
      content: 'Create',
      onAction: () => router.push('/admin/brands/create')
    }}>
    <Card padding={'0'}>
      <IndexTable
        loading={loading}
        itemCount={brands.length}
        selectable={false}
        headings={[
          {title: 'Name'},
          {title: 'Action'},
        ]}
      >
        {
          brands.map(({id, name}, index) => (
            <IndexTable.Row id={`${index}`} key={index} position={index}>
              <IndexTable.Cell>
                <Button monochrome plain url={`/admin/brands/${id}`}>{name}</Button>
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
