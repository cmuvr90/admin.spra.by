'use client';

import React from 'react'
import {Layout, LegacyCard, Page} from '@shopify/polaris'
import '@shopify/polaris/build/esm/styles.css'
import {LoginForm} from "@/components/LoginForm";

export const LoginTemplate = ({onLogin}: Props) => {
  return <Page>
    <Layout>
      <LegacyCard sectioned>
        <LoginForm onSend={onLogin}/>
      </LegacyCard>
    </Layout>
  </Page>
}

type Props = {
  onLogin?: ({email, password}: {email: string, password: string}) => void;
}
