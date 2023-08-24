'use client';
import { Provider, useDispatch, useSelector } from 'react-redux'
import './globals.css';
import '../styles/index.scss';
import '@shopify/polaris/build/esm/styles.css'
import {Inter} from 'next/font/google';
import React from 'react';
import {AppProvider} from "@shopify/polaris";
import en from "@shopify/polaris/locales/en.json";
import {NextLink} from "@/components";
import {store} from "@/core/redux/store";

const inter = Inter({
  subsets: ['latin'],
});

export default function RootLayout({children}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Provider store={store}>
    <AppProvider i18n={en} linkComponent={NextLink}>
      {children}
    </AppProvider>
    </Provider>
    </body>
    </html>
  );
}
