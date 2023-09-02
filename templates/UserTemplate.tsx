'use client';

import React, {useEffect, useState} from 'react'
import {Page, Card, Layout, FormLayout, TextField, PageActions} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {useMessage, useSaveBar} from "@/hooks";
import {User as UserInterface} from "@/services/types/User";
import {User} from "@/services/User";
import {createUser, deleteUser, updateUser} from "@/serverActions/user";
import {useRouter} from "next/navigation";
import {useConfirm} from "@/hooks/useConfirm";

export const UserTemplate = ({user: userData}: Props) => {
  const router = useRouter();
  const confirm = useConfirm()
  const saveBar = useSaveBar(
    !!userData?.id ? onUpdate : onCreate,
    onDiscard,
    {
      primaryContent: !!userData?.id ? 'Save' : 'Create', secondaryContent: 'Discard'
    }
  );
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

  async function onUpdate() {
    const {errors} = User.validate(user);
    setErrors(errors ?? {});

    if (!errors) {
      try {
        const data = await updateUser(user);
        setDefaultUser(user);
        toast.info('Saved');
      } catch (e) {
        toast.error((e as Error).message || 'error')
      }
    }
  }

  async function onCreate() {
    let validateErrorData = User.validatePass(user);
    if (!validateErrorData?.errors) validateErrorData = User.validate(user);

    setErrors(validateErrorData?.errors ?? {});

    if (!validateErrorData?.errors) {
      try {
        const data = await createUser(user);
        if (data) {
          setDefaultUser(data);
          setUser(data);
          router.replace(`/admin/users/${data.id}`)
        }
        toast.info('Created');
      } catch (e) {
        toast.error((e as Error).message || 'error')
      }
    }
  }

  async function onDelete(id: string) {
    try {
      const data = await deleteUser(id);
      toast.info('Deleted');
      router.push(`/admin/users`);
    } catch (e) {
      toast.error((e as Error).message || 'error')
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
            {
              !user.id &&
              <FormLayout.Group>
                <TextField
                  autoComplete={'off'}
                  label={'Password'}
                  value={user.password}
                  type={'password'}
                  error={errors?.password}
                  onChange={password => onChange({password})}
                />
                <TextField
                  autoComplete={'off'}
                  label={'Confirm password'}
                  type={'password'}
                  value={user.confirmPassword}
                  error={errors?.confirmPassword}
                  onChange={confirmPassword => onChange({confirmPassword})}
                />
              </FormLayout.Group>
            }
          </FormLayout>
        </Card>
      </Layout.Section>
      {
        !!user?.id &&
        <Layout.Section>
          <PageActions
            secondaryActions={[{
              content: 'Delete',
              destructive: true,
              onAction: () => {confirm.open(() => onDelete(user?.id ?? ''))},
            }]}
          />
        </Layout.Section>
      }
    </Layout>
  </Page>
}

type Props = {
  user: UserInterface,
}
