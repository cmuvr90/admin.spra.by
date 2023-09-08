'use client';

import React, {useEffect, useState} from 'react'
import {Button, Card, IndexTable, Page} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import {useMessage} from "@/hooks";
import {Product} from "@/services/types/Product";
import {DeleteMajor} from "@shopify/polaris-icons";
import {deleteProduct, getProducts} from "@/serverActions/product";

export const ProductsTemplate = () => {
  const router = useRouter();
  const confirm = useConfirm();
  const toast = useMessage();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    getProductsData().finally();
  }, [])

  const getProductsData = async () => {
    try {
      setLoading(true)
      const productsData = await getProducts();
      setProducts(productsData);
      setLoading(false)
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error');
    }
  }

  async function onDelete(id: string) {
    try {
      const data = await deleteProduct(id);
      toast.info('Deleted');
      await getProductsData();
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
  }

  return <Page
    title={'Products'}
    primaryAction={{
      content: 'Create',
      disabled: disable,
      onAction: () => router.replace('/admin/products/create')
    }}>
    <Card padding={'0'}>
      <IndexTable
        loading={loading}
        itemCount={products.length}
        selectable={false}
        headings={[{title: 'Name'}, {title: 'Action'}]}
      >
        {
          products.map(({id, title}, index) => (
            !!id ?
              <IndexTable.Row id={`${index}`} key={index} position={index}>
                <IndexTable.Cell>
                  <Button disabled={disable} monochrome plain url={`/admin/products/${id}`}>{title}</Button>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  <Button icon={DeleteMajor} disabled={disable} monochrome plain
                          onClick={() => confirm.open(() => onDelete(id ?? ''))}/>
                </IndexTable.Cell>
              </IndexTable.Row> : null
          ))
        }
      </IndexTable>
    </Card>
  </Page>
}
