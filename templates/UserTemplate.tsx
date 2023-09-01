'use client';

import React, {useEffect, useState} from 'react'
import {Page, Card, Layout, FormLayout, TextField} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useMessage, useSaveBar} from "@/hooks";
import {User as UserInterface} from "@/services/types/User";
import {User} from "@/services/User";

export const UserTemplate = ({user: userData, onUpdate}: Props) => {
  const saveBar = useSaveBar(onSave, onDiscard);
  const toast = useMessage();

  const [defaultUser, setDefaultUser] = useState(userData);
  const [user, setUser] = useState(userData);
  const [errors, setErrors] = useState<{ [key: string]: string | boolean }>({});

  const onChange = (value: { [key: string]: string }) => setUser((user: any) => ({...user, ...value}))

  useEffect(() => {
    const isEqual = saveBar.onChange(defaultUser, user);
    if (isEqual) setErrors({});
  }, [user, defaultUser])

  async function onDiscard() {
    setErrors({});
    setUser(defaultUser);
  }

  async function onSave() {
    const {errors} = User.validate(user);
    setErrors(errors ?? {});

    if (onUpdate && !errors) {
      const data = await onUpdate(user);

      if (data) {
        setDefaultUser(data);
        setUser(data);
        toast.info('Saved');
      } else {
        toast.error('Error')
      }
    }
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

type Props = {
  user: UserInterface,
  onUpdate?(value: UserInterface): Promise<any>
}
