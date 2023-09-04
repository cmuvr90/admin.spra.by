'use client';

import React, {useEffect, useState} from 'react'
import {Button, Card, IndexTable, Page} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";
import {useMessage} from "@/hooks";
import {DeleteMajor} from "@shopify/polaris-icons";
import {Option} from "@/services/types/Option";
import {deleteOption, getOptions} from "@/serverActions/option";

export const OptionsTemplate = () => {
  const router = useRouter();
  const confirm = useConfirm();
  const toast = useMessage();

  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOptionsData().finally();
  }, [])

  const getOptionsData = async () => {
    try {
      setLoading(true)
      const optionsData = await getOptions();
      setOptions(optionsData);
      setLoading(false)
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error');
    }
  }

  async function onDelete(id: string) {
    try {
      const data = await deleteOption(id);
      toast.info('Deleted');
      await getOptionsData();
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
  }

  return <Page
    title={'Options'}
    primaryAction={{
      content: 'Create',
      onAction: () => router.replace('/admin/options/create')
    }}>
    <Card padding={'0'}>
      <IndexTable
        loading={loading}
        itemCount={options.length}
        selectable={false}
        headings={[
          {title: 'Name'},
          {title: 'Action'},
        ]}
      >
        {
          options.map(({id, name}, index) => (
            <IndexTable.Row id={`${index}`} key={index} position={index}>
              <IndexTable.Cell>
                <Button monochrome plain url={`/admin/options/${id}`}>{name}</Button>
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