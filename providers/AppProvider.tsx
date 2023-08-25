'use client';

import React, {ReactNode} from 'react'
import {AppProvider as ShopifyProvider} from '@shopify/polaris'
import {store} from "@/core/redux/store";
import en from "@shopify/polaris/locales/en.json";
import '@shopify/polaris/build/esm/styles.css'
import {NextLink} from "@/components/NextLink";
import {Provider} from "react-redux";
import {SessionProvider} from "next-auth/react";

export const AppProvider = ({children}: {children: ReactNode}) => {
  return <SessionProvider>
    <Provider store={store}>
      <ShopifyProvider i18n={en} linkComponent={NextLink}>
        {children}
      </ShopifyProvider>
    </Provider>
  </SessionProvider>
}
