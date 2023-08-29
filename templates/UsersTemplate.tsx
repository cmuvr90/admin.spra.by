'use client';

import React from 'react'
import {Button, IndexTable, Page} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {DeleteMajor} from "@shopify/polaris-icons";

export const UsersTemplate = ({users = []}: {users: any[]}) => {
  return <Page title={'Users'} primaryAction={{
    content: 'Create',
    onAction: () => {}
  }}>

    <IndexTable
      itemCount={users.length}
      selectable={false}
      headings={[
        {title: 'Email'},
        {title: 'Action'},
      ]}
    >
      {
        users.map(({id, email}, index) => (
          <IndexTable.Row id={id} key={id} position={index}>
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
  </Page>
}
