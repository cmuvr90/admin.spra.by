'use client';

import React, {useEffect, useState} from 'react'
import {Button, IndexTable, Page, Card} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {DeleteMajor} from "@shopify/polaris-icons";
import {User} from "@/services/types/User";
import {getUsers} from "@/serverActions/user";
import {useMessage} from "@/hooks";
import {useRouter} from "next/navigation";

export const UsersTemplate = () => {
  const router = useRouter();
  const toast = useMessage();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    getUsersData().finally(() => setLoading(false));
  }, [])

  const getUsersData = async () => {
    try {
      const usersData = await getUsers();
      setUsers(usersData);
    } catch (e) {
      toast.error((e as Error)?.message ?? 'Error');
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
                <Button icon={DeleteMajor} monochrome plain onClick={() => {}}/>
              </IndexTable.Cell>
            </IndexTable.Row>
          ))
        }
      </IndexTable>
    </Card>
  </Page>
}
