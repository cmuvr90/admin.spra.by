'use client';

import React, {useEffect, useState} from 'react'
import {Button, Card, IndexTable, Page} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import {useMessage, useUser} from "@/hooks";
import {Brand} from "@/services/types/Brand";
import {DeleteMajor} from "@shopify/polaris-icons";
import {deleteBrand, getBrands} from "@/serverActions/brand";
import {signIn} from "next-auth/react";
import {User} from "@/services/User";

export const BrandsTemplate = () => {
  const user = useUser();
  const router = useRouter();
  const confirm = useConfirm();
  const toast = useMessage();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [disable, setDisable] = useState(false);
  const [logging, setLogging] = useState<string | null>(null);

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

  /**
   *
   * @param id
   */
  async function onLoginManager(id: string) {
    if (!user || !User.isAdmin(user.role)) return;

    setDisable(true);
    setLogging(id);

    const response = await signIn('credentials', {
      brandId: id,
      hash: user.id as string,
      redirect: false,
      callbackUrl: '/admin'
    });

    if (response?.ok && response?.url) {
      router.push(response.url);
    } else {
      console.log('Error authorization');
      toast.error('Error authorization')
    }

    setDisable(false);
    setLogging(null);
  }

  return <Page
    title={'Brands'}
    primaryAction={{
      content: 'Create',
      disabled: disable,
      onAction: () => router.replace('/admin/brands/create')
    }}>
    <Card padding={'0'}>
      <IndexTable
        loading={loading}
        itemCount={brands.length}
        selectable={false}
        headings={[{title: 'Name'}, {title: ''}, {title: 'Action'}]}
      >
        {
          brands.map(({id, name, user: brandUser}, index) => (
            !!id ?
              <IndexTable.Row id={`${index}`} key={index} position={index}>
                <IndexTable.Cell>
                  <Button disabled={disable} monochrome plain url={`/admin/brands/${id}`}>{name}</Button>
                </IndexTable.Cell>
                <IndexTable.Cell>
                  {
                    (!!user && User.isAdmin(user.role) && !!brandUser) &&
                    <Button loading={logging === id} disabled={disable} plain
                            onClick={() => onLoginManager(id)}>Login</Button>
                  }
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
