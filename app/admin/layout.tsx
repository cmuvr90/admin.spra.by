'use client';

import React, {ReactNode, useCallback, useState} from 'react';
import {
  Frame,
  ContextualSaveBar,
  Loading,
  Toast,
  Modal,
  FooterHelp,
  Text,
  Layout,
  Divider,
  AppProvider
} from '@shopify/polaris'
import {AdminMenu, TopBar} from "@/components";
import {useRouter} from 'next/router'

export default function MainLayout({children}: {children: ReactNode}) {
  const [navigationActive, setNavigationActive] = useState(false);

  const onLogout = async () => {
    // await api.users.logout()
    // location.href = '/login'
  }

  /**
   *
   */
  const onNavigationToggle = useCallback(() => setNavigationActive(v => !v), [])

  /**
   *
   */
  const logo = {
    width: 50,
    topBarSource: 'https://sun6-22.userapi.com/s/v1/if1/1L7AV_Vxv9WBrLRZg8_FmtqF_gZxJEraUrkwioEm72UMNxebDmSqy6BUzyAxYBET1ie1GcUq.jpg?size=100x100&quality=96&crop=0,0,500,500&ava=1',
    contextualSaveBarSource: 'https://sun6-22.userapi.com/s/v1/if1/1L7AV_Vxv9WBrLRZg8_FmtqF_gZxJEraUrkwioEm72UMNxebDmSqy6BUzyAxYBET1ie1GcUq.jpg?size=100x100&quality=96&crop=0,0,500,500&ava=1',
    url: 'http://localhost:3001/',
    accessibilityLabel: 'SPRABY',
  }

  return (
    <Frame
      logo={logo}
      topBar={
        <TopBar
          onNavigationToggle={onNavigationToggle}
          onLogout={onLogout}
        />
      }
      navigation={<AdminMenu/>}
      showMobileNavigation={navigationActive}
      onNavigationDismiss={onNavigationToggle}
    >
      {/*{contextualSaveBarMarkup}*/}
      {/*{loadingMarkup}*/}
      {/*{toastMarkup}*/}
      {/*{modalMarkup}*/}
      {children}
    </Frame>
  );
}
