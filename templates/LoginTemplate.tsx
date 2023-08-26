'use client';

import React from 'react'
import {Layout, LegacyCard, Page} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {LoginForm} from "@/components/LoginForm";
import {useMessage} from "@/hooks";
import {SignInResponse} from "next-auth/react";
import {useRouter} from 'next/navigation';

export const LoginTemplate = () => {
  const toast = useMessage();
  const router = useRouter();

  const onSend = async (response?: SignInResponse) => {
    if (response?.ok && response?.url) {
      router.push(response.url);
    } else {
      console.log('Error authorization');
      toast.error('Error authorization')
    }
  }

  return <Page>
    <Layout>
      <LegacyCard sectioned>
        <LoginForm onSend={onSend}/>
      </LegacyCard>
    </Layout>
  </Page>
}
