'use client';

import React, {useEffect, useState} from 'react'
import {Button, IndexTable, Page, Card} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {DeleteMajor} from "@shopify/polaris-icons";
import {User} from "@/services/types/User";
import {deleteUser, getUsers} from "@/serverActions/user";
import {useMessage} from "@/hooks";
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";

export const UsersTemplate = () => {
  const router = useRouter();
  const confirm = useConfirm();
  const toast = useMessage();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsersData().finally();
  }, [])

  const getUsersData = async () => {
    try {
      setLoading(true)
      const usersData = await getUsers();
      setUsers(usersData);
      setLoading(false)
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error');
    }
  }

  async function onDelete(id: string) {
    try {
      const data = await deleteUser(id);
      toast.info('Deleted');
      await getUsersData();
    } catch (e) {
      toast.error((e as Error).message || 'error')
    }
  }

  return <Page
    title={'Users'}
    primaryAction={{
      content: 'Create',
      onAction: () => router.push('/admin/users/create')
    }}>
    <Card padding={'0'}>
      <IndexTable
        loading={loading}
        itemCount={users.length}
        selectable={false}
        headings={[
          {title: 'Email'},
          {title: 'Action'},
        ]}
      >
        {
          users.map(({id, email}, index) => (
            <IndexTable.Row id={`${index}`} key={index} position={index}>
              <IndexTable.Cell>
                <Button monochrome plain url={`/admin/users/${id}`}>{email}</Button>
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
