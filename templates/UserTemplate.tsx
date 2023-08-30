'use client';

import React, {useEffect, useState} from 'react'
import {Page, Card, Layout, FormLayout, TextField} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useSaveBar} from "@/hooks";

export const UserTemplate = ({user: defaultUser = {}}: { user: any }) => {
  const saveBar = useSaveBar(defaultUser, onSave, onDiscard);

  const [user, setUser] = useState(defaultUser);
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});

  const onChange = (value: { [key: string]: string }) => setUser((user: any) => ({...user, ...value}))

  useEffect(() => {
    saveBar.onChange(user);
  }, [user])

  async function onDiscard() {
    console.log('discard');
    setUser(defaultUser);
  }

  async function onSave() {
    console.log('SAVE');
  }

  return <Page title={defaultUser.firstName}>
    <Layout>
      <Layout.Section>
        <Card padding={'4'}>
          <FormLayout>
            <FormLayout.Group>
              <TextField
                autoComplete={'off'}
                label={'First name'}
                value={user.firstName}
                error={errors?.firstName}
                onChange={firstName => onChange({firstName})}
              />
              <TextField
                autoComplete={'off'}
                label={'Last name'}
                value={user.lastName}
                error={errors?.lastName}
                onChange={lastName => onChange({lastName})}
              />
            </FormLayout.Group>
            <FormLayout.Group>
              <TextField
                autoComplete={'off'}
                label={'Email'}
                value={user.email}
                error={errors?.email}
                onChange={email => onChange({email})}
              />
            </FormLayout.Group>
          </FormLayout>
        </Card>
      </Layout.Section>
    </Layout>
  </Page>
}
